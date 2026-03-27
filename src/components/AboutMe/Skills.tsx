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

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
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

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export type Skill = {
  label: string;
  icon: React.ReactElement;
};

export const skills: Skill[] = [
  { label: "React", icon: <ReactIcon className="h-15 w-15 md:h-20 md:w-20" /> },
  {
    label: "Next.js",
    icon: <NextIcon className="h-15 w-15 md:h-20 md:w-20" />,
  },
  {
    label: "TypeScript",
    icon: <TypeScriptIcon className="h-15 w-15 md:h-20 md:w-20" />,
  },
  {
    label: "JavaScript",
    icon: <JavaScriptIcon className="h-15 w-15 md:h-20 md:w-20" />,
  },
  { label: "HTML", icon: <HTMLIcon className="h-15 w-15 md:h-20 md:w-20" /> },
  { label: "CSS", icon: <CSSIcon className="h-15 w-15 md:h-20 md:w-20" /> },
  { label: "Sass", icon: <SassIcon className="h-15 w-15 md:h-20 md:w-20" /> },
  {
    label: "TailwindCSS",
    icon: <TailwindIcon className="h-15 w-15 md:h-20 md:w-20" />,
  },
  {
    label: "Material UI",
    icon: <MaterialUIIcon className="h-15 w-15 md:h-20 md:w-20" />,
  },
  {
    label: "Bootstrap",
    icon: <BootstrapIcon className="h-15 w-15 md:h-20 md:w-20" />,
  },
  { label: "Figma", icon: <FigmaIcon className="h-15 w-15 md:h-20 md:w-20" /> },
  {
    label: "Illustrator",
    icon: <IllustratorIcon className="h-15 w-15 md:h-20 md:w-20" />,
  },
  {
    label: "Prettier",
    icon: <PrettierIcon className="h-15 w-15 md:h-20 md:w-20" />,
  },
  {
    label: "Webpack",
    icon: <WebPackIcon className="h-15 w-15 md:h-20 md:w-20" />,
  },
  { label: "NPM", icon: <NPMIcon className="h-15 w-15 md:h-20 md:w-20" /> },
  { label: "JSON", icon: <JSONIcon className="h-15 w-15 md:h-20 md:w-20" /> },
  { label: "Git", icon: <GitIcon className="h-15 w-15 md:h-20 md:w-20" /> },
  {
    label: "GitHub",
    icon: <GitHubIcon className="h-15 w-15 md:h-20 md:w-20" />,
  },
];

export default function SkillsCarousel() {
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
