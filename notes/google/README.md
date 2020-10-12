# Google

* [Nik collection](https://www.google.com/nikcollection/)
  * 图像处理套件
  * Photoshop 插件
  * [Nik Software](https://en.wikipedia.org/wiki/Nik_Software)

## Cloud service
* [GCP](https://cloud.google.com/)
* [CLOUD SPEECH API](https://cloud.google.com/speech/)
* [CLOUD VISION API](https://cloud.google.com/vision/)

## Photo
* [](https://developers.google.com/picasa-web/docs/3.0/developers_guide_protocol)

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
wget -q --post-file record.flac --header="Content-Type: audio/x-flac; rate=16000" -O - "https://www.google.com/speech-api/v2/recognize?client=chromium&lang=en_US&key=AIzaSyAcalCzUvPmmJ7CZBFOEWx2Z1ZSn4Vs1gg"

wget -q -U Mozilla -O output.mp3 "http://translate.google.com/translate_tts?ie=UTF-8&total=1&idx=0&textlen=32&client=tw-ob&q=你好么&tl=zh_CN"

```

## Search
[HN - spinner](https://news.ycombinator.com/item?id=13476939)

* 计时器 [timer](https://www.google.com/search?q=timer)
* 节拍器 [metronome](https://www.google.com/search?q=metronome)
* 随机数 [random number between 5 and 55](https://www.google.com/search?q=random%20number%20between%205%20and%2055)
* 轮盘 [spinner](https://www.google.com/search?q=spinner)
* 玩纸牌 [solitaire](https://www.google.com/search?q=solitaire)
* 绘图 [3*cos(sqrt(x*x+y*y))+5](https://www.google.com/search?q=3*cos(sqrt(x*x%2By*y))%2B5)
* [Manage calculator, unit converter & color codes](https://support.google.com/websearch/answer/3284611)

## Calender
* 农历
  * http://www.google.com/calendar/ical/ug2j3l2nqq7uch3m9n0pm5t2lo@group.calendar.google.com/public/basic.ics

