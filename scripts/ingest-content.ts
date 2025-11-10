/**
 * Script to ingest content into the vector database
 * 
 * Usage:
 *   npx tsx scripts/ingest-content.ts
 */

import { config } from "dotenv";
import * as path from "path";

// Load environment variables from .env.local
config({ path: path.join(process.cwd(), ".env.local") });

import { ingestDirectory, clearDatabase } from "../src/lib/rag/ingest";

async function main() {
  console.log("🚀 Starting content ingestion...\n");
  
  try {
    // Optional: Clear existing data
    // await clearDatabase();
    
    // Ingest all markdown files from content directory
    const contentDir = path.join(process.cwd(), "content");
    await ingestDirectory(contentDir);
    
    console.log("\n✅ Content ingestion complete!");
  } catch (error) {
    console.error("\n❌ Error during ingestion:", error);
    process.exit(1);
  }
}

main();
