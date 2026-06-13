import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "./ProjectCard";

type Category = "fullstack" | "mobile";

interface Project {
  id: string;
  title: string;
  category: Category;
  description: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  downloadApkUrl?: string;
  statusLabel?: string;
  statusUrl?: string;
  image?: string;
  video?: string;
  imageFit?: "cover" | "contain";
  showInGrid?: boolean;
}

const TABS: { key: Category; label: string }[] = [
  { key: "fullstack", label: "FullStack Projects" },
  { key: "mobile", label: "Mobile Projects" },
];

/**
 * One segment of the category toggle. The whole control reads as a single
 * physical switch: both options live inside one pill-shaped track, and a
 * "thumb" (an animated `layoutId` highlight) slides behind whichever option is
 * active. The thumb uses the portfolio's own selected-state language — the
 * neutral ink/paper inversion (`bg-(--text-primary)` / `text-(--bg-primary)`),
 * same as the floating nav and the "Visit Website" button — rather than a
 * saturated accent. The inactive option stays muted but clearly tappable.
 */
const ProjectTab = ({
  tab,
  active,
  onClick,
}: {
  tab: { key: Category; label: string };
  active: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    role="tab"
    aria-selected={active}
    onClick={onClick}
    className={`relative inline-flex flex-1 items-center justify-center rounded-full px-4 py-2 text-[11px] font-bold tracking-[0.16em] uppercase transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--text-muted) sm:flex-none sm:px-5 ${
      active
        ? "cursor-default text-(--bg-primary)"
        : "cursor-pointer text-(--text-secondary) hover:text-(--text-primary)"
    }`}
  >
    {active && (
      <motion.span
        layoutId="project-tab-thumb"
        className="absolute inset-0 rounded-full bg-(--text-primary) shadow-sm"
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
      />
    )}
    <span className="relative z-10 whitespace-nowrap">{tab.label}</span>
  </button>
);

/**
 * The Projects section header is a two-state toggle: FullStack sits flush-left
 * where the "PROJECTS" eyebrow used to be and Mobile is anchored to the far right
 * of the same rule, with a blue squiggle underline marking the active one.
 * Selecting a category crossfades and slides the project list — full-stack
 * projects lead with text on the left, mobile projects flip to image-on-left —
 * so the layout swap itself signals the change.
 */
export const ProjectsSection = ({
  projects,
  active,
  onActiveChange,
  onProjectClick,
}: {
  projects: Project[];
  active: Category;
  onActiveChange: (category: Category) => void;
  onProjectClick: (id: string, e: React.MouseEvent) => void;
}) => {
  const visible = projects.filter(
    (p) => p.category === active && !(p.showInGrid === false),
  );
  const reversed = active === "mobile";
  // Mobile sits to the right of full-stack, so moving to it slides content left.
  const direction = active === "mobile" ? 1 : -1;

  return (
    <div>
      {/* Toggle header — a single pill-shaped switch holding both categories,
          centered between two rules so it reads as the obvious control on this
          section. A blue thumb slides behind the active option. */}
      <div className="mb-8 flex items-center gap-4">
        <div className="hidden h-px grow bg-(--border-color) sm:block" />

        <div
          role="tablist"
          aria-label="Project category"
          className="flex w-full gap-1 rounded-full border border-(--border-color) bg-(--bg-secondary) p-1 shadow-sm sm:w-auto"
        >
          {TABS.map((tab) => (
            <ProjectTab
              key={tab.key}
              tab={tab}
              active={active === tab.key}
              onClick={() => onActiveChange(tab.key)}
            />
          ))}
        </div>

        <div className="hidden h-px grow bg-(--border-color) sm:block" />
      </div>

      {/* Animated project list — crossfade + directional slide on category change */}
      <div className="relative">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            variants={{
              enter: (dir: number) => ({ opacity: 0, x: dir * 48 }),
              center: { opacity: 1, x: 0 },
              exit: (dir: number) => ({ opacity: 0, x: dir * -48 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.32,
              ease: [0.32, 0.72, 0, 1],
            }}
            className="flex flex-col"
          >
            {visible.length === 0 ? (
              <div className="flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-(--border-color) py-16 text-center">
                <p className="max-w-sm px-6 text-[14px] leading-relaxed text-(--text-muted)">
                  More mobile projects coming soon.
                </p>
              </div>
            ) : (
              visible.map((project, i) => (
                <div key={project.id}>
                  {i > 0 && (
                    <div className="my-10 h-px w-full bg-(--border-color)" />
                  )}
                  <ProjectCard
                    {...project}
                    index={i + 1}
                    reversed={reversed}
                    onDetailClick={(e) => onProjectClick(project.id, e)}
                  />
                </div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
