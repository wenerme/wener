---
title: ReactPDF
---

# ReactPDF

# FAQ

## The "windows-1252" encoding is not supported

- fontkit

```js
new TextDecoder('ascii');
```

```
RangeError [ERR_ENCODING_NOT_SUPPORTED]: The "windows-1252" encoding is not supported
```

**fix**

```bash
apk add icu-data-full
```
