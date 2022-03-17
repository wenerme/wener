---
title: Lit
---

# Lit

- [lit/lit](https://github.com/lit/lit)
  - Web Components
- https://lit.dev/playground
- [rollup.config.js](https://lit.dev/docs/tools/production/#modern-only-build)
- [@web/dev-server](https://modern-web.dev/docs/dev-server/overview/)
  - 开发环境
  - esbuild + rollup

```ts
import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
  static styles = css`
    p {
      color: blue;
    }
  `;

  @property()
  name = 'Somebody';

  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}
```

```html
<body>
  <simple-greeting name="World"></simple-greeting>
</body>
```

## react

- [@lit-labs/react](https://github.com/lit/lit/tree/main/packages/labs/react)
  - createComponent - WebComponent -> React
  - useController

```js
import * as React from 'react';
import { createComponent } from '@lit-labs/react';
import { MyElement } from './my-element.js';

export const MyElementComponent = createComponent(React, 'my-element', MyElement, {
  onactivate: 'activate',
  onchange: 'change',
});
```

```jsx
<MyElementComponent active={isActive} onactivate={(e) => (isActive = e.active)} />
```
