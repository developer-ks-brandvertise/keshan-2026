"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import Container from "@/components/ui/Container";

const VIDEO_SRC = "/videos/scroll-video.mp4";

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);

export default function ScrollVideo() {
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playheadProgressRef = useRef(0);
  const scrollProgress = useMotionValue(0);
  const shouldReduce = useReducedMotion();

  const titleOpacity = useTransform(
    scrollProgress,
    [0, 0.12, 0.26, 0.4],
    [0, 1, 1, 0],
  );
  const titleY = useTransform(
    scrollProgress,
    [0, 0.12, 0.26, 0.4],
    [60, 0, 0, -60],
  );
  const descOpacity = useTransform(
    scrollProgress,
    [0.66, 0.72, 0.92, 0.99],
    [0, 1, 1, 0],
  );
  const descY = useTransform(
    scrollProgress,
    [0.66, 0.72, 0.92, 0.99],
    [60, 0, 0, -60],
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prepareVideo = () => {
      video.pause();
      if (video.currentTime === 0) {
        video.currentTime = 0.001;
      }
    };

    video.addEventListener("loadedmetadata", prepareVideo);
    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      prepareVideo();
    }

    return () => video.removeEventListener("loadedmetadata", prepareVideo);
  }, []);

  useEffect(() => {
    if (!containerEl || shouldReduce) return;

    const video = videoRef.current;
    if (!video) return;

    let frameId = 0;

    const update = () => {
      const rect = containerEl.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const startOffset = viewportHeight * 0.25;
      const scrollDistance = Math.max(
        rect.height - viewportHeight + startOffset,
        1,
      );
      const targetProgress = clamp((startOffset - rect.top) / scrollDistance);
      const progressDelta = targetProgress - playheadProgressRef.current;

      playheadProgressRef.current =
        Math.abs(progressDelta) < 0.0001
          ? targetProgress
          : playheadProgressRef.current + progressDelta * 0.22;

      scrollProgress.set(playheadProgressRef.current);

      if (
        video.readyState >= HTMLMediaElement.HAVE_METADATA &&
        Number.isFinite(video.duration) &&
        video.duration > 0
      ) {
        const targetTime = Math.min(
          playheadProgressRef.current * video.duration,
          Math.max(video.duration - 0.001, 0),
        );

        // Never interrupt an in-flight seek. Use fastSeek when available for
        // keyframe-aligned scrubbing; fall back to currentTime.
        const difference = targetTime - video.currentTime;
        if (!video.seeking && Math.abs(difference) > 0.015) {
          if ("fastSeek" in video && typeof video.fastSeek === "function") {
            video.fastSeek(targetTime);
          } else {
            video.currentTime = targetTime;
          }
        }
      }

      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [containerEl, scrollProgress, shouldReduce]);

  if (shouldReduce) {
    return (
      <section className="relative h-screen overflow-hidden bg-black">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          src={VIDEO_SRC}
          aria-hidden="true"
        />
        <TextContent />
      </section>
    );
  }

  return (
    <div ref={setContainerEl} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Replace object-cover with object-contain to show the complete frame. */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          src={VIDEO_SRC}
          aria-hidden="true"
        />

        <Container className="relative z-10 h-full px-4 text-center">
          <motion.div
            style={{ opacity: titleOpacity, y: titleY }}
            className="absolute inset-0 flex items-center justify-center px-4"
          >
            <h2 className="font-heading text-3xl font-medium leading-tight tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:text-4xl md:text-5xl lg:text-6xl">
              One Element. Infinite Possibilities.
            </h2>
          </motion.div>

          <motion.div
            style={{ opacity: descOpacity, y: descY }}
            className="absolute inset-0 flex items-center justify-center px-4"
          >
            <p className="mx-auto max-w-4xl font-heading text-2xl font-medium leading-tight tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:text-3xl md:text-4xl">
              Every connection begins with copper. At the atomic level, it possesses
              extraordinary conductivity and strength. Through heat, science, and
              precision, it transforms into the material that powers industries,
              infrastructure, and the technologies shaping tomorrow.
            </p>
          </motion.div>
        </Container>
      </div>
    </div>
  );
}

function TextContent() {
  return (
    <Container className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
      <h2 className="font-heading text-3xl font-medium leading-tight tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:text-4xl md:text-5xl lg:text-6xl">
        One Element. Infinite Possibilities.
      </h2>
      <p className="mx-auto mt-6 max-w-4xl font-heading text-2xl font-medium leading-tight tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:text-3xl md:text-4xl">
        Every connection begins with copper. At the atomic level, it possesses
        extraordinary conductivity and strength. Through heat, science, and precision,
        it transforms into the material that powers industries, infrastructure, and the
        technologies shaping tomorrow.
      </p>
    </Container>
  );
}
