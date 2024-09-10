---
title: TWC
---

# TWC

- [gregberge/twc](https://github.com/gregberge/twc)
  - MIT, TS
  - reusable React + Tailwind CSS components

**cva**

```tsx
import { twc, TwcComponentProps } from 'react-twc';
import { cva } from 'class-variance-authority';

const button = cva('font-semibold border border-blue-500 rounded', {
  variants: {
    $intent: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-white text-gray-800',
    },
  },
  defaultVariants: {
    $intent: 'primary',
  },
});

type ButtonProps = TwcComponentProps<'button'> & VariantProps<typeof button>;

const Button = twc.button<ButtonProps>(({ $intent }) => button({ $intent }));

export default () => (
  <div>
    <Button>Primary button (default)</Button>
    <Button $intent='primary'>Primary button</Button>
    <Button $intent='secondary'>Secondary button</Button>
  </div>
);
```
