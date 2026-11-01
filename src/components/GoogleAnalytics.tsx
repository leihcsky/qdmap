import Script from "next/script";

const GA_MEASUREMENT_ID = "G-5S492EBNKE";

export function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
        data-analytics="ga4"
      />
      <Script id="ga4-config" strategy="afterInteractive" data-analytics="ga4">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
