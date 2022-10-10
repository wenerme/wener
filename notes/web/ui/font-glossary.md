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
| .SF NS                         |

- https://developer.apple.com/fonts/
- [List of typefaces included with macOS](https://en.wikipedia.org/wiki/List_of_typefaces_included_with_macOS)
- [Fonts on Macintosh](https://en.wikipedia.org/wiki/Fonts_on_Macintosh)

| font-weight | common name             | uncommon |
| ----------- | ----------------------- | -------- |
| 100         | Thin,Hairline           |
| 200         | Extralight, Ultralight  |
| 300         | Light                   |
| 400/normal  | Regular                 |
| 500         | Medium                  |
| 600         | Semibold, Demibold      | Medium   |
| 700/bold    |                         |
| 800         | Extrabold, Ultrabold    | Semibold |
| 900         | Black, Heavy            |
| 950         | Extra Black,Ultra Black |
| lighter     | 相对当前                |
| bolder      | 相对当前                |

```bash
# macOS
fc-list : file family
```

## 中文字体

- 四大主流文字：宋、仿、黑、楷
- 宋体
  - 可考是明代才出现的字形
  - 日本成为 明体
- 仿宋
  - 宋朝出现的宋体
- 抄经体
- Adobe Song Std L（Adobe 宋体）
- STSong（华文宋体）
- SimSun（中易宋体） - Windows
- 思源
  - by Adobe, Google
  - SIL
  - 思源宋体 - Source Han Serif, Noto Serif CJK
    - 2017 年 4 月 3 日
  - 思源黑体
    - 2014 年 7 月 16 日
  - 思源柔黑
- 王汉宗自由字形
  - GPL
- 文泉驿字体
- 濑户字体
- 书体坊免费字体
- 站酷高端黑
- 站酷快乐体
- 站酷酷黑体
- 郑庆科黄油体
- 可口可乐在乎体
- OPPO Sans 字体
- 阿里巴巴普惠体
- 台北黑体繁体
- 未来荧黑
- 俊羽圆体字体
- 字体圈欣意冠黑体
- 庞门正道标题体
- 联盟起艺卢帅正锐黑体
- 问藏书房
- 字体传奇特战体
- 文鼎公众授权字体
- 方正

## 中文字号

| 字号   | 磅数/pt | 级数/px | 主要用途   |
| ------ | ------- | ------- | ---------- |
| 初号   | 42      | 58.6/59 | 标题       |
| 小初号 | 36      | 50      | 标题       |
| 一号   | 26      | 38      | 标题       |
| 小一号 | 24      | 34      | 标题       |
| 二号   | 21      | 28      | 标题       |
| 小二号 | 18      | 24      | 标题       |
| 三号   | 16      | 22      | 标题、正文 |
| 小三号 | 15      | 21      | 标题、正文 |
| 四号   | 14      | 20      | 标题、正文 |
| 小四号 | 12      | 18      | 标题、正文 |
| 五号   | 10.5    | 15      | 正文       |
| 小五号 | 9       | 13      | 注文       |
| 六号   | 7.5     | 11      | 角注、注文 |
| 小六号 | 6.5     | 10      | 角注、注文 |
| 七号   | 5.5     | 8       | 排角注     |
| 八号   | 5       | 7       | 排角注     |

- [字号 (印刷)](<https://zh.wikipedia.org/wiki/字号_(印刷)>)
- 中华人民共和国国家标准 GB/T 9704—2012《党政机关公文格式》就有“如无特别说明，公文格式各要素一般用 3 号仿宋体字。

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
