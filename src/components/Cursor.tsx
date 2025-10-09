"use client";

import { useEffect, useState } from "react";

import styled from "styled-components";

const CircleEl = styled.div<{ $active: boolean; $x: number; $y: number }>`
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  color: #111;
  border: 2px solid currentColor;
  background: rgba(255, 255, 255, 0.06);

  transform: translate3d(${({ $x }) => $x}px, ${({ $y }) => $y}px, 0)
    scale(${({ $active }) => ($active ? 1 : 0.85)});
  opacity: ${({ $active }) => ($active ? 1 : 0)};

  transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 180ms ease-out, color 180ms ease-out,
    background-color 180ms ease-out;
  will-change: transform, opacity;
  z-index: 2147483647;

  @supports (mix-blend-mode: difference) {
    mix-blend-mode: difference;
    color: #fff;
    background: transparent;
  }

  @media (pointer: coarse), (hover: none) {
    display: none;
  }
`;

export default function Cursor({ active }: { active: boolean }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX - 30, y: e.clientY - 30 });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return <CircleEl $active={active} $x={pos.x} $y={pos.y} />;
}
