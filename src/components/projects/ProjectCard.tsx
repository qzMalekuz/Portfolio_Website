import React from "react";
import { LayersIcon, GitHubIcon, ExternalLinkIcon } from "../Icons";

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
        <div className="flex items-center justify-between mb-3 gap-4">
          <h3 className="text-lg font-semibold text-(--text-primary) tracking-tight group-hover:text-(--text-highlight) transition-colors duration-200 ease-out min-w-0">
            {title}
          </h3>
          <div className="flex gap-2 shrink-0 items-center">
            {downloadApkUrl && (
              <a
                href={downloadApkUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-[11px] font-bold text-(--bg-primary) bg-(--text-primary) px-2.5 py-1 rounded-[6px] hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-color)"
                aria-label="Download APK"
              >
                <span>APK</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-[11px] font-bold text-(--bg-primary) bg-(--text-primary) px-2.5 py-1 rounded-[6px] hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-color)"
                aria-label="Live Site"
              >
                <span>Live</span>
                <span className="*:w-3 *:h-3 flex items-center justify-center"><ExternalLinkIcon /></span>
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-(--text-muted) hover:text-(--text-primary) transition-colors duration-200 ease-out p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-color) rounded"
                aria-label="GitHub Repository"
              >
                <GitHubIcon />
              </a>
            )}
          </div>
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
