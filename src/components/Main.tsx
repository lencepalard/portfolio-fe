"use client"

import { useState, useEffect, useRef, createContext, useContext } from "react";
import {
  Brain,
  ArrowRight,
  Sparkles,
  Code2,
  Database,
  Layers,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  Zap,
  ShieldCheck,
  MonitorSmartphone,
  Sun,
  Moon,
  GitBranch,
  GitMerge,
  Terminal,
  Github,
  Globe,
  Rocket,
  RefreshCw,
  CheckCheck,
  PackageCheck,
  CloudUpload,
} from "lucide-react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

// ─── THEME ───────────────────────────────────────────────────────────────────

const ThemeContext = createContext<{ dark: boolean; toggle: () => void }>({
  dark: true,
  toggle: () => {},
});

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

// ─── SCROLL ANIMATIONS ───────────────────────────────────────────────────────

// Reusable scroll-reveal wrapper
type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale" | "none";
};

const Reveal = ({ children, className = "", delay = 0, direction = "up" }: RevealProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
      scale: direction === "scale" ? 0.85 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

// Stagger container — children animate one after another
const StaggerContainer = ({ children, className = "", stagger = 0.1 }: { children: React.ReactNode; className?: string; stagger?: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{ visible: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
};

// Child item for StaggerContainer
const StaggerItem = ({ children, className = "", direction = "up" }: { children: React.ReactNode; className?: string; direction?: "up" | "left" | "right" | "scale" }) => (
  <motion.div
    className={className}
    variants={{
      hidden: {
        opacity: 0,
        y: direction === "up" ? 40 : 0,
        x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
        scale: direction === "scale" ? 0.9 : 1,
      },
      visible: {
        opacity: 1, y: 0, x: 0, scale: 1,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
      },
    }}
  >
    {children}
  </motion.div>
);

// Scroll progress bar at top of page
const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-linear-to-r from-cyan-400 via-violet-500 to-fuchsia-500 origin-left z-[100]"
      style={{ scaleX }}
    />
  );
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
});

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-4">
    <Sparkles className="w-3 h-3" />
    {children}
  </span>
);

// ─── NAVIGATION ──────────────────────────────────────────────────────────────

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { dark, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Pipeline", href: "#pipeline" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-[#050b14]/90 backdrop-blur-md border-b border-gray-200 dark:border-white/5 shadow-lg shadow-black/10 dark:shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 lg:px-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
            L
          </div>
          <span className="text-gray-900 dark:text-white font-bold text-lg tracking-tight">
            Lenard<span className="text-cyan-500 dark:text-cyan-400">.dev</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-gray-500 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 text-sm font-medium transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-4">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
            <FaFacebook className="w-4 h-4" />
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
            <FaGithub className="w-4 h-4" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
            <FaLinkedin className="w-4 h-4" />
          </a>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-lg border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 hover:border-cyan-400/40 transition-all"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <a
            href="#contact"
            className="px-4 py-2 rounded-lg bg-linear-to-r from-cyan-500 to-violet-500 text-white text-sm font-semibold hover:brightness-110 transition-all shadow-md shadow-cyan-500/20"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile right: theme + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-8 h-8 rounded-lg border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 transition-all"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="text-gray-700 dark:text-white p-1 rounded focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-current transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-white/95 dark:bg-[#050b14]/95 backdrop-blur-md border-t border-gray-100 dark:border-white/5 px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-gray-600 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 text-base font-medium transition-colors"
            >
              {l.label}
            </a>
          ))}
          <div className="flex items-center gap-5 pt-2 border-t border-gray-100 dark:border-white/10">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
              <FaFacebook className="w-5 h-5" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
              <FaGithub className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
              <FaLinkedin className="w-5 h-5" />
            </a>
          </div>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="w-full text-center px-4 py-3 rounded-lg bg-linear-to-r from-cyan-500 to-violet-500 text-white font-semibold hover:brightness-110 transition-all"
          >
            Hire Me
          </a>
        </div>
      )}
    </nav>
  );
};

// ─── TYPING EFFECT ───────────────────────────────────────────────────────────

