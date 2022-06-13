---
title: floating-ui
---

# floating-ui

- [floating-ui/floating-ui](https://github.com/floating-ui/floating-ui)
  - 2021 popperjs 更名为 floating-ui
  - 支持 web, React Native, Canvas
- @floating-ui/core
- @floating-ui/react-dom
  - useFloating -> computePosition
- @floating-ui/react-dom-interactions
  - `<Tooltip/>`, `<Popover/>`, `<Select/>`, `<Dropdown/>`
- @floating-ui/react-native

## React DOM

```tsx
import { useFloating, offset, flip, shift } from '@floating-ui/react-dom';

function App() {
  const { x, y, reference, floating, strategy } = useFloating({
    placement: 'right',
    strategy: 'fixed',
    middleware: [offset(10), flip(), shift()],
  });

  return (
    <>
      <button ref={reference}>Button</button>
      <div
        ref={floating}
        style={{
          position: strategy,
          top: y ?? '',
          left: x ?? '',
        }}
      >
        Tooltip
      </div>
    </>
  );
}
```
