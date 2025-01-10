---
title: Spotify
---

# Spotify

- 支持地区
  - https://support.spotify.com/tw/article/where-spotify-is-available/
- 海外漫游 14 天
- 地区影响音乐版权

## Awesome

- Client
  - https://www.spotify.com/en/download/other/
  - [SpotX-Official/SpotX](https://github.com/SpotX-Official/SpotX)
    - Modified Spotify Client for Windows
    - [SpotX-Official/SpotX-Bash](https://github.com/SpotX-Official/SpotX-Bash)
      - SpotX Mac and Linux adblocker for the Spotify desktop client
  - [mrpond/BlockTheSpot](https://github.com/mrpond/BlockTheSpot)
    - Video, audio & banner adblock/skip for Spotify on Windows
  - extensions
    - https://github.com/surfbryce/beautiful-lyrics
- Web
  - Spotify Ad Blocker - Blockify https://chromewebstore.google.com/detail/spotify-ad-blocker-blocki/nfmlkliedggdodlbgghmmchhgckjoaml
- [spicetify/cli](https://github.com/spicetify/cli)
  - Command-line tool to customize Spotify client
- [KRTirtho/spotube](https://github.com/KRTirtho/spotube)
  - 开源客户端
- [jpochyla/psst](https://github.com/jpochyla/psst)
  - multi-platform Spotify client with native GUI
- 参考
  - The Ultimate Spotify Ad Blocking guide https://www.reddit.com/r/Piracy/comments/14rszaw


```bash
bash <(curl -sSL https://spotx-official.github.io/run.sh)
```

## spicetify

```bash
brew install spicetify-cli

spicetify backup apply

spicetify config extensions popupLyrics.js
spicetify apply
```

- /Applications/Spotify.app/Contents/Resources
- ~/.config/spicetify/config-xpui.ini
- ~/.config/spicetify/Extensions
