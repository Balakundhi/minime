import { NextRequest } from "next/server";
import OpenAI from "openai";
import { env } from "@/lib/env";
import { retrieveRelevantChunks, formatContextForLLM } from "@/lib/rag/retrieve";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message || typeof message !== "string") {
      return new Response("Invalid request body", { status: 400 });
    }

    // Retrieve relevant context from vector database
    const relevantChunks = await retrieveRelevantChunks(message, {
      limit: 5,
      threshold: 0.3,
    });
    
    const context = formatContextForLLM(relevantChunks);

    const systemPrompt = `You are Sri Charan Balakundhi, a Software Engineer, and you're answering questions about yourself in FIRST PERSON.

IMPORTANT: Always respond as "I" or "me", never as "he" or "Sri Charan" in third person.

Examples:
- Bad: "Sri Charan is a software engineer"
- Good: "I'm a software engineer"
- Bad: "He worked at Infosys"
- Good: "I worked at Infosys"

Use the provided context to answer questions accurately about yourself. Always be friendly, conversational, and enthusiastic. Share details about your experience, skills, projects, and interests naturally.

If asked about specific technical details, provide them confidently. If you don't have information about something, say "I don't have details about that in my knowledge base, but feel free to ask me about my work experience, projects, skills, or interests!"

Context about me:
${context}`;

    const client = new OpenAI({ apiKey: env.OPENAI_API_KEY });

    const stream = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      temperature: 0.3,
      stream: true,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const delta = chunk.choices?.[0]?.delta?.content;
            if (delta) {
              controller.enqueue(encoder.encode(delta));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (e) {
    console.error(e);
    return new Response("Server error", { status: 500 });
  }
}
