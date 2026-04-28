import React from "react";

type SectionLabelProps = {
  children: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

const SectionLabel = React.forwardRef<HTMLDivElement, SectionLabelProps>(
  function SectionLabel({ children, align = "left", className = "" }, ref) {
    const isCenter = align === "center";
    return (
      <div
        ref={ref}
        data-section-label
        className={`inline-flex items-center gap-3 ${isCenter ? "justify-center" : ""} ${className}`}
      >
        <span aria-hidden className="h-px w-8 bg-[var(--orange)]/70" />
        <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-[var(--orange)]">
          {children}
        </span>
        {isCenter && <span aria-hidden className="h-px w-8 bg-[var(--orange)]/70" />}
      </div>
    );
  }
);

export default SectionLabel;
