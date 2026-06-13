import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface HeaderItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

interface SiteHeaderProps {
  items: HeaderItem[];
  activeId?: string;
  /** Navigate home when the wordmark is clicked. */
  onBrandClick?: (e: React.MouseEvent) => void;
  separator?: number;
}

/**
 * A single sticky header that lives across the top of every page: the "zafarr."
 * wordmark on the left and the nav icon buttons on the right — no capsule, the
 * buttons sit bare on the page.
 *
 * The wordmark runs the same flip animation as the hero (zafarr. ⇄ qzmalekuz),
 * just at a smaller scale. The bar condenses as you scroll: at the very top it's
 * transparent and roomy so it reads as part of the hero; once scrolled it
 * smoothly gains a blurred backdrop and bottom border and tightens its padding.
 * All transitions are CSS/spring-driven so the shrink feels continuous.
 */
export const SiteHeader = ({
  items,
  activeId,
  onBrandClick,
  separator,
}: SiteHeaderProps) => {
  const [scrolled, setScrolled] = useState(false);

  // Track scroll state with a rAF guard and only flip React state on an actual
  // change. A naive `setScrolled` on every scroll tick re-renders the tree each
  // frame, which restarts className transitions and visibly fights the running
  // CSS flip animation.
  useEffect(() => {
    let ticking = false;
    let last = false;

    const evaluate = () => {
      ticking = false;
      const next = window.scrollY > 24;
      if (next !== last) {
        last = next;
        setScrolled(next);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(evaluate);
      }
    };

    last = window.scrollY > 24;
    setScrolled(last);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        scrolled
          ? "border-b border-(--border-color) bg-(--bg-primary)/80 shadow-sm backdrop-blur-xl supports-backdrop-filter:bg-(--bg-primary)/70"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-5xl items-center justify-between px-5 transition-[padding] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] sm:px-8 md:px-12 lg:px-16 ${
          scrolled ? "py-2.5" : "pt-7 pb-3 sm:pt-8"
        }`}
      >
        {/* Brand wordmark — the single page name, running the flip animation
            (zafarr. ⇄ qzmalekuz). Large at rest so it reads as the hero title,
            shrinking on scroll.

            CRITICAL: the flip column's geometry must NEVER change while it
            animates. The keyframe (.animate-flip in index.css) steps in exact
            pixels (0 → -50px → -100px) tuned to a fixed 50px (h-12.5) line, so
            the flip must always stay h-12.5 / text-4xl. The scroll "shrink" is
            therefore done with a separate GPU-composited `scale` transform on
            the wrapper below — it scales the already-rasterized name without
            reflowing it or touching the flip's pixel math, so the flip stays
            buttery even mid-scroll. The outer box's height animates on its own
            so the bar still physically collapses. */}
        <a
          href="/"
          onClick={onBrandClick}
          aria-label="zafarr — home"
          className="flex items-center font-bold tracking-tight text-(--text-primary) transition-colors hover:text-(--text-highlight)"
        >
          {/* Layout box: collapses height with the bar; clips the scaled name. */}
          <span
            className={`flex items-center overflow-hidden transition-[height] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              scrolled ? "h-7" : "h-12.5"
            }`}
          >
            {/* Scale layer: shrinks the constant-size flip. 0.56 ≈ 28/50, i.e.
                h-7 / h-12.5, so the scaled height matches the box. */}
            <span
              className={`flex origin-left transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform ${
                scrolled ? "scale-[0.56]" : "scale-100"
              }`}
            >
              {/* Flip column — fixed geometry, the only thing that animates. */}
              <span className="animate-flip flex h-12.5 flex-col text-4xl leading-12.5">
                <span className="block h-12.5">zafarr.</span>
                <span className="block h-12.5 text-(--text-muted)">qzmalekuz</span>
                <span className="block h-12.5">zafarr.</span>
              </span>
            </span>
          </span>
        </a>

        {/* Nav buttons — bare, no capsule. */}
        <nav className="flex items-center gap-1 sm:gap-1.5">
          {items.map((item, index) => (
            <React.Fragment key={item.id}>
              {separator !== undefined && index === separator + 1 && (
                <div className="mx-1 h-5 w-px bg-(--border-color)" />
              )}
              <button
                type="button"
                onClick={item.onClick}
                aria-label={item.label}
                title={item.label}
                className={`relative flex h-10 w-10 items-center justify-center rounded-xl outline-none transition-colors duration-200 active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-(--border-color) ${
                  activeId === item.id
                    ? "text-(--text-primary)"
                    : "text-(--text-muted) hover:bg-(--bg-tertiary)/60 hover:text-(--text-primary)"
                }`}
              >
                <span className="relative z-10">{item.icon}</span>
                {activeId === item.id && (
                  <motion.span
                    layoutId="header-active-dot"
                    className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-(--text-primary)"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            </React.Fragment>
          ))}
        </nav>
      </div>
    </header>
  );
};
