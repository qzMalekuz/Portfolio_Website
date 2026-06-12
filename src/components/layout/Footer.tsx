import React from "react";

export const Footer = () => (
  <footer className="safe-bottom mx-auto w-full max-w-5xl px-5 pb-28 sm:px-8 md:px-12 md:pr-24 lg:px-16 lg:pr-28">
    <div className="pt-12 flex flex-col items-center gap-6 border-t border-(--border-color)">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-(--text-muted) sm:gap-6">
        <a href="mailto:zafarrworks@gmail.com" className="hover:text-(--text-primary) transition-colors hover-wavy">Email</a>
        <a href="https://github.com/qzMalekuz" target="_blank" rel="noopener noreferrer" className="hover:text-(--text-primary) transition-colors hover-wavy">GitHub</a>
        <a href="https://x.com/qzmalekuz" target="_blank" rel="noopener noreferrer" className="hover:text-(--text-primary) transition-colors hover-wavy">Twitter</a>
        <a href="https://www.linkedin.com/in/qzmalekuz" target="_blank" rel="noopener noreferrer" className="hover:text-(--text-primary) transition-colors hover-wavy">LinkedIn</a>
      </div>
      <div className="flex flex-col items-center text-[11px] text-(--text-muted) gap-1">
        <span className="flex items-center gap-1">
          Design & Developed by{" "}
          <span className="font-medium text-(--text-primary)">zafarr.</span>
        </span>
        <span className="opacity-60">© {new Date().getFullYear()}. All rights reserved.</span>
      </div>
    </div>
  </footer>
);
