---
title: Web Spec
---

# Web Spec

## container-query

- Chrome 105+

```js
const supportsContainerQueries = 'container' in document.documentElement.style;
if (!supportsContainerQueries) {
  import('container-query-polyfill');
}
```

```css
@container (min-width: 200px) {
}
```

- https://caniuse.com/css-container-queries
- [GoogleChromeLabs/container-query-polyfill](https://github.com/GoogleChromeLabs/container-query-polyfill)
  - 不再维护，建议还是等待使用新版浏览器
  - MutationObserver+ResizeObserver+`:is`
  - Chrome/Edge 88+, Firefox 78+, Safari 14+

## structuredClone

- Chrome 98+
- 支持 Map, Set, Date, RegExp, ArrayBuffer
- 支持 循环引用

```js
const structuredClone = globalThis.structuredClone ?? (v)=>JSON.parse(JSON.stringify(v))
```

## EyeDropper API

```js
async function sampleColorFromScreen(abortController) {
  if ('EyeDropper' in window) {
    return;
  }
  const eyeDropper = new EyeDropper();
  try {
    const result = await eyeDropper.open({ signal: abortController.signal });
    return result.sRGBHex;
  } catch (e) {
    return null;
  }
}
```

- https://web.dev/eyedropper/
