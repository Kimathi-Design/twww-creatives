"use client";

import type {
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { MotionConfig } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  X,
} from "lucide-react";
import { DeckNavProvider } from "@/ats/DeckNavContext";
import { AtsProgressBar } from "@/ats/AtsProgressBar";
import { LiveBannerPreload, renderAtsSlide } from "@/ats/AtsSlides";
import {
  CREATIVE_DECIDE,
  CREATIVE_GAMES,
  SLIDE_COUNT,
  SLIDE_H as SLIDE_HEIGHT,
  SLIDE_W as SLIDE_WIDTH,
} from "@/lib/ats-content";
import "./ats.css";
import "./twww-brand.css";

const TOTAL_SLIDES = SLIDE_COUNT;
const FIT_MARGIN = 28;
const MOBILE_BREAKPOINT = 640;
/** How long the mobile presenting controls linger after a touch. */
const CONTROLS_HIDE_MS = 2600;
/** Height kept clear at the bottom for the floating full screen controls. */
const FS_CONTROLS_RESERVE = 84;
const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
/** Zoom applied by a double click / double tap. */
const QUICK_ZOOM = 2;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Phones and tablets need the touch presenting layer regardless of width  -  a
 * handset in landscape reports well over the mobile breakpoint, and hover-only
 * controls are unreachable without a pointer.
 */
function isTouchDevice() {
  return window.matchMedia("(pointer: coarse) and (hover: none)").matches;
}

function computeDeckScale(
  navHeight: number,
  container?: HTMLElement | null,
  options?: {
    margin?: number;
    rotated?: boolean;
    /** When set, fit to this box (already excludes nav) instead of the full viewer. */
    area?: HTMLElement | null;
  },
) {
  // Prefer the layout container / stage area  -  never visualViewport. Android
  // Chrome collapses the URL bar and thrashing visualViewport rescales the
  // artboard, which shifts flex/absolute content and makes motion look glitchy.
  const rect =
    options?.area?.getBoundingClientRect() ??
    container?.getBoundingClientRect();
  const viewportW = rect?.width || window.innerWidth;
  const viewportH = rect?.height || window.innerHeight;
  const margin = options?.margin ?? FIT_MARGIN;
  // Rotating swaps the axes, so the controls strip eats into the viewport
  // width rather than its height.
  if (options?.rotated) {
    const availW = viewportW - navHeight - margin * 2;
    const availH = viewportH - margin * 2;
    return Math.min(availH / SLIDE_WIDTH, availW / SLIDE_HEIGHT);
  }
  // Stage area is already the free flex region (nav/progress excluded).
  const reserve = options?.area ? 0 : navHeight;
  const availW = Math.max(0, viewportW - margin * 2);
  const availH = Math.max(0, viewportH - reserve - margin * 2);
  return Math.min(availW / SLIDE_WIDTH, availH / SLIDE_HEIGHT);
}

