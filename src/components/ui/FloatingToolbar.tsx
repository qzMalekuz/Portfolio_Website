import React, { useState } from "react";
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

  return (
    <div
      className="relative flex flex-col items-center gap-2 rounded-2xl border border-(--border-color) bg-(--bg-secondary)/80 px-3 py-2 shadow-lg backdrop-blur-xl"
      onMouseLeave={() => setHoveredId(null)}
    >
      <AnimatePresence>
        {hoveredId && (
          <motion.div
            className="absolute left-1/2 top-0 -translate-x-1/2 rounded-xl bg-(--bg-tertiary)"
            style={{ width: ITEM_SIZE, height: ITEM_SIZE }}
            initial={{ opacity: 0, y: bgOffset, scale: 0.95 }}
            animate={{ opacity: 1, y: bgOffset, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </AnimatePresence>

      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          {separator !== undefined && index === separator + 1 && (
            <div className="mx-0 h-px w-5 bg-(--border-color)" />
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
                className="absolute -right-0.5 h-1 w-1 rounded-full bg-(--text-primary)"
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
            className="absolute right-full top-0 z-50 mr-3 pointer-events-none"
            initial={{
              opacity: 0,
              x: 6,
              scale: 0.95,
              y: tooltipOffset,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              y: tooltipOffset,
            }}
            exit={{
              opacity: 0,
              x: 6,
              scale: 0.95,
              transition: { duration: 0.12 },
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="translate-y-1 rounded-lg border border-(--border-color) bg-(--bg-secondary) px-2.5 py-1 shadow-lg whitespace-nowrap">
            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
              <motion.span
                key={hoveredItem.id}
                className="text-[11px] font-medium text-(--text-primary) block"
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
