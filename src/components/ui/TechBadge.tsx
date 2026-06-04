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
  Django:       { icon: "django",      color: "#44b78b" },
  FastAPI:      { icon: "fastapi",     color: "#009688" },
  Framer:       { icon: "framer",      color: "#0055ff" },
  Expo:         { icon: "expo",        color: "#666666" },
  JavaScript:   { icon: "javascript",  color: "#f7df1e" },
  "Socket.io":  { icon: "socketdotio", color: "#010101" },
  "Matter.js":  { icon: "matterdotjs", color: "#4b5562" },
  Jupyter:      { icon: "jupyter",     color: "#f37626" },
  Vite:         { icon: "vite",        color: "#646cff" },
  Web3:         { icon: "web3dotjs",   color: "#f16822" },
};

export const TechBadge = ({
  name,
  size = "md",
}: {
  name: string;
  colorClass?: string;
  /** `sm` matches the compact overview-card badges; `md` is the detail-page size. */
  size?: "sm" | "md";
}) => {
  const meta = TECH_ICONS[name];
  const iconUrl = meta?.url
    ? meta.url
    : meta
      ? `https://cdn.simpleicons.org/${meta.icon}/${meta.color.replace("#", "")}`
      : null;

  const sizeClass =
    size === "sm"
      ? "gap-1.5 text-[11px] px-2.5 py-1 rounded"
      : "gap-2 text-[13px] px-3 py-1.5 rounded-lg";
  const iconPx = size === "sm" ? 12 : 14;

  return (
    <span
      className={`group/badge inline-flex items-center font-medium bg-(--bg-tertiary) border border-(--border-color) text-(--text-secondary) transition-all duration-200 ease-out hover:text-(--text-primary) hover:border-(--text-muted) hover:shadow-sm cursor-default hover:scale-[1.04] active:scale-[0.98] ${sizeClass}`}
      style={{ "--badge-accent": meta?.color ?? "currentColor" } as React.CSSProperties}
    >
      {iconUrl && (
        <img
          src={iconUrl}
          alt={name}
          width={iconPx}
          height={iconPx}
          className="opacity-60 group-hover/badge:opacity-100 transition-opacity duration-200"
        />
      )}
      <span>{name}</span>
    </span>
  );
};
