import { GitHubCalendar } from 'react-github-calendar';
import { useState, useEffect } from "react";
import "./index.css";

import chatLoBanner from "./assets/chatLo_banner.png";
import appointmentBanner from "./assets/appointment.png";
import talkamoreWebVideo from "./assets/talkamore-web.mp4";
import talkamoreWebBanner from "./assets/talkamore_banner.png";
import talkamoreMobileBanner from "./assets/talkamore_banner_mobile.png";
import chatRecording from "./assets/chat-screen-recording.mp4";
import appointmentRecording from "./assets/appointment-screen-recording.mp4";
import icebreakerRecording from "./assets/icebreaker-demo-video2.mp4";
import solPinBanner from "./assets/solPin_banner.png";
import monolithBanner from "./assets/monolith_banner.png";
// import colosseumFrontierBanner from "./assets/colosseum_frontier.png";
import kraneAppsLogo from "./assets/krane-apps.png";
import talkamoreLogo from "./assets/talkamore.png";
import stealthLogo from "./assets/stealth-startup.svg";
import kodezillaBanner from "./assets/kodezilla-banner.png";
import kodezillaRecording from "./assets/kodezilla-recording.mov";
import playtoBanner from "./assets/playto_banner.png";
import lunaBanner from "./assets/luna_banner.png";
import nearmeBanner from "./assets/nearme_banner.png";
import fullstackResumePdf from "./assets/JUNE_RESUME_FS.pdf";
import mobileResumePdf from "./assets/JUNE_RESUME_MOBILE.pdf";
import testspriteBanner from "./assets/testsprite_banner.png";
import screenshot1 from "./assets/screenshot1.png";
import screenshot2 from "./assets/screenshot2.png";
import screenshot3 from "./assets/screenshot3.png";
import screenshot4 from "./assets/screenshot4.png";

import {
  SunIcon,
  MoonIcon,
  HomeIcon,
  UserIcon,
  LayersIcon,
  GitHubIcon,
  ExternalLinkIcon,
  MailIcon,
  TwitterIcon,
  LinkedInIcon,
  CopyIcon,
  CheckIcon,
  DownloadIcon,
  FileTextIcon,
  CloseIcon,
  ChevronDownIcon,
} from "./components/Icons";
import { SectionMinimal } from "./components/ui/SectionMinimal";
import { SectionRow } from "./components/ui/SectionRow";
import { ExperienceItem } from "./components/ui/ExperienceItem";
import { TechBadge } from "./components/ui/TechBadge";
import { ProjectsSection } from "./components/projects/ProjectsSection";
import { AboutSection } from "./components/about/AboutSection";
import { Footer } from "./components/layout/Footer";
import { SiteHeader } from "./components/ui/SiteHeader";
import { PremiumBackground } from "./components/ui/PremiumBackground";
import { DinoGame } from "./components/ui/DinoGame";

// Height the fixed SiteHeader occupies once condensed (the state it's in while
// you scroll to an anchor). Anchored sections are scrolled to with this offset
// subtracted so they land just below the bar instead of under it.
const HEADER_OFFSET = 72;

// Keyword highlight inside experience bullets — same emphasis as the hero copy.
const Hl = ({ children }: { children: React.ReactNode }) => (
  <span className="font-medium text-(--text-primary)">{children}</span>
);

