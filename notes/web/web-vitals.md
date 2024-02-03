---
title: vitals
---

# Core Web Vitals

| abbr. | stand for                | mean         | test for   |
| ----- | ------------------------ | ------------ | ---------- |
| LCP   | Largest Contentful Paint | 最大内容绘制 | 加载性能   |
| FID   | First Input Delay        | 首次输入延迟 | 交互性     |
| CLS   | Cumulative Layout Shift  | 累积布局偏移 | 视觉稳定性 |
| TTFB  | Time to First Byte       | 首字节时间   | LCP        |
| FCP   | First Contentful Paint   | 首次内容绘制 | LCP        |
| TBT   | Total Blocking Time      | 总阻塞时间   | FID        |
| TTI   | Time to Interactive      | 可交互时间   | FID        |

| metric | from | to   |
| ------ | ---- | ---- |
| LCP    | 2.5s | 4.0s |
| FID    | 100m | 300m |
| CLS    | 0.1  | 0.25 |

- https://web.dev/vitals/
  - npm https://www.npmjs.com/package/web-vitals
- https://github.com/GoogleChrome/web-vitals
- https://web.dev/vitals-tools/
- https://web.dev/measure/
- http://linter.structured-data.org/
- NextJS https://nextjs.org/docs/pages/building-your-application/optimizing/analytics
- Supported Server
  - Google Analytics
  - Matomo On-Premise 版本 https://matomo.org/guide/reports/seo-web-vitals/
  - Sentry https://docs.sentry.io/product/performance/web-vitals/
- https://github.com/vercel/next.js/blob/canary/packages/next/src/client/web-vitals.ts

```ts
import { useEffect } from 'react';
import { type Metric, onCLS, onFCP, onFID, onINP, onLCP, onTTFB } from 'web-vitals';

export function useReportWebVitals(reportWebVitalsFn: (metric: Metric) => void) {
  useEffect(() => {
    onCLS(reportWebVitalsFn);
    onFID(reportWebVitalsFn);
    onLCP(reportWebVitalsFn);
    onINP(reportWebVitalsFn);
    onFCP(reportWebVitalsFn);
    onTTFB(reportWebVitalsFn);
  }, [reportWebVitalsFn]);
}
```
