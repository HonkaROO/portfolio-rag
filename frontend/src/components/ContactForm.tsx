import React, { useState, useRef, FormEvent, useEffect } from "react";
import {
  Bot,
  Cloud,
  Globe,
  Settings,
  BarChart3,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  Copy,
  Check,
  MapPin,
  Clock,
  Briefcase,
  Mail,
  Github,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { profile } from "@/data/resume";
import { cn } from "@/lib/utils";
import SectionKicker from "@/components/SectionKicker";

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined;
const MAX_CHARS = 1000;

type Status = "idle" | "sending" | "sent" | "error";

interface ProjectType {
  id: string;
  label: string;
  icon: React.ElementType;
  subject: string;
}

const PROJECT_TYPES: ProjectType[] = [
  { id: "chatbot", label: "AI Chatbot", icon: Bot, subject: "AI Chatbot Inquiry" },
  { id: "azure", label: "Azure AI", icon: Cloud, subject: "Azure AI Consultation" },
  { id: "web", label: "Web Application", icon: Globe, subject: "Web Application Development" },
  { id: "automation", label: "Business Automation", icon: Settings, subject: "Business Automation Project" },
  { id: "erp", label: "ERP / CRM", icon: BarChart3, subject: "ERP / CRM Inquiry" },
  { id: "consulting", label: "Consultation", icon: MessageSquare, subject: "Technical Consultation" },
  { id: "other", label: "Other", icon: Sparkles, subject: "Project Inquiry" },
];

interface ContactCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ icon: Icon, title, value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group w-full relative flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:bg-muted/50 transition-all duration-300 hover:-translate-y-[2px] active:scale-[0.98] cursor-pointer overflow-hidden shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent text-left"
      aria-label={`Copy ${title}`}
    >
      <div className="h-10 w-10 shrink-0 rounded-full bg-muted border border-border flex items-center justify-center group-hover:border-accent/30 group-hover:text-accent text-muted-foreground transition-colors duration-300 z-10">
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0 z-10">
        <p className="text-xs font-medium text-muted-foreground mb-0.5">{title}</p>
        <p className="text-sm font-medium text-foreground truncate">{value}</p>
      </div>
      <div className="shrink-0 z-10 text-muted-foreground group-hover:text-foreground transition-colors">
        {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
      </div>
    </button>
  );
};

interface ProjectTypeCardProps {
  type: ProjectType;
  isSelected: boolean;
  onClick: () => void;
}

const ProjectTypeCard: React.FC<ProjectTypeCardProps> = ({ type, isSelected, onClick }) => {
  const Icon = type.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-start p-4 rounded-xl border text-left transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-[0.98]",
        isSelected
          ? "bg-accent/10 border-accent shadow-[0_0_15px_rgba(var(--accent),0.15)] ring-1 ring-accent/20"
          : "bg-card border-border shadow-sm hover:bg-muted/50 hover:border-border/80 hover:-translate-y-[2px]"
      )}
    >
      <Icon className={cn("h-5 w-5 mb-3 transition-colors", isSelected ? "text-accent" : "text-muted-foreground")} />
      <span className={cn("text-sm font-medium transition-colors", isSelected ? "text-foreground" : "text-muted-foreground")}>
        {type.label}
      </span>
    </button>
  );
};

const AvailabilityCard: React.FC = () => (
  <div className="p-6 rounded-3xl bg-card border border-border shadow-sm mb-10 relative overflow-hidden group hover:-translate-y-[2px] transition-all duration-300">
    <div className="absolute top-0 right-0 p-32 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-emerald-500/10 transition-colors duration-700" />
    <div className="flex items-center gap-3 mb-5">
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
      </span>
      <h3 className="text-sm font-medium tracking-wide uppercase text-foreground">Available for work</h3>
    </div>
    <div className="space-y-4">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <Briefcase className="h-4 w-4 shrink-0" />
        <span>Freelance • Consulting • Part-time</span>
      </div>
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <Clock className="h-4 w-4 shrink-0" />
        <span>⚡ Usually replies within 24 hours</span>
      </div>
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <MapPin className="h-4 w-4 shrink-0" />
        <span>📍 {profile.location || "Philippines"}</span>
      </div>
    </div>
  </div>
);

