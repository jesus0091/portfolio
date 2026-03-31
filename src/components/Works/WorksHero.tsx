import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";

export default function WorksHero() {
  return (
    <section className="w-full pt-32 pb-16 md:pt-40 md:pb-20 bg-[var(--background)]">
      <div className="mx-auto max-w-[1280px] px-4 md:px-8 flex flex-col gap-6">

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--black)] transition w-fit"
        >
          <IconArrowLeft size={16} />
          Back to home
        </Link>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="flex flex-col gap-3">
            <p className="text-xl font-semibold text-[var(--orange)] tracking-wide">
              My Works
            </p>
            <h1
              className="font-bold text-[var(--black)] tracking-tight"
              style={{ fontSize: "clamp(48px, 7vw, 100px)", lineHeight: 1.05 }}
            >
              Selected Projects
            </h1>
          </div>

          <p className="text-base md:text-lg text-[var(--muted)] max-w-sm md:text-right pb-2">
            From concept to launch — frontend engineering, UX/UI design, and everything in between.
          </p>
        </div>

        <div className="w-full h-px bg-black/10 mt-2" />

      </div>
    </section>
  );
}
