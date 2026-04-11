import React, { useState, useEffect } from "react";
import { SectionMinimal } from "../ui/SectionMinimal";

const avatarUrl = "https://avatars.githubusercontent.com/u/102605563?v=4";
const BIRTHDAY = new Date(2005, 2, 12).getTime(); // March 12, 2005
const MS_PER_YEAR = 365.2425 * 24 * 60 * 60 * 1000;

export const AboutSection = () => {
  const [age, setAge] = useState(() =>
    ((Date.now() - BIRTHDAY) / MS_PER_YEAR).toFixed(9)
  );

  useEffect(() => {
    const id = setInterval(() => {
      setAge(((Date.now() - BIRTHDAY) / MS_PER_YEAR).toFixed(9));
    }, 50);
    return () => clearInterval(id);
  }, []);

  return (
    <SectionMinimal title="About Me" id="about-section">
      <div className="flex flex-col md:flex-row gap-8 items-start pl-1">
        <div className="relative group w-32 h-32 shrink-0 overflow-hidden rounded-xl border border-(--border-color) hover:border-(--text-muted) transition-colors duration-200 ease-out shadow-sm hover:shadow-md bg-(--bg-tertiary)">
          <img
            src={avatarUrl}
            alt="zafarr. Avatar"
            width={128}
            height={128}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out z-10"
          />
          <img
            src={avatarUrl}
            alt="zafarr. Avatar"
            width={128}
            height={128}
            className="w-full h-full object-cover transition-transform duration-300 ease-out scale-100 group-hover:scale-[1.03] filter grayscale"
          />
        </div>
        <div>
          <div className="flex items-baseline gap-3 mb-1">
            <h3 className="text-lg font-medium text-(--text-primary)">
              zafarr.
            </h3>
            <span className="text-[13px] font-mono text-(--text-muted) tabular-nums tracking-tight">
              {age}
              <span className="text-[11px] ml-1 opacity-60">years</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[13px] text-(--text-highlight) font-medium mb-4">
            <span>Remote</span>
            <span className="opacity-40">•</span>
            <div className="h-4.5 overflow-hidden inline-flex flex-col relative top-[0.5px]">
              <div className="animate-flip-3 leading-4.5">
                <span className="block h-4.5">Open Source Contributor</span>
                <span className="block h-4.5">Full-Stack Developer</span>
                <span className="block h-4.5">Freelancer</span>
                <span className="block h-4.5">Open Source Contributor</span>
              </div>
            </div>
          </div>
          <p className="text-(--text-secondary) text-[15px] leading-relaxed mb-4 max-w-lg">
            I build things for the internet — sometimes serious, sometimes less.
            If not shipping, Probably lifting heavy.
          </p>
        </div>
      </div>
    </SectionMinimal>
  );
};
