import { Suspense } from "react";
import ChatInterface from "./ChatInterface";

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="max-w-3xl mx-auto p-6">Loading...</div>}>
      <ChatInterface />
    </Suspense>
  );
}
