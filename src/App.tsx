import { GitHubCalendar } from 'react-github-calendar';
import { useState, useEffect } from "react";
import "./index.css";

import chatLoBanner from "./assets/chatLo_banner.png";
import appointmentBanner from "./assets/appointment.png";
import chatRecording from "./assets/chat-screen-recording.mp4";
import appointmentRecording from "./assets/appointment-screen-recording.mp4";
import icebreakerRecording from "./assets/icebreaker-demo-video.mp4";
import solPinBanner from "./assets/solPin_banner.png";
import monolithBanner from "./assets/monolith_banner.png";
import colosseumFrontierBanner from "./assets/colosseum_frontier.png";
import kodezillaBanner from "./assets/kodezilla-banner.png";
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
} from "./components/Icons";
import { SectionMinimal } from "./components/ui/SectionMinimal";
import { NameFlip } from "./components/ui/NameFlip";
import { ExperienceRow } from "./components/ui/ExperienceRow";
import { TechBadge } from "./components/ui/TechBadge";
import { ProjectCard } from "./components/projects/ProjectCard";
import { AboutSection } from "./components/about/AboutSection";
import { Footer } from "./components/layout/Footer";
import { FloatingToolbar } from "./components/ui/FloatingToolbar";
import { PremiumBackground } from "./components/ui/PremiumBackground";

