"use client";

import {
  BootstrapIcon,
  CSSIcon,
  FigmaIcon,
  GitHubIcon,
  GitIcon,
  HTMLIcon,
  IllustratorIcon,
  JSONIcon,
  JavaScriptIcon,
  MaterialUIIcon,
  NPMIcon,
  NextIcon,
  PrettierIcon,
  ReactIcon,
  SassIcon,
  TailwindIcon,
  TypeScriptIcon,
  WebPackIcon,
} from "./SkillsIcons";
import styled, { keyframes } from "styled-components";

import React from "react";

/* ---------------- Animación de scroll ---------------- */
const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

/* ---------------- Estilos ---------------- */
const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 2rem 0;
  margin-top: -120px;
`;

const CarouselTrack = styled.ul`
  display: flex;
  gap: 36px;
  width: max-content;
  list-style: none;
  padding: 0;
  margin: 0;
  animation: ${scroll} 60s linear infinite;
  filter: grayscale(100%) opacity(0.4);

  &:hover {
    animation-play-state: paused;
  }
`;

const SkillChip = styled.li`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
  justify-content: center;
`;

/* ---------------- Data ---------------- */
export type Skill = {
  label: string;
  icon: React.ReactElement;
};

export const skills: Skill[] = [
  { label: "React", icon: <ReactIcon className="w-20 h-20" /> },
  { label: "Next.js", icon: <NextIcon className="w-20 h-20" /> },
  { label: "TypeScript", icon: <TypeScriptIcon className="w-20 h-20" /> },
  { label: "JavaScript", icon: <JavaScriptIcon className="w-20 h-20" /> },
  { label: "HTML", icon: <HTMLIcon className="w-20 h-20" /> },
  { label: "CSS", icon: <CSSIcon className="w-20 h-20" /> },
  { label: "Sass", icon: <SassIcon className="w-20 h-20" /> },
  { label: "TailwindCSS", icon: <TailwindIcon className="w-20 h-20" /> },
  { label: "Material UI", icon: <MaterialUIIcon className="w-20 h-20" /> },
  { label: "Bootstrap", icon: <BootstrapIcon className="w-20 h-20" /> },
  { label: "Figma", icon: <FigmaIcon className="w-20 h-20" /> },
  { label: "Illustrator", icon: <IllustratorIcon className="w-20 h-20" /> },
  { label: "Prettier", icon: <PrettierIcon className="w-20 h-20" /> },
  { label: "Webpack", icon: <WebPackIcon className="w-20 h-20" /> },
  { label: "NPM", icon: <NPMIcon className="w-20 h-20" /> },
  { label: "JSON", icon: <JSONIcon className="w-20 h-20" /> },
  { label: "Git", icon: <GitIcon className="w-20 h-20" /> },
  { label: "GitHub", icon: <GitHubIcon className="w-20 h-20" /> },
];

/* ---------------- Componente ---------------- */
export default function SkillsCarousel() {
  // duplicamos varias veces para que la animación se vea infinita
  const loop = [...skills, ...skills, ...skills, ...skills];

  return (
    <CarouselWrapper>
      <CarouselTrack>
        {loop.map((skill, i) => (
          <SkillChip key={`${skill.label}-${i}`}>
            {skill.icon} {skill.label}
          </SkillChip>
        ))}
      </CarouselTrack>
    </CarouselWrapper>
  );
}
