# Audio

## Tips
* 建议尽量使用 opus

## Opus
* [Opus:wiki](https://en.wikipedia.org/wiki/Opus_(audio_format))
* [opus-codec](http://opus-codec.org/)
* [Opus Recommended Settings](https://wiki.xiph.org/Opus_Recommended_Settings)

```bash
brew install opus-tools
# Encode
opusenc --bitrate 8 in.wav out.opus
```

## Wav
* [WaveFormat](http://soundfile.sapp.org/doc/WaveFormat/)
* 容器格式为 RIFF
* 主要包含 fmt 和 data 两块
* [Differences between .wav and .WAV](https://community.freepbx.org/t/differences-between-wav-and-wav/23791)
  * https://www.voip-info.org/wiki/index.php?page_id=75
  * .WAV wav49
    * 文件较小, 音质还可以, 主要用于通过 email 发送 voicemail
  * .wav
    * 未压缩的格式
    * 文件较大, 音质最好
    * 需要很大的磁盘空间
