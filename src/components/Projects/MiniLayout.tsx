import { IconPhoto } from "@tabler/icons-react";
import React from "react";

// ✅ Permite ref y cualquier atributo válido de <div>
const MiniLayout = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function MiniLayout(_props, ref) {
  return (
    <div
      ref={ref}
      className="relative max-w-[min(92vw,420px)] w-full px-8 pb-8"
    >
      <div className="w-full rounded-2xl border border-[var(--layout)]/50 bg-[var(--layout)]/20 backdrop-blur shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden text-left">
        <div className="h-9 md:h-10 w-full border-b border-[var(--layout)]/50 flex items-center gap-2 px-3">
          <span className="ml-item h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="ml-item h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="ml-item h-2.5 w-2.5 rounded-full bg-green-400" />
          <div className="ml-item ml-2 h-2 w-24 md:w-32 rounded bg-[var(--layout-content-content)]/30" />
        </div>
        <div className="grid grid-cols-12 gap-x-3 gap-y-6 p-3 md:p-4">
          <div className="col-span-6 space-y-2 flex flex-col justify-center animate-pulse">
            <div className="ml-item h-2.5 rounded bg-[var(--content)] w-3/4" />
            <div className="ml-item h-2.5 rounded bg-[var(--content)] w-2/3" />
            <div className="ml-item h-2.5 rounded bg-[var(--content)] w-4/5" />
            <div className="ml-item h-2.5 rounded bg-[var(--content)] w-1/2" />
          </div>
          <div className="col-span-6 space-y-2">
            <div className="ml-item h-28 md:h-32 flex items-center justify-center rounded-lg bg-[var(--white)]/50 text-[var(--gray)] ">
              <IconPhoto />
            </div>
          </div>
          <div className="col-span-12 space-y-1 flex gap-3 animate-pulse">
            <div className="ml-item gap-2 flex-1 space-y-0.5 flex flex-col">
              <div className="ml-item h-2.5 rounded bg-[var(--content)]" />
              <div className="ml-item h-2.5 w-1/2 rounded bg-[var(--content)]" />
              <div className="ml-item h-2.5 w-[60%] rounded bg-[var(--content)]" />
            </div>
            <div className="ml-item gap-2 flex-1 space-y-0.5 flex flex-col">
              <div className="ml-item h-2.5 rounded bg-[var(--content)]" />
              <div className="ml-item h-2.5 w-1/2 rounded bg-[var(--content)]" />
              <div className="ml-item h-2.5 w-[60%] rounded bg-[var(--content)]" />
            </div>
            <div className="ml-item gap-2 flex-1 space-y-0.5 flex flex-col">
              <div className="ml-item h-2.5 rounded bg-[var(--content)]" />
              <div className="ml-item h-2.5 w-1/2 rounded bg-[var(--content)]" />
              <div className="ml-item h-2.5 w-[60%] rounded bg-[var(--content)]" />
            </div>
          </div>
          <div className="col-span-12 space-y-1 animate-pulse">
            <div className="flex gap-2 space-y-1">
              <div className="ml-item h-2.5 flex-1 rounded bg-[var(--content)]" />
              <div className="ml-item h-2.5 flex-[0.5] rounded bg-[var(--content)]" />
            </div>
            <div className="flex gap-2 space-y-1">
              <div className="ml-item h-2.5 flex-[0.5] rounded bg-[var(--content)]" />
              <div className="ml-item h-2.5 flex-1 rounded bg-[var(--content)]" />
            </div>
            <div className="flex gap-2 space-y-1">
              <div className="ml-item h-2.5 flex-1 rounded bg-[var(--content)]" />
              <div className="ml-item h-2.5 flex-[0.5] rounded bg-[var(--content)]" />
            </div>
            <div className="flex gap-2 space-y-1">
              <div className="ml-item h-2.5 flex-[0.5] rounded bg-[var(--content)]" />
              <div className="ml-item h-2.5 flex-1 rounded bg-[var(--content)]" />
            </div>
            <div className="flex gap-2 space-y-1">
              <div className="ml-item h-2.5 flex-1 rounded bg-[var(--content)]" />
              <div className="ml-item h-2.5 flex-[0.5] rounded bg-[var(--content)]" />
            </div>
            <div className="flex gap-2 space-y-1">
              <div className="ml-item h-2.5 flex-[0.5] rounded bg-[var(--content)]" />
              <div className="ml-item h-2.5 flex-1 rounded bg-[var(--content)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MiniLayout;
