import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ToolbarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

interface FloatingToolbarProps {
  items: ToolbarItem[];
  activeId?: string;
  separator?: number;
}

export const FloatingToolbar = ({
  items,
  activeId,
  separator,
}: FloatingToolbarProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [direction, setDirection] = useState(0);
  const [isVertical, setIsVertical] = useState(() => window.innerWidth >= 768);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateOrientation = () => setIsVertical(mediaQuery.matches);

    updateOrientation();
    mediaQuery.addEventListener("change", updateOrientation);

    return () => mediaQuery.removeEventListener("change", updateOrientation);
  }, []);

  const handleHover = (id: string | null) => {
    if (hoveredId !== null && id !== null) {
      const prevIndex = items.findIndex((item) => item.id === hoveredId);
      const nextIndex = items.findIndex((item) => item.id === id);
      setDirection(nextIndex > prevIndex ? 1 : -1);
    }
    setHoveredId(id);
  };

  const hoveredItem = items.find((item) => item.id === hoveredId);
  const hoveredIndex = items.findIndex((item) => item.id === hoveredId);

  const ITEM_SIZE = 44;
  const GAP = 8;
  const PADDING = 12;
  const SEPARATOR_SIZE = 13;

  const getItemOffset = (index: number) => {
    let offset = PADDING + index * (ITEM_SIZE + GAP);
    if (separator !== undefined && index > separator) {
      offset += SEPARATOR_SIZE;
    }
    return offset;
  };

  const bgOffset = hoveredItem ? getItemOffset(hoveredIndex) : 0;
  const tooltipOffset = hoveredItem ? getItemOffset(hoveredIndex) + ITEM_SIZE / 2 : 0;
  const motionAxis = isVertical ? { y: bgOffset } : { x: bgOffset };
  const tooltipMotionAxis = isVertical ? { y: tooltipOffset } : { x: tooltipOffset };

  return (
    <div
      className={`relative flex items-center rounded-2xl border border-(--border-color) bg-(--bg-secondary)/80 px-3 py-2 shadow-lg backdrop-blur-xl ${
        isVertical ? "flex-col gap-2" : "gap-2"
      }`}
      onMouseLeave={() => setHoveredId(null)}
    >
      <AnimatePresence>
        {hoveredId && (
          <motion.div
            className={`absolute rounded-xl bg-(--bg-tertiary) ${
              isVertical
                ? "left-1/2 top-0 -translate-x-1/2"
                : "left-0 top-1/2 -translate-y-1/2"
            }`}
            style={{ width: ITEM_SIZE, height: ITEM_SIZE }}
            initial={{ opacity: 0, ...motionAxis, scale: 0.95 }}
            animate={{ opacity: 1, ...motionAxis, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </AnimatePresence>

      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          {separator !== undefined && index === separator + 1 && (
            <div
              className={
                isVertical
                  ? "mx-0 h-px w-5 bg-(--border-color)"
                  : "mx-0.5 h-5 w-px bg-(--border-color)"
              }
            />
          )}
          <button
            onClick={(e) => {
              setHoveredId(null);
              item.onClick?.(e);
            }}
            onMouseEnter={() => handleHover(item.id)}
            onTouchEnd={() => setTimeout(() => setHoveredId(null), 300)}
            className={`relative flex items-center justify-center w-11 h-11 rounded-xl transition-colors duration-200 outline-none cursor-pointer active:scale-[0.95] ${
              activeId === item.id
                ? "text-(--text-primary)"
                : "text-(--text-muted) hover:text-(--text-primary)"
            }`}
          >
            <span className="relative z-10">{item.icon}</span>
            {activeId === item.id && (
              <motion.div
                layoutId="active-dot"
                className={`absolute h-1 w-1 rounded-full bg-(--text-primary) ${
                  isVertical ? "-right-0.5" : "-bottom-0.5"
                }`}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        </React.Fragment>
      ))}

      <AnimatePresence>
        {hoveredItem && (
          <motion.div
            key="tooltip"
            className={`absolute z-50 pointer-events-none ${
              isVertical
                ? "right-full top-0 mr-3"
                : "left-0 -top-10"
            }`}
            initial={{
              opacity: 0,
              x: isVertical ? 6 : 0,
              y: isVertical ? 0 : 6,
              scale: 0.95,
              ...tooltipMotionAxis,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              ...tooltipMotionAxis,
            }}
            exit={{
              opacity: 0,
              x: isVertical ? 6 : 0,
              y: isVertical ? 0 : 6,
              scale: 0.95,
              transition: { duration: 0.12 },
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div
              className={`rounded-lg border border-(--border-color) bg-(--bg-secondary) px-2.5 py-1 shadow-lg whitespace-nowrap ${
                isVertical ? "-translate-y-1/2" : "-translate-x-1/2"
              }`}
            >
              <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                <motion.span
                  key={hoveredItem.id}
                  className="block text-[11px] font-medium text-(--text-primary)"
                  custom={direction}
                  initial={{ opacity: 0, y: direction * 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: direction * -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  {hoveredItem.label}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
