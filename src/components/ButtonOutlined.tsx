"use client";

import React, { forwardRef } from "react";

import styled from "styled-components";

type ButtonOutlinedProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  ariaLabel?: string;
};

const ButtonOutlined = forwardRef<HTMLButtonElement, ButtonOutlinedProps>(
  (
    {
      children = "ButtonOutlined",
      type = "button",
      disabled,
      loading = false,
      ariaLabel,
      ...rest
    },
    ref
  ) => {
    const ariaProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {};
    if (ariaLabel) ariaProps["aria-label"] = ariaLabel;

    return (
      <StyledButton
        ref={ref}
        type={type}
        disabled={disabled || loading}
        aria-disabled={disabled || loading ? true : undefined}
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

const StyledButton = styled.button`
  /* ---- Layout ---- */
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: clip; /* o hidden */
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

  /* Vars para animación in/out */
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --t: 360ms;

  .btn__content {
    position: relative;
    z-index: 1;
    transition: color 160ms ease 100ms; /* pequeño delay al entrar */
  }

  /* Círculo de relleno */
  &::before {
    content: "";
    position: absolute;
    /* ANCLA CONSISTENTE: no cambiamos translate entre estados */
    left: 0;
    top: 50%;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: currentColor;
    z-index: 0;
    pointer-events: none;

    /* Composición y estado base sin “snap” */
    will-change: transform, opacity;
    transform: translate(-20%, -50%) scale(0.001) translateZ(0);
    opacity: 0.01;

    transition: transform var(--t) var(--ease), opacity var(--t) var(--ease);
    transform-origin: left center;
  }

  /* Hover IN */
  &:hover {
    /* texto a blanco cuando ya cubre */
    .btn__content {
      color: var(--white);
    }
    /* ajusta timing para hover-in */
    --t: 480ms;
    --ease: cubic-bezier(0.16, 1, 0.3, 1); /* más “springy” */
  }
  &:hover::before {
    transform: translate(-20%, -50%) scale(1) translateZ(0);
    opacity: 1;
  }

  /* Hover OUT: timing más suave (sin flicker) */
  &:not(:hover) {
    --t: 420ms;
    --ease: cubic-bezier(0.22, 1, 0.36, 1); /* ease-out suave */
  }

  /* Focus accesible */
  &:focus-visible {
    outline: 3px solid #2563eb;
    outline-offset: 3px;
  }

  /* Disabled / Loading */
  &:disabled,
  &[aria-disabled="true"] {
    opacity: 0.6;
    cursor: not-allowed;
  }
  &:disabled::before,
  &[aria-disabled="true"]::before,
  &[data-loading="true"]::before {
    transition: none;
    transform: translate(-20%, -50%) scale(0.001) translateZ(0);
    opacity: 0;
  }

  /* Reduce motion */
  @media (prefers-reduced-motion: reduce) {
    &::before {
      transition: none;
    }
    .btn__content {
      transition: none;
    }
  }

  /* Alto contraste */
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
