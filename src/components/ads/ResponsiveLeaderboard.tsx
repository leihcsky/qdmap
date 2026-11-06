"use client";

import { useEffect, useState } from "react";
import { ADSTERRA } from "@/lib/ads";
import { AdsterraBanner } from "./AdsterraBanner";

/**
 * Desktop 728x90 / mobile 320x50 — mount only one to avoid wasted requests.
 */
export function ResponsiveLeaderboard({ className = "" }: { className?: string }) {
  const [mode, setMode] = useState<"desktop" | "mobile" | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setMode(mq.matches ? "desktop" : "mobile");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  if (!mode) {
    return (
      <div
        className={`mx-auto flex min-h-[50px] items-center justify-center md:min-h-[90px] ${className}`}
        aria-hidden
      />
    );
  }

  if (mode === "desktop") {
    return (
      <AdsterraBanner
        adKey={ADSTERRA.banner728x90.key}
        width={ADSTERRA.banner728x90.width}
        height={ADSTERRA.banner728x90.height}
        scriptSrc={ADSTERRA.banner728x90.scriptSrc}
        className={`py-3 ${className}`}
      />
    );
  }

  return (
    <AdsterraBanner
      adKey={ADSTERRA.banner320x50.key}
      width={ADSTERRA.banner320x50.width}
      height={ADSTERRA.banner320x50.height}
      scriptSrc={ADSTERRA.banner320x50.scriptSrc}
      className={`py-3 ${className}`}
    />
  );
}
