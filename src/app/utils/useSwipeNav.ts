"use client";

import { RefObject, useEffect, useRef } from "react";

type SwipeNavOptions = {
  enabled?: boolean;
  onSwipeLeft?: () => void; // dedo se mueve a la izquierda
  onSwipeRight?: () => void; // dedo se mueve a la derecha
  minDistance?: number; // px mínimos para considerar swipe
  maxVerticalDelta?: number; // tolerancia vertical en px
};

export function useSwipeNav<T extends HTMLElement>(
  ref: RefObject<T | null>,
  {
    enabled = true,
    onSwipeLeft,
    onSwipeRight,
    minDistance = 64,
    maxVerticalDelta = 48,
  }: SwipeNavOptions = {}
) {
  const startX = useRef(0);
  const startY = useRef(0);
  const tracking = useRef(false);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return; // ignora multi-touch
      const t = e.touches[0];
      startX.current = t.clientX;
      startY.current = t.clientY;
      tracking.current = true;
      fired.current = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!tracking.current || fired.current) return;
      const t = e.touches[0];
      const dx = t.clientX - startX.current;
      const dy = t.clientY - startY.current;

      // si se movió mucho en vertical, priorizamos scroll y cancelamos swipe
      if (Math.abs(dy) > maxVerticalDelta) {
        tracking.current = false;
        return;
      }

      if (Math.abs(dx) >= minDistance) {
        fired.current = true;
        tracking.current = false;
        if (dx > 0) {
          onSwipeRight?.();
        } else {
          onSwipeLeft?.();
        }
      }
    };

    const onTouchEnd = () => {
      tracking.current = false;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [ref, enabled, onSwipeLeft, onSwipeRight, minDistance, maxVerticalDelta]);
}
