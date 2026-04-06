import { useEffect } from "react";

export function PremiumBackground() {
  useEffect(() => {
    let ticking = false;

    const updateGridOffset = () => {
      const offset = window.scrollY * 0.08;
      document.documentElement.style.setProperty(
        "--premium-grid-offset-y",
        `${offset}px`,
      );
      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateGridOffset);
    };

    updateGridOffset();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.style.removeProperty("--premium-grid-offset-y");
    };
  }, []);

  return (
    <div className="premium-background" aria-hidden="true">
      <div className="premium-background__base" />
      <div className="premium-background__glows">
        <span className="premium-background__blob premium-background__blob--violet" />
        <span className="premium-background__blob premium-background__blob--indigo" />
        <span className="premium-background__blob premium-background__blob--cyan" />
        <span className="premium-background__blob premium-background__blob--pink" />
      </div>
      <div className="premium-background__grain" />
    </div>
  );
}