export function AtsViewer() {
  const [current, setCurrent] = useState(0);
  const [scale, setScale] = useState<number | null>(null);
  const coverReady = true;
  const deckReady = true;
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [stageInset, setStageInset] = useState(24);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const stageAreaRef = useRef<HTMLDivElement>(null);
  /** Live pointers on the stage, keyed by pointerId, for pinch tracking. */
  const pointersRef = useRef(new Map<number, { x: number; y: number }>());
  const pinchRef = useRef<{ dist: number; zoom: number } | null>(null);
  const dragRef = useRef<{
    x: number;
    y: number;
    panX: number;
    panY: number;
  } | null>(null);
  const zoomRef = useRef(1);
  const panRef = useRef({ x: 0, y: 0 });
  zoomRef.current = zoom;
  panRef.current = pan;

  const goTo = useCallback((index: number) => {
    setCurrent(Math.max(0, Math.min(TOTAL_SLIDES - 1, index)));
  }, []);

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  /** Stops a magnified slide from being dragged away from the viewport. */
  const clampPan = useCallback(
    (next: { x: number; y: number }, nextZoom: number) => {
      const rect = stageAreaRef.current?.getBoundingClientRect();
      const stageW = SLIDE_WIDTH * (scale ?? 1);
      const stageH = SLIDE_HEIGHT * (scale ?? 1);
      const availW = rect?.width ?? window.innerWidth;
      const availH = rect?.height ?? window.innerHeight;
      const maxX = Math.max(0, (stageW * nextZoom - availW) / 2);
      const maxY = Math.max(0, (stageH * nextZoom - availH) / 2);
      return {
        x: clamp(next.x, -maxX, maxX),
        y: clamp(next.y, -maxY, maxY),
      };
    },
    [scale],
  );

  const resetZoom = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  /** Zooms toward a screen point so the content under it stays put. */
  const zoomAt = useCallback(
    (nextZoom: number, clientX?: number, clientY?: number) => {
      const from = zoomRef.current;
      const to = clamp(nextZoom, MIN_ZOOM, MAX_ZOOM);
      if (to === from) return;
      if (to === MIN_ZOOM) {
        resetZoom();
        return;
      }
      const rect = stageAreaRef.current?.getBoundingClientRect();
      const current = panRef.current;
      let nextPan = current;
      if (rect && clientX !== undefined && clientY !== undefined) {
        const centreX = rect.left + rect.width / 2 + current.x;
        const centreY = rect.top + rect.height / 2 + current.y;
        const ratio = to / from;
        nextPan = {
          x: current.x + (clientX - centreX) * (1 - ratio),
          y: current.y + (clientY - centreY) * (1 - ratio),
        };
      }
      setZoom(to);
      setPan(clampPan(nextPan, to));
    },
    [clampPan, resetZoom],
  );

  /** Devices that refuse an orientation lock get the deck rotated in CSS. */
  const isRotated = isFullscreen && isMobile && isPortrait;
  const mobilePresenting = isFullscreen && isMobile;

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await containerRef.current?.requestFullscreen?.();
      // Android/Chrome can rotate the device itself; iOS rejects this and
      // falls back to the CSS rotation below.
      try {
        const orientation = screen.orientation as ScreenOrientation & {
          lock?: (o: string) => Promise<void>;
        };
        await orientation?.lock?.("landscape");
      } catch {
        /* orientation lock unsupported  -  CSS rotation handles it */
      }
    } else {
      try {
        screen.orientation?.unlock?.();
      } catch {
        /* nothing to unlock */
      }
      await document.exitFullscreen?.();
    }
  }, []);

  useEffect(() => {
    if (!(isFullscreen && isMobile)) {
      setControlsVisible(true);
      return;
    }
    const container = containerRef.current;
    if (!container) return;
    let timer: number | undefined;
    const reveal = () => {
      setControlsVisible(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(
        () => setControlsVisible(false),
        CONTROLS_HIDE_MS,
      );
    };
    reveal();
    container.addEventListener("pointerdown", reveal);
    container.addEventListener("touchstart", reveal, { passive: true });
    container.addEventListener("mousemove", reveal);
    return () => {
      window.clearTimeout(timer);
      container.removeEventListener("pointerdown", reveal);
      container.removeEventListener("touchstart", reveal);
      container.removeEventListener("mousemove", reveal);
    };
  }, [isFullscreen, isMobile, current]);

  useEffect(() => {
    const sync = () => setIsFullscreen(Boolean(document.fullscreenElement));
    sync();
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(TOTAL_SLIDES - 1);
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      } else if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        zoomAt(zoomRef.current + 0.5);
      } else if (e.key === "-" || e.key === "_") {
        e.preventDefault();
        zoomAt(zoomRef.current - 0.5);
      } else if (e.key === "0") {
        e.preventDefault();
        resetZoom();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, goTo, toggleFullscreen, zoomAt, resetZoom]);

  // Ctrl/⌘ + wheel and trackpad pinch both arrive as a ctrlKey wheel event.
  useEffect(() => {
    const area = stageAreaRef.current;
    if (!area) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const step = Math.exp(-e.deltaY / 260);
      zoomAt(zoomRef.current * step, e.clientX, e.clientY);
    };
    area.addEventListener("wheel", onWheel, { passive: false });
    return () => area.removeEventListener("wheel", onWheel);
  }, [zoomAt]);

  // Zoom is per-slide: leaving a slide or the full screen state resets it.
  useEffect(() => {
    resetZoom();
  }, [current, isFullscreen, resetZoom]);

  const centreOf = (points: { x: number; y: number }[]) => ({
    x: (points[0].x + points[1].x) / 2,
    y: (points[0].y + points[1].y) / 2,
  });

  const onStagePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const points = [...pointersRef.current.values()];
    if (points.length === 2) {
      dragRef.current = null;
      pinchRef.current = {
        dist: Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y),
        zoom: zoomRef.current,
      };
    } else if (points.length === 1 && zoomRef.current > 1) {
      e.currentTarget.setPointerCapture(e.pointerId);
      dragRef.current = {
        x: e.clientX,
        y: e.clientY,
        panX: panRef.current.x,
        panY: panRef.current.y,
      };
    }
  };

  const onStagePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointersRef.current.has(e.pointerId)) return;
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const points = [...pointersRef.current.values()];

    if (points.length === 2 && pinchRef.current) {
      const dist = Math.hypot(
        points[0].x - points[1].x,
        points[0].y - points[1].y,
      );
      if (pinchRef.current.dist > 0) {
        const mid = centreOf(points);
        const next = pinchRef.current.zoom * (dist / pinchRef.current.dist);
        zoomAt(next, mid.x, mid.y);
      }
      return;
    }

    const drag = dragRef.current;
    if (drag && zoomRef.current > 1) {
      setPan(
        clampPan(
          {
            x: drag.panX + (e.clientX - drag.x),
            y: drag.panY + (e.clientY - drag.y),
          },
          zoomRef.current,
        ),
      );
    }
  };

  const endStagePointer = (e: ReactPointerEvent<HTMLDivElement>) => {
    pointersRef.current.delete(e.pointerId);
    if (pointersRef.current.size < 2) pinchRef.current = null;
    if (pointersRef.current.size === 0) dragRef.current = null;
  };

  const onStageDoubleClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (zoomRef.current > 1) resetZoom();
    else zoomAt(QUICK_ZOOM, e.clientX, e.clientY);
  };

  useLayoutEffect(() => {
    const updateScale = () => {
      const mobile = isTouchDevice() || window.innerWidth < MOBILE_BREAKPOINT;
      const portrait = window.innerHeight > window.innerWidth;
      setIsMobile(mobile);
      setIsPortrait(portrait);
      const rotated = isFullscreen && mobile && portrait;
      // Mobile full screen overlays its controls, so nothing is reserved.
      const navHeight = isFullscreen
        ? mobile
          ? 0
          : FS_CONTROLS_RESERVE
        : (navRef.current?.offsetHeight ?? 56);
      // Mobile: edge-to-edge (full width in portrait, full height in landscape).
      // Desktop keeps the letterbox margin. Artboard layout/animation unchanged.
      const nextScale = computeDeckScale(navHeight, containerRef.current, {
        margin: mobile ? 0 : FIT_MARGIN,
        rotated,
        area: rotated ? null : stageAreaRef.current,
      });
      setScale(nextScale);
      // Keep the nav's outer edges flush with the slide stage.
      const stageWidth = SLIDE_WIDTH * nextScale;
      setStageInset(
        Math.max(
          ((containerRef.current?.clientWidth ?? window.innerWidth) -
            stageWidth) /
            2,
          mobile ? 0 : 12,
        ),
      );
    };
    updateScale();
    const raf = requestAnimationFrame(updateScale);
    const ro = new ResizeObserver(updateScale);
    if (containerRef.current) ro.observe(containerRef.current);
    if (navRef.current) ro.observe(navRef.current);
    if (stageAreaRef.current) ro.observe(stageAreaRef.current);
    window.addEventListener("resize", updateScale);
    window.addEventListener("orientationchange", updateScale);
    document.addEventListener("fullscreenchange", updateScale);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", updateScale);
      window.removeEventListener("orientationchange", updateScale);
      document.removeEventListener("fullscreenchange", updateScale);
    };
  }, [isFullscreen]);

  return (
    <MotionConfig reducedMotion="never">
      <DeckNavProvider value={{ goTo, current }}>
        <div
          ref={containerRef}
          className="ats-viewer deck-viewer fixed inset-0 z-[60] flex flex-col bg-[#f5f7fb]"
        >
      <div className="flex min-h-0 flex-1 flex-col">
      {scale !== null && !isRotated && (
        <div className={deckReady ? undefined : "invisible"}>
          <AtsProgressBar current={current} total={TOTAL_SLIDES} />
        </div>
      )}
      {scale !== null && isRotated && (
        <div
          className={`ats-fs-progress-layer${deckReady ? "" : " invisible"}`}
        >
          <AtsProgressBar current={current} total={TOTAL_SLIDES} />
        </div>
      )}
      <div
        ref={stageAreaRef}
        className={`ats-stage-area relative flex flex-1 items-center justify-center overflow-hidden${
          zoom > 1 ? " is-zoomed" : ""
        }`}
        style={
          isFullscreen && !isMobile
            ? { paddingBottom: FS_CONTROLS_RESERVE }
            : undefined
        }
        onPointerDown={onStagePointerDown}
        onPointerMove={onStagePointerMove}
        onPointerUp={endStagePointer}
        onPointerCancel={endStagePointer}
        onPointerLeave={endStagePointer}
        onDoubleClick={onStageDoubleClick}
      >
        {scale !== null && deckReady && (
          <div
            className="deck-stage-host"
            style={{
              width: SLIDE_WIDTH * scale,
              height: SLIDE_HEIGHT * scale,
              transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})${
                isRotated ? " rotate(90deg)" : ""
              }`,
              transformOrigin: "center center",
            }}
          >
            <div
              className="deck-stage-scaler deck-fixed-layout"
              style={{
                width: SLIDE_WIDTH,
                height: SLIDE_HEIGHT,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
            >
              <div
                key={current}
                className={`ats-interactive deck-stage h-full w-full${
                  isMobile
                    ? ""
                    : " rounded-lg shadow-[0_24px_80px_-20px_rgba(13,15,26,0.18)]"
                }`}
              >
                {renderAtsSlide(current)}
              </div>
              {coverReady ? (
                <LiveBannerPreload
                  banners={[
                    ...CREATIVE_DECIDE.banners,
                    ...CREATIVE_GAMES.banners,
                  ]}
                />
              ) : null}
            </div>
          </div>
        )}
      </div>

      {zoom > 1 && deckReady && (
        <button
          type="button"
          className="ats-zoom-chip"
          onClick={resetZoom}
          aria-label="Reset zoom"
        >
          <Minimize2 className="h-3.5 w-3.5" />
          {Math.round(zoom * 100)}%
        </button>
      )}

      {mobilePresenting && deckReady && (
        <div
          className={`ats-fs-layer${isRotated ? " ats-fs-layer--rotated" : ""}${
            controlsVisible ? " is-visible" : ""
          }`}
        >
          <button
            type="button"
            className="ats-fs-edge ats-fs-edge--prev"
            onClick={prev}
            disabled={current === 0}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            className="ats-fs-edge ats-fs-edge--next"
            onClick={next}
            disabled={current === TOTAL_SLIDES - 1}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <button
            type="button"
            className="ats-fs-close"
            onClick={toggleFullscreen}
            aria-label="Exit full screen"
          >
            <X className="h-5 w-5" />
          </button>
          <span className="ats-fs-count tabular-nums">
            {String(current + 1).padStart(2, "0")} / {TOTAL_SLIDES}
          </span>
        </div>
      )}

      {isFullscreen && !isMobile && deckReady && (
        <div className="ats-fs-controls">
          <button
            type="button"
            onClick={prev}
            disabled={current === 0}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="tabular-nums">
            {String(current + 1).padStart(2, "0")} / {TOTAL_SLIDES}
          </span>
          <button
            type="button"
            onClick={next}
            disabled={current === TOTAL_SLIDES - 1}
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label="Exit full screen"
            title="Exit full screen (F or Esc)"
          >
            <Minimize2 className="h-4 w-4" />
          </button>
        </div>
      )}

      <nav
        ref={navRef}
        aria-label="Proposal navigation"
        className={`${isFullscreen ? "hidden" : "flex"} min-h-[60px] shrink-0 items-center gap-2 border-t border-[rgba(230,26,39,0.14)] bg-white/95 px-3 py-3 sm:gap-4 ${
          deckReady ? "" : "pointer-events-none invisible"
        }`}
        style={
          isMobile
            ? undefined
            : { paddingLeft: stageInset, paddingRight: stageInset }
        }
      >
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Exit full screen" : "Enter full screen"}
            title={
              isFullscreen
                ? "Exit full screen (F or Esc)"
                : "Present full screen (F) - hides this bar"
            }
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[rgba(19,45,122,0.12)] bg-white transition hover:bg-[#f5f7fb] sm:h-9 sm:w-9"
            style={{ color: "rgba(25,41,87,0.68)" }}
          >
            {isFullscreen ? (
              <Minimize2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            ) : (
              <Maximize2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            )}
          </button>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={prev}
              disabled={current === 0}
              aria-label="Previous slide"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[rgba(19,45,122,0.12)] bg-white transition hover:bg-[#f5f7fb] disabled:opacity-30 sm:h-9 sm:w-9"
              style={{ color: "rgba(25,41,87,0.68)" }}
            >
              <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
            <span
              className="min-w-[48px] whitespace-nowrap text-center text-[11px] tabular-nums sm:min-w-[72px] sm:text-[13px]"
              style={{ color: "rgba(25,41,87,0.68)" }}
            >
              {String(current + 1).padStart(2, "0")} / {TOTAL_SLIDES}
            </span>
            <button
              type="button"
              onClick={next}
              disabled={current === TOTAL_SLIDES - 1}
              aria-label="Next slide"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[rgba(19,45,122,0.12)] bg-white transition hover:bg-[#f5f7fb] disabled:opacity-30 sm:h-9 sm:w-9"
              style={{ color: "rgba(25,41,87,0.68)" }}
            >
              <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>
      </nav>
      </div>
        </div>
      </DeckNavProvider>
    </MotionConfig>
  );
}
