"use client";

import { useEffect, useRef, useState } from "react";
import { getSlot } from "@/lib/slots";

type Props = {
  id: string;
  /** Caption shown while a slot is still awaiting photography. */
  placeholder?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
};

/**
 * Reproduces the framing the design tool stored per slot: the image is laid
 * out at its cover-fill baseline multiplied by the saved scale, then nudged by
 * the saved x/y offsets — all in frame-percent, so a responsive resize keeps
 * the same crop. With the default 1 / 0 / 0 framing this is exactly
 * `object-fit: cover`, so most slots take the cheap path.
 */
export default function ImageSlot({ id, placeholder, alt = "", className, priority }: Props) {
  const slot = getSlot(id);
  const frameRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{ w: number; h: number } | null>(null);
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);

  const framed = !!slot && (slot.s !== 1 || slot.x !== 0 || slot.y !== 0);

  useEffect(() => {
    if (!framed) return;
    const el = frameRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const r = entry.contentRect;
      setBox({ w: r.width, h: r.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [framed]);

  if (!slot) {
    return (
      <div
        className={className}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
          textAlign: "center",
          background: "rgba(127,127,127,.08)",
          color: "var(--color-neutral-600)",
          font: "13px/1.35 var(--font-body)",
        }}
      >
        {placeholder ? <span style={{ opacity: 0.75, maxWidth: "90%" }}>{placeholder}</span> : null}
      </div>
    );
  }

  const style: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  if (framed && box && natural && box.w > 0 && box.h > 0) {
    // Cover-fill baseline, then the saved view scale on top of it.
    const base = Math.max(box.w / natural.w, box.h / natural.h);
    const k = base * slot.s;
    Object.assign(style, {
      inset: "auto",
      width: `${((natural.w * k) / box.w) * 100}%`,
      height: `${((natural.h * k) / box.h) * 100}%`,
      left: `${50 + slot.x}%`,
      top: `${50 + slot.y}%`,
      transform: "translate(-50%, -50%)",
      maxWidth: "none",
      objectFit: "fill" as const,
    });
  }

  return (
    <div ref={frameRef} className={className} style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Plain <img>: these are pre-sized static assets and several are drawn
          into transformed/animated frames where the Next loader adds nothing. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={slot.src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={(e) => {
          if (!framed) return;
          const img = e.currentTarget;
          setNatural({ w: img.naturalWidth, h: img.naturalHeight });
        }}
        style={style}
      />
    </div>
  );
}
