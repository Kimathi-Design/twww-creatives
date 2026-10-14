"use client";

import type { CSSProperties, ReactElement, ReactNode } from "react";
import { Children, isValidElement, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Briefcase,
  BookOpen,
  CalendarDays,
  Car,
  ChefHat,
  Clock,
  Compass,
  Eye,
  FileText,
  Heart,
  Home,
  Layers,
  Lightbulb,
  Link2,
  List,
  Mail,
  MapPin,
  Megaphone,
  MessageCircle,
  MonitorSmartphone,
  MousePointerClick,
  Network,
  Newspaper,
  Phone,
  Play,
  Radio,
  RefreshCw,
  ExternalLink,
  Route,
  Share2,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Star,
  Target,
  Tv,
  Users,
  UsersRound,
  Utensils,
  VenusAndMars,
  Building2,
  Globe,
  ShieldCheck,
  Zap,
} from "lucide-react";
import {
  AUDIENCE,
  BRIEF,
  CLOSE,
  CONTACT,
  CONTEXTUAL,
  COVER,
  CREATIVE_DECIDE,
  CREATIVE_GAMES,
  CREATIVES_INTRO,
  CTV,
  EAST_AFRICA,
  IMAGES,
  INVENTORY_MARKETS,
  JOURNEY,
  KENYA,
  MEASURE,
  MOMENT,
  RESPONSE,
  SLIDE_COUNT,
  WHY,
} from "@/lib/ats-content";
import { standaloneBannerUrl } from "@/lib/ats-assets";
import "./ats.css";
import "./twww-brand.css";

type Tone = "hero" | "dark" | "light";
type Overlay =
  | "dark-left"
  | "dark-left-strong"
  | "dark-right"
  | "paper"
  | "paper-veil"
  | "navy"
  | "none";
type CopySide = "left" | "right" | "full";

const COUNT_UP_MS = 1200;

function parseStat(value: string): [string, number | null, string] {
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return ["", null, ""];
  return [match[1], Number(match[2]), match[3]];
}

function CountUpNumber({ value }: { value: string }) {
  const [prefix, target, suffix] = parseStat(value);
  const [shown, setShown] = useState(target);

  useEffect(() => {
    if (target === null) return;
    let frame = 0;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / COUNT_UP_MS, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(target * eased * 10) / 10);
      if (t < 1) frame = requestAnimationFrame(step);
    };
    setShown(0);
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  if (target === null || shown === null) {
    return <span className="ats-stat-num">{value}</span>;
  }
  const display =
    String(value).includes(".") && !Number.isInteger(shown)
      ? shown.toFixed(2).replace(/\.?0+$/, "")
      : String(Math.round(shown));
  return (
    <span className="ats-stat-num">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

function BrandLockup({
  size = "chrome",
  showMediaPal = false,
  mark = "coke",
}: {
  size?: "chrome" | "cover" | "nav";
  showMediaPal?: boolean;
  /** Chrome mark: Coke by default; MediaPal on Why MediaPal. */
  mark?: "coke" | "mediapal";
}) {
  if (mark === "mediapal") {
    return (
      <span
        className={`twww-brand twww-brand--${size} twww-brand--mp-only`}
        aria-label="MediaPal"
      >
        <img
          className="twww-brand__mp"
          src={IMAGES.mediapal}
          alt="MediaPal"
          decoding="async"
        />
      </span>
    );
  }

  return (
    <span
      className={`twww-brand twww-brand--${size}`}
      aria-label={showMediaPal ? "Coca-Cola · MediaPal" : "Coca-Cola"}
    >
      <img
        className="twww-brand__coke"
        src={IMAGES.coke}
        alt="Coca-Cola"
        decoding="async"
      />
      {showMediaPal ? (
        <>
          <span className="twww-brand__rule" aria-hidden />
          <img
            className="twww-brand__mp"
            src={IMAGES.mediapal}
            alt="MediaPal"
            decoding="async"
          />
        </>
      ) : null}
    </span>
  );
}

function useOneLineHeadings() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const measure = () => {
      for (const heading of root.querySelectorAll<HTMLElement>(".ats-display")) {
        const lineHeight = Number.parseFloat(getComputedStyle(heading).lineHeight);
        if (!lineHeight) continue;
        const lines = Math.round(heading.offsetHeight / lineHeight);
        heading.classList.toggle("ats-display--oneline", lines <= 1);
      }
    };
    measure();
    document.fonts?.ready.then(measure).catch(() => {});
  }, []);
  return ref;
}

function ProofPoints({
  items,
  layout = "stack",
  icons,
}: {
  items: readonly (string | { readonly label: string; readonly body: string })[];
  layout?: "stack" | "row" | "grid" | "values" | "glance";
  icons?: readonly LucideIcon[];
}) {
  const reduceMotion = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;
  const layoutClass =
    layout === "row"
      ? " ats-points--row"
      : layout === "grid"
        ? " ats-points--grid"
        : layout === "values"
          ? " ats-points--values"
          : layout === "glance"
            ? " ats-points--glance"
            : "";
  return (
    <ul className={`ats-points${layoutClass}`}>
      {items.map((line, i) => {
        const Icon = icons?.[i];
        const iconSize =
          layout === "values" || layout === "row" || layout === "glance" ? 32 : 22;
        const key = typeof line === "string" ? line : line.label;
        return (
          <motion.li
            key={key}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 14, x: reduceMotion ? 0 : -8 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{
              duration: 0.45,
              delay: reduceMotion ? 0 : 0.16 + i * 0.08,
              ease,
            }}
          >
            {Icon ? (
              <Icon className="ats-points__icon" size={iconSize} strokeWidth={1.75} aria-hidden />
            ) : (
              <span className="ats-points__mark" aria-hidden />
            )}
            {typeof line === "string" ? (
              <span>{line}</span>
            ) : layout === "glance" ? (
              <span className="ats-points__stack">
                <span className="ats-points__label">{line.label}</span>
                <span className="ats-points__body">{line.body}</span>
              </span>
            ) : (
              <span>
                <span className="ats-points__label">{line.label}:</span> {line.body}
              </span>
            )}
          </motion.li>
        );
      })}
    </ul>
  );
}

