import { NextRequest } from "next/server";
import OpenAI from "openai";
import { env } from "@/lib/env";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message || typeof message !== "string") {
      return new Response("Invalid request body", { status: 400 });
    }

    const system =
      "You are a helpful assistant that answers questions about the site owner's background, work, projects, and interests. Be concise and cite sections if provided by the retrieval layer. If you don't know, say so.";

    const client = new OpenAI({ apiKey: env.OPENAI_API_KEY });

    const stream = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: system },
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
