---
tags:
  - Glossary
---

# Font Glossary

| en              | zh         |
| --------------- | ---------- |
| sans-serif      | 无衬线字体 |
| serif           | 衬线字体   |
| Script typeface | 书写体     |

| abbr. | stand for     |
| ----- | ------------- |
| SF    | San Francisco |

| font                           | subtype    | since | adopted by              |
| ------------------------------ | ---------- | ----- | ----------------------- |
| Helvetica                      | sans       | 1957  | iOS 7, iOS 8            |
| Helvetica Neue                 | sans       | 1983  | OS X 10.10+             |
| San Francisco                  | sans-serif |       | iOS 9, OS X El Capitan  |
| PingFang SC,TC,HK              |            |       | iOS 9, OS X El Capitan  |
| Monotype LingWai Medium SC,TC) |            |       | macOS 10.12 Sierra      |
| Songti SC,TC                   |            |       | macOS 10.12 Sierra      |
| San Francisco Mono             |            |       | macOS 10.12 Sierra      |
| Kai                            |            |       | macOS 10.13 High Sierra |
| Kaiti SC                       |            |       | macOS 10.13 High Sierra |
| Arial                          | sans-serif | 1982  | Windows                 |
| Nimbus Sans                    |            |       |
| Lucida Grande                  |            |       | OS X Yosemite           |
| Courier New                    | serif mono |       | Windows                 |
| Segoe UI                       |            |       | Windows Visit           |
| Ubuntu                         |            |       | Ubuntu                  |
| Roboto                         |            |       | Android 4+, Chrome OS   |

- https://developer.apple.com/fonts/
- [List of typefaces included with macOS](https://en.wikipedia.org/wiki/List_of_typefaces_included_with_macOS)
- [Fonts on Macintosh](https://en.wikipedia.org/wiki/Fonts_on_Macintosh)

| weight | common name            | uncommon |
| ------ | ---------------------- | -------- |
| 100    | Thin,Hairline          |
| 200    | Extralight, Ultralight |
| 300    | Light                  |
| 400    | Normal, Regular        |
| 500    | Medium                 |
| 600    | Semibold, Demibold     | Medium   |
| 700    | Bold                   |
| 800    | Extrabold, Ultrabold   | Semibold |
| 900    | Black, Heavy           |

## Font Family

- -apple-system
  - San Francisco - OS X El Capitan
  - Neue Helvetica - OS X 10.10+
  - Lucida Grande - OS X Yosemite

```css
body {
  font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

@font-face {
  font-family: system;
  font-style: normal;
  font-weight: 300;
  src: local('.SFNSText-Light'), local('.HelveticaNeueDeskInterface-Light'), local('.LucidaGrandeUI'), local(
      'Ubuntu Light'
    ), local('Segoe UI Light'), local('Roboto-Light'), local('DroidSans'), local('Tahoma');
}

body {
  font-family: 'system';
}
```

- [San Francisco](<https://en.wikipedia.org/wiki/San_Francisco_(sans-serif_typeface)>)
- https://css-tricks.com/os-specific-fonts-css/
- https://css-tricks.com/snippets/css/system-font-stack/
- https://github.com/necolas/normalize.css/issues/665

```css
.font {
  /* San Francisco */
  font-family: -apple-system, -apple-system, system-ui, BlinkMacSystemFont, sans-serif;

  font-family: -apple-system-body;
  font-family: -apple-system-headline;
  font-family: -apple-system-subheadline;
  font-family: -apple-system-caption1;
  font-family: -apple-system-caption2;
  font-family: -apple-system-footnote;
  font-family: -apple-system-short-body;
  font-family: -apple-system-short-headline;
  font-family: -apple-system-short-subheadline;
  font-family: -apple-system-short-caption1;
  font-family: -apple-system-short-footnote;
  font-family: -apple-system-tall-body;
}
```

```css
@font-face {
  font-family: 'San Francisco';
  font-weight: 400;
  src: url('https://applesocial.s3.amazonaws.com/assets/styles/fonts/sanfrancisco/sanfranciscodisplay-regular-webfont.woff');
}
```

## Emoji

```css
/* Custom emoji font-family to standardize appearance across platforms */
/* https://www.client9.com/css-color-emoji-stack/ */
/* https://nolanlawson.com/2022/04/08/the-struggle-of-using-native-emoji-on-the-web/ */
@font-face {
  font-family: 'color-emoji';
  src: local('Apple Color Emoji'), local('Twemoji Mozilla'), local('Segoe UI Emoji'), local('Segoe UI Symbol'), local(
      'Noto Color Emoji'
    ), local('EmojiOne Color'), local('Android Emoji');
}

body {
  font-family: -apple-system, Segoe UI, sans-serif, color-emoji;
}
```