function Lede({
  eyebrow,
  title,
  body,
  titleClassName = "ats-display ats-display--mid",
}: {
  eyebrow: string;
  title: ReactNode;
  body?: string;
  titleClassName?: string;
}) {
  const reduceMotion = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;
  return (
    <div className="ats-lede">
      <motion.p
        className="ats-eyebrow"
        initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: reduceMotion ? 0 : 0.08, ease }}
      >
        {eyebrow}
      </motion.p>
      <h2 className={titleClassName}>
        {Children.map(title, (child, i) => {
          if (
            isValidElement<{ className?: string; children?: ReactNode }>(child) &&
            typeof child.props.className === "string" &&
            child.props.className.includes("ats-display__line")
          ) {
            return (
              <motion.span
                key={i}
                className={child.props.className}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.48,
                  delay: reduceMotion ? 0 : 0.16 + i * 0.09,
                  ease,
                }}
              >
                {child.props.children}
              </motion.span>
            );
          }
          return child;
        })}
      </h2>
      {body ? (
        <motion.p
          className="ats-body"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.42, ease }}
        >
          {body}
        </motion.p>
      ) : null}
    </div>
  );
}

function Pillars({
  pillars,
  icons,
  startNum = 1,
  feature,
}: {
  pillars: readonly { label: string; body: string }[];
  icons: readonly LucideIcon[];
  startNum?: number;
  feature?: { src: string; title: string; body: string; kicker?: string };
}) {
  const reduceMotion = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;
  return (
    <div className="ats-pillars" aria-label="Key points">
      {pillars.map((pillar, i) => {
        const Icon = icons[i];
        return (
          <motion.article
            className="ats-pillar"
            key={pillar.label}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.48,
              delay: reduceMotion ? 0 : 0.12 + i * 0.08,
              ease,
            }}
          >
            <span className="ats-pillar__num">
              {String(startNum + i).padStart(2, "0")}
            </span>
            <span className="ats-pillar__icon">
              <Icon size={32} strokeWidth={1.75} aria-hidden />
            </span>
            <h3 className="ats-pillar__label">{pillar.label}</h3>
            <p className="ats-pillar__body">{pillar.body}</p>
          </motion.article>
        );
      })}
      {feature ? (
        <motion.article
          className="ats-pillar ats-pillar--image"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 18, scale: reduceMotion ? 1 : 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.55,
            delay: reduceMotion ? 0 : 0.12 + pillars.length * 0.08,
            ease,
          }}
        >
          <img className="ats-pillar__media" src={feature.src} alt="" decoding="async" />
          <div className="ats-pillar__shade" aria-hidden />
          <div className="ats-pillar__feature">
            <p className="ats-pillar__kicker">{feature.kicker ?? "Featured"}</p>
            <h3 className="ats-pillar__feature-label">{feature.title}</h3>
            <p className="ats-pillar__feature-body">{feature.body}</p>
          </div>
        </motion.article>
      ) : null}
    </div>
  );
}

