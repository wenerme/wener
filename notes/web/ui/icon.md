---
title: Icon
---

# Icon

- [Icon Awesome](./icon-awesome.md)

## SVG Processing

### Stroke to Path

- [icon-font-generator](https://github.com/Workshape/icon-font-generator) 处理 stroke to path 的情况可能有问题
- Inkscape 可以将 stroke 转换成 path
- Sketch: Layer > Convert to Outlines [Docs](https://sketchapp.com/docs/text/convert-to-outlines/)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg height="44" width="44" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M28.674 3.945c2.099 1.941 3.42 4.664 3.42 8.241 0 4.286-1.248 6.723-4.072 9.967-.786.901-1.041 1.236-1.227 1.655-.441.992-.413 2.2.09 3.315.65 1.435 2.035 2.606 3.923 3.28 7.653 2.731 11.254 5.585 11.986 11.499l.111.898H1.095l.111-.898c.732-5.914 4.333-8.768 11.986-11.498 1.888-.675 3.274-1.846 3.922-3.28.504-1.116.532-2.324.091-3.316-.186-.419-.441-.754-1.227-1.655-2.824-3.244-4.072-5.681-4.072-9.967 0-3.577 1.321-6.3 3.42-8.24C17.186 2.225 19.671 1.2 22 1.2c2.33 0 4.813 1.026 6.674 2.745z"
      fill="none" fill-rule="evenodd" stroke="black" stroke-width="1.6"/>
</svg>
```

### SVG Issues

- [The Mystery of the Disappearing Holes](https://medium.com/thoughts-overflow/the-mystery-of-the-disappearing-holes-a-gripping-tale-of-using-svg-in-android-442f6035a452)
  - SVG in Android

## Font Conversion

### TTF to SVG

- `fontforge -c 'import fontforge;fontforge.open("icons.ttf").generate("icons.svg")'`
- [Apache Batik Font Converter](https://xmlgraphics.apache.org/batik/tools/font-converter.html)

### Resources

- [Things I learned About Fonts While Making a Java Font Library](https://mabboud.net/things-i-learned-about-fonts-while-making-a-java-font-library-that-you-didnt-want-to-know/)
- [Material Design Iconography](https://material.io/design/iconography/)
  - Keyline shapes
