import { useState, useRef, useEffect, KeyboardEvent } from "react";
import ReactMarkdown from "react-markdown";
import { Send, Sparkles, Code2, Award, X, Zap, ChevronDown, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import SectionKicker from "@/components/SectionKicker";
import { aiStack } from "@/data/resume";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Add more entries here as you integrate more providers - the dropdown and
// backend request both key off this list, no other frontend change needed.
const MODELS = [
  { id: "groq", label: "Groq · Llama-3.1-8B-Instant" },
  { id: "gemini", label: "Gemini · 3.1 Flash-Lite" },
  { id: "azure", label: "Azure OpenAI · GPT-5-Nano" },
] as const;

type Provider = (typeof MODELS)[number]["id"];

const MODEL_MAP: Record<Provider, string> = {
  gemini: "gemini-3.1-flash-lite",
  groq: "llama-3.1-8b-instant",
  azure: "gpt-5-nano",
};

const MODEL_LABEL: Record<Provider, string> = Object.fromEntries(
  MODELS.map((m) => [m.id, m.label])
) as Record<Provider, string>;

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  provider?: Provider;
  timestamp: number;
};
type SystemMessage = { role: "system"; content: string; timestamp: number };
type Message = ChatMessage | SystemMessage;

const SUGGESTIONS = [
  { icon: Code2, text: "What's Christian's experience with FastAPI?" },
  { icon: Sparkles, text: "Tell me about the RAG chatbot projects" },
  { icon: Award, text: "What certifications does he hold?" },
];

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-2 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

function HonkaAvatar({ size = "h-9 w-9" }: { size?: string }) {
  return (
    <div
      className={cn(
        "shrink-0 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center",
        size
      )}
    >
      <Sparkles className="h-4 w-4 text-accent" />
    </div>
  );
}