function PaxesCards({
  items,
  icons,
  images,
  startNum = 1,
  columns,
}: {
  items: readonly { label: string; body: ReactNode }[];
  icons: readonly LucideIcon[];
  images: readonly string[];
  startNum?: number;
  columns?: 3 | 4 | 5;
}) {
  const reduceMotion = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;
  const colsClass =
    columns === 5
      ? " ats-paxes-cards--five"
      : columns === 4
        ? " ats-paxes-cards--four"
        : "";

  return (
    <div className={`ats-paxes-cards${colsClass}`} aria-label="Feature cards">
      {items.map((item, i) => {
        const Icon = icons[i];
        return (
          <motion.article
            key={item.label}
            className="ats-paxes-card"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 + i * 0.1, ease }}
          >
            <img
              className="ats-paxes-card__media"
              src={images[i]}
              alt=""
              decoding="async"
            />
            <div className="ats-paxes-card__shade" aria-hidden />
            <div className="ats-paxes-card__content">
              <div className="ats-paxes-card__meta">
                <Icon
                  className="ats-paxes-card__icon"
                  size={columns === 5 ? 32 : 40}
                  strokeWidth={1.75}
                  aria-hidden
                />
                <span className="ats-paxes-card__rule" aria-hidden />
                <span className="ats-paxes-card__num">
                  {String(startNum + i).padStart(2, "0")}
                </span>
              </div>
              <h3 className="ats-paxes-card__label">{item.label}</h3>
              <p className="ats-paxes-card__body">{item.body}</p>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}

function JourneyMapCards({
  stages,
  stageIcons,
  pointIcons,
}: {
  stages: readonly {
    label: string;
    time: string;
    image: string;
    points: readonly string[];
  }[];
  stageIcons: readonly LucideIcon[];
  pointIcons: readonly (readonly LucideIcon[])[];
}) {
  const reduceMotion = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <div
      className="ats-paxes-cards ats-paxes-cards--five ats-journey-paxes"
      aria-label="Journey activation map"
    >
      {stages.map((stage, i) => {
        const StageIcon = stageIcons[i];
        const rowIcons = pointIcons[i] ?? [];
        return (
          <motion.article
            key={stage.label}
            className="ats-paxes-card"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 + i * 0.1, ease }}
          >
            <img
              className="ats-paxes-card__media"
              src={stage.image}
              alt=""
              decoding="async"
            />
            <div className="ats-paxes-card__shade" aria-hidden />
            <div className="ats-paxes-card__content">
              <div className="ats-journey-paxes__head">
                <div className="ats-paxes-card__meta">
                  <StageIcon
                    className="ats-paxes-card__icon"
                    size={36}
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <span className="ats-paxes-card__rule" aria-hidden />
                  <span className="ats-paxes-card__num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="ats-paxes-card__label">{stage.label}</h3>
                <p className="ats-journey-paxes__time">{stage.time}</p>
              </div>
              <ul className="ats-journey-paxes__points">
                {stage.points.map((point, pi) => {
                  const PointIcon = rowIcons[pi] ?? MapPin;
                  return (
                    <li key={point}>
                      <PointIcon
                        className="ats-journey-paxes__point-icon"
                        size={20}
                        strokeWidth={2}
                        aria-hidden
                      />
                      <span>{point}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}

const SECTION_BY_INDEX: Record<number, string> = {
  0: "PLAY & ENGAGE",
  1: "DECIDE & SHOP",
};

const SECTION_ICONS: Record<string, LucideIcon> = {
  "TWWW PROPOSAL": Sparkles,
  "01 / BRIEF": Compass,
  "02 / RESPONSE": Zap,
  "03 / JOURNEY": Route,
  "04 / AUDIENCE": Users,
  "05 / INVENTORY": Newspaper,
  "06 / ACTIVATION": Clock,
  "07 / CREATIVES": MousePointerClick,
  "DECIDE & SHOP": MousePointerClick,
  "PLAY & ENGAGE": MousePointerClick,
  "08 / WHY MEDIAPAL": Network,
  "09 / MEASUREMENT": Activity,
  "10 / CONTACT": Mail,
};

const TAGLINE = "THE WORLD WILL WAIT";

function SlideShell({
  index,
  tone,
  overlay = "none",
  image,
  imagePosition = "center",
  copySide = "left",
  children,
  hideChrome = false,
  footerRight,
  brandMark = "coke",
  bookend = false,
}: {
  index: number;
  tone: Tone;
  overlay?: Overlay;
  image?: string;
  imagePosition?: string;
  copySide?: CopySide;
  children: ReactNode;
  hideChrome?: boolean;
  footerRight?: string;
  brandMark?: "coke" | "mediapal";
  bookend?: boolean;
}) {
  const isBookend = bookend;
  const sectionRef = useOneLineHeadings();
  const reduceMotion = useReducedMotion();
  const section = SECTION_BY_INDEX[index];
  const SectionIcon = section ? SECTION_ICONS[section] : undefined;
  const sideClass =
    copySide === "right"
      ? "ats-content--right"
      : copySide === "left"
        ? "ats-content--left"
        : "";

  return (
    <section ref={sectionRef} className={`ats-slide ats-slide--${tone} ats-interactive`}>
      {image ? (
        <div className="ats-bg" aria-hidden>
          <img src={image} alt="" style={{ objectPosition: imagePosition }} />
        </div>
      ) : null}
      {overlay !== "none" ? (
        <div className={`ats-overlay ats-overlay--${overlay}`} aria-hidden />
      ) : null}
      <div className={`ats-content ${sideClass}`.trim()}>
        {!hideChrome ? (
          <header className="ats-chrome-top">
            {section && !isBookend ? (
              <span className="ats-eyebrow ats-chrome-section" style={{ margin: 0, opacity: 0.9 }}>
                {SectionIcon ? (
                  <SectionIcon className="ats-chrome-icon" size={20} strokeWidth={1.8} aria-hidden />
                ) : null}
                {section}
              </span>
            ) : (
              <span />
            )}
            <div className="ats-chrome-top__right">
              {!isBookend ? <BrandLockup mark={brandMark} /> : null}
            </div>
          </header>
        ) : null}

        <motion.div
          className={`ats-copy${copySide === "full" ? " ats-copy--full" : ""}`}
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.42, 0, 1, 1] }}
        >
          {children}
        </motion.div>

        {isBookend ? (
          <div className="ats-cover-logo-wrap">
            <span className="ats-cover-logo-wrap__rule" aria-hidden />
            <BrandLockup size="cover" showMediaPal />
          </div>
        ) : null}

        {!hideChrome && !isBookend ? (
          <footer className="ats-chrome-bottom">
            <span className="ats-chrome-bottom__label">
              <Briefcase className="ats-chrome-bottom__icon" size={14} strokeWidth={2} aria-hidden />
              TWWW Proposal
            </span>
            <span className="ats-chrome-bottom__rule" aria-hidden />
            <span className="ats-chrome-bottom__tagline">
              {footerRight ?? TAGLINE}
              <Sparkles className="ats-chrome-bottom__icon" size={14} strokeWidth={2} aria-hidden />
            </span>
          </footer>
        ) : null}
      </div>
    </section>
  );
}

/* ── SLIDES ──────────────────────────────────────────────── */

function SlideCover() {
  const reduceMotion = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <SlideShell
      index={0}
      tone="hero"
      overlay="dark-left-strong"
      image={IMAGES.cover}
      imagePosition="center"
      copySide="left"
      bookend
    >
      <div className="ats-cover-copy ats-cover-copy--cover">
        <motion.p
          className="ats-eyebrow"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: reduceMotion ? 0 : 0.1, ease }}
        >
          {COVER.eyebrow}
        </motion.p>
        <div className="ats-cover-lead">
          <h1 className="ats-display ats-display--cover">
            {COVER.titleLines.map((line, i) => (
              <motion.span
                key={line}
                className="ats-display__line"
                style={{ display: "block" }}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: reduceMotion ? 0 : 0.18 + i * 0.09,
                  ease,
                }}
              >
                {line.toUpperCase()}
              </motion.span>
            ))}
          </h1>
          <p className="ats-subhead">
            <motion.span
              className="ats-cover-subhead__line"
              style={{ display: "block" }}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.58, ease }}
            >
              {COVER.subhead.toUpperCase()}
            </motion.span>
          </p>
        </div>
      </div>
    </SlideShell>
  );
}

