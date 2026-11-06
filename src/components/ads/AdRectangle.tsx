import { ADSTERRA } from "@/lib/ads";
import { AdsterraBanner } from "./AdsterraBanner";

export function AdRectangle({ className = "" }: { className?: string }) {
  return (
    <AdsterraBanner
      adKey={ADSTERRA.banner300x250.key}
      width={ADSTERRA.banner300x250.width}
      height={ADSTERRA.banner300x250.height}
      scriptSrc={ADSTERRA.banner300x250.scriptSrc}
      className={`py-4 ${className}`}
    />
  );
}
