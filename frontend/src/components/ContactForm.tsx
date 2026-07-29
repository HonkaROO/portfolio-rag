import { useState, useRef, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { profile } from "@/data/resume";

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined;

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full bg-transparent border border-border rounded-full px-4 py-2.5 text-sm outline-none " +
  "placeholder:text-muted-foreground/60 focus:border-accent transition-colors";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [ccMe, setCcMe] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!FORMSPREE_ID) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("cc_me", ccMe ? "yes" : "no");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        setCcMe(false);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="scroll-anchor">
      <div className="container py-20">
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>Send a message</CardTitle>
            <CardDescription>
              Have a project in mind? Reach out and {profile.name.split(" ")[0]} will get back
              to you — or email directly at{" "}
              <a href={`mailto:${profile.email}`} className="text-accent">
                {profile.email}
              </a>
              .
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-1.5" htmlFor="name">
                    Name
                  </label>
                  <input id="name" name="name" required placeholder="Jane Cruz" className={inputClass} />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="jane@email.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium block mb-1.5" htmlFor="subject">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  placeholder="Let's build something"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-1.5" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell me a bit about what you're looking for…"
                  className="w-full bg-transparent border border-border rounded-2xl px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-accent transition-colors resize-none"
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer select-none">
                <Checkbox checked={ccMe} onCheckedChange={setCcMe} />
                Send me a copy of this message
              </label>

              {status === "sent" && (
                <p className="text-sm text-accent">Thanks — your message is on its way.</p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-400">
                  {FORMSPREE_ID
                    ? "Something went wrong sending that. Try emailing directly instead."
                    : "Contact form isn't configured yet — set VITE_FORMSPREE_ID in .env."}
                </p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full"
                  onClick={() => {
                    formRef.current?.reset();
                    setCcMe(false);
                    setStatus("idle");
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={status === "sending"} className="rounded-full">
                  {status === "sending" ? "Sending…" : "Send message"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