const TypingEffect = () => {
  const texts = [
    "I build modern, responsive web apps.",
    "I turn ideas into scalable products.",
    "I specialize in clean UI & smooth UX.",
    "Full-Stack · AI · Cloud · Automation",
  ];

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    if (subIndex === texts[index].length + 1 && !deleting) {
      setDeleting(true);
      setSpeed(40);
      return;
    }
    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % texts.length);
      setSpeed(100);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
      setText(texts[index].substring(0, subIndex));
    }, speed);
    return () => clearTimeout(timeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subIndex, deleting]);

  return (
    <p className="text-base md:text-lg text-cyan-600 dark:text-cyan-300/80 font-mono min-h-7">
      {text}
      <span className="border-r-2 border-cyan-500 dark:border-cyan-400 ml-0.5 animate-pulse" />
    </p>
  );
};

// ─── HERO ────────────────────────────────────────────────────────────────────

const FLOATING_WORDS = [
  { word: "React",      top: "12%", left: "8%"  },
  { word: "Next.js",   top: "22%", left: "80%" },
  { word: "TypeScript",top: "60%", left: "5%"  },
  { word: "UI/UX",     top: "75%", left: "85%" },
  { word: "Azure",     top: "40%", left: "88%" },
  { word: "MongoDB",   top: "85%", left: "20%" },
  { word: ".NET",      top: "15%", left: "55%" },
  { word: "Python",    top: "50%", left: "70%" },
  { word: "OpenAI",    top: "80%", left: "60%" },
  { word: "SQL",       top: "30%", left: "18%" },
];

