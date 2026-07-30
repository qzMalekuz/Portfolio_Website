import React from "react";
import awsBedrockIcon from "../../assets/aws-bedrock.svg";

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
  Celery:       { icon: "celery",      color: "#37814a" },
  Redis:        { icon: "redis",       color: "#ff4438" },
  FastAPI:      { icon: "fastapi",     color: "#009688" },
  Framer:       { icon: "framer",      color: "#0055ff" },
  Expo:         { icon: "expo",        color: "#666666" },
  JavaScript:   { icon: "javascript",  color: "#f7df1e" },
  "Socket.io":  { icon: "socketdotio", color: "#010101" },
  "Matter.js":  { icon: "matterdotjs", color: "#4b5562" },
  Jupyter:      { icon: "jupyter",     color: "#f37626" },
  Vite:         { icon: "vite",        color: "#646cff" },
  Web3:         { icon: "web3dotjs",   color: "#f16822" },
  "TanStack Query": { icon: "reactquery", color: "#ff4154" },
  Auth0:        { icon: "auth0",       color: "#eb5424" },
  Xcode:        { icon: "xcode",       color: "#147efb" },
  Swift:        { icon: "swift",       color: "#f05138" },
  SuperMemory:  { icon: "supermemory", color: "#ffffff", url: "https://avatars.githubusercontent.com/u/171979587?v=4&s=40" },
  RevenueCat:   { icon: "revenuecat",  color: "#f25a5a" },
  "pi SDK":     { icon: "pi",          color: "#ffffff", url: "https://avatars.githubusercontent.com/u/173290518?v=4&s=40" },
  "AWS Bedrock":  { icon: "awsbedrock",  color: "#ff9900", url: awsBedrockIcon },
  OpenRouter:   { icon: "openrouter",  color: "#8b5cf6" },
  "Dodo Payments": { icon: "dodopayments", color: "#ffffff" },
};

/**
 * Brand colors that are white (or near-white/black) are invisible against the
 * light-mode badge surface. For those we drop the baked-in color and let the
 * icon inherit a theme-aware neutral tone instead (dark in light mode, light in
 * dark mode), so monochrome logos stay legible in both themes.
 */
const isNeutralBrandColor = (hex: string) => {
  const c = hex.replace("#", "").toLowerCase();
  return c === "ffffff" || c === "fff" || c === "000000" || c === "000" || c === "010101";
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

  // Full-color brand logos (avatars, local SVGs) come from an explicit `url` and
  // are rendered as a plain <img>. Single-color simpleicons are rendered as a
  // CSS mask so their tint can follow the theme when the brand color is neutral.
  const customUrl = meta?.url ?? null;
  const useNeutralTone = meta ? isNeutralBrandColor(meta.color) : false;
  const maskUrl =
    meta && !customUrl ? `https://cdn.simpleicons.org/${meta.icon}` : null;

  const sizeClass =
    size === "sm"
      ? "gap-1 text-[11px] px-2 py-1 rounded"
      : "gap-1.5 text-[12px] px-2.5 py-1 rounded-lg";
  const iconPx = size === "sm" ? 12 : 14;

  return (
    <span
      className={`group/badge inline-flex items-center font-medium bg-(--bg-tertiary) border border-(--border-color) text-(--text-secondary) transition-all duration-200 ease-out hover:text-(--text-primary) hover:border-(--text-muted) hover:shadow-sm cursor-default hover:scale-[1.04] active:scale-[0.98] ${sizeClass}`}
      style={{ "--badge-accent": meta?.color ?? "currentColor" } as React.CSSProperties}
    >
      {customUrl ? (
        <img
          src={customUrl}
          alt={name}
          width={iconPx}
          height={iconPx}
          className="rounded-[3px] opacity-70 group-hover/badge:opacity-100 transition-opacity duration-200"
        />
      ) : (
        maskUrl && (
          <span
            aria-hidden
            className="shrink-0 opacity-60 group-hover/badge:opacity-100 transition-opacity duration-200"
            style={{
              width: iconPx,
              height: iconPx,
              // Neutral brand colors follow the theme text tone; everything else
              // keeps its own brand color via the mask.
              backgroundColor: useNeutralTone
                ? "var(--text-secondary)"
                : meta!.color,
              WebkitMaskImage: `url(${maskUrl})`,
              maskImage: `url(${maskUrl})`,
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
            }}
          />
        )
      )}
      <span>{name}</span>
    </span>
  );
};
