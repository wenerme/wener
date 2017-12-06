# TTS

## Tips
* [CSTR-Edinburgh/merlin](https://github.com/CSTR-Edinburgh/merlin)
  * The Neural Network (NN) based Speech Synthesis System
* [marytts/marytts](https://github.com/marytts/marytts)
  * an open-source, multilingual text-to-speech synthesis system written in pure java
* [MycroftAI/mimic](https://github.com/MycroftAI/mimic)
  * Mycroft's TTS engine, based on CMU's Flite (Festival Lite)
* [espeak-ng/espeak-ng](https://github.com/espeak-ng/espeak-ng)
* [hgneng/ekho](https://github.com/hgneng/ekho)
  * Chinese text-to-speech engine


* https://gist.github.com/alotaiba/1728771
  * https://cloud.google.com/speech/docs/languages
```bash
# Google TTS
# 记得设置代理
curl -vA Mozilla -o output.mp3 "http://translate.google.com/translate_tts?ie=UTF-8&total=1&idx=0&textlen=32&client=tw-ob&q=Test&tl=En-gb"

curl -vA Mozilla -o output.mp3 "http://translate.google.com/translate_tts?ie=UTF-8&total=1&idx=0&textlen=32&client=tw-ob&q=您好&tl=cmn-Hans-CN"
```
