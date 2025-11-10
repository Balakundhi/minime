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

    const systemPrompt = `You are a helpful AI assistant that answers questions about Sri Charan - a software engineer, marathon runner, traveller, and cook.

Use the provided context to answer questions accurately. If the context contains relevant information, use it to provide detailed answers. Always be friendly and conversational.

If you cite specific information, mention where it came from (e.g., "According to his background...").

If the question cannot be answered from the context, politely say you don't have that specific information and suggest asking something else about Sri Charan's background, skills, experience, or interests.

Context:
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