export function App() {
  const [isDark, setIsDark] = useState(true);
  const [copied, setCopied] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [currentHash, setCurrentHash] = useState(window.location.hash);

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
          setTimeout(() => {
            document
              .getElementById(hash)
              ?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      } else {
        window.history.pushState({}, "", path);
        setCurrentHash(hash ? `#${hash}` : "");
        if (hash) {
          document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      window.history.pushState({}, "", path);
      setCurrentPath(path);
      setCurrentHash("");
      window.scrollTo(0, 0);
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
      id: "chatlo",
      title: "ChatLo.io",
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
      description:
        "A role-based appointment booking system with slot management. Features user/admin dashboards, booking flows, and a polished UI with smooth animations.",
      tech: ["React", "TypeScript", "Framer", "Express", "Prisma"],
      roles: [{ name: "Full Stack", type: "dev" }] as const,
      githubUrl: "https://github.com/qzMalekuz/AppointmentLelo.io",
      liveUrl: "https://appointment.zafarr.xyz/",
      image: appointmentBanner,
    },
    {
      id: "kodezilla",
      title: "KodeZilla.io",
      description:
        "A competitive programming contest platform with real-time leaderboards, multi-type problem support (MCQ and DSA), and separate creator/contestant workflows.",
      tech: ["React", "TypeScript", "Express", "PostgreSQL"],
      roles: [{ name: "Full Stack", type: "dev" }] as const,
      githubUrl: "https://github.com/qzMalekuz/KodeZilla.io",
      image: kodezillaBanner,
    },
    {
      id: "icebreaker",
      title: "Icebreaker.io",
      description:
        "A real-time anonymous stranger-matching platform where two people share one prompt, three exchanges, and a choice: stay or vanish. Built with React, Node.js, and Socket.io for ephemeral sessions that prioritize privacy.",
      tech: ["React", "TypeScript", "Socket.io", "Express", "Vite"],
      roles: [{ name: "Full Stack", type: "dev" }] as const,
      githubUrl: "https://github.com/qzMalekuz/Icebreaker.io",
      liveUrl: "https://ice.zafarr.xyz/",
      image: testspriteBanner,
    },
    {
      id: "solpin-arcade",
      title: "SolPin-Arcade",
      description:
        "A retro-inspired 2D pinball game built with Expo (React Native + TypeScript) that integrates Solana staking mechanics into a skill-based arcade experience.",
      tech: ["React Native", "Expo", "TypeScript", "Solana", "Matter.js"],
      roles: [{ name: "Full Stack", type: "dev" }] as const,
      githubUrl: "https://github.com/qzMalekuz/SolPin-Arcade",
      liveUrl: undefined as string | undefined,
      downloadApkUrl: "https://github.com/qzMalekuz/SolPin-Arcade/releases/download/v2.0/Sol-Pin.Arcade.apk",
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
    {
      title: "Colosseum Frontier",
      description:
        "Currently participating in the Colosseum Frontier online hackathon.",
      tech: ["Solana", "TypeScript", "React", "Web3"],
      externalUrl: "https://colosseum.com/frontier",
      image: colosseumFrontierBanner,
    },
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

      <nav className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 md:top-1/2 md:right-6 md:bottom-auto md:left-auto md:translate-x-0 md:-translate-y-1/2 lg:right-8">
        <FloatingToolbar
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
              : currentHash === "#projects-overview" ||
                  currentHash === "#open-source" ||
                  currentHash === "#hackathons"
                ? "projects"
                : currentPath === "/" || currentPath === ""
                  ? "home"
                  : undefined
          }
          separator={2}
        />
      </nav>

      {currentPath === "/about" ? (
        <main className="relative z-10 mx-auto min-h-[80vh] max-w-2xl space-y-10 px-4 py-16 pb-24 transition-all sm:px-6 sm:py-20 md:pr-28 lg:max-w-3xl lg:pr-36">
          <div className="animate-in fade-in duration-300 slide-in-from-bottom-4 space-y-8">
            <AboutSection />
            <SectionMinimal title="Technologies">
              <div className="mb-8 flex flex-wrap gap-x-2 gap-y-2 pl-1">
                {techStack.map((tech) => (
                  <TechBadge key={tech.name} {...tech} />
                ))}
              </div>
            </SectionMinimal>

            <SectionMinimal title="GitHub">
              <div className="bg-(--bg-secondary) border border-(--border-color) rounded-2xl p-4 sm:p-5">
                <div className="flex w-full justify-start overflow-x-auto pb-2 sm:justify-center">
                  <GitHubCalendar
                    username="qzMalekuz"
                    year="last"
                    theme={{
                      light: ["#dbeafe", "#93c5fd", "#60a5fa", "#3b82f6", "#1d4ed8"],
                      dark:  ["#0c1425", "#172554", "#1e40af", "#3b82f6", "#60a5fa"],
                    }}
                    colorScheme={isDark ? "dark" : "light"}
                    blockSize={window.innerWidth < 640 ? 7 : 8}
                    blockMargin={2}
                    fontSize={11}
                    showWeekdayLabels={["mon", "wed", "fri"]}
                  />
                </div>
              </div>
            </SectionMinimal>
          </div>
        </main>
      ) : currentPath !== "/" &&
        currentPath !== "" &&
        !currentPath.includes("#") &&
        projects.find((p) => p.id === currentPath.slice(1)) ? (
        <main className="relative z-10 mx-auto min-h-[80vh] max-w-2xl space-y-10 px-4 py-16 pb-24 transition-all sm:px-6 sm:py-20 md:pr-28 lg:max-w-3xl lg:pr-36">
          {(() => {
            const project = projects.find(
              (p) => p.id === currentPath.slice(1),
            )!;
            return (
              <div className="animate-in fade-in duration-300 slide-in-from-bottom-4">
                <SectionMinimal title="Project Details">
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-4 pl-1 sm:flex-nowrap">
                    <h1 className="text-3xl font-bold text-(--text-primary) tracking-tight">
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
                      {project.id === "solpin-arcade" && "downloadApkUrl" in project && (
                        <a
                          href={project.downloadApkUrl as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-3 py-1.5 text-[12px] font-medium bg-(--text-primary) text-(--bg-primary) rounded-lg hover:bg-(--text-secondary) transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--text-muted)"
                        >
                          Install APK <DownloadIcon />
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
                </SectionMinimal>
              </div>
            );
          })()}
        </main>
      ) : (
        <main className="relative z-10 mx-auto min-h-[80vh] max-w-2xl space-y-12 px-4 py-16 pb-24 transition-all sm:px-6 sm:py-20 md:pr-28 lg:max-w-3xl lg:pr-36">
          <header id="home" className="flex flex-col pl-1 scroll-mt-24">
            <NameFlip />

            <div className="flex flex-col gap-6 mt-4">
              <p className="text-(--text-secondary) text-[15px] leading-relaxed max-w-lg font-normal">
                Full-stack developer working{" "}
                <span className="font-medium text-(--text-primary)">
                  remotely
                </span>
                . I build system designs, role-based platforms, and Web3
                experiences.
                <br />
                <br />
                Shipped{" "}
                <a
                  href="https://chat.zafarr.xyz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium wavy-link"
                >
                  ChatLo.io
                </a>{" "}
                — a real-time chat app powered by pure{" "}
                <span className="font-medium text-(--text-primary)">
                  WebSockets
                </span>
                , and built{" "}
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
                  <button
                    onClick={copyEmail}
                    className="p-1.5 rounded-md hover:bg-(--bg-tertiary) text-(--text-muted) hover:text-(--text-primary) transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-color) ml-1 cursor-pointer"
                    title="Copy email"
                  >
                    {copied ? <CheckIcon /> : <CopyIcon />}
                  </button>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-3">
                  <a
                    href="mailto:zafarrworks@gmail.com"
                    className="group flex items-center gap-2 text-[13px] font-medium text-(--text-muted) hover:text-(--text-primary) transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-color) rounded-md"
                  >
                    <span className="p-1.5 rounded-md bg-(--bg-tertiary) border border-(--border-color) group-hover:border-(--text-muted) transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] group-active:scale-[0.97]">
                      <MailIcon />
                    </span>
                    <span className="hover-wavy">Email</span>
                  </a>
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
                </div>
              </div>
            </div>
          </header>

          <SectionMinimal title="Experience" id="experience">
            <div className="flex flex-col gap-6">
              <ExperienceRow
                role="Full-Stack Developer"
                company={
                  <span className="text-[15px] font-medium text-(--text-primary)">
                    Freelance
                  </span>
                }
                duration="Sep 2025 — Present"
              />
            </div>
          </SectionMinimal>

          <div id="projects-overview" className="scroll-mt-24">
            <SectionMinimal title="Projects">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pl-1">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    {...project}
                    onDetailClick={(e) => navigateTo(`/${project.id}`, e)}
                  />
                ))}
              </div>
            </SectionMinimal>

            <div className="mt-16" id="open-source">
              <SectionMinimal title="Open Source">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pl-1">
                  {ossContributions.map((oss) => (
                    <a
                      key={oss.title}
                      href={oss.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative bg-(--bg-secondary) rounded-2xl border border-(--border-color) hover:border-(--text-muted) transition-all duration-300 ease-out overflow-hidden shadow-sm hover:shadow-md flex flex-col h-full cursor-pointer"
                    >
                      <div className="w-full h-32 bg-[#1a1a1a] border-b border-(--border-color) overflow-hidden relative flex items-center justify-center">
                        <img src={oss.image} alt={oss.org} className="w-16 h-16 rounded-lg object-cover" />
                      </div>
                      <div className="p-6 flex flex-col grow">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-(--text-primary) tracking-tight group-hover:text-(--text-highlight) transition-colors duration-200 ease-out mr-auto">
                            {oss.title}
                          </h3>
                          <span className="inline-flex items-center justify-center text-(--bg-primary) bg-(--text-primary) p-1 rounded-md *:w-3.5 *:h-3.5">
                            <ExternalLinkIcon />
                          </span>
                        </div>
                        <p className="text-(--text-secondary) text-sm leading-relaxed mb-4">
                          {oss.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-auto">
                          {oss.tech.map((t) => (
                            <span
                              key={t}
                              className="text-[11px] font-medium text-(--text-secondary) bg-(--bg-tertiary) px-2 py-0.5 rounded border border-(--border-color)"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </SectionMinimal>
            </div>

            <div className="mt-16" id="hackathons">
              <SectionMinimal title="Hackathons">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pl-1">
                  {contributions.map((contrib) => {
                    const hasInternal = "internalUrl" in contrib && contrib.internalUrl;
                    const cardClass = "group relative bg-(--bg-secondary) rounded-2xl border border-(--border-color) hover:border-(--text-muted) transition-all duration-300 ease-out overflow-hidden shadow-sm hover:shadow-md flex flex-col h-full cursor-pointer";
                    const handleCardClick = (e: React.MouseEvent) => {
                      if (hasInternal) {
                        navigateTo(contrib.internalUrl as string, e);
                      } else {
                        window.open(contrib.externalUrl, "_blank", "noopener,noreferrer");
                      }
                    };
                    return (
                      <div
                        key={contrib.title}
                        className={cardClass}
                        onClick={handleCardClick}
                      >
                        <div className="w-full h-32 overflow-hidden relative">
                          {contrib.image ? (
                            <img src={contrib.image} alt={contrib.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          ) : (
                            <div className="w-full h-full bg-(--bg-tertiary) border-b border-(--border-color) flex items-center justify-center">
                              <ExternalLinkIcon />
                            </div>
                          )}
                        </div>
                        <div className="p-6 flex flex-col grow">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-(--text-primary) tracking-tight group-hover:text-(--text-highlight) transition-colors duration-200 ease-out mr-auto">
                              {contrib.title}
                            </h3>
                            <a
                              href={contrib.externalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center justify-center text-(--bg-primary) bg-(--text-primary) p-1 rounded-md hover:scale-105 transition-transform *:w-3.5 *:h-3.5 shrink-0"
                              aria-label="Hackathon link"
                            >
                              <ExternalLinkIcon />
                            </a>
                          </div>
                          <p className="text-(--text-secondary) text-sm leading-relaxed mb-4">
                            {contrib.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mt-auto">
                            {contrib.tech.map((t) => (
                              <span
                                key={t}
                                className="text-[11px] font-medium text-(--text-secondary) bg-(--bg-tertiary) px-2 py-0.5 rounded border border-(--border-color)"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </SectionMinimal>
            </div>
          </div>
        </main>
      )}

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default App;
