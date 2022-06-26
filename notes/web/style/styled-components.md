---
title: styled-components
---

# styled-components

- styled-components
  - 34kB/13kB
  - stylis
- styled-components v6 alpha
  - typescript 重写
  - stylis v4
  - node 14+
  - styled-components v6 alpha feedback [#3696](https://github.com/styled-components/styled-components/issues/3696)

# FAQ

## This JSX tag's 'children' prop expects type 'never' which requires multiple children, but only a single child was provided.

```tsx
const Container = styled.div``;

// omit ref,as
export const FakeInput: React.FC<Omit<HTMLProps<HTMLDivElement>, 'children' | 'ref' | 'as'>> = (props) => {
  return <Container {...props}>Hello</Container>;
};
```
