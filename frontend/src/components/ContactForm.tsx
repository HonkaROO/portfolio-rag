import {
  Briefcase,
  Clock,
  MapPin,
  Mail,
  Github,
  Linkedin,
  CalendarDays,
  ArrowUpRight,
  MessageSquare,
} from "lucide-react";

import { profile } from "@/data/resume";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionKicker from "@/components/SectionKicker";

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL as string | undefined;

interface ContactCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  value?: string;
  href: string;
  external?: boolean;
}

const ContactCard = ({
  icon: Icon,
  title,
  description,
  value,
  href,
  external = true,
}: ContactCardProps) => {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="
        group
        relative
        flex
        items-center
        gap-4
        p-4
        rounded-2xl
        bg-card
        border
        border-border
        shadow-sm
        transition-all
        duration-300
        ease-out
        hover:-translate-y-[2px]
        hover:border-accent/50
        hover:bg-muted/40
        hover:shadow-[0_8px_30px_-15px_hsl(var(--accent)/0.25)]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-accent
        focus-visible:ring-offset-2
        focus-visible:ring-offset-background
      "
    >
      {/* Icon */}
      <div
        className="
          h-11
          w-11
          shrink-0
          rounded-full
          bg-muted
          border
          border-border
          flex
          items-center
          justify-center
          text-muted-foreground
          transition-all
          duration-300
          group-hover:border-accent/40
          group-hover:text-accent
          group-hover:bg-accent/5
        "
      >
        <Icon className="h-4 w-4" />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p
          className="
            text-sm
            font-semibold
            text-foreground
            transition-colors
            duration-200
            group-hover:text-accent
          "
        >
          {title}
        </p>

        <p className="text-xs text-muted-foreground mt-0.5">
          {description}
        </p>

        {value && (
          <p className="text-xs text-muted-foreground/80 mt-1 truncate">
            {value}
          </p>
        )}
      </div>

      {/* External link indicator */}
      <ArrowUpRight
        className="
          h-4
          w-4
          shrink-0
          text-muted-foreground/50
          transition-all
          duration-300
          group-hover:text-accent
          group-hover:translate-x-0.5
          group-hover:-translate-y-0.5
        "
      />
    </a>
  );
};

const AvailabilityCard = () => {
  return (
    <div
      className="
        relative
        overflow-hidden
        p-6
        rounded-3xl
        bg-card
        border
        border-border
        shadow-sm
        mb-8
        group
        transition-all
        duration-300
        hover:-translate-y-[2px]
      "
    >
      {/* Ambient glow */}
      <div
        className="
          absolute
          -top-24
          -right-24
          h-48
          w-48
          rounded-full
          bg-emerald-500/5
          blur-[70px]
          pointer-events-none
          transition-all
          duration-700
          group-hover:bg-emerald-500/10
          group-hover:scale-125
        "
      />

      {/* Header */}
      <div className="relative flex items-center gap-3 mb-5">
        <span className="relative flex h-3 w-3">
          <span
            className="
              animate-ping
              absolute
              inline-flex
              h-full
              w-full
              rounded-full
              bg-emerald-400
              opacity-75
            "
          />

          <span
            className="
              relative
              inline-flex
              rounded-full
              h-3
              w-3
              bg-emerald-500
            "
          />
        </span>

        <h3
          className="
            text-sm
            font-medium
            tracking-wide
            uppercase
            text-foreground
          "
        >
          Available for work
        </h3>
      </div>

      {/* Availability details */}
      <div className="relative space-y-4">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Briefcase className="h-4 w-4 shrink-0" />
          <span>Freelance • Consulting • Part-time</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Clock className="h-4 w-4 shrink-0" />
          <span>Usually replies within 24 hours</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0" />
          <span>{profile.location || "Philippines"}</span>
        </div>
      </div>
    </div>
  );
};

