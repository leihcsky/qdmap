export type FaqItem = {
  question: string;
  answer: string;
};

type PageFaqProps = {
  id?: string;
  title?: string;
  items: FaqItem[];
};

export function PageFaq({
  id = "faq",
  title = "Frequently asked questions",
  items,
}: PageFaqProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-8">
      <h2
        id={`${id}-heading`}
        className="font-display text-2xl text-amber-50"
      >
        {title}
      </h2>
      <div className="mt-4 divide-y divide-stone-800 rounded-lg border border-stone-800 bg-stone-950/40">
        {items.map((item) => (
          <details key={item.question} className="group px-4 py-1">
            <summary className="cursor-pointer list-none py-3 text-sm font-medium text-stone-100 marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-start justify-between gap-3">
                <span>{item.question}</span>
                <span
                  aria-hidden
                  className="mt-0.5 shrink-0 text-stone-500 transition group-open:rotate-45"
                >
                  +
                </span>
              </span>
            </summary>
            <p className="pb-4 text-sm leading-relaxed text-stone-400">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
