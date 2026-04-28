import SectionLabel from "./SectionLabel";

export default function WSMAQuote() {
  return (
    <section data-section="wsma-quote" className="w-full py-16 md:py-24 bg-[var(--background)] border-y border-black/20">
      <div className="mx-auto max-w-[1280px] px-6 md:px-8 flex flex-col items-center text-center gap-4">

        <SectionLabel align="center">What sets me apart</SectionLabel>

        <div className="flex flex-col pb-2">
          <span className="wsma-phrase" style={{ fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.03em" }}>
            I code. I design. I do both.
          </span>
        </div>

        <p className="text-sm md:text-lg font-medium text-[var(--muted)] max-w-md mt-1">
          Great products happen when
          <br />
          <span className="text-[var(--black)] font-semibold">design meets code.</span>
        </p>

      </div>
    </section>
  );
}