export default function ContactForm() {
  /*
   * Gmail compose URL.
   *
   * Replace the email automatically using profile.email from resume.ts.
   */
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    profile.email
  )}`;

  /*
   * Outlook compose URL.
   *
   * This opens Outlook's web compose interface with your email
   * already populated as the recipient.
   */
  const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(
    profile.email
  )}`;

  /*
   * Calendly is intentionally optional.
   *
   * If VITE_CALENDLY_URL isn't configured, the Calendly card
   * simply won't be rendered.
   */
  const calendlyUrl = CALENDLY_URL?.trim();

  return (
    <section
      id="contact"
      className="
        relative
        py-16
        lg:py-20
        overflow-hidden
        scroll-anchor
        text-foreground
      "
    >
      {/* Section divider */}
      <div
        className="
          absolute
          top-0
          left-0
          w-full
          h-px
          bg-gradient-to-r
          from-transparent
          via-border
          to-transparent
          opacity-50
        "
      />

      {/* Ambient background glows */}
      <div
        className="
          absolute
          -top-[20%]
          -right-[10%]
          w-[50%]
          h-[50%]
          bg-accent/5
          blur-[120px]
          rounded-full
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          -bottom-[20%]
          -left-[10%]
          w-[50%]
          h-[50%]
          bg-accent/5
          blur-[120px]
          rounded-full
          pointer-events-none
        "
      />

      <div
        className="
          container
          relative
          z-10
        "
      >
        {/* Section heading */}
        <SectionKicker
          index="06"
          question="How to reach me"
        />

        <div
          className="
            grid
            lg:grid-cols-[1fr_1.1fr]
            gap-12
            lg:gap-20
            items-start
          "
        >
          {/* =====================================================
              LEFT COLUMN
          ====================================================== */}
          <div
            className="
              flex
              flex-col
              animate-in
              fade-in
              slide-in-from-bottom-8
              duration-700
            "
          >
            <h2
              className="
                font-display
                text-3xl
                sm:text-4xl
                lg:text-5xl
                font-bold
                tracking-tight
                leading-tight
                mb-5
              "
            >
              Let's build something{" "}
              <span
                className="
                  text-transparent
                  bg-clip-text
                  bg-gradient-to-r
                  from-foreground
                  to-muted-foreground
                "
              >
                meaningful.
              </span>
            </h2>

            <p
              className="
                text-base
                text-muted-foreground
                leading-relaxed
                max-w-md
                mb-8
              "
            >
              Whether you're looking for an AI-powered application,
              Azure AI integration, business automation, or a modern
              web platform, I'd love to hear about your project.
            </p>

            {/* Availability */}
            <AvailabilityCard />

            {/* =================================================
                HONKA CTA
            ================================================== */}
            <Card
              className="
                relative
                overflow-hidden
                rounded-3xl
                border-border
                bg-card
                p-6
                mb-8
                group
                transition-all
                duration-300
                hover:border-accent/40
                hover:shadow-[0_12px_40px_-20px_hsl(var(--accent)/0.35)]
              "
            >
              {/* Background accent */}
              <div
                className="
                  absolute
                  -right-16
                  -top-16
                  h-40
                  w-40
                  rounded-full
                  bg-accent/5
                  blur-3xl
                  pointer-events-none
                  transition-transform
                  duration-700
                  group-hover:scale-125
                "
              />

              <div className="relative">
                <div className="flex items-start gap-4">
                  <div
                    className="
                      h-11
                      w-11
                      shrink-0
                      rounded-full
                      bg-accent/10
                      border
                      border-accent/20
                      flex
                      items-center
                      justify-center
                      text-accent
                    "
                  >
                    <MessageSquare className="h-5 w-5" />
                  </div>

                  <div className="flex-1">
                    <p
                      className="
                        text-xs
                        font-mono
                        uppercase
                        tracking-widest
                        text-accent
                        mb-1
                      "
                    >
                      AI Assistant
                    </p>

                    <h3
                      className="
                        font-display
                        text-lg
                        font-semibold
                        text-foreground
                      "
                    >
                      Have a question?
                    </h3>

                    <p
                      className="
                        text-sm
                        text-muted-foreground
                        leading-relaxed
                        mt-1
                      "
                    >
                      Ask Honka about my experience, projects,
                      technical stack, or what I can help you build.
                    </p>

                    <Button
                      asChild
                      size="sm"
                      className="
                        mt-4
                        rounded-full
                        group/button
                      "
                    >
                      <a href="#honka">
                        Ask Honka
                        <ArrowUpRight
                          className="
                            h-3.5
                            w-3.5
                            ml-1
                            transition-transform
                            duration-200
                            group-hover/button:translate-x-0.5
                            group-hover/button:-translate-y-0.5
                          "
                        />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* =====================================================
              RIGHT COLUMN — DIRECT CONTACT
          ====================================================== */}
          <div
            className="
              animate-in
              fade-in
              slide-in-from-bottom-12
              duration-700
              delay-150
            "
          >
            <div className="mb-6">
              <p
                className="
                  text-xs
                  font-mono
                  uppercase
                  tracking-widest
                  text-muted-foreground
                  mb-2
                "
              >
                Direct contact
              </p>

              <h3
                className="
                  font-display
                  text-2xl
                  sm:text-3xl
                  font-bold
                "
              >
                Reach me directly.
              </h3>

              <p
                className="
                  text-sm
                  text-muted-foreground
                  leading-relaxed
                  mt-2
                  max-w-lg
                "
              >
                Prefer to skip the chatbot? You can contact me
                directly through any of the channels below.
              </p>
            </div>

            <div className="grid gap-3">
              {/* =================================================
                  EMAIL — GMAIL
              ================================================== */}
              <ContactCard
                icon={Mail}
                title="Email"
                description="Send me an email through Gmail"
                value={profile.email}
                href={gmailUrl}
              />

              {/* =================================================
                  LINKEDIN
              ================================================== */}
              {profile.linkedin && (
                <ContactCard
                  icon={Linkedin}
                  title="LinkedIn"
                  description="Connect with me professionally"
                  value={profile.linkedin}
                  href={profile.linkedin}
                />
              )}

              {/* =================================================
                  GITHUB
              ================================================== */}
              {profile.github && (
                <ContactCard
                  icon={Github}
                  title="GitHub"
                  description="Explore my projects and code"
                  value={profile.github}
                  href={profile.github}
                />
              )}

              {/* =================================================
                  CALENDLY
              ================================================== */}
              {calendlyUrl && (
                <ContactCard
                  icon={CalendarDays}
                  title="Schedule a call"
                  description="Book a time that works for you"
                  href={calendlyUrl}
                />
              )}
            </div>

            {/* Outlook secondary email option */}
            <div className="mt-5">
              <a
                href={outlookUrl}
                target="_blank"
                rel="noreferrer"
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-xs
                  text-muted-foreground
                  hover:text-foreground
                  transition-colors
                "
              >
                Prefer Outlook?
                <span className="underline underline-offset-4">
                  Open email there
                </span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>

            {/* Bottom note */}
            <div
              className="
                mt-8
                pt-6
                border-t
                border-border
                text-xs
                text-muted-foreground
                leading-relaxed
              "
            >
              <span className="text-accent font-mono">
                {/* // response_time */}
              </span>{" "}
              I usually respond within 24 hours.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}