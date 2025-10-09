"use client";

import styled, { keyframes } from "styled-components";

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

/* Animaciones */
const float1 = keyframes`
  0%   { transform: translate(-20%, -20%) scale(1); }
  50%  { transform: translate(15%, 10%) scale(1.15); }
  100% { transform: translate(-20%, -20%) scale(1); }
`;
const float2 = keyframes`
  0%   { transform: translate(20%, -10%) scale(1.05); }
  50%  { transform: translate(-10%, 15%) scale(0.9); }
  100% { transform: translate(20%, -10%) scale(1.05); }
`;
const float3 = keyframes`
  0%   { transform: translate(-5%, 15%) scale(0.95) rotate(0deg); }
  50%  { transform: translate(10%, -10%) scale(1.1) rotate(10deg); }
  100% { transform: translate(-5%, 15%) scale(0.95) rotate(0deg); }
`;

const Wrapper = styled.div<{ $opacity: number; $extraBlur: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: transparent;
  will-change: transform, opacity, filter;
  opacity: ${({ $opacity }) => $opacity};
  filter: ${({ $extraBlur }) => ($extraBlur ? "blur(0.2px)" : "none")};
`;

const Blob = styled.span<{
  $size: number;
  $color: string;
  $duration: number;
  $delay: number;
  $anim: "f1" | "f2" | "f3";
}>`
  position: absolute;
  inset: 0;
  margin: auto;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  pointer-events: none;

  background: radial-gradient(
    circle at 30% 30%,
    ${({ $color }) => $color} 0%,
    transparent 60%
  );

  mix-blend-mode: screen;
  filter: blur(40px);

  animation: ${({ $anim }) =>
      $anim === "f1" ? float1 : $anim === "f2" ? float2 : float3}
    ${({ $duration }) => $duration}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  transform-origin: center;

  &:nth-child(1) {
    transform: translate(-25%, -20%);
  }
  &:nth-child(2) {
    transform: translate(20%, -10%);
  }
  &:nth-child(3) {
    transform: translate(-10%, 15%);
  }
  &:nth-child(4) {
    transform: translate(10%, 5%);
  }
  &:nth-child(5) {
    transform: translate(-5%, -5%);
  }
`;

export const AuroraGlowYellow: React.FC<AuroraGlowProps> = ({
  opacity = 0.9,
  blobSize = 560,
  speed = 1,
  colors = ["#8EC5FF", "#e1bff7", "#d6ae0e", "#ffffff"],
  extraBlur = false,
  className,
  style,
}) => {
  const palette = colors.slice(0, 5);
  const durations = [
    22 / speed,
    28 / speed,
    26 / speed,
    32 / speed,
    24 / speed,
  ];
  const delays = [-2, -6, -4, -8, -10];
  const anims: Array<"f1" | "f2" | "f3"> = ["f1", "f2", "f3", "f2", "f1"];

  return (
    <Wrapper
      className={className}
      style={style}
      $opacity={opacity}
      $extraBlur={extraBlur}
    >
      {palette.map((c, i) => (
        <Blob
          key={i}
          $size={blobSize}
          $color={c}
          $duration={durations[i % durations.length]}
          $delay={delays[i % delays.length]}
          $anim={anims[i % anims.length]}
        />
      ))}
    </Wrapper>
  );
};

export default AuroraGlowYellow;
