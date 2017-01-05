# Google

* [Nik collection](https://www.google.com/nikcollection/)
  * 图像处理套件
  * Photoshop 插件
  * [Nik Software](https://en.wikipedia.org/wiki/Nik_Software)

## Cloud service
* [GCP](https://cloud.google.com/)
* [CLOUD SPEECH API](https://cloud.google.com/speech/)
* [CLOUD VISION API](https://cloud.google.com/vision/)


## Voice

```
brew install sox
# 记录
rec -r 16000 -c 1 record.flac
# 识别
# rate=8000, 16000, 32000 and 44100
# lang=en_US,zh_CN...
wget -q --post-file record.flac --header="Content-Type: audio/x-flac; rate=16000" -O - "https://www.google.com/speech-api/v2/recognize?client=chromium&lang=en_US&key=AIzaSyAcalCzUvPmmJ7CZBFOEWx2Z1ZSn4Vs1gg"

wget -q -U Mozilla -O output.mp3 "http://translate.google.com/translate_tts?ie=UTF-8&total=1&idx=0&textlen=32&client=tw-ob&q=你好么&tl=zh_CN"

```
