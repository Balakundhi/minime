import { supabase } from "@/lib/db/supabase";
import { chunkMarkdown } from "./chunk";
import { generateEmbeddings } from "./embed";
import * as fs from "fs";
import * as path from "path";

export interface Document {
  source: string;
  title: string;
  content: string;
  url?: string;
  metadata?: any;
}

/**
 * Ingest a document into the vector database
 */
export async function ingestDocument(doc: Document): Promise<void> {
  if (!supabase) {
    throw new Error("Supabase not configured");
  }
  
  try {
    // Create document record
    const { data: document, error: docError } = await supabase
      .from("documents")
      .insert({
        source: doc.source,
        title: doc.title,
        url: doc.url,
        metadata: doc.metadata,
      })
      .select()
      .single();
    
    if (docError) throw docError;
    
    // Chunk the content
    const chunks = chunkMarkdown(doc.content);
    
    if (chunks.length === 0) {
      console.log("No chunks created for document:", doc.title);
      return;
    }
    
    // Generate embeddings for all chunks
    const texts = chunks.map((c) => c.content);
    const embeddings = await generateEmbeddings(texts);
    
    // Insert chunks with embeddings
    const chunkRecords = chunks.map((chunk, index) => ({
      document_id: document.id,
      content: chunk.content,
      metadata: chunk.metadata,
      embedding: embeddings[index],
    }));
    
    const { error: chunksError } = await supabase
      .from("chunks")
      .insert(chunkRecords);
    
    if (chunksError) throw chunksError;
    
    console.log(`✅ Ingested "${doc.title}" (${chunks.length} chunks)`);
  } catch (error) {
    console.error(`Error ingesting document "${doc.title}":`, error);
    throw error;
  }
}

/**
 * Ingest all markdown files from a directory
 */
export async function ingestDirectory(dirPath: string): Promise<void> {
  const files = fs.readdirSync(dirPath);
  const mdFiles = files.filter((file) => file.endsWith(".md"));
  
  for (const file of mdFiles) {
    const filePath = path.join(dirPath, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const title = file.replace(".md", "").replace(/-/g, " ");
    
    await ingestDocument({
      source: file,
      title: title.charAt(0).toUpperCase() + title.slice(1),
      content,
      metadata: {
        filePath,
        fileName: file,
      },
    });
  }
}

/**
 * Clear all documents and chunks
 */
export async function clearDatabase(): Promise<void> {
  if (!supabase) {
    throw new Error("Supabase not configured");
  }
  
  const { error } = await supabase.from("documents").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  
  if (error) throw error;
  
  console.log("✅ Database cleared");
}
