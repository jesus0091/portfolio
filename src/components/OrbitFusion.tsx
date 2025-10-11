"use client";

import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

import AuroraGlowYellow from "./AuroraGlowYellow";

const orbitDuration = 2000;

const orbit = keyframes`
  0% { transform: rotate(0deg) scale(1); opacity: 1; }
  100% { transform: rotate(1080deg) scale(0); opacity: 0; }
`;

const fadeIn = keyframes`
  0% { opacity: 0; transform: scale(0.98); }
  100% { opacity: 1; transform: scale(1); }
`;

const Wrapper = styled.div<{ $width?: number; $height?: number }>`
  position: relative;
  width: ${({ $width }) => $width || "100vw"};
  height: ${({ $height }) => $height || "100dvh"};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
`;

const OrbitStage = styled.div`
  position: absolute;
  width: 100vw;
  height: 100%;
  animation: ${orbit} ${orbitDuration}ms ease-in-out forwards;
`;

const Circle = styled.div<{ $color: string; $position: "left" | "right" }>`
  position: absolute;
  top: 50%;
  ${({ $position }) => ($position === "left" ? "left: -50%;" : "right: -50%;")}
  width: 150vh;
  height: 150vh;
  background: radial-gradient(
    circle at 50% 50%,
    ${({ $color }) => $color} 30%,
    ${({ $color }) => $color} 50%,
    transparent 80%
  );
  opacity: 0.5;
  border-radius: 50%;
  transform: translateY(-50%);
  filter: blur(100px);
  will-change: transform, filter;
`;

const GlowStage = styled.div`
  position: absolute;
  inset: 0;
  animation: ${fadeIn} 800ms ease-out both;
  pointer-events: none;
`;

export const OrbitFusion: React.FC = () => {
  const [showGlow, setShowGlow] = useState(false);
  return (
    <Wrapper>
      <OrbitStage onAnimationEnd={() => setShowGlow(true)}>
        <Circle $color="dodgerblue" $position="left" />
        <Circle $color="orangered" $position="right" />
      </OrbitStage>
      {showGlow && (
        <GlowStage aria-hidden="true">
          <AuroraGlowYellow
            opacity={0.9}
            blobSize={560}
            speed={1}
            extraBlur={false}
          />
        </GlowStage>
      )}
    </Wrapper>
  );
};
