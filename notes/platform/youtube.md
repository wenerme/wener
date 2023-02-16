---
title: Youtube
---

# Youtube

## Video ID

- `[0-9A-Za-z_-]{10}[048AEIMQUYcgkosw]`
  - int64 - 编码后 11 位
- ChannelID `[0-9A-Za-z_-]{21}[AQgw]`
- URL Safe Base64 - https://webapps.stackexchange.com/a/101153/74685
- 判断是否有效 `http://gdata.youtube.com/feeds/api/videos/VIDEO_ID`
