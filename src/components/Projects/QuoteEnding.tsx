"use client";

import styled, { css, keyframes } from "styled-components";

import React from "react";

type QuoteEndingProps = {
  /** Altura del bloque (ej. "60vh", "480px") */
  height?: string;
  /** Opacidad global de las ondas (0–1) */
  opacity?: number;
  /** Velocidad relativa: 1 = normal, >1 más rápido, <1 más lento */
  speed?: number;
  /** Desenfoque global extra (px) aplicado al SVG completo */
  globalBlur?: number;
  /** Desenfoque por capa (px) */
  layerBlur?: number;
  /** Paleta de 3–6 colores para las ondas (usa alpha) */
  colors?: string[];
  /** Cantidad de ondas (3–6 recomendado) */
  waves?: number;
  className?: string;
  style?: React.CSSProperties;
};

const waveX = keyframes`
  0%   { transform: translateX(0) rotate(0.001deg); }
  100% { transform: translateX(-8%) rotate(0.001deg); }
`;

const floatY = keyframes`
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(10px); }
`;

const Wrap = styled.section<{ $h: string }>`
  position: relative;
  width: 100%;
  height: ${({ $h }) => $h};
  overflow: hidden;
  isolation: isolate;

  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
    }
  }
`;

const Canvas = styled.svg<{ $opacity: number; $gblur: number }>`
  position: absolute;
  inset: 0;
  width: 160%;
  height: 120%;
  left: -10%;
  top: -10%;
  opacity: ${({ $opacity }) => $opacity};
  ${({ $gblur }) =>
    $gblur > 0 &&
    css`
      filter: blur(${$gblur}px);
    `}
  pointer-events: none;
`;

const Layer = styled.g<{
  $dur: number;
  $delay: number;
  $dir?: "normal" | "reverse";
}>`
  animation: ${waveX} ${({ $dur }) => $dur}s linear infinite;
  animation-direction: ${({ $dir }) => $dir || "normal"};
  animation-delay: ${({ $delay }) => `${$delay}s`};
`;

const Soft = styled.g<{ $dur: number; $delay: number }>`
  animation: ${floatY} ${({ $dur }) => $dur}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => `${$delay}s`};
`;

const QuoteEnding: React.FC<QuoteEndingProps> = ({
  height = "60vh",
  opacity = 0.9,
  speed = 1,
  globalBlur = 0, // blur global opcional sobre todo el SVG
  layerBlur = 22, // blur por capa
  colors = [
    "rgba(99,102,241,0.40)", // indigo
    "rgba(249,115,22,0.32)", // orange
    "rgba(147,51,234,0.30)", // purple
    "rgba(34,197,94,0.28)", // emerald
  ],
  waves = 4,
  className,
  style,
}) => {
  // Duraciones base por capa (más variación = más organic)
  const baseDur = [22, 18, 26, 20, 28, 24].map((d) => d / speed);
  const delays = [-4, -7, -10, -13, -16, -19];

  // Algunas curvas (d) para variar alturas y “amplitud” de las ondas
  const paths = [
    "M0,220 C160,180 320,260 480,220 C640,180 800,80 960,120 C1120,160 1280,280 1440,220 L1440,360 L0,360 Z",
    "M0,240 C120,280 300,160 480,200 C660,240 880,320 1080,220 C1240,150 1320,180 1440,240 L1440,360 L0,360 Z",
    "M0,200 C140,160 260,230 420,210 C620,180 760,160 960,190 C1140,220 1320,260 1440,220 L1440,360 L0,360 Z",
    "M0,260 C100,300 280,220 460,230 C680,240 900,300 1080,210 C1260,140 1340,170 1440,200 L1440,360 L0,360 Z",
    "M0,210 C180,190 320,240 520,200 C720,160 860,130 1040,180 C1240,240 1340,260 1440,230 L1440,360 L0,360 Z",
    "M0,230 C160,270 300,210 520,220 C740,230 920,280 1100,220 C1280,170 1380,190 1440,230 L1440,360 L0,360 Z",
  ];

  const take = Math.max(3, Math.min(waves, 6)); // clamp 3..6
  const layers = new Array(take).fill(0).map((_, i) => ({
    color: colors[i % colors.length],
    d: paths[i % paths.length],
    dur: baseDur[i % baseDur.length],
    delay: delays[i % delays.length],
    dir: i % 2 === 0 ? ("normal" as const) : ("reverse" as const),
    floatDur: 7 + (i % 3) * 2, // 7,9,11...
    floatDelay: (i * -1.3) % 10,
  }));

  const blurId = "soft-blur";

  return (
    <Wrap
      $h={height}
      className={className}
      style={style}
      aria-label="Animated Waves Background"
    >
      <Canvas
        $opacity={opacity}
        $gblur={globalBlur}
        viewBox="0 0 1440 360"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <filter id={blurId}>
            <feGaussianBlur stdDeviation={layerBlur} />
          </filter>
        </defs>

        {layers.map((L, idx) => (
          <Layer key={idx} $dur={L.dur} $delay={L.delay} $dir={L.dir}>
            <Soft $dur={L.floatDur} $delay={L.floatDelay}>
              <path d={L.d} fill={L.color} filter={`url(#${blurId})`} />
            </Soft>
          </Layer>
        ))}
      </Canvas>
    </Wrap>
  );
};

export default QuoteEnding;
