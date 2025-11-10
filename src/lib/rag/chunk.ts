export interface Chunk {
  content: string;
  metadata: {
    section?: string;
    startIndex: number;
    endIndex: number;
  };
}

/**
 * Chunk text into smaller pieces for embedding
 */
export function chunkText(
  text: string,
  options: {
    chunkSize?: number;
    overlap?: number;
  } = {}
): Chunk[] {
  const { chunkSize = 800, overlap = 200 } = options;
  
  const chunks: Chunk[] = [];
  const sentences = text.split(/(?<=[.!?])\s+/);
  
  let currentChunk = "";
  let startIndex = 0;
  
  for (const sentence of sentences) {
    if (currentChunk.length + sentence.length > chunkSize && currentChunk.length > 0) {
      chunks.push({
        content: currentChunk.trim(),
        metadata: {
          startIndex,
          endIndex: startIndex + currentChunk.length,
        },
      });
      
      // Start new chunk with overlap
      const words = currentChunk.split(" ");
      const overlapWords = words.slice(-Math.floor(overlap / 5));
      currentChunk = overlapWords.join(" ") + " " + sentence;
      startIndex += currentChunk.length - overlapWords.join(" ").length;
    } else {
      currentChunk += (currentChunk ? " " : "") + sentence;
    }
  }
  
  // Add the last chunk
  if (currentChunk) {
    chunks.push({
      content: currentChunk.trim(),
      metadata: {
        startIndex,
        endIndex: startIndex + currentChunk.length,
      },
    });
  }
  
  return chunks;
}

/**
 * Chunk markdown content preserving structure
 */
export function chunkMarkdown(markdown: string): Chunk[] {
  const sections = markdown.split(/^##\s+/m);
  const chunks: Chunk[] = [];
  
  sections.forEach((section, index) => {
    if (!section.trim()) return;
    
    const lines = section.split("\n");
    const sectionTitle = index > 0 ? lines[0] : null;
    const content = index > 0 ? lines.slice(1).join("\n") : section;
    
    // Chunk large sections
    const sectionChunks = chunkText(content, { chunkSize: 600, overlap: 150 });
    
    sectionChunks.forEach((chunk) => {
      chunks.push({
        ...chunk,
        metadata: {
          ...chunk.metadata,
          section: sectionTitle || undefined,
        },
      });
    });
  });
  
  return chunks;
}
