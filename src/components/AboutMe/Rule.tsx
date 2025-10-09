"use client";

import styled, { keyframes } from "styled-components";

import React from "react";

const draw = keyframes`
  from {
    stroke-dashoffset: 1000;
  }
  to {
    stroke-dashoffset: 0;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const Path = styled.path`
  stroke: url(#gradient);
  stroke-width: 6;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: ${draw} 5s ease forwards, ${fadeOut} 2s ease 5s forwards;
`;

const GradientStroke: React.FC = () => {
  return (
    <svg
      viewBox="0 0 600 300"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[600px] h-[300px]"
    >
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ff0057" />
          <stop offset="25%" stopColor="#ffb400" />
          <stop offset="50%" stopColor="#00c851" />
          <stop offset="75%" stopColor="#007bff" />
          <stop offset="100%" stopColor="#6f42c1" />
        </linearGradient>
      </defs>

      {/* Path inspirado en tu forma (línea ondulada + rulo) */}
      <Path
        d="M 20 150 C 120 100, 220 200, 320 150 
               C 400 100, 420 200, 480 150 
               Q 520 120, 500 200 
               T 560 150"
      />
    </svg>
  );
};

export default GradientStroke;
