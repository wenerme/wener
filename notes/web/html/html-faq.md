---
tags:
  - FAQ
---

# HTML FAQ

- fieldset readonly
  - [Note: fieldset readonly issue](https://github.com/whatwg/html/issues/10293)

## double form submit

- [Note: double form submit issue](https://github.com/whatwg/html/issues/5312)

## 响应式 {#responsive-meta-tag}

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

- width - 设置宽度
  - 支持数字 - 单位 px
  - device-width=100vw,100%
- height
  - device-height
- initial-scale=1
- minimum-scale=0.1
- maximum-scale=10
- user-scalable=1
  - 0/1, yes/no

---

- [MDN: Viewport meta tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag)

## offscreen

- dom inert attribute
  - accessibility 优化
  - 性能优化
  - polyfill wicg-inert
  - Temporarily offscreen/hidden content
  - On-screen but non-interactive content - pointer-events: none，user-select: none
  - jsx `inert={i !== tab ? '' : null}`
- 参考
  - [Chrome Developers: inert](https://developer.chrome.com/articles/inert/)
  - [WICG/inert](https://github.com/WICG/inert)
  - React Offscreen
  - CSS [content-visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility)
    - 强调是否渲染、是否可见
    - 可用于 lazy
    - hidden 时，engine 可直接跳过渲染
    - offscreen 部分降低优先级
    - 和 contain 相关
    - [web.dev: content-visibility](https://web.dev/articles/content-visibility)
  - CSS display: none
    - 不占用布局
  - CSS visibility: hidden
    - 依然保留布局

```tsx
const TabContainer = () => {
  // 非当前 tab inert 并隐藏
  return (
    <div className='[&>[inert]]:hidden'>
      {Tabs.map(({ content }, i) => (
        <div key={i} inert={i !== tab ? '' : null}>
          {content}
        </div>
      ))}
    </div>
  );
};
```

**inert.d.ts**

```ts
declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    inert?: any;
  }
}
```

## nested form

- form 不允许嵌套

```
<form> cannot appear as a descendant of <form>
```

## dialog vs popover

- popover
  - 在 顶层
- dialog
  - 不在 顶层

## 响应式图片 {#responsive-image}

- img
  - srcset
- picture
  - source

**next/image**

```html
<img
  alt=""
  loading="lazy"
  width="350"
  height="280"
  decoding="async"
  data-nimg="1"
  class="h-full w-full object-cover md:w-[354px]"
  srcset="/_next/image?url=%2Fimg1&amp;w=384&amp;q=75 1x, /_next/image?url=%2Fimg1&amp;w=750&amp;q=75 2x"
  src="/_next/image?url=%2Fimg1&amp;w=750&amp;q=75"
  style="color: transparent;"
/>
```
