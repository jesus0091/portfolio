"use client";

import { Fragment, useEffect, useState } from "react";
import {
  IconBrandBehance,
  IconBrandGithub,
  IconBrandLinkedin,
} from "@tabler/icons-react";

import Cursor from "./Cursor";
import Link from "next/link";
import styled from "styled-components";

export default function HomePage() {
  const [hovered, setHovered] = useState<"frontend" | "designer">("frontend");
  const [cursorActive, setCursorActive] = useState(false);

  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const isFrontendFilled = hovered !== "designer";
  const isDesignerFilled = hovered === "designer";

  return (
    <Fragment>
      <Cursor active={cursorActive} />
      <section className="text-black pt-[20vh] pb-10 px-10 h-[100dvh] w-full flex flex-col justify-between items-center">
        <div className="flex flex-col items-center text-center w-full gap-2">
          <p className="text-2xl tracking-wide uppercase text-orange-600">
            👋, My name is Jesús Hernández
          </p>

          <StyledTitle
            onMouseEnter={() => setCursorActive(true)}
            onMouseLeave={() => {
              setCursorActive(false);
              setHovered("frontend");
            }}
          >
            <FrontendRow
              $filled={isFrontendFilled}
              $ready={ready}
              onMouseEnter={() => setHovered("frontend")}
              aria-label="Frontend Developer"
            >
              <span className="angle left">&lt;</span>
              <span className="word strong">FrontEnd</span>
              <span className="word light">Developer</span>
              <span className="angle right">/&gt;</span>
            </FrontendRow>
            <DesignerRow
              $filled={isDesignerFilled}
              $ready={ready}
              onMouseEnter={() => setHovered("designer")}
              aria-label="Product Designer"
            >
              <span className="amp">&amp;</span>
              <span className="word light">Web</span>
              <span className="word strong relative">
                Designer
                <span className="rectangle-base">
                  <span className="rectangle"></span>
                </span>
              </span>
            </DesignerRow>
          </StyledTitle>

          <p className="text-2xl font-medium leading-0 mt-8">
            Building digital products and experience
          </p>
        </div>

        <div className="flex flex-col w-full justify-between items-center text-center gap-3">
          <p className="text-2xl font-medium">
            Based in Buenos Aires, Argentina.
          </p>
          <div className="flex flex-row gap-1">
            <Link
              href="https://www.linkedin.com/in/jesushernandez91/"
              target="_blank"
              className="flex w-12 h-12 items-center justify-center"
            >
              <IconBrandLinkedin />
            </Link>
            <Link
              href="https://github.com/jesus0091"
              target="_blank"
              className="flex w-12 h-12 items-center justify-center"
            >
              <IconBrandGithub />
            </Link>
            <Link
              href="https://www.behance.net/devjesushernandez"
              target="_blank"
              className="flex w-12 h-12 items-center justify-center"
            >
              <IconBrandBehance />
            </Link>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

const EASE_SOFT = "cubic-bezier(0.22, 1, 0.36, 1)";
const EASE_SPRING = "cubic-bezier(0.16, 1, 0.3, 1)";

const StyledTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  font-size: clamp(32px, 8vw, 120px);
  line-height: 1;
  white-space: nowrap;
  letter-spacing: -0.02em;
  user-select: none;
  cursor: none;
`;

const Row = styled.div<{ $filled: boolean; $ready: boolean }>`
  display: inline-flex;
  align-items: baseline;
  gap: 0.25rem;

  .word {
    will-change: color, -webkit-text-stroke-width;
    transition: ${({ $ready }) =>
      $ready
        ? `color .4s ${EASE_SOFT}, -webkit-text-stroke-width .4s ${EASE_SOFT}`
        : "none"};
    color: ${({ $filled }) => ($filled ? "black" : "transparent")};
    -webkit-text-stroke: ${({ $filled }) => ($filled ? "0px" : "1.2px")} black;
  }
  .strong {
    font-weight: 900;
  }
  .light {
    font-weight: 300;
  }
`;

const FrontendRow = styled(Row)`
  padding: 0 0.35em;

  .angle {
    will-change: color, -webkit-text-stroke-width, transform;
    transition: ${({ $ready }) =>
      $ready
        ? `color .4s ${EASE_SOFT}, -webkit-text-stroke-width .4s ${EASE_SOFT}, transform .45s ${EASE_SPRING}`
        : "none"};
    color: ${({ $filled }) => ($filled ? "#3B82F6" : "transparent")};
    -webkit-text-stroke: ${({ $filled }) => ($filled ? "0px" : "2px")} #3b82f6;
  }
  &:hover .left {
    transform: translateX(-8px) rotate(-1deg);
  }
  &:hover .right {
    transform: translateX(8px) rotate(1deg);
  }
  .word + .word {
    transition-delay: ${({ $ready }) => ($ready ? ".04s" : "0s")};
  }
`;

const DesignerRow = styled(Row)`
  .amp {
    will-change: color, -webkit-text-stroke-width;
    transition: ${({ $ready }) =>
      $ready
        ? `color .4s ${EASE_SOFT}, -webkit-text-stroke-width .4s ${EASE_SOFT}`
        : "none"};
    color: ${({ $filled }) => ($filled ? "#F55A3D" : "transparent")};
    -webkit-text-stroke: ${({ $filled }) => ($filled ? "0px" : "2px")} #f55a3d;
    font-weight: 600;
  }

  .rectangle-base {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  .rectangle {
    position: absolute;
    width: 104%;
    height: 112%;
    border: 1.5px solid #f55a3d;
    background: #f55a3d12;
    --rect-o: ${({ $filled }) => ($filled ? 1 : 0)};
    opacity: var(--rect-o);
    will-change: transform, opacity;
    transform: translateZ(0) scale(0.985);
    transition: transform 420ms ${EASE_SPRING}, opacity 320ms ${EASE_SOFT},
      box-shadow 320ms ${EASE_SOFT};
    z-index: -1;
    box-shadow: inset 0 0 0 1px #f55a3d12;

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: var(--rect-o);
      transition: opacity 320ms ${EASE_SOFT};

      background: linear-gradient(#f55a3d, #f55a3d) top left,
        linear-gradient(#f55a3d, #f55a3d) top right,
        linear-gradient(#f55a3d, #f55a3d) bottom left,
        linear-gradient(#f55a3d, #f55a3d) bottom right;
      background-repeat: no-repeat;
      background-size: 5px 5px;
    }
  }

  &:hover .rectangle {
    opacity: 1;
    transform: translateZ(0) scale(1) rotate(-2deg);
    box-shadow: inset 0 0 0 1px #f55a3d12, 0 10px 24px #f55a3d12;
  }
  &:hover .rectangle::after {
    opacity: 1;
  }
`;