const HeroSection = () => (
  <section className="relative flex items-center min-h-screen overflow-hidden bg-gray-50 dark:bg-[#050b14] transition-colors duration-300">
    {/* Grid overlay */}
    <div
      className="absolute inset-0 z-0 opacity-30 dark:opacity-20"
      style={{
        backgroundImage:
          "linear-gradient(rgba(6,182,212,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.2) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    />

    {/* Orbs */}
    {[
      { top: "20%", left: "25%", w: 320, h: 320, cls: "from-cyan-400/20" },
      { top: "50%", left: "60%", w: 400, h: 400, cls: "from-violet-500/20" },
      { top: "70%", left: "10%", w: 240, h: 240, cls: "from-blue-400/15" },
    ].map((o, i) => (
      <div
        key={i}
        className={`absolute rounded-full bg-linear-to-br ${o.cls} to-transparent blur-3xl pointer-events-none`}
        style={{ top: o.top, left: o.left, width: o.w, height: o.h }}
      />
    ))}

    {/* Floating words */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {FLOATING_WORDS.map(({ word, top, left }, i) => (
        <motion.span
          key={i}
          className="absolute text-gray-900/5 dark:text-white/5 font-bold text-2xl md:text-4xl select-none"
          style={{ top, left }}
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 6 + i * 0.7, repeat: Infinity, ease: "easeInOut" }}
        >
          {word}
        </motion.span>
      ))}
    </div>

    {/* Content */}
    <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 w-full pt-24 pb-16 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
      {/* LEFT */}
      <div className="flex-1 flex flex-col gap-6 text-center md:text-left">
        <motion.div {...fadeUp(0)}>
          <SectionLabel>Available for freelance work</SectionLabel>
        </motion.div>

        <motion.h1
          {...fadeUp(0.15)}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight"
        >
          Hi{" "}
          <motion.span
            animate={{ rotate: [0, 20, -10, 20, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block"
          >
            👋
          </motion.span>
          , I&apos;m{" "}
          <span className="bg-linear-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent">
            Lenard Palce
          </span>
        </motion.h1>

        <motion.h2
          {...fadeUp(0.3)}
          className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-wide uppercase"
          style={{
            WebkitTextStroke: "1px",
            color: "transparent",
            WebkitTextStrokeColor: "rgba(0,0,0,0.2)",
          }}
        >
          <span className="dark:[WebkitTextStrokeColor:rgba(255,255,255,0.3)]">
            Fullstack Web Developer
          </span>
        </motion.h2>

        <motion.div {...fadeUp(0.45)}>
          <TypingEffect />
        </motion.div>

        <motion.p
          {...fadeUp(0.6)}
          className="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-md mx-auto md:mx-0 leading-relaxed"
        >
          I craft end-to-end web solutions — from pixel-perfect frontends to
          scalable cloud backends — helping businesses grow through technology.
        </motion.p>

        <motion.div
          {...fadeUp(0.75)}
          className="flex flex-col sm:flex-row gap-4 mt-2 justify-center md:justify-start"
        >
          <a
            href="#contact"
            className="px-6 py-3 rounded-xl bg-linear-to-r from-cyan-500 to-violet-500 text-white font-semibold hover:brightness-110 transition-all duration-300 shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 group"
          >
            Hire Me Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#"
            className="px-6 py-3 rounded-xl border border-gray-300 dark:border-white/20 text-gray-700 dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Download CV
          </a>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          {...fadeUp(0.9)}
          className="flex flex-wrap gap-6 pt-4 justify-center md:justify-start"
        >
          {[
            { value: "3+", label: "Years Exp." },
            { value: "10+", label: "Projects" },
            { value: "5+", label: "Happy Clients" },
          ].map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <p className="text-2xl font-extrabold bg-linear-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent">
                {s.value}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* RIGHT — Profile */}
      <motion.div
        className="flex justify-center md:justify-end shrink-0"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-linear-to-br from-cyan-400/30 to-violet-500/30 blur-2xl animate-pulse" />
          <div className="absolute -inset-1 rounded-full bg-linear-to-br from-cyan-400 to-violet-500 opacity-60 animate-spin" style={{ animationDuration: "8s" }} />
          <img
            src="/image/profile-img.jpg"
            alt="Lenard Palce"
            className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full object-cover border-4 border-gray-50 dark:border-[#050b14]"
          />
        </div>
      </motion.div>
    </div>

    {/* Scroll cue */}
    <a
      href="#about"
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors z-10"
    >
      <span className="text-xs tracking-widest uppercase mb-1">Scroll</span>
      <ChevronDown className="w-5 h-5 animate-bounce" />
    </a>
  </section>
);

// ─── ABOUT ───────────────────────────────────────────────────────────────────

const AboutMe = () => {
  const ref = useRef(null);

  return (
    <section id="about" ref={ref} className="py-24 lg:py-32 bg-white dark:bg-[#080e1a] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 grid md:grid-cols-2 gap-16 items-center">

        {/* Photo */}
        <Reveal direction="right" className="flex justify-center md:justify-start">
          <div className="relative w-72 h-80 sm:w-80 sm:h-96">
            <div className="absolute -top-3 -left-3 w-full h-full border-2 border-cyan-500/30 rounded-3xl" />
            <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-violet-500/30 rounded-3xl" />
            <div className="relative w-full h-full rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10">
              <img
                src="/image/formal-about-me.png"
                alt="Lenard Palce"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-white/60 dark:from-[#080e1a]/60 to-transparent" />
            </div>
          </div>
        </Reveal>

        {/* Content */}
        <StaggerContainer className="space-y-6" stagger={0.1}>
          <StaggerItem><SectionLabel>About Me</SectionLabel></StaggerItem>
          <StaggerItem>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Building Digital{" "}
              <span className="bg-linear-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent">
                Experiences
              </span>
            </h2>
          </StaggerItem>
          <StaggerItem>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              I&apos;m a Fullstack Web Developer based in the Philippines. I love crafting
              modern, scalable web applications with clean UI, smooth user experience,
              and efficient backend logic — helping businesses and people work smarter.
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {[
                { label: "Name", value: "Lenard Palce" },
                { label: "Country", value: "Philippines" },
                { label: "Email", value: "palcelenard@gmail.com" },
                { label: "Phone", value: "+63 935 253 6315" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <p className="text-gray-500 dark:text-gray-400">
                    <span className="text-gray-900 dark:text-white font-semibold">{item.label}: </span>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="flex flex-wrap gap-2 pt-2">
              {["React", "Next.js", "TypeScript", ".NET Core", "MongoDB", "Azure", "Python", "OpenAI"].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 text-xs font-medium hover:border-cyan-400/50 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="flex items-center gap-4 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
                <FaGithub className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="ml-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-cyan-500 to-violet-500 text-white text-sm font-semibold hover:brightness-110 transition-all shadow-md shadow-cyan-500/20"
              >
                Download CV
              </a>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
};

// ─── SERVICES ────────────────────────────────────────────────────────────────

const services = [
  {
    icon: <MonitorSmartphone className="w-6 h-6" />,
    title: "Frontend Development",
    description: "I build pixel-perfect, responsive interfaces using React, Next.js, and TailwindCSS — fast, accessible, and delightful for users.",
    tags: ["React", "Next.js", "TailwindCSS", "Framer Motion"],
    color: "from-cyan-500 to-sky-500",
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Backend & API Development",
    description: "Scalable REST APIs and cloud functions using .NET Core, Node.js, and Azure — with MongoDB and SQL Server for reliable data storage.",
    tags: [".NET Core", "Node.js", "MongoDB", "Azure Functions"],
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "AI & Automation",
    description: "I integrate OpenAI and build intelligent agents that automate workflows, answer questions, and make your systems smarter.",
    tags: ["OpenAI", "AI Agents", "Chatbots", "HR Automation"],
    color: "from-fuchsia-500 to-pink-500",
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Fullstack Web Apps",
    description: "End-to-end application delivery — from database design to deployment — for startups and enterprises alike.",
    tags: ["Next.js", "TypeScript", "SQL Server", "JWT Auth"],
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "System Modernization",
    description: "Migrate legacy desktop apps (VB.NET, WinForms) to modern web platforms — with improved UX and cloud connectivity.",
    tags: ["VB.NET", "Web Migration", "MySQL", "WinForms"],
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Performance & Optimization",
    description: "Audit and optimize your existing web app for speed, SEO, and Core Web Vitals — so clients find and trust you faster.",
    tags: ["Next.js SSR", "Lighthouse", "CDN", "Code Splitting"],
    color: "from-yellow-400 to-orange-400",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);

  return (
    <section id="services" ref={ref} className="py-24 lg:py-32 bg-gray-50 dark:bg-[#050b14] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <Reveal className="text-center mb-16">
          <SectionLabel>What I Can Do For You</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-2">
            How I Can{" "}
            <span className="bg-linear-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent">
              Help Your Business
            </span>
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            From idea to production — I cover the full development lifecycle so
            your business gets real, working software that grows with you.
          </p>
        </Reveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.08}>
          {services.map((svc, i) => (
            <StaggerItem key={i} direction="up">
              <div className="group relative rounded-2xl bg-white dark:bg-white/3 border border-gray-200 dark:border-white/8 p-6 hover:border-cyan-400/50 dark:hover:border-cyan-500/40 transition-all duration-300 overflow-hidden shadow-sm dark:shadow-none h-full">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className={`absolute -top-8 -right-8 w-40 h-40 rounded-full bg-linear-to-br ${svc.color} opacity-10 dark:opacity-15 blur-2xl`} />
                </div>
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br ${svc.color} text-white mb-4 shadow-lg`}>
                  {svc.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{svc.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">{svc.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {svc.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA bar */}
        <Reveal delay={0.2} className="mt-16 rounded-2xl bg-linear-to-r from-cyan-500/10 to-violet-500/10 border border-gray-200 dark:border-white/10 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Have a project in mind?</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
              Let&apos;s talk about how I can help turn your idea into a shipped product.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 px-6 py-3 rounded-xl bg-linear-to-r from-cyan-500 to-violet-500 text-white font-semibold hover:brightness-110 transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 group"
          >
            Start a Conversation
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </Reveal>
      </div>
    </section>
  );
};

// ─── PROJECTS ────────────────────────────────────────────────────────────────

type Project = {
  media: string;
  mediaType: "video" | "image";
  title: string;
  description: string;
  tech: string[];
  badge: string;
  badgeColor: string;
  accentColor: string;
};

const projects: Project[] = [
  {
    media: "/image/bg-abstract.jpg",
    mediaType: "image",
    title: "Smart Appointment System",
    description:
      "A web-based appointment booking platform with real-time scheduling, automated email reminders, calendar sync, and an admin dashboard for managing bookings and client records.",
    tech: ["Next.js", "TypeScript", "MongoDB", "Nodemailer", "FullCalendar"],
    badge: "Booking System",
    badgeColor: "from-violet-500 to-fuchsia-500",
    accentColor: "border-violet-500/40",
  },
  {
    media: "/video/pos-desktop.mp4",
    mediaType: "video",
    title: "Restaurant POS System",
    description:
      "A modern restaurant point-of-sale with table management, menu ordering, kitchen display, real-time billing, and daily sales reports — built for fast-paced dining environments.",
    tech: ["React.js", "Node.js", "MySQL", "Socket.io", "WinForms"],
    badge: "Restaurant POS",
    badgeColor: "from-orange-500 to-amber-500",
    accentColor: "border-orange-500/40",
  },
  {
    media: "/image/bg-code.jpg",
    mediaType: "image",
    title: "Employee HRIS Portal",
    description:
      "A centralized HR information system for managing employee records, leave requests, payroll summaries, and org charts — with role-based dashboards for HR, managers, and staff.",
    tech: ["Next.js", "TypeScript", ".NET Core", "SQL Server", "JWT"],
    badge: "Coming Soon",
    badgeColor: "from-slate-500 to-gray-600",
    accentColor: "border-slate-500/40",
  },
];

const ProjectCard = ({ project }: { project: Project }) => (
  <div className={`group rounded-2xl bg-white dark:bg-white/3 border border-gray-200 dark:border-white/8 overflow-hidden hover:${project.accentColor} transition-all duration-300 hover:-translate-y-1 shadow-sm dark:shadow-none`}
  >
    {/* Media */}
    <div className="relative w-full h-52 overflow-hidden bg-black">
      {project.mediaType === "video" ? (
        <video
          src={project.media}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          autoPlay loop muted playsInline
        />
      ) : (
        <img
          src={project.media}
          alt={project.title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
      <span className={`absolute top-3 left-3 px-3 py-1 rounded-full bg-linear-to-r ${project.badgeColor} text-white text-xs font-semibold shadow-lg`}>
        {project.badge}
      </span>
    </div>

    <div className="p-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 text-xs"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const FeaturesSection = () => (
  <section id="projects" className="py-24 lg:py-32 bg-white dark:bg-[#080e1a] transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-6 lg:px-16">
      <Reveal className="text-center mb-16">
        <SectionLabel>My Work</SectionLabel>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-2">
          Featured{" "}
          <span className="bg-linear-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent">
            Projects
          </span>
        </h2>
        <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
          Real-world applications I&apos;ve built — from booking systems to enterprise management platforms.
        </p>
      </Reveal>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.12}>
        {projects.map((project, i) => (
          <StaggerItem key={i} direction="up">
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  </section>
);

// ─── CONTACT ─────────────────────────────────────────────────────────────────

const ContactSection = () => (
  <section id="contact" className="py-24 lg:py-32 bg-gray-50 dark:bg-[#050b14] relative overflow-hidden transition-colors duration-300">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-linear-to-b from-cyan-500/10 to-transparent blur-3xl pointer-events-none" />

    <div className="max-w-7xl mx-auto px-6 lg:px-16">
      <Reveal className="text-center mb-14">
        <SectionLabel>Get In Touch</SectionLabel>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-2">
          Ready to{" "}
          <span className="bg-linear-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent">
            Build Together?
          </span>
        </h2>
        <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
          Whether you have a project idea or just want to chat about tech — my inbox is always open.
        </p>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Contact info */}
        <Reveal direction="right" className="space-y-6">
          {[
            { icon: <Mail className="w-5 h-5" />, label: "Email", value: "palcelenard@gmail.com" },
            { icon: <Phone className="w-5 h-5" />, label: "Phone", value: "+63 935 253 6315" },
            { icon: <MapPin className="w-5 h-5" />, label: "Location", value: "Philippines" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-4">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-linear-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-white shadow-md">
                {item.icon}
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest">{item.label}</p>
                <p className="text-gray-900 dark:text-white font-medium">{item.value}</p>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-4 pt-4">
            {[
              { Icon: FaFacebook, href: "https://facebook.com" },
              { Icon: FaGithub, href: "https://github.com" },
              { Icon: FaLinkedin, href: "https://linkedin.com" },
            ].map(({ Icon, href }) => (
              <a key={href} href={href} target="_blank" rel="noreferrer"
                className="w-10 h-10 rounded-lg border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 hover:border-cyan-400/40 transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </Reveal>

        {/* Contact form */}
        <Reveal direction="left" delay={0.1}>
          <form
            className="rounded-2xl bg-white dark:bg-white/3 border border-gray-200 dark:border-white/8 p-6 sm:p-8 space-y-5 shadow-sm dark:shadow-none"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-widest mb-2">Name</label>
                <input type="text" placeholder="Name"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-widest mb-2">Email</label>
                <input type="email" placeholder="you@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-500/50 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-widest mb-2">Subject</label>
              <input type="text" placeholder="Project inquiry"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-widest mb-2">Message</label>
              <textarea rows={4} placeholder="Tell me about your project..."
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-500/50 transition-colors resize-none"
              />
            </div>
            <button type="submit"
              className="w-full py-3 rounded-xl bg-linear-to-r from-cyan-500 to-violet-500 text-white font-semibold hover:brightness-110 transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 group"
            >
              Send Message
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </Reveal>
      </div>
    </div>
  </section>
);

// ─── DEV PIPELINE ────────────────────────────────────────────────────────────

const pipeline = [
  {
    phase: "01",
    label: "Local Dev",
    icon: <Terminal className="w-5 h-5" />,
    color: "from-cyan-500 to-sky-500",
    glow: "shadow-cyan-500/30",
    border: "border-cyan-500/40",
    ring: "ring-cyan-500/20",
    title: "Code & Build",
    steps: ["Next.js / React dev server", "Feature branches (Git)", "TypeScript strict mode", "Local .env secrets"],
    tag: "localhost:3000",
  },
  {
    phase: "02",
    label: "Version Control",
    icon: <Github className="w-5 h-5" />,
    color: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/30",
    border: "border-violet-500/40",
    ring: "ring-violet-500/20",
    title: "GitHub",
    steps: ["Push to feature branch", "Pull Request review", "GitHub Actions CI runs", "Merge to main on pass"],
    tag: "github.com/lenardpalce",
  },
  {
    phase: "03",
    label: "CI / CD",
    icon: <RefreshCw className="w-5 h-5" />,
    color: "from-fuchsia-500 to-pink-500",
    glow: "shadow-fuchsia-500/30",
    border: "border-fuchsia-500/40",
    ring: "ring-fuchsia-500/20",
    title: "Automated Pipeline",
    steps: ["Lint & type-check", "Unit + integration tests", "Build artifact", "Deploy preview URL"],
    tag: "GitHub Actions",
  },
  {
    phase: "04",
    label: "Staging",
    icon: <PackageCheck className="w-5 h-5" />,
    color: "from-amber-400 to-orange-500",
    glow: "shadow-amber-500/30",
    border: "border-amber-500/40",
    ring: "ring-amber-500/20",
    title: "Preview Deploy",
    steps: ["Vercel preview branch", "QA smoke test", "Client review link", "Environment variables"],
    tag: "preview.vercel.app",
  },
  {
    phase: "05",
    label: "Production",
    icon: <Rocket className="w-5 h-5" />,
    color: "from-emerald-400 to-teal-500",
    glow: "shadow-emerald-500/30",
    border: "border-emerald-500/40",
    ring: "ring-emerald-500/20",
    title: "Live Release",
    steps: ["Merge main → prod", "Vercel / Azure deploy", "CDN cache invalidation", "Uptime monitoring"],
    tag: "yourdomain.com",
  },
];

const connectorColors = [
  "from-cyan-500 to-violet-500",
  "from-violet-500 to-fuchsia-500",
  "from-fuchsia-500 to-amber-400",
  "from-amber-400 to-emerald-400",
];

const DevPipelineSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pipeline" ref={ref} className="py-24 lg:py-32 bg-white dark:bg-[#080e1a] relative overflow-hidden transition-colors duration-300">

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,182,212,1) 1px,transparent 1px),linear-gradient(90deg,rgba(6,182,212,1) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-linear-to-b from-violet-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <SectionLabel>How I Ship</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-2">
            Development{" "}
            <span className="bg-linear-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent">
              Pipeline
            </span>
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Every project I deliver follows a structured release workflow — from local development to a
            live, monitored production environment. No shortcuts, no surprises.
          </p>
        </motion.div>

        {/* ── DESKTOP: horizontal timeline ── */}
        <div className="hidden lg:block">
          {/* Phase row */}
          <div className="relative flex items-start gap-0">
            {pipeline.map((step, i) => (
              <div key={i} className="relative flex-1 flex flex-col items-center">

                {/* Connector line between cards */}
                {i < pipeline.length - 1 && (
                  <div className="absolute top-[52px] left-[calc(50%+44px)] right-[calc(-50%+44px)] h-[2px] z-0">
                    <motion.div
                      className={`h-full bg-linear-to-r ${connectorColors[i]} rounded-full`}
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={inView ? { scaleX: 1 } : {}}
                      transition={{ duration: 0.6, delay: 0.3 + i * 0.18 }}
                    />
                    {/* Arrow head */}
                    <motion.div
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0"
                      style={{
                        borderTop: "5px solid transparent",
                        borderBottom: "5px solid transparent",
                        borderLeft: "7px solid",
                      }}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.85 + i * 0.18 }}
                    />
                  </div>
                )}

                {/* Node circle */}
                <motion.div
                  className={`relative z-10 w-[104px] h-[104px] rounded-full bg-linear-to-br ${step.color} flex items-center justify-center shadow-xl ${step.glow} ring-4 ${step.ring} ring-offset-2 ring-offset-white dark:ring-offset-[#080e1a]`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.15, type: "spring", stiffness: 200 }}
                >
                  <div className="flex flex-col items-center text-white gap-0.5">
                    {step.icon}
                    <span className="text-[10px] font-bold tracking-widest opacity-80">{step.phase}</span>
                  </div>
                </motion.div>

                {/* Card below node */}
                <motion.div
                  className={`mt-6 w-full max-w-[180px] rounded-2xl border ${step.border} bg-gray-50 dark:bg-white/3 p-4 text-center shadow-sm dark:shadow-none`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.15 }}
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">{step.label}</p>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                  <ul className="space-y-1.5 text-left">
                    {step.steps.map((s, j) => (
                      <li key={j} className="flex items-start gap-1.5">
                        <CheckCheck className="w-3 h-3 text-cyan-500 shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">{s}</span>
                      </li>
                    ))}
                  </ul>
                  {/* Tag */}
                  <div className="mt-3 px-2 py-1 rounded-md bg-gray-200/60 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                    <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400">{step.tag}</span>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* ── MOBILE / TABLET: vertical timeline ── */}
        <div className="lg:hidden relative">
          {/* Vertical line */}
          <div className="absolute left-[27px] top-0 bottom-0 w-[2px] bg-linear-to-b from-cyan-500/30 via-violet-500/30 to-emerald-500/30" />

          <div className="space-y-8">
            {pipeline.map((step, i) => (
              <motion.div
                key={i}
                className="relative flex items-start gap-5"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                {/* Node */}
                <div className={`relative z-10 shrink-0 w-14 h-14 rounded-full bg-linear-to-br ${step.color} flex items-center justify-center shadow-lg ${step.glow}`}>
                  <div className="flex flex-col items-center text-white gap-0">
                    {step.icon}
                    <span className="text-[9px] font-bold tracking-widest opacity-80 leading-tight">{step.phase}</span>
                  </div>
                </div>

                {/* Card */}
                <div className={`flex-1 rounded-2xl border ${step.border} bg-gray-50 dark:bg-white/3 p-4 shadow-sm dark:shadow-none`}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">{step.label}</p>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white">{step.title}</h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-gray-200/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {step.tag}
                    </span>
                  </div>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                    {step.steps.map((s, j) => (
                      <li key={j} className="flex items-start gap-1.5">
                        <CheckCheck className="w-3 h-3 text-cyan-500 shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Bottom stats bar ── */}
        <motion.div
          className="mt-16 rounded-2xl border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-white/2 p-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          {[
            { icon: <GitBranch className="w-5 h-5" />, value: "Feature Branches", label: "Clean Git flow" },
            { icon: <CloudUpload className="w-5 h-5" />, value: "Auto Deploy", label: "On every merge" },
            { icon: <Globe className="w-5 h-5" />, value: "CDN Hosted", label: "Global edge network" },
            { icon: <GitMerge className="w-5 h-5" />, value: "Zero Downtime", label: "Blue/green deploys" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/20 flex items-center justify-center text-cyan-500 dark:text-cyan-400">
                {stat.icon}
              </div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-xs text-gray-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ─── FOOTER ──────────────────────────────────────────────────────────────────

const Footer = () => (
  <footer className="bg-gray-100 dark:bg-[#030810] border-t border-gray-200 dark:border-white/5 py-8 transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-6 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-gray-400 dark:text-gray-600 text-sm">
        © {new Date().getFullYear()} Lenard Palce. All rights reserved.
      </p>
      <div className="flex items-center gap-2 text-gray-400 dark:text-gray-700 text-xs">
        <Code2 className="w-3 h-3 text-cyan-500 dark:text-cyan-600" />
        Built with Next.js &amp; TailwindCSS
      </div>
    </div>
  </footer>
);

// ─── ROOT ─────────────────────────────────────────────────────────────────────

const Index = () => (
  <ThemeProvider>
    <ScrollProgressBar />
    <div className="min-h-screen bg-gray-50 dark:bg-[#050b14] transition-colors duration-300">
      <Navigation />
      <HeroSection />
      <AboutMe />
      <ServicesSection />
      <FeaturesSection />
      <DevPipelineSection />
      <ContactSection />
      <Footer />
    </div>
  </ThemeProvider>
);

export default Index;
