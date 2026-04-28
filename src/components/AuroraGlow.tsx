"use client";

import React from "react";

type AuroraGlowProps = {
  opacity?: number;
  blobSize?: number;
  speed?: number;
  colors?: string[];
  extraBlur?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

const ANIMS = ["aurora-f1", "aurora-f2", "aurora-f3", "aurora-f2", "aurora-f1"] as const;
const TRANSLATES = [
  "translate(-25%, -20%)",
  "translate(20%, -10%)",
  "translate(-10%, 15%)",
  "translate(10%, 5%)",
  "translate(-5%, -5%)",
];

export const AuroraGlow: React.FC<AuroraGlowProps> = ({
  opacity = 0.9,
  blobSize = 560,
  speed = 1,
  colors = ["#fb923c", "#2563eb", "#fdba74"],
  extraBlur = false,
  className,
  style,
}) => {
  const palette = colors.slice(0, 5);
  const durations = [22, 28, 26, 32, 24].map((d) => d / speed);
  const delays = [-2, -6, -4, -8, -10];

  return (
    <>
      <style>{`
        @keyframes aurora-f1 {
          0%   { transform: translate(-20%, -20%) scale(1); }
          50%  { transform: translate(15%, 10%) scale(1.15); }
          100% { transform: translate(-20%, -20%) scale(1); }
        }
        @keyframes aurora-f2 {
          0%   { transform: translate(20%, -10%) scale(1.05); }
          50%  { transform: translate(-10%, 15%) scale(0.9); }
          100% { transform: translate(20%, -10%) scale(1.05); }
        }
        @keyframes aurora-f3 {
          0%   { transform: translate(-5%, 15%) scale(0.95) rotate(0deg); }
          50%  { transform: translate(10%, -10%) scale(1.1) rotate(10deg); }
          100% { transform: translate(-5%, 15%) scale(0.95) rotate(0deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .aurora-blob { animation: none !important; }
        }
      `}</style>
      <div
        className={`relative w-full h-full overflow-hidden bg-transparent ${className ?? ""}`}
        style={{
          opacity,
          filter: extraBlur ? "blur(0.2px)" : "none",
          willChange: "transform, opacity, filter",
          ...style,
        }}
      >
        {palette.map((color, i) => (
          <span
            key={i}
            className="aurora-blob absolute inset-0 m-auto rounded-full pointer-events-none"
            style={{
              width: blobSize,
              height: blobSize,
              background: `radial-gradient(circle at 30% 30%, ${color} 0%, transparent 60%)`,
              filter: "blur(60px)",
              animation: `${ANIMS[i % ANIMS.length]} ${durations[i % durations.length]}s ease-in-out infinite`,
              animationDelay: `${delays[i % delays.length]}s`,
              transform: TRANSLATES[i % TRANSLATES.length],
              transformOrigin: "center",
            }}
          />
        ))}
      </div>
    </>
  );
};

export default AuroraGlow;
