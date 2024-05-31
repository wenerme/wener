---
title: ReactPDF
---

# ReactPDF

- yogo+pdfkit
- react-reconciler, scheduler

```ts
export const PDFViewer = ({
  title,
  style,
  className,
  children,
  innerRef,
  showToolbar = true,
  ...props
}) => {
  const [instance, updateInstance] = usePDF();

  useEffect(() => updateInstance(children), [children]);

  const src = instance.url
    ? `${instance.url}#toolbar=${showToolbar ? 1 : 0}`
    : null;

  return (
    <iframe
      src={src}
      title={title}
      ref={innerRef}
      style={style}
      className={className}
      {...props}
    />
  );
};
```

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
