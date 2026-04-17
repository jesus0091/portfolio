"use client";

import styled, { keyframes } from "styled-components";

import React from "react";

type AuroraGlowProps = {
  /** Opacidad global del efecto (0–1) */
  opacity?: number;
  /** Tamaño base de cada “blob” (px) */
  blobSize?: number;
  /** Velocidad relativa (1 = normal, >1 más rápido) */
  speed?: number;
  /** Colores de los blobs (3 a 5 funciona muy bien) */
  colors?: string[];
  /** Si true, aplica un leve desenfoque extra para un look más etéreo */
  extraBlur?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

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

const Wrapper = styled.div<{
  $opacity: number;
  $extraBlur: boolean;
}>`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* Fondo completamente transparente */
  background: transparent;

  /* Suaviza bordes si lo pones dentro de contenedores redondeados */
  will-change: transform, opacity, filter;

  /* Opcional: un velo casi imperceptible (comenta si no lo querés) */
  /* backdrop-filter: saturate(110%); */

  /* Opacidad global controlable */
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

  /* Gradiente radial suave */
  background: radial-gradient(
    circle at 30% 30%,
    ${({ $color }) => $color} 0%,
    transparent 60%
  );

  filter: blur(60px);

  animation: ${({ $anim }) =>
      $anim === "f1" ? float1 : $anim === "f2" ? float2 : float3}
    ${({ $duration }) => $duration}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  transform-origin: center;

  /* Posiciones iniciales diferentes para que no se solapen */
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

export const AuroraGlow: React.FC<AuroraGlowProps> = ({
  opacity = 0.9,
  blobSize = 560,
  speed = 1,
  colors = ["#fde68a", "#fed7aa", "#d1d5db"], // ámbar, naranja claro, gris
  extraBlur = false,
  className,
  style,
}) => {
  // Construimos hasta 5 blobs como máximo
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

export default AuroraGlow;
