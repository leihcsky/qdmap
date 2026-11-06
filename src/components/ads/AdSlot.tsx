import type { ReactNode } from "react";

type AdSlotProps = {
  children: ReactNode;
  className?: string;
  label?: boolean;
};

/** Visual wrapper so ads stay out of the interactive tool chrome. */
export function AdSlot({ children, className = "", label = true }: AdSlotProps) {
  return (
    <aside
      className={`ad-slot flex flex-col items-center justify-center ${className}`}
      aria-label="Advertisement"
      data-analytics="ad-slot"
    >
      {label ? (
        <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-stone-600">
          Advertisement
        </p>
      ) : null}
      <div className="flex max-w-full items-center justify-center overflow-hidden">
        {children}
      </div>
    </aside>
  );
}
