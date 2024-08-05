---
title: bilibili
---

# Bilibili

## 嵌入视频 {#embed}

:::caution

- 嵌入视频只能以 360p 清晰度播放

:::

```
//player.bilibili.com/player.html
  ?aid=
  &bvid=
  &cid=
  &page=1
```

| param        | example      | for      | notes              |
| ------------ | ------------ | -------- | ------------------ |
| aid          | 123456789    | av号     | 早期视频 ID        |
| bvid         | BV12345Abcde | bv号     | 新版视频 ID        |
| cid          | 123456789    |
| page         | 1            | 分P      | 集合里的第几个视频 |
| high_quality | 1            |          | 不支持，需要登录   |
| danmaku      | 0            | 弹幕     |
| isOutside    | true         |
| autoplay     | 1            | 自动播放 |

```html
<iframe
  src="//player.bilibili.com/player.html?aid=&bvid=&cid=&page=1&high_quality=1&danmaku=0"
  allowfullscreen="allowfullscreen"
  width="100%"
  height="100%"
  scrolling="no"
  frameborder="0"
  sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"
></iframe>
```

**分享 > 嵌入代码**

```html
<iframe
  src="//player.bilibili.com/player.html?"
  scrolling="no"
  border="0"
  frameborder="no"
  framespacing="0"
  allowfullscreen="true"
></iframe>
```
