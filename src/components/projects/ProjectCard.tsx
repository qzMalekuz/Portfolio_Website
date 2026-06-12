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
  statusLabel,
  statusUrl,
  image,
  video,
  imageFit = "cover",
  reversed = false,
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
  /** Optional subtle status text shown beside the links (e.g. "Live on Apple Store", "Coming Soon"). */
  statusLabel?: string;
  /** Optional URL the status label links to (e.g. an App Store listing). Falls back to `liveUrl`. */
  statusUrl?: string;
  image?: string;
  /** Optional looping preview video for the banner. Takes precedence over `image`. */
  video?: string;
  imageFit?: "cover" | "contain";
  /** When true, the preview image sits on the left and text on the right (used for mobile projects). */
  reversed?: boolean;
  onDetailClick?: (e: React.MouseEvent) => void;
}) => {
  // The status label (and the standalone globe link) point at the store/live
  // listing — prefer an explicit `statusUrl`, falling back to `liveUrl`.
  const statusHref = statusUrl ?? liveUrl;

  return (
    <div
      className="group grid grid-cols-1 gap-6 cursor-pointer md:grid-cols-2 md:gap-10 lg:gap-14"
      onClick={onDetailClick}
    >
      {/* Text column — meta, title, description, badges. On reversed layouts it
          moves to the second grid column on md+ so the image leads on the left. */}
      <div className={`flex flex-col ${reversed ? "md:order-2" : ""}`}>
        <div className="mb-4 flex items-center gap-4">
          {index != null && (
            <span className="text-[13px] font-mono tabular-nums text-(--text-muted)">
              {String(index).padStart(2, "0")}
            </span>
          )}
          <div className="ml-auto flex items-center gap-5">
            {statusLabel &&
              (statusHref ? (
                <a
                  href={statusHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-[10px] font-bold uppercase tracking-[0.15em] text-(--text-muted) hover:text-(--text-primary) transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-color) rounded"
                  aria-label={statusLabel}
                >
                  {statusLabel}
                </a>
              ) : (
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-(--text-muted)">
                  {statusLabel}
                </span>
              ))}
            {statusHref && !statusLabel && (
              <a
                href={statusHref}
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

        <div className="mt-auto flex flex-wrap gap-1.5">
          {tech.map((t) => (
            <TechBadge key={t} name={t} size="sm" />
          ))}
        </div>
      </div>

      {/* Image column — preview. On reversed layouts it leads in the first grid
          column on md+. The card is a flex column and the media wrapper grows to
          fill it: the grid stretches this column to match the (often taller) text
          column, so without `grow` the media would sit at its 16:10 height and
          leave a strip of card background showing below it. `min-h` keeps the
          16:10 floor on small screens where the card isn't stretched. */}
      <div className={`flex flex-col overflow-hidden rounded-2xl border border-(--border-color) bg-(--bg-secondary) shadow-sm transition-all duration-300 ease-out group-hover:border-(--text-muted) group-hover:shadow-md ${reversed ? "md:order-1" : ""}`}>
        {video ? (
          <div className="relative grow aspect-16/10 overflow-hidden">
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
            />
          </div>
        ) : image ? (
          // `contain` images must never be cropped, so the box holds a strict
          // 16:10 (no `grow` stretching it taller than the source, which would
          // force `object-cover`-style cropping or black letterbox bars). The
          // card's own background fills any residual strip when the text column
          // is taller. `cover` images still `grow` to fill the stretched card.
          <div
            className={`relative w-full aspect-16/10 overflow-hidden ${
              imageFit === "contain" ? "bg-(--bg-secondary)" : "grow"
            }`}
          >
            <img
              src={image}
              alt={title}
              className={`absolute inset-0 h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04] ${
                imageFit === "contain" ? "object-contain" : "object-cover"
              }`}
            />
          </div>
        ) : (
          <div className="flex grow aspect-16/10 items-center justify-center bg-(--bg-tertiary)">
            <div className="text-(--text-muted) opacity-50">
              <LayersIcon />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
