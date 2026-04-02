import React from "react";

const TECH_ICONS: Record<string, { icon: string; color: string; url?: string }> = {
  React:        { icon: "react",       color: "#61dafb" },
  "Next.js":    { icon: "nextdotjs",   color: "#ffffff" },
  TypeScript:   { icon: "typescript",  color: "#3178c6" },
  "Node.js":    { icon: "nodedotjs",   color: "#5fa04e" },
  Express:      { icon: "express",     color: "#ffffff" },
  PostgreSQL:   { icon: "postgresql",  color: "#4169e1" },
  Prisma:       { icon: "prisma",      color: "#2d3748" },
  Tailwind:     { icon: "tailwindcss", color: "#06b6d4" },
  WebSockets:   { icon: "socketdotio", color: "#010101" },
  Solana:       { icon: "solana",      color: "#9945ff" },
  "React Native": { icon: "react",     color: "#61dafb" },
  Docker:       { icon: "docker",      color: "#2496ed" },
  Python:       { icon: "python",      color: "#3776ab" },
  "C++":        { icon: "cplusplus",   color: "#00599c" },
  AWS:          { icon: "aws",         color: "#ff9900", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  Serverless:   { icon: "serverless",  color: "#fd5750" },
  Django:       { icon: "django",      color: "#092e20" },
  FastAPI:      { icon: "fastapi",     color: "#009688" },
};

export const TechBadge = ({ name }: { name: string; colorClass?: string }) => {
  const meta = TECH_ICONS[name];
  const iconUrl = meta?.url
    ? meta.url
    : meta
      ? `https://cdn.simpleicons.org/${meta.icon}/${meta.color.replace("#", "")}`
      : null;

  return (
    <span
      className="group/badge inline-flex items-center gap-2 text-[13px] font-medium px-3 py-1.5 rounded-lg bg-(--bg-tertiary) border border-(--border-color) text-(--text-secondary) transition-all duration-200 ease-out hover:text-(--text-primary) hover:border-(--text-muted) hover:shadow-sm cursor-default hover:scale-[1.04] active:scale-[0.98]"
      style={{ "--badge-accent": meta?.color ?? "currentColor" } as React.CSSProperties}
    >
      {iconUrl && (
        <img
          src={iconUrl}
          alt={name}
          width={14}
          height={14}
          className="opacity-60 group-hover/badge:opacity-100 transition-opacity duration-200"
        />
      )}
      <span>{name}</span>
    </span>
  );
};
