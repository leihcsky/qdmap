"use client";

import { useId, useMemo } from "react";
import { AdSlot } from "./AdSlot";

type AdsterraBannerProps = {
  adKey: string;
  width: number;
  height: number;
  scriptSrc: string;
  className?: string;
};

/**
 * Isolate each atOptions unit in its own iframe so multiple banners
 * on one page do not overwrite the shared global.
 */
export function AdsterraBanner({
  adKey,
  width,
  height,
  scriptSrc,
  className = "",
}: AdsterraBannerProps) {
  const titleId = useId();
  const srcDoc = useMemo(
    () => `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    html, body { margin: 0; padding: 0; background: transparent; overflow: hidden; }
  </style>
</head>
<body>
  <script>
    atOptions = {
      key: ${JSON.stringify(adKey)},
      format: "iframe",
      height: ${height},
      width: ${width},
      params: {}
    };
  </script>
  <script src=${JSON.stringify(scriptSrc)}></script>
</body>
</html>`,
    [adKey, height, scriptSrc, width],
  );

  return (
    <AdSlot className={className}>
      <iframe
        title={`Advertisement ${titleId}`}
        srcDoc={srcDoc}
        width={width}
        height={height}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
        className="max-w-full border-0 bg-transparent"
        style={{ width, height, maxWidth: "100%" }}
      />
    </AdSlot>
  );
}
