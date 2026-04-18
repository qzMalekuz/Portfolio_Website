import React from "react";
import { LayersIcon, GitHubIcon, ExternalLinkIcon } from "../Icons";

const iconBtnClass = "inline-flex items-center justify-center text-(--bg-primary) bg-(--text-primary) p-1 rounded-md hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-color) *:w-3.5 *:h-3.5";

export const ProjectCard = ({
  id,
  title,
  description,
  tech,
  githubUrl,
  liveUrl,
  downloadApkUrl,
  image,
  onDetailClick,
}: {
  id: string;
  title: string;
  description: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  downloadApkUrl?: string;
  image?: string;
  onDetailClick?: (e: React.MouseEvent) => void;
}) => {
  return (
    <div
      className="group relative bg-(--bg-secondary) rounded-2xl border border-(--border-color) hover:border-(--text-muted) transition-all duration-300 ease-out overflow-hidden shadow-sm hover:shadow-md flex flex-col h-full cursor-pointer"
      onClick={onDetailClick}
    >
      {image ? (
        <div className="w-full h-48 overflow-hidden relative shrink-0">
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
          />
        </div>
      ) : (
        <div className="w-full h-48 bg-(--bg-tertiary) border-b border-(--border-color) flex items-center justify-center shrink-0">
          <div className="text-(--text-muted) opacity-50">
            <LayersIcon />
          </div>
        </div>
      )}

      <div className="p-6 flex flex-col grow">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-lg font-semibold text-(--text-primary) tracking-tight group-hover:text-(--text-highlight) transition-colors duration-200 ease-out mr-auto">
            {title}
          </h3>
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={iconBtnClass}
              aria-label="Live Site"
            >
              <ExternalLinkIcon />
            </a>
          )}
          {downloadApkUrl && (
            <a
              href={downloadApkUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={iconBtnClass}
              aria-label="Download APK"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={iconBtnClass}
              aria-label="GitHub Repository"
            >
              <GitHubIcon />
            </a>
          )}
        </div>

        <p className="text-(--text-secondary) text-sm leading-relaxed mb-6 grow">
          {description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {tech.map((t) => (
            <span
              key={t}
              className="text-[11px] font-medium text-(--text-secondary) bg-(--bg-tertiary) px-2 py-0.5 rounded border border-(--border-color)"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
