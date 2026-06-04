import React from "react";
import { LayersIcon, GitHubIcon, GlobeIcon, DownloadIcon } from "../Icons";
import { TechBadge } from "../ui/TechBadge";

const inlineLinkClass =
  "group/link inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.15em] uppercase text-(--text-muted) hover:text-(--text-primary) transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-color) rounded";

/**
 * A single project rendered as a full-width horizontal row: an index number,
 * inline action links, title, description and tech badges fill the left column,
 * with a large preview image on the right. Stacks vertically on small screens.
 * Clicking anywhere on the row (outside the explicit links) opens the project
 * detail view.
 */
export const ProjectCard = ({
  index,
  title,
  description,
  tech,
  githubUrl,
  liveUrl,
  downloadApkUrl,
  image,
  onDetailClick,
}: {
  index?: number;
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
      className="group grid grid-cols-1 gap-6 cursor-pointer md:grid-cols-2 md:gap-10 lg:gap-14"
      onClick={onDetailClick}
    >
      {/* Left column — meta, title, description, badges */}
      <div className="flex flex-col">
        <div className="mb-4 flex items-center gap-4">
          {index != null && (
            <span className="text-[13px] font-mono tabular-nums text-(--text-muted)">
              {String(index).padStart(2, "0")}
            </span>
          )}
          <div className="ml-auto flex items-center gap-5">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={inlineLinkClass}
                aria-label="Live Site"
              >
                <GlobeIcon />
              </a>
            )}
            {downloadApkUrl && (
              <a
                href={downloadApkUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={inlineLinkClass}
                aria-label="Download APK"
              >
                <DownloadIcon />
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={inlineLinkClass}
                aria-label="GitHub Repository"
              >
                <GitHubIcon />
              </a>
            )}
          </div>
        </div>

        <h3 className="mb-4 text-2xl font-bold tracking-tight text-(--text-primary) transition-colors duration-200 ease-out group-hover:text-(--text-highlight) sm:text-3xl">
          {title}
        </h3>

        <p className="mb-6 max-w-md text-[15px] leading-relaxed text-(--text-secondary)">
          {description}
        </p>

        <div className="mt-auto flex flex-wrap gap-2">
          {tech.map((t) => (
            <TechBadge key={t} name={t} size="sm" />
          ))}
        </div>
      </div>

      {/* Right column — preview image */}
      <div className="overflow-hidden rounded-2xl border border-(--border-color) bg-(--bg-secondary) shadow-sm transition-all duration-300 ease-out group-hover:border-(--text-muted) group-hover:shadow-md">
        {image ? (
          <div className="relative aspect-16/10 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
            />
          </div>
        ) : (
          <div className="flex aspect-16/10 items-center justify-center bg-(--bg-tertiary)">
            <div className="text-(--text-muted) opacity-50">
              <LayersIcon />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
