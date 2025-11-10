"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ChatInterface() {
  const searchParams = useSearchParams();
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const question = searchParams.get("q");
    if (question) {
      setInput(question);
      // Auto-ask the question
      setTimeout(() => {
        askQuestion(question);
      }, 500);
    }
  }, [searchParams]);

  async function askQuestion(query?: string) {
    const message = query || input;
    if (!message.trim()) return;
    setLoading(true);
    setAnswer("");
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
        signal: ctrl.signal,
      });
      if (!res.ok || !res.body) throw new Error("Request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        setAnswer((prev) => prev + decoder.decode(value));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Ask me anything</h1>
      <Card className="p-4 space-y-3">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about my background, projects, work, or interests..."
          rows={4}
        />
        <div className="flex gap-2">
          <Button disabled={loading} onClick={() => askQuestion()}>
            {loading ? "Thinking..." : "Ask"}
          </Button>
          {loading && (
            <Button variant="secondary" onClick={() => abortRef.current?.abort()}>
              Stop
            </Button>
          )}
        </div>
      </Card>

      {answer && (
        <Card className="p-4 whitespace-pre-wrap leading-relaxed">
          {answer}
        </Card>
      )}
    </main>
  );
}
