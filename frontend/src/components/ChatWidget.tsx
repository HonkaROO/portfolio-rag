import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What's Christian's experience with FastAPI?",
  "Tell me about the RAG chatbot projects",
  "What certifications does he hold?",
];

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi, I'm Honka, Christian's trained RAG chatbot trained on Christian's resume. Ask me about his experience, projects, or skills.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function send(question: string) {
    if (!question.trim() || loading) return;
    setError(null);
    const next: Message[] = [...messages, { role: "user", content: question }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      if (!res.ok) throw new Error(`Backend returned ${res.status}`);
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.answer }]);
    } catch (err) {
      setError(
        "Couldn't reach the assistant backend. If you're running this locally, make sure the FastAPI server is up at " +
          API_URL
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="chat" className="border-b border-border">
      <div className="container py-20">
        <h2 className="font-display text-2xl font-bold mb-2">Ask about my experience</h2>
        <p className="text-sm text-muted-foreground mb-8">
          Retrieval-augmented chat over the resume content on this page.
        </p>

        <Card className="max-w-2xl">
          <CardContent className="p-0">
            <div ref={scrollRef} className="h-80 overflow-y-auto p-6 space-y-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`text-sm leading-relaxed ${
                    m.role === "user" ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <span className="font-mono text-xs text-accent mr-2">
                    {m.role === "user" ? "You" : "Honka"}
                  </span>
                  {m.content}
                </div>
              ))}
              {loading && (
                <p className="font-mono text-xs text-muted-foreground">Honka is thinking…</p>
              )}
              {error && <p className="text-xs text-red-400">{error}</p>}
            </div>

            <div className="border-t border-border p-4 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="font-mono text-xs px-2 py-1 rounded border border-border text-muted-foreground hover:border-accent hover:text-accent transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>

            <form
              className="border-t border-border p-4 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                className="flex-1 bg-transparent border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-accent"
              />
              <Button type="submit" disabled={loading}>
                Send
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
