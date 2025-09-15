---
title: Google
---

# Google

- https://www.google.com/ncr
  - No Country Redirect
- [Nik collection](https://www.google.com/nikcollection/)
  - 图像处理套件
  - Photoshop 插件
  - [Nik Software](https://en.wikipedia.org/wiki/Nik_Software)
- https://labs.google/experiments
- Pricing
  - Workspace https://workspace.google.com/pricing
  - One https://one.google.com/about/plans
    - AI Credits https://support.google.com/googleone/answer/16287445

## AI

- Gemini
- Gemma
- https://deepmind.google/
- https://labs.google/fx/zh/tools/whisk
  - 生成 图片/视频
- NotebookLM
- flow
  - 视频、流程场景控制
- https://stitch.withgoogle.com/
  - 生成设计稿到 Figma 或 Code

## Cloud service

- [GCP](https://cloud.google.com/)
- [CLOUD SPEECH API](https://cloud.google.com/speech/)
- [CLOUD VISION API](https://cloud.google.com/vision/)

## Photo

- [](https://developers.google.com/picasa-web/docs/3.0/developers_guide_protocol)

## Driver

https://github.com/dsoprea/GDriveFS

```bash
pip install gdrivefs
gdfstool auth -u
gdfstool auth -a /var/cache/gdfs.creds "$CODE"

# linux 使用 -o big_writes 可提升速度
gdfs -o allow_other /var/cache/gdfs.creds /mnt/gdrivefs
```

## Voice

```bash
brew install sox
# 记录
rec -r 16000 -c 1 record.flac
# 识别
# rate=8000, 16000, 32000 and 44100
# lang=en_US,zh_CN...
wget -q --post-file record.flac --header="Content-Type: audio/x-flac; rate=16000" -O - "https://www.google.com/speech-api/v2/recognize?client=chromium&lang=en_US&key=$GOOGLE_SPEECH_API_KEY"

wget -q -U Mozilla -O output.mp3 "http://translate.google.com/translate_tts?ie=UTF-8&total=1&idx=0&textlen=32&client=tw-ob&q=你好么&tl=zh_CN"
```

## Search

- 精确匹配 `"关键词"`
- 排除 `-关键词`
- 或 `关键词1 OR 关键词2`
- 网站 `site:example.com`
- 文件类型 `filetype:pdf`
- `inurl:`
- `intitle:`
- `intitle:关键词1 关键词2`
- `related:example.com` 相关网站
- 占位符 `*`
- 数字范围 `..`
- 缓存版本 `cache:example.com`
- 查找链接到特定页面的网站 `link:example.com`
- 定义 `define:word`
- 翻译 `translate:word`
- 货币转换 `100 USD to CNY`
- 计算 `100 * 2`
- 单位转换 `100 cm to inch`
- 时区 `time in Beijing`
- 天气 `weather in Beijing`
- 股票 `GOOG`


[HN - spinner](https://news.ycombinator.com/item?id=13476939)

- 计时器 [timer](https://www.google.com/search?q=timer)
- 节拍器 [metronome](https://www.google.com/search?q=metronome)
- 随机数 [random number between 5 and 55](https://www.google.com/search?q=random%20number%20between%205%20and%2055)
- 轮盘 [spinner](https://www.google.com/search?q=spinner)
- 玩纸牌 [solitaire](https://www.google.com/search?q=solitaire)
- 绘图 [3*cos(sqrt(x*x+y\*y))+5](<https://www.google.com/search?q=3*cos(sqrt(x*x%2By*y))%2B5>)
- [Manage calculator, unit converter & color codes](https://support.google.com/websearch/answer/3284611)

## Calender

- 农历
  - http://www.google.com/calendar/ical/ug2j3l2nqq7uch3m9n0pm5t2lo@group.calendar.google.com/public/basic.ics