function ModelDropdown({
  value,
  onChange,
}: {
  value: Provider;
  onChange: (p: Provider) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-full border border-border bg-muted/40 hover:border-accent transition-colors"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
        <span className="max-w-[9rem] truncate">{MODEL_LABEL[value]}</span>
        <ChevronDown className={cn("h-3 w-3 shrink-0 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-60 rounded-xl border border-border bg-card shadow-lg overflow-hidden z-20">
          {MODELS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                onChange(m.id);
                setOpen(false);
              }}
              className={cn(
                "w-full flex items-center justify-between gap-2 px-3 py-2.5 text-xs font-mono text-left transition-colors hover:bg-muted",
                m.id === value ? "text-accent" : "text-foreground"
              )}
            >
              {m.label}
              {m.id === value && <Check className="h-3 w-3 shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SystemNotice({ content }: { content: string }) {
  return (
    <div className="flex justify-center">
      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground bg-muted/50 border border-border rounded-full px-3 py-1">
        <Zap className="h-3 w-3 text-accent" />
        {content}
      </span>
    </div>
  );
}

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi, I'm **Honka** — a RAG assistant trained on Christian's resume. Ask me about his experience, projects, or skills, or try one of the prompts below. You can also switch which model answers from the dropdown above.",
      timestamp: Date.now(),
    },
  ]);

  const [provider, setProvider] = useState<Provider>("groq");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function handleModelChange(next: Provider) {
    if (next === provider) return;

    try {
      const modelName = MODEL_MAP[next];

      const response = await fetch(`${API_URL}/model/${modelName}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`Failed to switch model (${response.status})`);
      }

      await response.json();

      setProvider(next);

      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: `⚡ Switched to ${MODEL_LABEL[next]}`,
          timestamp: Date.now(),
        },
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: `❌ Failed to switch to ${MODEL_LABEL[next]}`,
          timestamp: Date.now(),
        },
      ]);
    }
  }

  async function send(question: string) {
    if (!question.trim() || loading) return;

    setError(null);

    const userMessage: Message = {
      role: "user",
      content: question,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
        }),
      });

      if (!res.ok) {
        throw new Error(`Backend returned ${res.status}`);
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer,
          timestamp: Date.now(),
          provider: provider,
        },
      ]);

    } catch (err) {
      console.error(err);

      setError(
        "Couldn't reach the assistant backend. If you're running this locally, make sure the FastAPI server is up at " +
          API_URL
      );
    } finally {
      setLoading(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  return (
    <section id="honka" className="scroll-anchor border-b border-border">
      <div className="container py-14 lg:py-16">
        <SectionKicker index="06" question="See it in action" />
        <h2 className="font-display text-2xl font-bold mb-2">Meet Honka</h2>
        <p className="text-sm text-muted-foreground mb-6">
          A retrieval-augmented assistant trained on everything above — ask it anything about
          Christian's experience, projects, or skills, and pick which model answers.
        </p>

        <Card className="max-w-4xl mx-auto overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 px-6 py-4 border-b border-border">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <HonkaAvatar />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-card">
                  <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                </span>
              </div>
              <div className="min-w-0">
                <p className="font-display font-medium leading-tight">Meet Honka</p>
                <p className="text-xs text-muted-foreground">AI assistant · online</p>
              </div>
            </div>

            <ModelDropdown value={provider} onChange={handleModelChange} />
          </div>

          <CardContent className="p-0">
            <div ref={scrollRef} className="h-[28rem] overflow-y-auto px-6 py-6 space-y-4">
              {messages.map((m, i) => {
                if (m.role === "system") {
                  return <SystemNotice key={i} content={m.content} />;
                }
                return (
                  <div
                    key={i}
                    className={cn(
                      "flex gap-3 items-end",
                      m.role === "user" ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    {m.role === "assistant" && <HonkaAvatar size="h-7 w-7" />}
                    <div
                      className={cn(
                        "max-w-[75%] flex flex-col",
                        m.role === "user" ? "items-end" : "items-start"
                      )}
                    >
                      <div
                        className={cn(
                          "rounded-2xl px-4 py-2.5 text-sm leading-relaxed transition-transform hover:-translate-y-0.5",
                          m.role === "user"
                            ? "bg-accent text-accent-foreground rounded-br-sm"
                            : "bg-muted text-foreground rounded-bl-sm"
                        )}
                      >
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => (
                              <p className="m-0 [&:not(:first-child)]:mt-2">{children}</p>
                            ),
                            strong: ({ children }) => (
                              <strong className="font-semibold">{children}</strong>
                            ),
                            ul: ({ children }) => (
                              <ul className="list-disc pl-4 my-1 space-y-0.5">{children}</ul>
                            ),
                            li: ({ children }) => <li>{children}</li>,
                            code: ({ children }) => (
                              <code className="font-mono text-xs bg-background/30 rounded px-1 py-0.5">
                                {children}
                              </code>
                            ),
                            a: ({ children, href }) => (
                              <a
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                className="underline underline-offset-2"
                              >
                                {children}
                              </a>
                            ),
                          }}
                        >
                          {m.content}
                        </ReactMarkdown>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1 px-1">
                        <span className="text-[10px] text-muted-foreground/70">
                          {formatTime(m.timestamp)}
                        </span>
                        {m.role === "assistant" && m.provider && (
                          <span className="text-[10px] font-mono text-muted-foreground/70">
                            · via {MODEL_LABEL[m.provider]}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex gap-3 items-end">
                  <HonkaAvatar size="h-7 w-7" />
                  <div className="bg-muted rounded-2xl rounded-bl-sm">
                    <TypingDots />
                  </div>
                </div>
              )}

              {error && (
                <div className="flex items-start justify-between gap-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-lg px-3 py-2.5">
                  <span>{error}</span>
                  <button
                    onClick={() => setError(null)}
                    className="shrink-0 hover:opacity-70 transition-opacity"
                    aria-label="Dismiss error"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Suggestion chips */}
            <div className="border-t border-border px-6 py-3 flex flex-wrap gap-2">
              {SUGGESTIONS.map(({ icon: Icon, text }) => (
                <button
                  key={text}
                  onClick={() => send(text)}
                  className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:border-accent hover:text-accent hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Icon className="h-3 w-3" />
                  {text}
                </button>
              ))}
            </div>

            {/* Input bar */}
            <form
              className="border-t border-border px-4 py-3 flex items-end gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question… (Shift+Enter for a new line)"
                rows={1}
                className="flex-1 resize-none bg-transparent border border-border rounded-2xl px-4 py-2.5 text-sm outline-none focus:border-accent transition-colors max-h-32"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="h-10 w-10 shrink-0 rounded-full bg-accent text-accent-foreground flex items-center justify-center hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-150 disabled:opacity-40 disabled:hover:scale-100"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </CardContent>
        </Card>

        {/* Current architecture, reusing the same list shown in the AI Stack
            section above - this is literally what's running the chat. */}
        <div className="max-w-4xl mx-auto mt-6">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
            Current architecture
          </p>
          <div className="flex flex-wrap gap-2">
            {aiStack.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono px-3 py-1 rounded-full border border-border text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}