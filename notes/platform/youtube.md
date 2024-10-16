---
title: Youtube
---

# Youtube

- YouTube Premium
  - 去广告
  - 后台播放 & 画中画
  - 离线下载
  - YouTube Music Premium
  - YouTube Originals
- 参考
  - 国家地区 https://support.google.com/youtube/answer/6307365
  - https://findyoutubevideo.thetechrobo.ca/
    - 查找删除的视频信息

**会员价格**

| 地区     | 价格 USD/月         | 差额 USD/月 |
| -------- | ------------------- | ----------- |
| 美国     | $13.99              |
| 香港     | 78HKD               |
| 尼日利亚 | $0.86 （1,100 NGN） | -$13.13     |
| 阿根廷   | $1.14 (389 ARS)     | -$12.85     |
| 印度     | $1.57 (129 INR)     | -$12.42     |
| 乌克兰   | $2.69 (99 UAH)      | -$11.30     |

## Video ID

- `[0-9A-Za-z_-]{10}[048AEIMQUYcgkosw]`
  - int64 - 编码后 11 位
- ChannelID `[0-9A-Za-z_-]{21}[AQgw]`
- URL Safe Base64 - https://webapps.stackexchange.com/a/101153/74685
- 判断是否有效 `http://gdata.youtube.com/feeds/api/videos/VIDEO_ID`
