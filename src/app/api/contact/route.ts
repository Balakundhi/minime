import { NextRequest } from "next/server";
import { z } from "zod";
import { supabase } from "@/lib/db/supabase";

export const runtime = "edge";

const ContactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(200),
  message: z.string().min(1).max(5000),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return new Response("Invalid request body", { status: 400 });
    }
    if (!supabase) {
      return new Response("Supabase not configured", { status: 500 });
    }

    const { name, email, message } = parsed.data;
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const { error } = await supabase
      .from("contact_messages")
      .insert([{ name, email, message, ip_address: ip }]);

    if (error) {
      console.error("Supabase insert error:", error);
      return new Response("Failed to save message", { status: 500 });
    }

    return new Response("OK", { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response("Server error", { status: 500 });
  }
}


