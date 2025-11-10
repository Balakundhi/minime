import { supabase } from "@/lib/db/supabase";
import { generateEmbedding } from "./embed";

export interface RetrievedChunk {
  id: string;
  document_id: string;
  content: string;
  metadata: any;
  similarity: number;
}

/**
 * Retrieve relevant chunks for a query using semantic search
 */
export async function retrieveRelevantChunks(
  query: string,
  options: {
    limit?: number;
    threshold?: number;
  } = {}
): Promise<RetrievedChunk[]> {
  const { limit = 5, threshold = 0.5 } = options;
  
  if (!supabase) {
    console.warn("Supabase not configured");
    return [];
  }
  
  try {
    // Generate embedding for the query
    const queryEmbedding = await generateEmbedding(query);
    
    // Search for similar chunks
    const { data, error } = await supabase.rpc("match_chunks", {
      query_embedding: queryEmbedding,
      match_threshold: threshold,
      match_count: limit,
    });
    
    if (error) {
      console.error("Error retrieving chunks:", error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error("Error in semantic search:", error);
    return [];
  }
}

/**
 * Format retrieved chunks as context for the LLM
 */
export function formatContextForLLM(chunks: RetrievedChunk[]): string {
  if (chunks.length === 0) {
    return "No relevant information found in the knowledge base.";
  }
  
  const context = chunks
    .map((chunk, index) => {
      const section = chunk.metadata?.section ? `[${chunk.metadata.section}] ` : "";
      return `${index + 1}. ${section}${chunk.content}`;
    })
    .join("\n\n");
  
  return `Here is relevant information from the knowledge base:\n\n${context}`;
}
