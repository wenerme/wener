---
tags:
  - Awesome
---

# Color Awesome

## Read

- https://atmos.style/blog/lch-color-space

## Snipptes

**Google Doc Color Platte**

```js
// object
$$('#\\:ap div.docs-material-colorpalette-colorswatch[title][style]').map(v=>({title:v.title,color:v.style.backgroundColor,dark:v.matches('.docs-material-colorpalette-colorswatch-dark')}))
// array
$$('#\\:ap div.docs-material-colorpalette-colorswatch[title][style]').map(v=>([v.title,v.style.backgroundColor,v.matches('.docs-material-colorpalette-colorswatch-dark')]))
```
