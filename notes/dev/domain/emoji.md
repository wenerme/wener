---
title: Emoji
---

# Emoji

- [Emoji Cheat Sheet](http://www.emoji-cheat-sheet.com/)
- [Complete list of github markdown emoji markup](https://gist.github.com/rxaviers/7360908)
- https://unicode.org/emoji/charts/full-emoji-list.html
- [Emoticons](<https://en.wikipedia.org/wiki/Emoticons_(Unicode_block)>)
- [UnicodeSet](https://util.unicode.org/UnicodeJsps/list-unicodeset.jsp?a=%5B%3AEmoji%3DYes%3A%5D&esc=on)
- https://github.com/hfg-gmuend/openmoji

---

- `👨‍👩‍👧‍👦`
  - `&zwj;` - Zero-width joiner
  - `U+200D` - ZERO WIDTH JOINER
  - https://en.wikipedia.org/wiki/Zero-width_joiner

## CSS

```css
@font-face {
  font-family: emoji;

  /* Fonts for text outside emoji blocks */
  src: local('Droid Sans Mono'), local('Lucida Console'), local('Arial Monospaced'), local(Arial);
}

@font-face {
  font-family: emoji;

  src: local('Apple Color Emoji'), local('Android Emoji'), local('Segoe UI'), local(EmojiSymbols), local(Symbola),
    url('font/Symbola-Emoji.eot?#iefix') format('embedded-opentype'), url('font/Symbola-Emoji.woff') format('woff'),
    url('font/Symbola-Emoji.ttf') format('truetype');

  /* Emoji unicode blocks */
  unicode-range: U+1F300-1F5FF, U+1F600-1F64F, U+1F680-1F6FF, U+2600-26FF;
}

/* 暂不支持 */
html {
  font-variant-emoji: emoji;
}
```

- https://gist.github.com/mfornos/9991865
- https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-emoji

## Git

| emoji | for                        |
| ----- | -------------------------- |
| ✅    | ci pass,ok                 |
| ⬆️    | update, upgrade dependency |
| 🔀    | branch, merge              |
| 📦️   | package, repository        |
| 📄    | license, document          |
| 📚    | document                   |
| 🏗️    | ci build, architectural    |
| 🏷️    | tag                        |
| 🔖    | tag, bookmark              |
| 🐛    | bug                        |
| ⏪    | revert                     |
| ✨    | feature                    |

- [GitCommitEmoji.md](https://gist.github.com/parmentf/035de27d6ed1dce0b36a)
- https://gitmoji.dev/
