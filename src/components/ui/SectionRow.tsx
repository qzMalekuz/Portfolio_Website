import React from "react";

/**
 * Single-column section with a labelled divider header: a small uppercase label
 * sits flush-left on a horizontal rule that stretches out to the right edge, and
 * the content flows full-width directly below — all sharing one consistent left
 * edge. Inspired by the stacked, flush-left layout pattern for clean alignment
 * down the page.
 *
 * The `prominent` variant turns the small label into a chapter heading: an
 * accent-marked eyebrow centered above a large title that itself sits centered
 * on a rule running out to both edges, so transitions between major groups
 * (Projects → Open Source → Hackathons) read as distinct sections rather than
 * blending into the per-card dividers within them.
 */
export const SectionRow = ({
  children,
  title,
  id,
  variant = "default",
}: {
  children: React.ReactNode;
  title: string;
  id?: string;
  variant?: "default" | "prominent";
}) => (
  <section id={id} className="scroll-mt-24">
    {variant === "prominent" ? (
      <div className="mb-10">
        <div className="mb-5 flex items-center justify-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-(--text-highlight)" />
          <span className="text-[11px] font-bold tracking-[0.2em] text-(--text-muted) uppercase">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-5">
          <div className="h-px grow bg-(--border-color)" />
          <h2 className="shrink-0 text-2xl font-bold tracking-tight text-(--text-primary) sm:text-3xl">
            {title}
          </h2>
          <div className="h-px grow bg-(--border-color)" />
        </div>
      </div>
    ) : (
      <div className="mb-7 flex items-center gap-4">
        <h2 className="shrink-0 text-[11px] font-bold tracking-[0.2em] text-(--text-muted) uppercase transition-colors duration-200 ease-out">
          {title}
        </h2>
        <div className="h-px grow bg-(--border-color)" />
      </div>
    )}
    <div className="min-w-0">{children}</div>
  </section>
);
