"use client";

import { useEffect, useRef } from "react";
import { ADSTERRA } from "@/lib/ads";
import { AdSlot } from "./AdSlot";

type AdsterraNativeProps = {
  className?: string;
};

export function AdsterraNative({ className = "" }: AdsterraNativeProps) {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    const existing = document.querySelector(
      `script[src="${ADSTERRA.native.scriptSrc}"]`,
    );
    if (existing) return;

    const script = document.createElement("script");
    script.async = true;
    script.dataset.cfasync = "false";
    script.src = ADSTERRA.native.scriptSrc;
    document.body.appendChild(script);
  }, []);

  return (
    <AdSlot className={`w-full ${className}`}>
      <div
        id={ADSTERRA.native.containerId}
        className="min-h-[90px] w-full max-w-3xl"
      />
    </AdSlot>
  );
}
