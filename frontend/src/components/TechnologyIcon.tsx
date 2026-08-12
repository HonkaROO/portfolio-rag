import {
  React,
  TypeScript,
  TailwindCSS,
  FastAPI,
  Django,
  Laravel,
  Azure,
  Docker,
  Supabase,
  PostgreSQL,
  MicrosoftSQLServer2,
  Render,
  MongoDB,
  MySQL,
  Figma,
  Canva,
  Miro,
  WordPress,
  ChatGPT,
  ClaudeAI,
  Gemini,
  GitHubCopilot,
  Lovable,
  N8n,
  Angular,
  ReSend,
  Google,
} from "developer-icons";

import {
  DiDotnet,
} from "react-icons/di";

import { VscAzureDevops } from "react-icons/vsc";
import { SiAsana, SiDiagramsdotnet } from "react-icons/si";



type TechnologyIconProps = {
  name: string;
  size?: number;
  className?: string;
};

export default function TechnologyIcon({
  name,
  size = 22,
}: TechnologyIconProps) {
  const icons: Record<
    string,
    React.ComponentType<{ size?: number }>
  > = {
    React,
    TypeScript,
    Tailwind: TailwindCSS,
    Angular,

    FastAPI,
    "ASP.NET Core": DiDotnet,
    Django,
    Laravel,

    Azure,
    Docker,
    Render,

    Supabase,
    PostgreSQL,
    "SQL Server": MicrosoftSQLServer2,
    MongoDB,
    MySQL,

    Figma,
    Canva,
    Miro,

    WordPress,

    ChatGPT,
    "Claude AI": ClaudeAI,
    Gemini,
    Copilot: GitHubCopilot,
    Lovable,
    n8n: N8n,

    "Resend": ReSend,
    "Asana": SiAsana,
    "Google Workspace": Google,
  };

    if (name === "Microsoft Foundry") {
        return (
            <img
            src="/icons/Microsoft-Foundry.svg"
            alt="Microsoft Foundry"
            width={size}
            height={size}
            className="shrink-0 object-contain"
            />
        );
    }

    if (name === "Azure DevOps") {
        return (
            <img
            src="/icons/Azure-DevOps.svg"
            alt="Azure DevOps"
            width={size}
            height={size}
            className="shrink-0 object-contain"
            />
        );
    }

  const Icon = icons[name];

  if (!Icon) {
    return null;
  }

  return <Icon size={size} />;
}