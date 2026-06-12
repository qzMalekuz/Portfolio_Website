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
 * One category toggle. Keeps a fixed slot on the header rule. The active tab's
 * label brightens to primary and carries a permanently revealed blue squiggle
 * (`hover-wavy` + `tab-active`). The inactive tab reads as a clear "go here"
 * affordance: a brighter (secondary) label, a trailing arrow that nudges right
 * on hover, and a faint, continuously flowing blue squiggle (`tab-attn`) that
 * draws the eye and brightens to full on hover.
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
    aria-pressed={active}
    onClick={onClick}
    className={`group/tab hover-wavy${active ? " tab-active" : " tab-attn"} relative inline-flex shrink-0 items-center gap-1.5 px-1 py-1.5 text-[11px] font-bold tracking-[0.18em] uppercase transition-colors duration-200 ease-out focus-visible:outline-none ${
      active
        ? "cursor-default text-(--text-primary)"
        : "cursor-pointer text-(--text-secondary) hover:text-(--text-primary)"
    }`}
  >
    <span className="relative z-10">{tab.label}</span>
    {!active && (
      <span
        aria-hidden="true"
        className="relative z-10 text-[13px] leading-none transition-transform duration-200 ease-out group-hover/tab:translate-x-0.5"
      >
        →
      </span>
    )}
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
      {/* Toggle header — FullStack fixed left, Mobile fixed right, sharing one
          rule. A blue squiggle underline marks the active tab. */}
      <div className="mb-7 flex items-center gap-4">
        <ProjectTab
          tab={TABS[0]}
          active={active === TABS[0].key}
          onClick={() => onActiveChange(TABS[0].key)}
        />

        <div className="h-px grow bg-(--border-color)" />

        <ProjectTab
          tab={TABS[1]}
          active={active === TABS[1].key}
          onClick={() => onActiveChange(TABS[1].key)}
        />
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
