import { NextRequest } from "next/server";
import { z } from "zod";
import { supabase } from "@/lib/db/supabase";
import { env } from "@/lib/env";

export const runtime = "edge";

const ContactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(200),
  message: z.string().min(1).max(5000),
  captchaToken: z.string().optional(),
  company: z.string().optional(), // honeypot
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

    const { name, email, message, captchaToken, company } = parsed.data;
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // Honeypot: if filled, silently accept but do nothing
    if (company && company.trim().length > 0) {
      return new Response("OK", { status: 200 });
    }

    // Rate limit (Upstash Redis): 5 requests per 10 minutes per IP
    if (env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN) {
      const key = `contact:ip:${ip}`;
      // INCR
      const incrRes = await fetch(`${env.UPSTASH_REDIS_REST_URL}/INCR/${encodeURIComponent(key)}`, {
        headers: { Authorization: `Bearer ${env.UPSTASH_REDIS_REST_TOKEN}` },
        cache: "no-store",
      });
      const count = await incrRes.json();
      if (typeof count?.result === "number" && count.result === 1) {
        await fetch(`${env.UPSTASH_REDIS_REST_URL}/EXPIRE/${encodeURIComponent(key)}/600`, {
          headers: { Authorization: `Bearer ${env.UPSTASH_REDIS_REST_TOKEN}` },
          cache: "no-store",
        });
      }
      if (typeof count?.result === "number" && count.result > 5) {
        return new Response("Too many requests", { status: 429 });
      }
    }

    // Turnstile verification
    if (env.TURNSTILE_SECRET_KEY) {
      if (!captchaToken || captchaToken.trim().length === 0) {
        return new Response("Captcha required", { status: 400 });
      }
      const formData = new FormData();
      formData.append("secret", env.TURNSTILE_SECRET_KEY);
      formData.append("response", captchaToken);
      if (ip && ip !== "unknown") {
        formData.append("remoteip", ip);
      }
      const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        body: formData as any,
      });
      const verifyJson = await verifyRes.json();
      if (!verifyJson?.success) {
        return new Response("Captcha failed", { status: 400 });
      }
    }

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