export function App() {
  const [isDark, setIsDark] = useState(true);
  const [copied, setCopied] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [resumeMenuOpen, setResumeMenuOpen] = useState(false);
  const [activeResume, setActiveResume] = useState<"fullstack" | "mobile" | null>(
    null,
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // Which nav target the current scroll position maps to ("home" | "projects").
  // Updated by a scroll-spy on the home page so the active nav button tracks
  // what's actually on screen, not just the last click.
  const [activeSection, setActiveSection] = useState<"home" | "projects">(
    "home",
  );
  // Remember which project category the visitor was viewing so a reload keeps
  // them there. First-time visitors (no stored value) land on "mobile" — it's
  // the primary/default section.
  const [projectCategory, setProjectCategory] = useState<"fullstack" | "mobile">(
    () => {
      const stored = localStorage.getItem("projectCategory");
      return stored === "fullstack" || stored === "mobile" ? stored : "mobile";
    },
  );

  useEffect(() => {
    localStorage.setItem("projectCategory", projectCategory);
  }, [projectCategory]);

  const resumes = {
    fullstack: {
      label: "FullStack Resume",
      pdf: fullstackResumePdf,
      downloadName: "Zafarr-Malekuz-FullStack-Resume.pdf",
    },
    mobile: {
      label: "Mobile Resume",
      pdf: mobileResumePdf,
      downloadName: "Zafarr-Malekuz-Mobile-Resume.pdf",
    },
  } as const;
  const resumeOpen = activeResume !== null;

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Firefox ignores -webkit-user-drag (index.css), so block image drags here too.
  useEffect(() => {
    const onDragStart = (e: DragEvent) => {
      if ((e.target as HTMLElement).tagName === "IMG") e.preventDefault();
    };
    document.addEventListener("dragstart", onDragStart);
    return () => document.removeEventListener("dragstart", onDragStart);
  }, []);

  // Size the GitHub calendar blocks so a full year (~53 weeks) fits without scrolling.
  const githubBlockMargin = windowWidth < 640 ? 2 : 3;
  const githubBlockSize = (() => {
    // The graph lives inside <main class="max-w-5xl ..."> whose horizontal page
    // padding is asymmetric per breakpoint, then a card with its own padding.
    // Mirror those Tailwind values so the available width is computed exactly.
    // [left, right] page padding (px-5 / sm:px-8 / md:px-12 md:pr-24 / lg:px-16 lg:pr-28)
    const [padLeft, padRight] =
      windowWidth >= 1024
        ? [64, 112]
        : windowWidth >= 768
          ? [48, 96]
          : windowWidth >= 640
            ? [32, 32]
            : [20, 20];
    const cardPadding = windowWidth < 640 ? 32 : 40; // card p-4 / sm:p-5, both sides
    const weekdayLabels = 38; // space reserved for the Mon/Wed/Fri labels column

    const pageContent = Math.min(1024, windowWidth) - padLeft - padRight;
    const available = pageContent - cardPadding - weekdayLabels;
    const perColumn = available / 53; // 53 week columns in a year
    const size = Math.floor(perColumn - githubBlockMargin);
    return Math.max(7, Math.min(size, 16));
  })();

  useEffect(() => {
    if (!resumeOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveResume(null);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [resumeOpen]);

  useEffect(() => {
    if (!resumeMenuOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-resume-menu]")) setResumeMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setResumeMenuOpen(false);
    };
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [resumeMenuOpen]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      setCurrentHash(window.location.hash);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (currentPath === "/projects") {
      window.history.replaceState({}, "", "/#projects-overview");
      setCurrentPath("/");
      setCurrentHash("#projects-overview");
    }
  }, [currentPath]);

  // The home page is the long scrollable page (everything that isn't /about or
  // a project-detail route). Project details and /about live on their own
  // non-root paths, so a root path is always the home page. Only it has the
  // #home / #projects-overview anchors the scroll-spy watches.
  const isHomePage = currentPath === "/" || currentPath === "";

  // Scroll-spy: keep the active nav button in sync with what's actually on
  // screen. The page splits into two nav zones — everything above the projects
  // cluster maps to "home", the projects cluster (overview/open-source/
  // hackathons) maps to "projects". We compare the projects anchor's position
  // against the header line so reaching it (by scroll OR click) flips to
  // "projects", and scrolling back above it reverts to "home".
  useEffect(() => {
    if (!isHomePage) return;

    let ticking = false;
    const evaluate = () => {
      ticking = false;
      const projectsEl = document.getElementById("projects-overview");
      if (!projectsEl) return;
      // Once the projects section's top reaches the header line, it's the
      // active zone. A small buffer below the header avoids flicker right at
      // the boundary.
      const reachedProjects =
        projectsEl.getBoundingClientRect().top <= HEADER_OFFSET + 8;
      setActiveSection(reachedProjects ? "projects" : "home");
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(evaluate);
      }
    };

    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHomePage]);

  // Smooth-scroll an anchor to just below the fixed header (scrollIntoView would
  // tuck it under the bar). getBoundingClientRect + scrollY is robust to the
  // element's current position regardless of what's above it.
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };

  const navigateTo = (path: string, event?: React.MouseEvent) => {
    if (event) event.preventDefault();
    if (path.includes("#")) {
      const [base, hash] = path.split("#");
      const targetBase = base || "/";

      if (currentPath !== targetBase) {
        window.history.pushState({}, "", path);
        setCurrentPath(targetBase);
        setCurrentHash(hash ? `#${hash}` : "");
        if (hash) {
          setTimeout(() => scrollToSection(hash), 100);
        }
      } else {
        window.history.pushState({}, "", path);
        setCurrentHash(hash ? `#${hash}` : "");
        if (hash) {
          scrollToSection(hash);
        }
      }
    } else {
      const samePage = currentPath === path;
      window.history.pushState({}, "", path);
      setCurrentPath(path);
      setCurrentHash("");
      if (samePage) {
        // Already on this page (e.g. clicking Home while scrolled down the home
        // page) — glide back to the top instead of jumping.
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // Switching to a different page: its content remounts at the top, so a
        // smooth scroll of the outgoing page would look janky. Land at the top
        // immediately, then the new page fades in from there.
        window.scrollTo(0, 0);
      }
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("zafarrworks@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    if (stored === "light" || (!stored && !prefersDark)) {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = (event: React.MouseEvent) => {
    const isSwitchingToDark = !isDark;

    const toggle = () => {
      setIsDark(isSwitchingToDark);
      if (isSwitchingToDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    };

    if (!("startViewTransition" in document)) {
      toggle();
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = (document as any).startViewTransition(toggle);

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 900,
          easing: "cubic-bezier(0.32, 0.72, 0, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  };

  const projects = [
    {
      id: "talkamore-web",
      title: "Talkamore Web",
      category: "fullstack" as const,
      description:
        "The web companion for Talkamore, an AI journaling app. Chat with a personal AI that remembers your past entries and turns daily conversations into a private journal — with organized journal Books, streaming AI replies, and a polished landing experience.",
      tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "pi SDK", "AWS Bedrock", "OpenRouter", "Dodo Payments"],
      roles: [{ name: "Full Stack", type: "dev" }] as const,
      liveUrl: "https://talkamore.com/",
      image: talkamoreWebBanner,
    },
    {
      id: "kodezilla",
      title: "KodeZilla.io",
      category: "fullstack" as const,
      description:
        "A competitive programming contest platform with real-time leaderboards, multi-type problem support (MCQ and DSA), and separate creator/contestant workflows.",
      tech: ["React", "TypeScript", "Express", "PostgreSQL"],
      roles: [{ name: "Full Stack", type: "dev" }] as const,
      githubUrl: "https://github.com/qzMalekuz/KodeZilla.io",
      image: kodezillaBanner,
    },
    {
      id: "playto-pay",
      title: "Playto Pay",
      category: "fullstack" as const,
      description:
        "A payout engine where merchants accumulate balance from customer payments and withdraw to their bank accounts. Built for correctness under load — concurrency-safe balance holds, idempotent payout requests, and a strict state machine, with Celery handling async processing and retries.",
      tech: ["Django", "PostgreSQL", "Celery", "Redis", "React"],
      roles: [{ name: "Full Stack", type: "dev" }] as const,
      githubUrl: "https://github.com/qzMalekuz/playTo-pay",
      liveUrl: "https://playto.zafarr.xyz/",
      image: playtoBanner,
    },
    {
      id: "chatlo",
      title: "ChatLo.io",
      category: "fullstack" as const,
      description:
        "A real-time chat application built with pure WebSockets. Features low-latency, bidirectional client communication with a clean and smooth UI.",
      tech: ["React", "TypeScript", "WebSockets", "Express"],
      roles: [{ name: "Full Stack", type: "dev" }] as const,
      githubUrl: "https://github.com/qzMalekuz/ChatLo.io",
      liveUrl: "https://chat.zafarr.xyz/",
      image: chatLoBanner,
    },
    {
      id: "appointmentlelo",
      title: "AppointmentLelo.io",
      category: "fullstack" as const,
      description:
        "A role-based appointment booking system with slot management. Features user/admin dashboards, booking flows, and a polished UI with smooth animations.",
      tech: ["React", "TypeScript", "Framer", "Express", "Prisma"],
      roles: [{ name: "Full Stack", type: "dev" }] as const,
      githubUrl: "https://github.com/qzMalekuz/AppointmentLelo.io",
      liveUrl: "https://appointment.zafarr.xyz/",
      image: appointmentBanner,
    },
    {
      id: "talkamore",
      title: "Talkamore App",
      category: "mobile" as const,
      description:
        "An AI journaling companion built with React Native and Xcode. Chat with a personal AI that remembers your past entries, surfaces throwbacks, and turns daily conversations into a private, encrypted journal. Features streaming chat, Auth0 sign-in, paywalled premium tiers, and paper-journal scanning.",
      tech: ["React Native", "Xcode", "TypeScript", "TanStack Query", "SuperMemory", "Auth0", "RevenueCat", "PostgreSQL"],
      roles: [{ name: "Mobile", type: "mobile" }] as const,
      statusLabel: "Live on Apple Store",
      statusUrl: "https://apps.apple.com/no/app/ai-journal-diary-talkamore/id6769851209",
      image: talkamoreMobileBanner,
    },
    {
      id: "luna-ai",
      title: "Luna - AI Companion",
      category: "mobile" as const,
      description:
        "An unfiltered AI companion chatbot built with React Native and Expo. Powered by OpenAI for natural conversation, with Firebase for accounts and Solana Mobile Wallet Adapter for in-app crypto payments.",
      tech: ["React Native", "Expo", "TypeScript", "OpenAI", "Solana", "Firebase"],
      roles: [{ name: "Mobile", type: "mobile" }] as const,
      githubUrl: "https://github.com/qzMalekuz/luna-ai-unfiltered-ai-companion",
      statusLabel: "Live on Solana dApp Store",
      image: lunaBanner,
    },
    {
      id: "near-me",
      title: "Solana - Near Me",
      category: "mobile" as const,
      description:
        "A React Native + Expo mobile dApp that helps you discover crypto-accepting merchants on an interactive map and pay them in SOL or USDC via Solana Pay and the Mobile Wallet Adapter. Features live exchange rates, 1% SOL cashback, and NFT reward badges.",
      tech: ["React Native", "Expo", "TypeScript", "Solana", "Firebase"],
      roles: [{ name: "Mobile", type: "mobile" }] as const,
      githubUrl: "https://github.com/qzMalekuz/solana-near-me",
      statusLabel: "Live on Solana dApp Store",
      image: nearmeBanner,
    },
    {
      id: "solpin-arcade",
      title: "SolPin - Arcade",
      category: "mobile" as const,
      description:
        "A retro-inspired 2D pinball game built with Expo (React Native + TypeScript) that integrates Solana staking mechanics into a skill-based arcade experience.",
      tech: ["React Native", "Expo", "TypeScript", "Solana", "Matter.js"],
      roles: [{ name: "Full Stack", type: "dev" }] as const,
      githubUrl: "https://github.com/qzMalekuz/SolPin-Arcade",
      statusLabel: "Live on Solana dApp Store",
      // Banner is a 4:3 (1920×1440) image framed exactly like the other mobile
      // banners (Near Me, Luna), so it uses the same default `cover` fit and
      // renders through the identical code path — keeping the framing consistent.
      image: solPinBanner,
      screenshots: [
        {
          src: screenshot1,
          alt: "SolPin-Arcade gameplay and dashboard screenshot 1",
        },
        {
          src: screenshot2,
          alt: "SolPin-Arcade gameplay and dashboard screenshot 2",
        },
        {
          src: screenshot3,
          alt: "SolPin-Arcade gameplay and dashboard screenshot 3",
        },
        {
          src: screenshot4,
          alt: "SolPin-Arcade gameplay and dashboard screenshot 4",
        },
      ],
    },
    {
      id: "icebreaker",
      title: "Icebreaker.io",
      category: "fullstack" as const,
      description:
        "A real-time anonymous stranger-matching platform where two people share one prompt, three exchanges, and a choice: stay or vanish. Built with React, Node.js, and Socket.io for ephemeral sessions that prioritize privacy.",
      tech: ["React", "TypeScript", "Socket.io", "Express", "Vite"],
      roles: [{ name: "Full Stack", type: "dev" }] as const,
      githubUrl: "https://github.com/qzMalekuz/Icebreaker.io",
      liveUrl: "https://ice.zafarr.xyz/",
      image: testspriteBanner,
      showInGrid: false,
    },
  ];

  const contributions = [
    {
      title: "Solana Monolith",
      description:
        "Built SolPin-Arcade — a retro 2D pinball game integrating Solana staking mechanics into a skill-based arcade experience. Built with Expo and React Native.",
      tech: ["Solana", "React Native", "TypeScript", "Web3"],
      externalUrl: "https://solanamobile.radiant.nexus/",
      internalUrl: "/solpin-arcade",
      image: monolithBanner,
    },
    // {
    //   title: "Colosseum Frontier",
    //   description:
    //     "Currently participating in the Colosseum Frontier online hackathon.",
    //   tech: ["Solana", "TypeScript", "React", "Web3"],
    //   externalUrl: "https://colosseum.com/frontier",
    //   image: colosseumFrontierBanner,
    // },
    {
      title: "TestSprite - S2",
      description:
        "Built Icebreaker.io — a real-time anonymous stranger-matching platform where two people share one prompt, three exchanges, and a choice: stay or vanish.",
      tech: ["React", "TypeScript", "Socket.io", "Express"],
      externalUrl: "https://www.testsprite.com/hackathon-s2",
      internalUrl: "/icebreaker",
      image: testspriteBanner,
    },
  ];

  const ossContributions = [
    {
      title: "Cytoscape App Store",
      org: "cytoscape",
      image: "https://avatars.githubusercontent.com/u/956141?v=4",
      description:
        "Contributing to the web application powering the Cytoscape App Store — a plugin marketplace for the Cytoscape network visualization and analysis platform. Django-based backend with Python.",
      tech: ["Python", "Django", "JavaScript"],
      githubUrl: "https://github.com/cytoscape/appstore",
      forkUrl: "https://github.com/qzMalekuz/appstore",
    },
    {
      title: "SeqTrainer",
      org: "SynBioDex",
      image: "https://avatars.githubusercontent.com/u/972220?v=4",
      description:
        "Contributing to an ML training pipeline for SBOL (Synthetic Biology Open Language) data — enabling machine learning models to learn from standardized biological design data.",
      tech: ["Python", "ML", "Jupyter"],
      githubUrl: "https://github.com/SynBioDex/SeqTrainer",
      forkUrl: "https://github.com/qzMalekuz/SeqTrainer",
    },
  ];

  const techStack = [
    { name: "React", colorClass: "badge-react" },
    { name: "Next.js", colorClass: "badge-nextjs" },
    { name: "TypeScript", colorClass: "badge-typescript" },
    { name: "Node.js", colorClass: "badge-nodejs" },
    { name: "Express", colorClass: "" },
    { name: "PostgreSQL", colorClass: "badge-postgresql" },
    { name: "Prisma", colorClass: "badge-prisma" },
    { name: "Tailwind", colorClass: "badge-tailwind" },
    { name: "WebSockets", colorClass: "" },
    { name: "Solana", colorClass: "" },
    { name: "React Native", colorClass: "badge-react" },
    { name: "Docker", colorClass: "badge-docker" },
    { name: "Python", colorClass: "" },
    { name: "C++", colorClass: "" },
    { name: "AWS", colorClass: "" },
    { name: "Serverless", colorClass: "" },
    { name: "Django", colorClass: "" },
    { name: "FastAPI", colorClass: "" },
  ];

  const menuItems = [
    { id: "home", icon: <HomeIcon />, label: "Home", targetPath: "/" },
    {
      id: "projects",
      icon: <LayersIcon />,
      label: "Projects",
      targetPath: "/#projects-overview",
    },
    { id: "about", icon: <UserIcon />, label: "About", targetPath: "/about" },
  ];

  return (
    <div className="app-shell min-h-screen bg-(--bg-primary) text-(--text-primary) selection:bg-(--text-primary) selection:text-(--bg-primary) font-sans overflow-x-hidden">
      <PremiumBackground />

      <SiteHeader
        items={[
          ...menuItems.map((item) => ({
            id: item.id,
            label: item.label,
            icon: item.icon,
            onClick: (e: React.MouseEvent) => navigateTo(item.targetPath, e),
          })),
          {
            id: "theme",
            label: isDark ? "Light Mode" : "Dark Mode",
            icon: isDark ? <SunIcon /> : <MoonIcon />,
            onClick: toggleTheme,
          },
        ]}
        activeId={
          currentPath === "/about"
            ? "about"
            : isHomePage
              ? activeSection
              : undefined
        }
        separator={2}
        onBrandClick={(e) => navigateTo("/", e)}
      />

      {currentPath === "/about" ? (
        <main className="relative z-10 mx-auto min-h-[80dvh] max-w-5xl space-y-10 px-5 pt-32 pb-24 transition-all sm:px-8 sm:pt-32 md:px-12 md:pt-32 md:pb-20 md:pr-24 lg:px-16 lg:pr-28">
          <div className="animate-in fade-in duration-300 slide-in-from-bottom-4 space-y-12">
            <AboutSection />
            <SectionRow title="Technologies">
              <div className="flex flex-wrap gap-x-2 gap-y-2">
                {techStack.map((tech) => (
                  <TechBadge key={tech.name} {...tech} />
                ))}
              </div>
            </SectionRow>

            <SectionRow title="GitHub">
              <div className="bg-(--bg-secondary) border border-(--border-color) rounded-2xl p-4 sm:p-5">
                <div className="flex w-full justify-start overflow-x-auto pb-2 sm:justify-center sm:overflow-x-visible">
                  <GitHubCalendar
                    username="qzMalekuz"
                    year="last"
                    theme={{
                      light: ["#dbeafe", "#93c5fd", "#60a5fa", "#3b82f6", "#1d4ed8"],
                      dark:  ["#0c1425", "#172554", "#1e40af", "#3b82f6", "#60a5fa"],
                    }}
                    colorScheme={isDark ? "dark" : "light"}
                    blockSize={githubBlockSize}
                    blockMargin={githubBlockMargin}
                    fontSize={windowWidth < 640 ? 11 : 14}
                    showWeekdayLabels={["mon", "wed", "fri"]}
                  />
                </div>
              </div>
            </SectionRow>
          </div>
        </main>
      ) : currentPath !== "/" &&
        currentPath !== "" &&
        !currentPath.includes("#") &&
        projects.find((p) => p.id === currentPath.slice(1)) ? (
        <main className="relative z-10 mx-auto min-h-[80dvh] max-w-5xl space-y-10 px-5 pt-32 pb-24 transition-all sm:px-8 sm:pt-32 md:px-12 md:pt-32 md:pb-20 md:pr-24 lg:px-16 lg:pr-28">
          {(() => {
            const project = projects.find(
              (p) => p.id === currentPath.slice(1),
            )!;
            return (
              <div className="animate-in fade-in duration-300 slide-in-from-bottom-4">
                <SectionMinimal title="Project Details">
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-4 pl-1 sm:flex-nowrap">
                    <h1 className="min-w-0 text-2xl font-bold text-(--text-primary) tracking-tight sm:text-3xl">
                      {project.title}
                    </h1>
                    <div className="flex shrink-0 flex-wrap gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-3 py-1.5 text-[12px] font-medium bg-(--text-primary) text-(--bg-primary) rounded-lg hover:bg-(--text-secondary) transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--text-muted)"
                        >
                          Visit Website <ExternalLinkIcon />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-3 py-1.5 text-[12px] font-medium bg-(--bg-tertiary) border border-(--border-color) text-(--text-primary) rounded-lg hover:bg-(--border-color) transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-color)"
                        >
                          <GitHubIcon /> View Source
                        </a>
                      )}
                      {"statusLabel" in project && project.statusLabel && (
                        "statusUrl" in project && project.statusUrl ? (
                          <a
                            href={project.statusUrl as string}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-3 py-1.5 text-[12px] font-medium bg-(--bg-tertiary) border border-(--border-color) text-(--text-secondary) rounded-lg hover:text-(--text-primary) hover:border-(--text-muted) transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-color)"
                          >
                            {project.statusLabel} <ExternalLinkIcon />
                          </a>
                        ) : (
                          <span className="inline-flex items-center justify-center px-3 py-1.5 text-[12px] font-medium bg-(--bg-tertiary) border border-(--border-color) text-(--text-secondary) rounded-lg">
                            {project.statusLabel}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8 pl-1">
                    {project.tech.map((t) => (
                      <TechBadge key={t} name={t} colorClass="" />
                    ))}
                  </div>

                  <p className="text-(--text-secondary) text-[15px] leading-relaxed max-w-xl mb-8 pl-1">
                    {project.description}
                  </p>

                  {project.id === "talkamore-web" && (
                    <div className="mb-10 pl-1">
                      {/* Product walkthrough video. Shown at its native aspect
                          ratio — the card height follows the video so it's never
                          cropped. bg-black backs it so there's no white flash
                          while the video loads. */}
                      <div className="relative rounded-2xl overflow-hidden border border-(--border-color) shadow-lg bg-black">
                        <video
                          src={talkamoreWebVideo}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="block h-auto w-full"
                        />
                      </div>
                    </div>
                  )}

                  {project.id === "solpin-arcade" && (() => {
                    const solpinScreenshots = [
                      { src: screenshot1, alt: "SolPin-Arcade screenshot 1" },
                      { src: screenshot2, alt: "SolPin-Arcade screenshot 2" },
                      { src: screenshot3, alt: "SolPin-Arcade screenshot 3" },
                      { src: screenshot4, alt: "SolPin-Arcade screenshot 4" },
                    ];
                    return (
                      <div className="mb-10 px-1">
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                          {solpinScreenshots.map((shot) => (
                            <div
                              key={shot.alt}
                              className="group block overflow-hidden rounded-2xl border border-(--border-color) bg-(--bg-secondary) shadow-sm hover:border-(--text-muted) transition-all duration-300"
                            >
                              <div className="relative aspect-9/16 overflow-hidden">
                                <img
                                  src={shot.src}
                                  alt={shot.alt}
                                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}

                  {project.id === "chatlo" && (
                    <div className="mb-10 pl-1">
                      <div className="relative rounded-2xl overflow-hidden border border-(--border-color) shadow-lg bg-(--bg-secondary)">
                        <video
                          src={chatRecording}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-auto block"
                          style={{ maxHeight: '480px', objectFit: 'cover' }}
                        />
                      </div>
                    </div>
                  )}

                  {project.id === "appointmentlelo" && (
                    <div className="mb-10 pl-1">
                      <div className="relative rounded-2xl overflow-hidden border border-(--border-color) shadow-lg bg-(--bg-secondary)">
                        <video
                          src={appointmentRecording}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-auto block"
                        />
                      </div>
                    </div>
                  )}

                  {project.id === "kodezilla" && (
                    <div className="mb-10 pl-1">
                      <div className="relative rounded-2xl overflow-hidden border border-(--border-color) shadow-lg bg-(--bg-secondary)">
                        <video
                          src={kodezillaRecording}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-auto block"
                        />
                      </div>
                    </div>
                  )}

                  {project.id === "icebreaker" && (
                    <div className="mb-10 pl-1">
                      <div className="relative rounded-2xl overflow-hidden border border-(--border-color) shadow-lg bg-(--bg-secondary)">
                        <video
                          src={icebreakerRecording}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-auto block"
                        />
                      </div>
                    </div>
                  )}

                  {project.id === "playto-pay" && (
                    <div className="mb-10 pl-1">
                      <div className="relative rounded-2xl overflow-hidden border border-(--border-color) shadow-lg bg-(--bg-secondary)">
                        <img
                          src={playtoBanner}
                          alt="Playto Pay dashboard"
                          className="w-full h-auto block"
                        />
                      </div>
                    </div>
                  )}

                  {project.id === "luna-ai" && (
                    <div className="mb-10 pl-1">
                      <div className="relative rounded-2xl overflow-hidden border border-(--border-color) shadow-lg bg-(--bg-secondary)">
                        <img
                          src={lunaBanner}
                          alt="Luna AI — Unfiltered AI Companion"
                          className="w-full h-auto block"
                        />
                      </div>
                    </div>
                  )}

                  {project.id === "near-me" && (
                    <div className="mb-10 pl-1">
                      <div className="relative rounded-2xl overflow-hidden border border-(--border-color) shadow-lg bg-(--bg-secondary)">
                        <img
                          src={nearmeBanner}
                          alt="Near Me — Find Solana Merchants Near You"
                          className="w-full h-auto block"
                        />
                      </div>
                    </div>
                  )}

                  {project.id === "talkamore" && (
                    <div className="mb-10 pl-1">
                      <div className="relative rounded-2xl overflow-hidden border border-(--border-color) shadow-lg bg-(--bg-secondary)">
                        <img
                          src={talkamoreMobileBanner}
                          alt="Talkamore App — AI Journaling Companion"
                          className="w-full h-auto block"
                        />
                      </div>
                    </div>
                  )}

                </SectionMinimal>
              </div>
            );
          })()}
        </main>
      ) : (
        <main className="relative z-10 mx-auto min-h-[80dvh] max-w-5xl space-y-16 px-5 pt-32 pb-24 transition-all sm:px-8 sm:pt-32 md:px-12 md:pt-32 md:pb-20 lg:px-16">
          <header id="home" className="scroll-mt-24">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div className="flex flex-col">
            {/* The page name lives in the sticky SiteHeader now (it owns the
                one-and-only flip wordmark + the nav buttons beside it), so the
                hero starts straight into the bio. */}
            <div className="flex flex-col gap-6">
              <p className="text-(--text-secondary) text-[15px] leading-relaxed max-w-lg font-normal">
                Mobile-First Full-Stack Developer working {" "}
                <span className="font-medium text-(--text-primary)">
                  remotely
                </span>
                . I ship production apps end-to-end — from system design and
                role-based platforms to{" "}
                <span className="font-medium text-(--text-primary)">
                  Google Play
                </span>{" "}
                and the{" "}
                <span className="font-medium text-(--text-primary)">
                  App Store
                </span>
                .
                <br />
                <br />
                My apps have earned{" "}
                <span className="font-medium text-(--text-primary)">
                  10k+ reviews
                </span>{" "}
                and generated{" "}
                <span className="font-medium text-(--text-primary)">
                  $1,000+
                </span>{" "}
                across the dApp stores. Currently a{" "}
                <span className="font-medium text-(--text-primary)">
                  Founding Engineer at a Stealth Startup
                </span>
                , previously built{" "}
                <a
                  href="https://talkamore.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium wavy-link"
                >
                  Talkamore
                </a>{" "}
                and{" "}
                <a
                  href="https://github.com/qzMalekuz/SolPin-Arcade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium wavy-link"
                >
                  SolPin-Arcade
                </a>{" "}
                — a Solana-powered pinball game at the{" "}
                <span className="font-medium text-(--text-primary)">
                  Solana Monolith Hackathon
                </span>
                . Open source contributor.
              </p>

              <div className="flex flex-col gap-3">
                <div className="inline-flex items-center flex-wrap gap-2 text-[15px]">
                  <span className="text-(--text-secondary)">Get in touch:</span>
                  <span className="font-medium text-(--text-primary)">
                    zafarrworks@gmail.com
                  </span>

                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-3">

                  <a
                    href="https://github.com/qzMalekuz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-[13px] font-medium text-(--text-muted) hover:text-(--text-primary) transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-color) rounded-md"
                  >
                    <span className="p-1.5 rounded-md bg-(--bg-tertiary) border border-(--border-color) group-hover:border-(--text-muted) transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] group-active:scale-[0.97]">
                      <GitHubIcon />
                    </span>
                    <span className="hover-wavy">GitHub</span>
                  </a>
                  <a
                    href="https://x.com/qzmalekuz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-[13px] font-medium text-(--text-muted) hover:text-(--text-primary) transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-color) rounded-md"
                  >
                    <span className="p-1.5 rounded-md bg-(--bg-tertiary) border border-(--border-color) group-hover:border-(--text-muted) transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] group-active:scale-[0.97]">
                      <TwitterIcon />
                    </span>
                    <span className="hover-wavy">Twitter</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/qzmalekuz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-[13px] font-medium text-(--text-muted) hover:text-(--text-primary) transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-color) rounded-md"
                  >
                    <span className="p-1.5 rounded-md bg-(--bg-tertiary) border border-(--border-color) group-hover:border-(--text-muted) transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] group-active:scale-[0.97]">
                      <LinkedInIcon />
                    </span>
                    <span className="hover-wavy">LinkedIn</span>
                  </a>
                  <div className="relative" data-resume-menu>
                    <button
                      type="button"
                      onClick={() => setResumeMenuOpen((o) => !o)}
                      aria-haspopup="menu"
                      aria-expanded={resumeMenuOpen}
                      className="group flex items-center gap-2 text-[13px] font-medium text-(--text-muted) hover:text-(--text-primary) transition-colors duration-200 ease-out focus:outline-none focus-visible:outline-none rounded-md cursor-pointer"
                    >
                      <span className="p-1.5 rounded-md bg-(--bg-tertiary) border border-(--border-color) group-hover:border-(--text-muted) transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] group-active:scale-[0.97]">
                        <FileTextIcon />
                      </span>
                      <span className="hover-wavy">Resume</span>
                      <span
                        className={`text-(--text-muted) transition-transform duration-200 ease-out ${resumeMenuOpen ? "rotate-180" : ""}`}
                      >
                        <ChevronDownIcon />
                      </span>
                    </button>

                    {resumeMenuOpen && (
                      <div
                        role="menu"
                        className="absolute top-full left-0 z-60 mt-2 min-w-48 overflow-hidden rounded-xl border border-(--border-color) bg-(--bg-secondary) p-1 shadow-2xl backdrop-blur-xl supports-backdrop-filter:bg-(--bg-secondary)/95 animate-in fade-in slide-in-from-top-1 duration-150"
                      >
                        {(["mobile", "fullstack"] as const).map((key) => (
                          <button
                            key={key}
                            type="button"
                            role="menuitem"
                            onClick={() => {
                              setActiveResume(key);
                              setResumeMenuOpen(false);
                            }}
                            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] font-medium text-(--text-secondary) hover:bg-(--bg-tertiary) hover:text-(--text-primary) transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:bg-(--bg-tertiary)"
                          >
                            <FileTextIcon />
                            <span>{resumes[key].label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            </div>

            {/* Ambient self-playing dino runner filling the empty space beside the
                bio on large screens; tucks below the contact links on small ones. */}
            <div className="hidden w-full max-w-85 shrink-0 lg:block">
              <DinoGame />
            </div>
            </div>
          </header>

          <SectionRow title="Experience" id="experience">
            <div className="flex flex-col gap-8 scroll-mt-24">
              <ExperienceItem
                logo={stealthLogo}
                company="Stealth AI"
                role="Founding Engineer"
                period="Jul 2026 — Present"
                location="Hybrid"
                bullets={[
                  <>
                    Building <Hl>React Native</Hl> and <Hl>Swift</Hl> mobile
                    apps end-to-end for <Hl>iOS</Hl> and Android - from
                    payments with <Hl>RevenueCat</Hl> through{" "}
                    <Hl>App Store</Hl> and <Hl>Play Store</Hl> submission.
                  </>,
                  <>
                    Owning the backends powering the apps, shipping with{" "}
                    <Hl>Expo</Hl>, <Hl>EAS Build</Hl>, and <Hl>Xcode</Hl>.
                  </>,
                  <>
                    Building <Hl>Meta Ads</Hl>{" "}
                    <Hl>automation pipelines</Hl> in <Hl>Python</Hl>.
                  </>,
                ]}
              />

              <div className="h-px w-full bg-(--border-color)" />

              <ExperienceItem
                logo={talkamoreLogo}
                company="Talkamore"
                role="Founding Engineer"
                href="https://talkamore.com/"
                period="Apr 2026 — Jun 2026"
                location="Remote"
                bullets={[
                  "Built and designed the product end-to-end across web and mobile for both App Store and Play Store.",
                  "Owning the core backend and system design, with a focus on scalability and real-time features.",
                  "Shipping production features in a fast-moving early-stage team.",
                ]}
              />

              <div className="h-px w-full bg-(--border-color)" />

              <ExperienceItem
                logo={kraneAppsLogo}
                company="Krane Apps"
                role="Blockchain and Backend Developer"
                href="https://www.kraneapps.com/"
                period="Sep 2025 — Apr 2026"
                location="Remote"
                bullets={[
                  "Building backend services and on-chain integrations for client products.",
                  "Working across Web3 tooling and Solana program interactions.",
                  "Delivering APIs and data flows that power web and mobile clients.",
                ]}
              />
            </div>
          </SectionRow>

          <div id="projects-overview" className="scroll-mt-24">
            <ProjectsSection
              projects={projects}
              active={projectCategory}
              onActiveChange={setProjectCategory}
              onProjectClick={(id, e) => navigateTo(`/${id}`, e)}
            />

            <div className="mt-24" id="open-source">
              <SectionRow title="Open Source">
                <div className="flex flex-col">
                  {ossContributions.map((oss, i) => (
                    <div key={oss.title}>
                      {i > 0 && (
                        <div className="my-10 h-px w-full bg-(--border-color)" />
                      )}
                      <a
                        href={oss.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10 lg:gap-14"
                      >
                        {/* Left — meta, title, description, badges */}
                        <div className="flex flex-col">
                          <div className="mb-4 flex items-center gap-4">
                            <span className="text-[13px] font-mono tabular-nums text-(--text-muted)">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.15em] uppercase text-(--text-muted) transition-colors duration-200 ease-out group-hover:text-(--text-primary)">
                              <GitHubIcon />
                              <span className="hover-wavy">GitHub</span>
                            </span>
                          </div>
                          <h3 className="mb-4 text-2xl font-bold tracking-tight text-(--text-primary) transition-colors duration-200 ease-out group-hover:text-(--text-highlight) sm:text-3xl">
                            {oss.title}
                          </h3>
                          <p className="mb-6 max-w-md text-[15px] leading-relaxed text-(--text-secondary)">
                            {oss.description}
                          </p>
                          <div className="mt-auto flex flex-wrap gap-2">
                            {oss.tech.map((t) => (
                              <TechBadge key={t} name={t} size="sm" />
                            ))}
                          </div>
                        </div>
                        {/* Right — org logo */}
                        <div className="flex aspect-16/10 items-center justify-center overflow-hidden rounded-2xl border border-(--border-color) bg-[#1a1a1a] shadow-sm transition-all duration-300 ease-out group-hover:border-(--text-muted) group-hover:shadow-md">
                          <img
                            src={oss.image}
                            alt={oss.org}
                            className="h-20 w-20 rounded-xl object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                          />
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </SectionRow>
            </div>

            <div className="mt-24" id="hackathons">
              <SectionRow title="Hackathons">
                <div className="flex flex-col">
                  {contributions.map((contrib, i) => {
                    const hasInternal = "internalUrl" in contrib && contrib.internalUrl;
                    const handleCardClick = (e: React.MouseEvent) => {
                      if (hasInternal) {
                        navigateTo(contrib.internalUrl as string, e);
                      } else {
                        window.open(contrib.externalUrl, "_blank", "noopener,noreferrer");
                      }
                    };
                    return (
                      <div key={contrib.title}>
                        {i > 0 && (
                          <div className="my-10 h-px w-full bg-(--border-color)" />
                        )}
                        <div
                          className="group grid grid-cols-1 gap-6 cursor-pointer md:grid-cols-2 md:gap-10 lg:gap-14"
                          onClick={handleCardClick}
                        >
                          {/* Left — meta, title, description, badges */}
                          <div className="flex flex-col">
                            <div className="mb-4 flex items-center gap-4">
                              <span className="text-[13px] font-mono tabular-nums text-(--text-muted)">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <a
                                href={contrib.externalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="group/link ml-auto inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.15em] uppercase text-(--text-muted) hover:text-(--text-primary) transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-color) rounded"
                                aria-label="Hackathon link"
                              >
                                <ExternalLinkIcon />
                                <span className="hover-wavy">Visit</span>
                              </a>
                            </div>
                            <h3 className="mb-4 text-2xl font-bold tracking-tight text-(--text-primary) transition-colors duration-200 ease-out group-hover:text-(--text-highlight) sm:text-3xl">
                              {contrib.title}
                            </h3>
                            <p className="mb-6 max-w-md text-[15px] leading-relaxed text-(--text-secondary)">
                              {contrib.description}
                            </p>
                            <div className="mt-auto flex flex-wrap gap-2">
                              {contrib.tech.map((t) => (
                                <TechBadge key={t} name={t} size="sm" />
                              ))}
                            </div>
                          </div>
                          {/* Right — preview image */}
                          <div className="overflow-hidden rounded-2xl border border-(--border-color) bg-(--bg-secondary) shadow-sm transition-all duration-300 ease-out group-hover:border-(--text-muted) group-hover:shadow-md">
                            {contrib.image ? (
                              <div className="relative aspect-16/10 overflow-hidden bg-black">
                                <img
                                  src={contrib.image}
                                  alt={contrib.title}
                                  className="absolute inset-0 h-full w-full object-contain transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
                                />
                              </div>
                            ) : (
                              <div className="flex aspect-16/10 items-center justify-center bg-(--bg-tertiary) text-(--text-muted)">
                                <ExternalLinkIcon />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </SectionRow>
            </div>
          </div>
        </main>
      )}

      <div className="relative z-10">
        <Footer />
      </div>

      {activeResume && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm"
          onClick={() => setActiveResume(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Resume preview"
          style={{
            // Keep the modal clear of the notch/home-bar so the close button and
            // PDF are always reachable on phones. No-op on devices with no inset.
            paddingTop: "max(0.75rem, env(safe-area-inset-top, 0px))",
            paddingBottom: "max(0.75rem, env(safe-area-inset-bottom, 0px))",
          }}
        >
          <div
            className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-(--border-color) bg-(--bg-secondary) shadow-2xl h-dvh max-h-full sm:h-[90dvh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-(--border-color)">
              <div className="flex min-w-0 items-center gap-2 text-[13px] font-medium text-(--text-primary)">
                <FileTextIcon />
                <span className="truncate">{resumes[activeResume].label}</span>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={resumes[activeResume].pdf}
                  download={resumes[activeResume].downloadName}
                  className="group flex items-center gap-2 text-[13px] font-medium text-(--text-muted) hover:text-(--text-primary) transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-color) rounded-md px-2.5 py-1.5 border border-(--border-color) hover:border-(--text-muted) bg-(--bg-tertiary)"
                >
                  <DownloadIcon />
                  <span>Download</span>
                </a>
                <button
                  type="button"
                  onClick={() => setActiveResume(null)}
                  className="p-1.5 rounded-md hover:bg-(--bg-tertiary) text-(--text-muted) hover:text-(--text-primary) transition-colors duration-200 cursor-pointer"
                  aria-label="Close resume preview"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>
            <iframe
              src={`${resumes[activeResume].pdf}#view=FitH`}
              title={`${resumes[activeResume].label} preview`}
              className="flex-1 w-full bg-white"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