function SlideBrief() {
  return (
    <SlideShell
      index={1}
      tone="hero"
      overlay="dark-left-strong"
      image={IMAGES.brief}
      imagePosition="center right"
      copySide="full"
    >
      <div className="ats-brief">
        <div className="ats-brief__intro">
          <p className="ats-eyebrow">{BRIEF.eyebrow}</p>
          <h2 className="ats-display ats-display--compact ats-brief__title">
            {BRIEF.titleLines.map((line) => (
              <span key={line} className="ats-display__line">
                {line.toUpperCase()}
              </span>
            ))}
          </h2>
          <p className="ats-body ats-brief__lede">{BRIEF.lead}</p>
        </div>
        <ProofPoints
          layout="values"
          icons={[Users, Home, Clock, Utensils]}
          items={BRIEF.media}
        />
        <div className="ats-brief__stats">
          <div className="ats-stat-rail ats-stat-rail--3">
            {BRIEF.gap.map((s) => (
              <div key={s.label} className="ats-stat-block">
                <CountUpNumber value={s.value} />
                <span className="ats-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
          <div className="ats-stat-rail ats-stat-rail--4">
            {BRIEF.strip.map((s) => (
              <div key={s.label} className="ats-stat-block">
                <CountUpNumber value={s.value} />
                <span className="ats-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

function SlideResponse() {
  const icons = [Megaphone, RefreshCw, Heart] as const;
  return (
    <SlideShell
      index={2}
      tone="light"
      overlay="paper-veil"
      image={IMAGES.response}
      copySide="full"
      footerRight={RESPONSE.close}
    >
      <p className="ats-eyebrow">{RESPONSE.eyebrow}</p>
      <h2 className="ats-display ats-display--compact ats-display--oneline">
        {RESPONSE.title.toUpperCase()}
      </h2>
      <p className="ats-body ats-section-lede">{RESPONSE.lead}</p>
      <PaxesCards
        items={RESPONSE.jobs.map((j) => ({ label: j.title, body: j.body }))}
        icons={icons}
        images={RESPONSE.jobs.map((j) => j.image)}
      />
    </SlideShell>
  );
}

function SlideJourney() {
  const stageIcons = [Compass, ShoppingCart, ChefHat, Utensils, Share2] as const;
  const pointIcons = [
    [Radio, Home, Lightbulb],
    [MapPin, Smartphone, ShoppingCart],
    [BookOpen, Lightbulb, Utensils],
    [Tv, Home, Heart],
    [Users, MessageCircle, CalendarDays],
  ] as const;

  return (
    <SlideShell
      index={3}
      tone="light"
      overlay="paper-veil"
      image={IMAGES.journey}
      copySide="full"
      footerRight={JOURNEY.footer}
    >
      <p className="ats-eyebrow">{JOURNEY.eyebrow}</p>
      <h2 className="ats-display ats-display--compact ats-display--oneline">
        {JOURNEY.title.toUpperCase()}
      </h2>
      <p className="ats-body ats-section-lede">{JOURNEY.subhead}</p>
      <JourneyMapCards
        stages={JOURNEY.stages}
        stageIcons={stageIcons}
        pointIcons={pointIcons}
      />
    </SlideShell>
  );
}

function SlideAudience() {
  return (
    <SlideShell
      index={4}
      tone="light"
      overlay="paper-veil"
      image={IMAGES.audience}
      imagePosition="center right"
      copySide="full"
    >
      <div className="ats-audience-split">
        <div className="ats-reporting">
          <div className="ats-reporting__intro">
            <p className="ats-eyebrow">{AUDIENCE.eyebrow}</p>
            <h2 className="ats-display ats-display--compact ats-reporting-title">
              {AUDIENCE.title.toUpperCase()}
            </h2>
            <p className="ats-body ats-reporting__lede">{AUDIENCE.lead1}</p>
            <p className="ats-body ats-reporting__lede">{AUDIENCE.lead2}</p>
          </div>
          <ProofPoints
            layout="values"
            icons={[Heart, MapPin, BookOpen]}
            items={AUDIENCE.find}
          />
        </div>
        <div className="ats-audience-split__wheel" aria-hidden={false}>
          <AudienceIntelligenceWheel />
        </div>
      </div>
    </SlideShell>
  );
}

function AudienceIntelligenceWheel() {
  const reduceMotion = useReducedMotion();
  const signalIcons = [
    MapPin,
    Newspaper,
    Star,
    MonitorSmartphone,
    BookOpen,
    Clock,
    Utensils,
    ShoppingCart,
    VenusAndMars,
    UsersRound,
  ] as const;
  // 10 nodes, equal 36° steps, starting at top (0°)
  const nodeAngles = AUDIENCE.signals.map((_, i) => i * 36);
  // Keep red ring ticks on the dashed orbit but clear of labels  - 
  // nudge each tick along the arc to sit just above/below the copy.
  // Location (top) has no tick  -  its copy sits on that arc segment.
  const ringDotAngles = AUDIENCE.signals
    .map((_, i) => {
      const base = i * 36;
      const a = ((base % 360) + 360) % 360;
      const isTop = a <= 2 || a >= 358;
      if (isTop) return null;
      const isBottom = a >= 178 && a <= 182;
      const onRight = !isTop && !isBottom && a > 2 && a < 178;
      if (isBottom) return base - 14;
      return onRight ? base - 11 : base + 11;
    })
    .filter((angle): angle is number => angle != null);
  // Occasions on diagonals: TL, TR, BL, BR (Weekday BL / Christmas BR)
  const occasionAngles = [315, 45, 225, 135];

  return (
    <div className="ats-audience-wheel" aria-label={AUDIENCE.lockupTitle}>
      <div className="ats-audience-wheel__stage">
        <svg
          className="ats-audience-wheel__ring"
          viewBox="0 0 100 100"
          aria-hidden
        >
          <circle
            cx="50"
            cy="50"
            r="43.5"
            fill="none"
            stroke="var(--coke)"
            strokeWidth="0.32"
            strokeDasharray="0.9 1.55"
            opacity="0.88"
          />
          {ringDotAngles.map((angle) => {
            const rad = ((angle - 90) * Math.PI) / 180;
            const x = 50 + 43.5 * Math.cos(rad);
            const y = 50 + 43.5 * Math.sin(rad);
            return (
              <circle
                key={angle}
                cx={x}
                cy={y}
                r="0.85"
                fill="var(--coke)"
              />
            );
          })}
        </svg>

        <div className="ats-audience-wheel__core">
          <img
            className="ats-audience-wheel__hero"
            src={AUDIENCE.wheelHero}
            alt=""
            decoding="async"
          />
          <div className="ats-audience-wheel__hero-shade" aria-hidden />

          {AUDIENCE.occasions.map((occ, i) => (
            <div
              key={occ.label}
              className="ats-audience-wheel__occasion"
              style={{ "--a": `${occasionAngles[i]}deg` } as CSSProperties}
            >
              <motion.div
                className="ats-audience-wheel__occasion-inner"
                initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.45,
                  delay: reduceMotion ? 0 : 0.2 + i * 0.06,
                }}
              >
                <img src={occ.image} alt="" decoding="async" />
                <span className="ats-audience-wheel__occasion-label">
                  {occ.label.split(" ").map((word) => (
                    <span key={word}>{word.toUpperCase()}</span>
                  ))}
                </span>
              </motion.div>
            </div>
          ))}

          <div className="ats-audience-wheel__hub">
            <motion.div
              className="ats-audience-wheel__hub-inner"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.12 }}
            >
              <img
                className="ats-audience-wheel__hub-logo"
                src={IMAGES.coke}
                alt="Coca-Cola"
                decoding="async"
              />
              <p className="ats-audience-wheel__hub-title">
                Audience
                <br />
                Intelligence
              </p>
              <p className="ats-audience-wheel__hub-sub">{AUDIENCE.lockupSub}</p>
            </motion.div>
          </div>
        </div>

        {AUDIENCE.signals.map((signal, i) => {
          const Icon = signalIcons[i];
          const angle = nodeAngles[i];
          const a = ((angle % 360) + 360) % 360;
          const isPole = a <= 2 || a >= 358 || (a >= 178 && a <= 182);
          const onRight = !isPole && a > 2 && a < 178;
          const poleClass =
            a <= 2 || a >= 358
              ? " ats-audience-wheel__node--top"
              : a >= 178 && a <= 182
                ? " ats-audience-wheel__node--bottom"
                : "";
          return (
            <div
              key={signal.label}
              className={`ats-audience-wheel__node${
                isPole
                  ? poleClass
                  : onRight
                    ? " ats-audience-wheel__node--right"
                    : " ats-audience-wheel__node--left"
              }`}
              data-signal={signal.label}
              style={
                {
                  "--a": `${angle}deg`,
                  "--node-color": signal.color,
                } as CSSProperties
              }
            >
              <motion.div
                className="ats-audience-wheel__node-inner"
                initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: reduceMotion ? 0 : 0.28 + i * 0.04,
                }}
              >
                <span className="ats-audience-wheel__node-icon" aria-hidden>
                  <Icon size={22} strokeWidth={2.25} />
                </span>
                <span className="ats-audience-wheel__node-copy">
                  <strong>{signal.label}</strong>
                  <span>{signal.body}</span>
                </span>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SlideInventoryPublishers() {
  const pubIcons = [
    Utensils,
    Newspaper,
    Sparkles,
    Home,
    ChefHat,
    Play,
  ] as const;

  return (
    <SlideShell
      index={5}
      tone="light"
      overlay="paper-veil"
      image={IMAGES.kenya}
      copySide="full"
    >
      <div className="ats-inventory-split">
        <div className="ats-inventory-split__copy">
          <p className="ats-eyebrow">{KENYA.eyebrow}</p>
          <h2 className="ats-display ats-display--compact">
            {KENYA.title.toUpperCase()}
          </h2>
          <p className="ats-inventory-split__global">{KENYA.global}</p>
          <p className="ats-body ats-section-lede">{KENYA.lead}</p>
          <ProofPoints
            layout="values"
            icons={[Newspaper, Clock, Layers, Tv, MapPin]}
            items={KENYA.unlocks}
          />
        </div>
        <div className="ats-inventory-split__pubs">
          <p className="ats-eyebrow" style={{ marginBottom: 10 }}>
            {KENYA.subhead}
          </p>
          <PaxesCards
            items={KENYA.publishers.map((p) => ({
              label: p.name,
              body: (
                <>
                  {p.cat} ·
                  <br />
                  {p.line}
                </>
              ),
            }))}
            icons={pubIcons}
            images={KENYA.publishers.map((p) => p.image)}
          />
        </div>
      </div>
    </SlideShell>
  );
}

function MarketReachCards({
  markets,
}: {
  markets: typeof INVENTORY_MARKETS;
}) {
  const reduceMotion = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;
  const marketIcons = [MapPin, Globe, MapPin] as const;

  return (
    <div
      className="ats-paxes-cards ats-market-reach"
      aria-label="Market inventory reach"
    >
      {markets.map((market, i) => {
        const Icon = marketIcons[i];
        const metrics = [
          { value: market.impressions, label: "Impressions", Icon: Eye },
          { value: market.reach, label: "Unique reach", Icon: Users },
          ...(market.devices
            ? [
                {
                  value: market.devices,
                  label: "Unique devices",
                  Icon: Smartphone,
                },
              ]
            : []),
        ] as const;

        return (
          <motion.article
            key={market.name}
            className="ats-paxes-card"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: reduceMotion ? 0 : 0.12 + i * 0.1,
              ease,
            }}
          >
            <img
              className="ats-paxes-card__media"
              src={market.image}
              alt=""
              decoding="async"
            />
            <div className="ats-paxes-card__shade" aria-hidden />
            <div className="ats-paxes-card__content">
              <div className="ats-paxes-card__meta">
                <Icon
                  className="ats-paxes-card__icon"
                  size={40}
                  strokeWidth={1.75}
                  aria-hidden
                />
                <span className="ats-paxes-card__rule" aria-hidden />
                <span className="ats-paxes-card__num">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="ats-paxes-card__label">
                {market.name}
                <br />
                inventory reach
              </h3>
              <div
                className={`ats-market-reach__metrics ats-market-reach__metrics--${metrics.length}`}
              >
                {metrics.map((m) => (
                  <div key={m.label} className="ats-market-reach__metric">
                    <m.Icon
                      className="ats-market-reach__metric-icon"
                      size={28}
                      strokeWidth={2}
                      aria-hidden
                    />
                    <CountUpNumber value={m.value} />
                    <span>{m.label}</span>
                  </div>
                ))}
              </div>
              <span className="ats-market-reach__rule" aria-hidden />
              <div className="ats-market-reach__demo">
                <div className="ats-market-reach__demo-col ats-market-reach__demo-col--gender">
                  <p className="ats-market-reach__demo-label">
                    <Users
                      className="ats-market-reach__demo-icon"
                      size={24}
                      strokeWidth={2}
                      aria-hidden
                    />
                    Gender
                  </p>
                  <ul>
                    {market.gender.map((g) => (
                      <li key={g.label}>
                        <span>{g.label}</span>
                        <strong>{g.value}</strong>
                      </li>
                    ))}
                  </ul>
                  <div className="ats-market-reach__map-row">
                    <img
                      className="ats-market-reach__map"
                      src={market.map}
                      alt=""
                      decoding="async"
                      aria-hidden
                    />
                    <span className="ats-market-reach__map-code">
                      {market.code}
                    </span>
                  </div>
                </div>
                <span className="ats-market-reach__demo-rule" aria-hidden />
                <div className="ats-market-reach__demo-col ats-market-reach__demo-col--age">
                  <p className="ats-market-reach__demo-label">
                    <CalendarDays
                      className="ats-market-reach__demo-icon"
                      size={24}
                      strokeWidth={2}
                      aria-hidden
                    />
                    Age
                  </p>
                  <ul>
                    {market.age.map((a) => (
                      <li key={a.label}>
                        <span>{a.label}</span>
                        <strong>{a.value}</strong>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}

function SlideInventoryMarkets() {
  return (
    <SlideShell
      index={6}
      tone="light"
      overlay="paper-veil"
      image={IMAGES.markets}
      copySide="full"
      footerRight={EAST_AFRICA.footer}
    >
      <p className="ats-eyebrow">Inventory · Kenya · Tanzania · Uganda</p>
      <h2 className="ats-display ats-display--compact ats-display--oneline">
        MARKET INVENTORY REACH
      </h2>
      <p className="ats-body ats-section-lede">{EAST_AFRICA.lead}</p>
      <MarketReachCards markets={INVENTORY_MARKETS} />
    </SlideShell>
  );
}

function ActivationStrip({
  items,
  icons,
  label,
}: {
  items: readonly { label: string; body: string }[];
  icons: readonly LucideIcon[];
  label: string;
}) {
  return (
    <ul className="ats-moment-strip" aria-label={label}>
      {items.map((item, i) => {
        const Icon = icons[i];
        return (
          <li key={item.label} className="ats-moment-strip__item">
            {i > 0 ? (
              <span className="ats-moment-strip__sep" aria-hidden>
                |
              </span>
            ) : null}
            <Icon
              className="ats-moment-strip__icon"
              size={18}
              strokeWidth={2.25}
              aria-hidden
            />
            <strong>{item.body.replace(/\.$/, "")}</strong>
          </li>
        );
      })}
    </ul>
  );
}

function SlideMoment() {
  const icons = [Briefcase, Car, Home, CalendarDays] as const;
  const stripIcons = [Zap, Clock, MapPin, Utensils] as const;
  return (
    <SlideShell
      index={7}
      tone="hero"
      overlay="dark-left-strong"
      image={IMAGES.moment}
      copySide="full"
      footerRight={MOMENT.close}
    >
      <p className="ats-eyebrow">{MOMENT.eyebrow}</p>
      <h2 className="ats-display ats-display--compact ats-display--oneline">
        {MOMENT.title.toUpperCase()}
      </h2>
      <p className="ats-body ats-section-lede">
        {MOMENT.subhead}. {MOMENT.lead1}
      </p>
      <p className="ats-body ats-section-lede ats-activation-lede-2">
        {MOMENT.lead2}
      </p>
      <div className="ats-moment-paxes">
        <PaxesCards
          items={MOMENT.moments.map((m) => ({ label: m.label, body: m.body }))}
          icons={icons}
          images={MOMENT.moments.map((m) => m.image)}
          columns={4}
        />
      </div>
      <ActivationStrip
        items={MOMENT.strip}
        icons={stripIcons}
        label="Moment Ads principles"
      />
    </SlideShell>
  );
}

function SlideContextual() {
  const icons = [Target, Utensils, Heart, ShieldCheck] as const;
  const stripIcons = [Clock, BookOpen, Newspaper, Utensils] as const;
  return (
    <SlideShell
      index={8}
      tone="hero"
      overlay="dark-left-strong"
      image={IMAGES.contextual}
      copySide="full"
      footerRight={CONTEXTUAL.close}
    >
      <p className="ats-eyebrow">{CONTEXTUAL.eyebrow}</p>
      <h2 className="ats-display ats-display--compact ats-display--oneline">
        {CONTEXTUAL.title.toUpperCase()}
      </h2>
      <p className="ats-body ats-section-lede">
        {CONTEXTUAL.subhead}. {CONTEXTUAL.lead1}
      </p>
      <p className="ats-body ats-section-lede ats-activation-lede-2">
        {CONTEXTUAL.lead2}
      </p>
      <div className="ats-moment-paxes">
        <PaxesCards
          items={CONTEXTUAL.cards.map((c) => ({
            label: c.label,
            body: c.body,
          }))}
          icons={icons}
          images={CONTEXTUAL.cards.map((c) => c.image)}
          columns={4}
        />
      </div>
      <ActivationStrip
        items={CONTEXTUAL.strip}
        icons={stripIcons}
        label="Contextual principles"
      />
    </SlideShell>
  );
}

function SlideCtv() {
  const icons = [Tv, Play, Home, ShieldCheck] as const;
  const stripIcons = [Clock, Users, Target, Utensils] as const;
  return (
    <SlideShell
      index={9}
      tone="hero"
      overlay="dark-left-strong"
      image={IMAGES.ctv}
      copySide="full"
      footerRight={CTV.close}
    >
      <p className="ats-eyebrow">{CTV.eyebrow}</p>
      <h2 className="ats-display ats-display--compact ats-display--oneline">
        {CTV.title.toUpperCase()}
      </h2>
      <p className="ats-body ats-section-lede">
        {CTV.subhead} {CTV.lead1}
      </p>
      <p className="ats-body ats-section-lede ats-activation-lede-2">
        {CTV.lead2}
      </p>
      <div className="ats-moment-paxes">
        <PaxesCards
          items={CTV.cards.map((c) => ({ label: c.label, body: c.body }))}
          icons={icons}
          images={CTV.cards.map((c) => c.image)}
          columns={4}
        />
      </div>
      <ActivationStrip
        items={CTV.strip}
        icons={stripIcons}
        label="Connected TV principles"
      />
    </SlideShell>
  );
}

/** Creatives framing copy, then blank canvas for live banners */
function SlideCreativesDecideBrief() {
  return (
    <SlideShell
      index={10}
      tone="hero"
      overlay="dark-left-strong"
      image={IMAGES.creativesIntro}
      copySide="left"
      footerRight={CREATIVES_INTRO.close}
      brandMark="mediapal"
    >
      <p className="ats-eyebrow">{CREATIVES_INTRO.eyebrow}</p>
      <h2 className="ats-display ats-display--compact">
        {CREATIVES_INTRO.title.toUpperCase()}
      </h2>
      <p className="ats-subhead">{CREATIVES_INTRO.subhead}</p>
      <p className="ats-body ats-section-lede">{CREATIVES_INTRO.lead1}</p>
      <p className="ats-body ats-section-lede" style={{ marginTop: 16 }}>
        {CREATIVES_INTRO.lead2}
      </p>
      <ProofPoints
        layout="values"
        icons={[MousePointerClick, Link2, RefreshCw, Route]}
        items={CREATIVES_INTRO.points}
      />
    </SlideShell>
  );
}

type LiveBanner = {
  label: string;
  type: string;
  use: string;
  src: string;
  frameWidth?: number;
  frameHeight?: number;
  align?: "top" | "bottom" | "center";
};

/** Intrinsic iframe size (may be taller than the visible clip). */
function bannerFrameSize(banner: {
  frameWidth?: number;
  frameHeight?: number;
}) {
  return {
    width: banner.frameWidth ?? 320,
    height: banner.frameHeight ?? 480,
  };
}

/** Visible stage size in the canvas (clipped when align is set). */
function bannerStageSize(banner: {
  frameWidth?: number;
  frameHeight?: number;
  align?: "top" | "bottom" | "center";
}) {
  const frame = bannerFrameSize(banner);
  return {
    width: frame.width,
    height: banner.align ? 480 : frame.height,
  };
}

function bannerFrameStyle(banner: {
  frameWidth?: number;
  frameHeight?: number;
  align?: "top" | "bottom" | "center";
}): CSSProperties | undefined {
  const frame = bannerFrameSize(banner);
  if (frame.width === 320 && frame.height === 480 && !banner.align) {
    return undefined;
  }
  const stageH = 480;
  const offsetY =
    banner.align === "bottom"
      ? stageH - frame.height
      : banner.align === "center"
        ? (stageH - frame.height) / 2
        : 0;
  return {
    width: frame.width,
    height: frame.height,
    transform: offsetY !== 0 ? `translateY(${offsetY}px)` : undefined,
  };
}

function LiveBannerCanvas({
  banners,
}: {
  banners: readonly LiveBanner[];
}) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const captionReserve = 128;

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    const update = () => {
      const styles = getComputedStyle(el);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || "22") || 22;
      const padX =
        (Number.parseFloat(styles.paddingLeft) || 0) +
        (Number.parseFloat(styles.paddingRight) || 0);
      const h = Math.max(el.clientHeight - captionReserve, 120);
      const w = el.clientWidth - padX;
      const n = Math.max(banners.length, 1);
      const stages = banners.map((b) => bannerStageSize(b));
      const maxH = Math.max(...stages.map((s) => s.height), 480);
      const sumW = stages.reduce((a, s) => a + s.width, 0);
      const next = Math.min(h / maxH, (w - gap * (n - 1)) / sumW, 1);
      setScale(Number.isFinite(next) && next > 0 ? next : 1);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [banners]);

  // Adopt preloaded iframes so creatives stay warm without remounting.
  useEffect(() => {
    const canvas = canvasRef.current;
    const host = document.querySelector(".twww-banner-preload");
    if (!canvas || !host) return;

    const mounts = canvas.querySelectorAll<HTMLElement>(
      "[data-banner-mount]"
    );
    const frames = Array.from(
      host.querySelectorAll<HTMLIFrameElement>("iframe[data-banner-src]")
    );

    mounts.forEach((mount) => {
      const src = mount.dataset.bannerMount;
      const frame = frames.find((f) => f.dataset.bannerSrc === src);
      if (frame) mount.appendChild(frame);
    });

    return () => {
      frames.forEach((frame) => {
        if (!host.contains(frame)) host.appendChild(frame);
      });
    };
  }, [banners]);

  return (
    <>
      <div className="twww-banner-title-spacer" aria-hidden />
      <div
        ref={canvasRef}
        className="twww-banner-canvas"
        aria-label="Live banner creatives"
      >
        {banners.map((banner) => {
          const stage = bannerStageSize(banner);
          const standalone = standaloneBannerUrl(banner.src);
          return (
            <div
              key={banner.src}
              className="twww-banner-canvas__slot"
              style={{ width: stage.width * scale }}
            >
              <div
                className="twww-banner-canvas__frame-wrap"
                style={{ height: stage.height * scale }}
              >
                <div
                  className="twww-banner-canvas__scale"
                  style={{
                    width: stage.width,
                    height: stage.height,
                    transform: `scale(${scale})`,
                  }}
                  data-banner-mount={banner.src}
                />
              </div>
              <div className="twww-banner-canvas__caption">
                <strong>{banner.type}</strong>
                <span>{banner.use}</span>
                <a
                  className="twww-banner-open"
                  href={standalone}
                  data-banner-standalone={standalone}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink
                    className="twww-banner-open__icon"
                    aria-hidden
                  />
                  Open
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

/** Block click-outs / popups inside preview iframes; keep in-banner interaction. */
function installBannerClickGuard(frame: HTMLIFrameElement) {
  if (frame.dataset.clickGuard === "1") return;
  frame.dataset.clickGuard = "1";
  const apply = () => {
    try {
      const win = frame.contentWindow;
      const doc = frame.contentDocument;
      if (!win || !doc) return;
      win.open = (() => null) as typeof win.open;
      const blockNav = (e: Event) => {
        const t = e.target as Element | null;
        const a = t?.closest?.("a[href]") as HTMLAnchorElement | null;
        if (!a) return;
        const href = a.getAttribute("href") || "";
        if (!href || href.startsWith("#") || href.startsWith("javascript:")) return;
        e.preventDefault();
        e.stopPropagation();
      };
      doc.addEventListener("click", blockNav, true);
      const guardNested = () => {
        doc.querySelectorAll("iframe").forEach((nested) => {
          installBannerClickGuard(nested as HTMLIFrameElement);
        });
      };
      guardNested();
      const mo = new MutationObserver(guardNested);
      mo.observe(doc.documentElement, { childList: true, subtree: true });
    } catch {
      /* ignore */
    }
  };
  frame.addEventListener("load", apply);
  if (frame.contentDocument?.readyState === "complete") apply();
}

/** Warm live HTML creatives before creatives slides. */
export function LiveBannerPreload({
  banners,
}: {
  banners: readonly {
    label: string;
    src: string;
    frameWidth?: number;
    frameHeight?: number;
    align?: "top" | "bottom" | "center";
  }[];
}) {
  return (
    <div className="twww-banner-preload" aria-hidden>
      {banners.map((banner) => (
        <iframe
          key={banner.src}
          data-banner-src={banner.src}
          className="twww-banner-canvas__frame"
          src={banner.src}
          title={`Preload ${banner.label}`}
          loading="eager"
          tabIndex={-1}
          referrerPolicy="no-referrer-when-downgrade"
          allow="autoplay"
          sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock"
          style={bannerFrameStyle(banner)}
          ref={(el) => {
            if (el) installBannerClickGuard(el);
          }}
        />
      ))}
    </div>
  );
}

function SlideCreativesDecide() {
  return (
    <SlideShell
      index={1}
      tone="light"
      overlay="paper"
      image={IMAGES.creativesDecide}
      copySide="full"
      footerRight={CREATIVE_DECIDE.footer}
    >
      <LiveBannerCanvas banners={CREATIVE_DECIDE.banners} />
    </SlideShell>
  );
}

function SlideCreativesGames() {
  return (
    <SlideShell
      index={0}
      tone="light"
      overlay="paper"
      image={IMAGES.creativesDecide}
      copySide="full"
      footerRight={CREATIVE_GAMES.footer}
    >
      <LiveBannerCanvas banners={CREATIVE_GAMES.banners} />
    </SlideShell>
  );
}

function SlideWhy() {
  const icons = [Route, Globe, Zap, Network] as const;
  return (
    <SlideShell
      index={13}
      tone="hero"
      overlay="dark-left-strong"
      image={IMAGES.next}
      imagePosition="center right"
      copySide="full"
      brandMark="mediapal"
    >
      <p className="ats-eyebrow">{WHY.eyebrow}</p>
      <h2 className="ats-display ats-display--compact">
        {WHY.title.toUpperCase()}
      </h2>
      <p className="ats-body ats-section-lede">
        {WHY.lead1} {WHY.lead2}
      </p>
      <div className="ats-moment-paxes">
        <PaxesCards
          items={WHY.cards.map((c) => ({ label: c.label, body: c.body }))}
          icons={icons}
          images={WHY.cards.map((c) => c.image)}
          columns={4}
        />
      </div>
    </SlideShell>
  );
}

function SlideMeasure() {
  const icons = [
    Users,
    Utensils,
    Globe,
    Heart,
    MonitorSmartphone,
    Tv,
    Target,
    MapPin,
  ] as const;
  return (
    <SlideShell
      index={14}
      tone="light"
      overlay="paper-veil"
      image={IMAGES.measure}
      copySide="full"
      brandMark="mediapal"
    >
      <p className="ats-eyebrow">{MEASURE.eyebrow}</p>
      <h2 className="ats-display ats-display--compact ats-display--oneline">
        {MEASURE.title.toUpperCase()}
      </h2>
      <p className="ats-body ats-section-lede">{MEASURE.lede}</p>
      <div className="ats-measure-paxes">
        <PaxesCards
          items={MEASURE.track.map((t) => ({
            label: t.label,
            body: t.body,
          }))}
          icons={icons}
          images={MEASURE.track.map((t) => t.image)}
          columns={4}
        />
      </div>
    </SlideShell>
  );
}

function SlideClose() {
  const reduceMotion = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;
  const lines = [
    { icon: Mail, label: "Email", value: CONTACT.email },
    { icon: Globe, label: "Website", value: CONTACT.website },
    {
      icon: Building2,
      label: "Head office",
      value: CONTACT.address.join(", "),
    },
    ...(CONTACT.phones.length > 0
      ? [
          {
            icon: Phone,
            label: "Telephone",
            value: CONTACT.phones.join(
              "\u00A0\u00A0\u00A0\u00A0|\u00A0\u00A0\u00A0\u00A0",
            ),
          },
        ]
      : []),
  ];

  return (
    <SlideShell
      index={15}
      tone="hero"
      overlay="dark-left-strong"
      image={IMAGES.contact}
      imagePosition="center right"
      copySide="left"
      bookend
    >
      <div className="ats-cover-copy ats-cover-copy--contact">
        <motion.p
          className="ats-eyebrow"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: reduceMotion ? 0 : 0.08, ease }}
        >
          {CLOSE.eyebrow}
        </motion.p>
        <div className="ats-contact-lead">
          <h2 className="ats-display ats-display--mid ats-display--stack3">
            {CLOSE.titleLines.map((line, i) => (
              <motion.span
                key={line}
                className="ats-display__line"
                initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.48,
                  delay: reduceMotion ? 0 : 0.14 + i * 0.08,
                  ease,
                }}
              >
                {line}
              </motion.span>
            ))}
          </h2>
          <motion.p
            className="ats-subhead ats-subhead--contact"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.32, ease }}
          >
            {CLOSE.lead}
          </motion.p>
          <div className="ats-contact-lines">
            {lines.map((line, i) => {
              const Icon = line.icon;
              return (
                <motion.div
                  className="ats-contact-line"
                  key={line.label}
                  initial={{
                    opacity: 0,
                    y: reduceMotion ? 0 : 16,
                    x: reduceMotion ? 0 : -10,
                  }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{
                    duration: 0.42,
                    delay: reduceMotion ? 0 : 0.42 + i * 0.08,
                    ease,
                  }}
                >
                  <span className="ats-contact-line__icon">
                    <Icon size={30} strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="ats-contact-line__text">
                    <span className="ats-contact-line__label">{line.label}</span>
                    <span className="ats-contact-line__value">{line.value}</span>
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

const SLIDES = [SlideCreativesGames, SlideCreativesDecide];

export function renderAtsSlide(index: number): ReactElement {
  const Slide = SLIDES[index] ?? SlideCover;
  return <Slide />;
}

export const ATS_SLIDE_COUNT = SLIDE_COUNT;
