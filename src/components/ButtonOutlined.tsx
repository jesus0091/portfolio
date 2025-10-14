"use client";

import React, { forwardRef } from "react";

import styled from "styled-components";

type ButtonOutlinedProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  loading?: boolean;
  ariaLabel?: string;
};

const ButtonOutlined = forwardRef<HTMLAnchorElement, ButtonOutlinedProps>(
  ({ children = "Enviar Mail", loading = false, ariaLabel, ...rest }, ref) => {
    const ariaProps: React.AnchorHTMLAttributes<HTMLAnchorElement> = {};
    if (ariaLabel) ariaProps["aria-label"] = ariaLabel;

    return (
      <StyledButton
        ref={ref}
        href="mailto:jesushernandez120491@gmail.com"
        aria-busy={loading || undefined}
        data-loading={loading ? "true" : "false"}
        {...ariaProps}
        {...rest}
      >
        <span className="btn__content">{children}</span>
      </StyledButton>
    );
  }
);

ButtonOutlined.displayName = "ButtonOutlined";
export default ButtonOutlined;

const StyledButton = styled.a`
  /* ---- Layout ---- */
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: clip;
  padding: 16px 24px;
  font-weight: 600;
  border-radius: 100px;

  /* Accesible (mínimo táctil) */
  min-width: 44px;
  min-height: 44px;

  font-size: 18px;
  line-height: 1;
  border: 2px solid var(--button);
  color: var(--black);
  background: transparent;
  cursor: pointer;
  user-select: none;
  text-decoration: none; /* <--- para que no se vea subrayado */

  /* Vars para animación in/out */
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --t: 360ms;

  .btn__content {
    position: relative;
    z-index: 1;
    transition: color 160ms ease 100ms;
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: currentColor;
    z-index: 0;
    pointer-events: none;
    will-change: transform, opacity;
    transform: translate(-20%, -50%) scale(0.001) translateZ(0);
    opacity: 0.01;
    transition: transform var(--t) var(--ease), opacity var(--t) var(--ease);
    transform-origin: left center;
  }

  &:hover {
    .btn__content {
      color: var(--white);
    }
    --t: 480ms;
    --ease: cubic-bezier(0.16, 1, 0.3, 1);
  }
  &:hover::before {
    transform: translate(-20%, -50%) scale(1) translateZ(0);
    opacity: 1;
  }

  &:not(:hover) {
    --t: 420ms;
    --ease: cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:focus-visible {
    outline: 3px solid #2563eb;
    outline-offset: 3px;
  }

  &[data-loading="true"]::before {
    transition: none;
    transform: translate(-20%, -50%) scale(0.001) translateZ(0);
    opacity: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before {
      transition: none;
    }
    .btn__content {
      transition: none;
    }
  }

  @media (forced-colors: active) {
    border-color: ButtonText;
    color: ButtonText;
    background: ButtonFace;
    &:hover {
      color: ButtonFace;
      background: ButtonText;
    }
    &:focus-visible {
      outline: 2px solid Highlight;
      outline-offset: 3px;
    }
  }
`;
