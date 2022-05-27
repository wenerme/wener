---
title: styled-components
---

# styled-components

## This JSX tag's 'children' prop expects type 'never' which requires multiple children, but only a single child was provided.

```tsx
const Container = styled.div``;

// omit ref,as
export const FakeInput: React.FC<Omit<HTMLProps<HTMLDivElement>, 'children' | 'ref' | 'as'>> = (props) => {
  return <Container {...props}>Hello</Container>;
};
```