interface CharacterCounterProps {
  count: number;
  max: number;
}

const CharacterCounter: React.FC<CharacterCounterProps> = ({ count, max }) => {
  return (
    <div
      className={cn(
        "text-[11px] font-mono transition-colors duration-300 text-right mt-2 absolute bottom-4 right-4 pointer-events-none",
        count > 950 ? "text-destructive" : count > 800 ? "text-accent" : "text-muted-foreground"
      )}
    >
      {count} / {max}
    </div>
  );
};

interface StatusBannerProps {
  status: Status;
  onRetry: () => void;
}

const StatusBanner: React.FC<StatusBannerProps> = ({ status, onRetry }) => {
  if (status !== "error") return null;
  return (
    <div className="mb-8 p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex items-center gap-3">
        <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
        <p className="text-sm text-destructive font-medium leading-relaxed">
          {FORMSPREE_ID
            ? "Connection error. Unable to send your message at this time."
            : "Formspree ID missing. Please configure your environment."}
        </p>
      </div>
      <Button
        onClick={onRetry}
        size="sm"
        variant="outline"
        className="shrink-0 rounded-full border-destructive/20 hover:bg-destructive/10 hover:text-destructive text-destructive active:scale-[0.98] transition-all"
      >
        Retry
      </Button>
    </div>
  );
};

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [ccMe, setCcMe] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!selectedProjectId) return;
    const selectedProject = PROJECT_TYPES.find((p) => p.id === selectedProjectId);
    if (!selectedProject) return;

    const isSubjectEmptyOrPreset = subject.trim() === "" || PROJECT_TYPES.some((p) => p.subject === subject);

    if (isSubjectEmptyOrPreset) {
      setSubject(selectedProject.subject);
    }
  }, [selectedProjectId, subject]);

  const firstName = name.trim().split(/\s+/)[0];
  const greeting = firstName ? `Nice to meet you, ${firstName}.` : "Hi there 👋";

  const handleCancel = () => {
    setStatus("idle");
    setName("");
    setEmail("");
    setSelectedProjectId(null);
    setSubject("");
    setMessage("");
    setCcMe(false);
    formRef.current?.reset();
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!FORMSPREE_ID) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    const selectedTypeLabel = PROJECT_TYPES.find((p) => p.id === selectedProjectId)?.label || "Not specified";
    data.set("projectType", selectedTypeLabel);
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
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputClass = "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground/50 focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all duration-300 shadow-sm";
  const labelClass = "text-xs font-semibold tracking-wide uppercase text-muted-foreground block mb-2";

  return (
    <section id="contact" className="relative py-16 lg:py-20 overflow-hidden scroll-anchor text-foreground">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
      <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 grid lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24 items-start">
        
        <div className="flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-700">
          <SectionKicker index="06" question="How to reach him" />
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-5">
            Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground">meaningful.</span>
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-md">
            Whether you're looking for an AI-powered application, Azure AI integration, business automation, or a modern web platform, I'd love to hear about your project.
          </p>

          <AvailabilityCard />

          <div className="mb-10 space-y-4">
            <h3 className="text-sm font-semibold tracking-wide uppercase text-foreground mb-4">Didn't find what you were looking for?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md border-l-2 border-border pl-4 py-1">
              Honka can answer questions about my experience.<br />
              Need something more specific? Send me a message directly.
            </p>
          </div>

          <div className="space-y-4 max-w-sm">
            <ContactCard title="Email" value={profile.email} icon={Mail} />
            {profile.github && <ContactCard title="GitHub" value={profile.github} icon={Github} />}
            {profile.linkedin && <ContactCard title="LinkedIn" value={profile.linkedin} icon={Linkedin} />}
          </div>
        </div>

        <div className="relative animate-in fade-in slide-in-from-bottom-12 duration-700 delay-150">
          <Card className="backdrop-blur-2xl bg-card/40 border-border/40 shadow-2xl relative overflow-hidden rounded-[2rem] p-1">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-50 pointer-events-none" />
            
            <div className="bg-card/80 backdrop-blur-3xl rounded-[1.85rem] border border-border/50 relative z-10 p-6 sm:p-10 min-h-[560px] flex flex-col justify-center shadow-sm">
              
              {status === "sent" ? (
                <div className="flex flex-col items-center justify-center text-center animate-in zoom-in-95 fade-in duration-700 py-16">
                  <div className="h-24 w-24 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-8 relative">
                    <div className="absolute inset-0 rounded-full border border-emerald-500/20 animate-ping opacity-20 duration-1000" />
                    <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                  </div>
                  <h3 className="text-3xl font-display tracking-tight font-bold mb-4">Message delivered!</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto mb-10 leading-relaxed">
                    Thank you for reaching out. Christian usually replies within one business day.
                  </p>
                  <Button
                    onClick={() => setStatus("idle")}
                    variant="outline"
                    className="rounded-full px-8 bg-background border-border hover:bg-muted text-foreground transition-all duration-300 active:scale-[0.98]"
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col h-full animate-in fade-in duration-500">
                  <StatusBanner status={status} onRetry={() => setStatus("idle")} />
                  
                  <div className="mb-10">
                    <p className="font-display text-2xl font-medium text-foreground transition-all duration-300">
                      {greeting}
                    </p>
                  </div>

                  <div className="space-y-8 flex-1">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="group">
                        <label htmlFor="name" className={labelClass}>Name</label>
                        <input
                          id="name"
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          placeholder="Jane Doe"
                          className={inputClass}
                        />
                      </div>
                      <div className="group">
                        <label htmlFor="email" className={labelClass}>Email</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder="jane@example.com"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Project Type</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
                        {PROJECT_TYPES.map((type) => (
                          <ProjectTypeCard
                            key={type.id}
                            type={type}
                            isSelected={selectedProjectId === type.id}
                            onClick={() => setSelectedProjectId(type.id)}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="group">
                      <label htmlFor="subject" className={labelClass}>Subject</label>
                      <input
                        id="subject"
                        name="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                        placeholder="What's this regarding?"
                        className={inputClass}
                      />
                    </div>

                    <div className="group relative">
                      <label htmlFor="message" className={labelClass}>Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        maxLength={MAX_CHARS}
                        rows={6}
                        placeholder={`Tell me about your project.\n\nGoals\nTimeline\nCurrent stack\nBudget (optional)`}
                        className={cn(inputClass, "resize-none leading-relaxed placeholder:leading-relaxed pb-8")}
                      />
                      <CharacterCounter count={message.length} max={MAX_CHARS} />
                    </div>

                    <label className="flex items-center gap-3 text-sm text-muted-foreground cursor-pointer select-none group w-fit focus-within:ring-2 focus-within:ring-accent/50 rounded-md">
                      <div className="relative flex items-center justify-center">
                        <Checkbox
                          checked={ccMe}
                          onCheckedChange={(checked) => setCcMe(checked as boolean)}
                          className="border-border data-[state=checked]:bg-foreground data-[state=checked]:text-background data-[state=checked]:border-foreground transition-all"
                        />
                      </div>
                      <span className="group-hover:text-foreground transition-colors">Send me a copy of this message</span>
                    </label>
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-end gap-4 pt-10 mt-6 border-t border-border/50">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleCancel}
                      disabled={status === "sending"}
                      className="rounded-full px-6 hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-300 active:scale-[0.98]"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={status === "sending" || !name || !email || !message}
                      className="rounded-full px-8 py-6 bg-foreground text-background hover:bg-foreground/90 group relative overflow-hidden transition-all duration-300 shadow-sm active:scale-[0.98]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
                      <span className="relative flex items-center gap-2 font-medium">
                        {status === "sending" ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </>
                        )}
                      </span>
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}