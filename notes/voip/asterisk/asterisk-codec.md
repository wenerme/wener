---
title: Asterisk 编码
---

# Asterisk Codec

- VoIP 常用编码包括 ITU-T 系列的 G.7xx, GSM, iLBC
  - 其它编码, speex 等已经不推荐使用
- [Asterisk codecs](https://www.voip-info.org/wiki/view/Asterisk+codecs)
- [G.729](https://en.wikipedia.org/wiki/G.729)
  - 需要版权, 默认只能透传
- G.711
  - [ulaw](https://en.wikipedia.org/wiki/%CE%9C-law_algorithm)
    - US
  - [alaw](https://en.wikipedia.org/wiki/A-law_algorithm)
    - Europe
- [iLBC](https://en.wikipedia.org/wiki/Internet_Low_Bitrate_Codec)
  - Internet low Bitrate Codec
- 格式 - 优先选择 slin
  - slin: 16 bit Signed Linear PCM
  - gsm: 原始 GSM 编码，适用于 VoIP
  - wav: MS wav format, 16 bit linear
  - WAV: MS wav format, gsm encoded (wav49)
- 目前很多场景也推荐使用 [Opus 编码](https://wiki.asterisk.org/wiki/display/AST/Codec+Opus)
  - 开源、高效、支持的平台多
- 参考
  - [Convert WAV audio files for use in Asterisk](https://www.voip-info.org/convert-wav-audio-files-for-use-in-asterisk/)

```bash
# 查看编码、转译、文件格式
core show codecs
core show translation
core show file format
```

| codec           | name                         | ref     |
| --------------- | ---------------------------- | ------- |
| ADPCM, IMA      |
| AMR             | Adaptive Multi-Rate          | RFC4867 |
| AMR-WB          |
| AMR-WB+         |
| B64             |
| G.722           |
| G.723           |
| G.726           |
| G.729           |
| GSM             |
| H.264           |                              | RFC6184 |
| H.265/HEVC      | High Efficiency Video Coding | RFC7798 |
| Opus            |                              | RFC7587 |
| PCMA-WB         | ITU-T G.711.1 A-law          | RFC5391 |
| PCMA,A-Law,alaw | ITU-T G.711 PCM A-Law        | RFC3551 |
| PCMU-WB         | ITU-T G.711.1 μ-Law          | RFC5391 |
| PCMU,μ-Law,ulaw | TU-T G.711 PCM μ-Law         | RFC3551 |
| Speex           |

- 实时语音基本都是 20ms
- RTCP NTP timestamp
  - 1–60 samples per second.

## VoIP 常用编码

以下编码时钟频率均为 8000, 默认包大小 20

| Codec | PT  | Note       |
| ----- | --- | ---------- |
| PCMU  | 0   | G.711/ulaw |
| GSM   | 3   |
| G723  | 4   |
| PCMA  | 8   | G.711/alaw |
| G722  | 9   |
| G729  | 18  | G.729a     |

> PT = RTC Payload Type

- [RTP payload formats](https://en.wikipedia.org/wiki/RTP_payload_formats)

## 音频编码

- 最佳兼容编码是 ulaw、alaw、gsm
  - allow=ulaw,alaw,g722
  - disallow=all
- 开启 all 目前得到的是 codec2|g723|ulaw|alaw|gsm|g726|g726aal2|adpcm|slin|slin|slin|slin|slin|slin|slin|slin|slin|lpc10|g729|speex|speex|speex|ilbc|g722|siren7|siren14|testlaw|g719|opus|jpeg|png|h261|h263|h263p|h264|mpeg4|vp8|vp9|red|t140|t38|silk|silk|silk|silk
- 如果两端的编码不一致会由 asterisk 进行转码 - 有一定的性能影响
- 如果和允许的编码不匹配会导致拒绝
  - SDP: Incompatible media format: no common codec
- SDP 里的 rtpmap 标示支持的编码格式

**SDP** 头里的编码信息

```
m=audio 55560 RTP/AVP 0 101 3 8 110 97
a=rtpmap:101 telephone-event/8000
a=fmtp:101 0-16
a=rtpmap:110 speex/8000
a=rtpmap:97 iLBC/8000
a=fmtp:97 mode=30
```

- 编码类型
  - u-law
  - G726
  - Speex Wide
  - Speex Ultra
  - Opus Narrow
  - Opus Super
  - Opus Full
  - Opus Wide
  - GSM
  - a-law
  - Speex Narrow
  - iLBC 30
  - G729
  - G722

| Coded | Fidelity | Bitrate       |
| ----- | -------- | ------------- |
| GSM   | 8000     | 13200         |
| Opus  | 48000    | 6000 - 510000 |

## 视频编码

- H.263 90Kbps
- H.264
- VP8
- 客户端支持情况
  - XLite 支持 H263 H263P
  - Zoiper 免费版支持 VP8 付费版支持 H264

## 音频文件转码

- [在线转码](https://www.sangoma.com/audio-converter/)
  - 支持转出 8K WAV、GSM、slin16、G729
- [Asterisk Sound Files 101!](https://www.sangoma.com/articles/asterisk-sound-files-101/)

```bash
# 如果出现警告, 可以尝试降低音量  -v 0.96
sox callwait.mp3 -c 1 -r 16000 -b 16 callwait.wav
```

### 批量转换

```bash
sox SilentCity.mp3 -t raw -r 8000 -s -2 -c 1 SilentCity.sln
cp *.sln /var/lib/asterisk/moh
asterisk -rx "module reload res_musiconhold.so"

# exten => 664,1,NoOp()
#     same => n,Progress()
#     same => n,MusicOnHold()

lame --decode music.mp3 music.wav
sox -V music.wav -r 8000 -c 1 -w music.raw
sox -V music.wav -r 8000 -c 1 -w music.gsm

for i in *.wav; do \
sox $i -r 8000 -c 1 $(basename $i .wav).raw; \
sox $i -r 8000 -c 1 $(basename $i .wav).gsm; \
done
rm *.wav
```

## 格式之间的转码时间

```
         Translation times between formats (in microseconds) for one second of data
          Source Format (Rows) Destination Format (Columns)

           ulaw  alaw   gsm  g726 g726aal2 adpcm  slin  slin  slin  slin  slin  slin  slin  slin  slin lpc10  ilbc  g722 testlaw
     ulaw     -  9150 15000 15000    15000 15000  9000 17000 17000 17000 17000 17000 17000 17000 17000 15000 15000 17250   15000
     alaw  9150     - 15000 15000    15000 15000  9000 17000 17000 17000 17000 17000 17000 17000 17000 15000 15000 17250   15000
      gsm 15000 15000     - 15000    15000 15000  9000 17000 17000 17000 17000 17000 17000 17000 17000 15000 15000 17250   15000
     g726 15000 15000 15000     -    15000 15000  9000 17000 17000 17000 17000 17000 17000 17000 17000 15000 15000 17250   15000
 g726aal2 15000 15000 15000 15000        - 15000  9000 17000 17000 17000 17000 17000 17000 17000 17000 15000 15000 17250   15000
    adpcm 15000 15000 15000 15000    15000     -  9000 17000 17000 17000 17000 17000 17000 17000 17000 15000 15000 17250   15000
     slin  6000  6000  6000  6000     6000  6000     -  8000  8000  8000  8000  8000  8000  8000  8000  6000  6000  8250    6000
     slin 14500 14500 14500 14500    14500 14500  8500     -  8000  8000  8000  8000  8000  8000  8000 14500 14500 14000   14500
     slin 14500 14500 14500 14500    14500 14500  8500  8500     -  8000  8000  8000  8000  8000  8000 14500 14500  6000   14500
     slin 14500 14500 14500 14500    14500 14500  8500  8500  8500     -  8000  8000  8000  8000  8000 14500 14500 14500   14500
     slin 14500 14500 14500 14500    14500 14500  8500  8500  8500  8500     -  8000  8000  8000  8000 14500 14500 14500   14500
     slin 14500 14500 14500 14500    14500 14500  8500  8500  8500  8500  8500     -  8000  8000  8000 14500 14500 14500   14500
     slin 14500 14500 14500 14500    14500 14500  8500  8500  8500  8500  8500  8500     -  8000  8000 14500 14500 14500   14500
     slin 14500 14500 14500 14500    14500 14500  8500  8500  8500  8500  8500  8500  8500     -  8000 14500 14500 14500   14500
     slin 14500 14500 14500 14500    14500 14500  8500  8500  8500  8500  8500  8500  8500  8500     - 14500 14500 14500   14500
    lpc10 15000 15000 15000 15000    15000 15000  9000 17000 17000 17000 17000 17000 17000 17000 17000     - 15000 17250   15000
     ilbc 15000 15000 15000 15000    15000 15000  9000 17000 17000 17000 17000 17000 17000 17000 17000 15000     - 17250   15000
     g722 15600 15600 15600 15600    15600 15600  9600 17500  9000 17000 17000 17000 17000 17000 17000 15600 15600     -   15600
  testlaw 15000 15000 15000 15000    15000 15000  9000 17000 17000 17000 17000 17000 17000 17000 17000 15000 15000 17250       -
```

## 音频文件编码格式说明

| ID  | TYPE  | NAME     | FORMAT   | DESCRIPTION                                             |
| --- | ----- | -------- | -------- | ------------------------------------------------------- |
| 31  | image | png      | png      | (PNG Image)                                             |
| 6   | audio | g726     | g726     | (G.726 RFC3551)                                         |
| 4   | audio | alaw     | alaw     | (G.711 a-law)                                           |
| 2   | audio | g723     | g723     | (G.723.1)                                               |
| 20  | audio | speex    | speex    | (SpeeX)                                                 |
| 21  | audio | speex    | speex16  | (SpeeX 16khz)                                           |
| 22  | audio | speex    | speex32  | (SpeeX 32khz)                                           |
| 24  | audio | g722     | g722     | (G722)                                                  |
| 25  | audio | siren7   | siren7   | (ITU G.722.1 (Siren7, licensed from Polycom))           |
| 32  | video | h261     | h261     | (H.261 video)                                           |
| 33  | video | h263     | h263     | (H.263 video)                                           |
| 8   | audio | adpcm    | adpcm    | (Dialogic ADPCM)                                        |
| 43  | audio | silk     | silk8    | (SILK Codec (8 KHz))                                    |
| 44  | audio | silk     | silk12   | (SILK Codec (12 KHz))                                   |
| 45  | audio | silk     | silk16   | (SILK Codec (16 KHz))                                   |
| 46  | audio | silk     | silk24   | (SILK Codec (24 KHz))                                   |
| 28  | audio | g719     | g719     | (ITU G.719)                                             |
| 34  | video | h263p    | h263p    | (H.263+ video)                                          |
| 35  | video | h264     | h264     | (H.264 video)                                           |
| 19  | audio | g729     | g729     | (G.729A)                                                |
| 9   | audio | slin     | slin     | (16 bit Signed Linear PCM)                              |
| 10  | audio | slin     | slin12   | (16 bit Signed Linear PCM (12kHz))                      |
| 11  | audio | slin     | slin16   | (16 bit Signed Linear PCM (16kHz))                      |
| 12  | audio | slin     | slin24   | (16 bit Signed Linear PCM (24kHz))                      |
| 13  | audio | slin     | slin32   | (16 bit Signed Linear PCM (32kHz))                      |
| 14  | audio | slin     | slin44   | (16 bit Signed Linear PCM (44kHz))                      |
| 15  | audio | slin     | slin48   | (16 bit Signed Linear PCM (48kHz))                      |
| 16  | audio | slin     | slin96   | (16 bit Signed Linear PCM (96kHz))                      |
| 17  | audio | slin     | slin192  | (16 bit Signed Linear PCM (192kHz))                     |
| 3   | audio | ulaw     | ulaw     | (G.711 u-law)                                           |
| 18  | audio | lpc10    | lpc10    | (LPC10)                                                 |
| 27  | audio | testlaw  | testlaw  | (G.711 test-law)                                        |
| 42  | audio | none     | none     | (Null codec)                                            |
| 41  | image | t38      | t38      | (T.38 UDPTL Fax)                                        |
| 38  | video | vp9      | vp9      | (VP9 video)                                             |
| 37  | video | vp8      | vp8      | (VP8 video)                                             |
| 5   | audio | gsm      | gsm      | (GSM)                                                   |
| 36  | video | mpeg4    | mpeg4    | (MPEG4 video)                                           |
| 23  | audio | ilbc     | ilbc     | (iLBC)                                                  |
| 39  | text  | red      | red      | (T.140 Realtime Text with redundancy)                   |
| 40  | text  | t140     | t140     | (Passthrough T.140 Realtime Text)                       |
| 29  | audio | opus     | opus     | (Opus Codec)                                            |
| 30  | image | jpeg     | jpeg     | (JPEG image)                                            |
| 7   | audio | g726aal2 | g726aal2 | (G.726 AAL2)                                            |
| 1   | audio | codec2   | codec2   | (Codec 2)                                               |
| 26  | audio | siren14  | siren14  | (ITU G.722.1 Annex C, (Siren14, licensed from Polycom)) |

## 文件格式说明

| Format  | Name    | Extensions |
| ------- | ------- | ---------- | ------ | --- | --- | --- |
| slin192 | sln192  | sln192     |
| slin96  | sln96   | sln96      |
| slin48  | sln48   | sln48      |
| slin44  | sln44   | sln44      |
| slin32  | sln32   | sln32      |
| slin24  | sln24   | sln24      |
| slin16  | sln16   | sln16      |
| slin12  | sln12   | sln12      |
| slin    | sln     | sln        | raw    |
| gsm     | gsm     | gsm        |
| g719    | g719    | g719       |
| g729    | g729    | g729       |
| g726    | g726-16 | g726-16    |
| g726    | g726-24 | g726-24    |
| g726    | g726-32 | g726-32    |
| g726    | g726-40 | g726-40    |
| slin16  | wav16   | wav16      |
| slin    | wav     | wav        |
| h264    | h264    | h264       |
| h263    | h263    | h263       |
| siren7  | siren7  | siren7     |
| ilbc    | iLBC    | ilbc       |
| g723    | g723sf  | g723       | g723sf |
| g722    | g722    | g722       |
| ulaw    | au      | au         |
| alaw    | alaw    | alaw       | al     | alw |
| ulaw    | pcm     | pcm        | ulaw   | ul  | mu  | ulw |
| siren14 | siren14 | siren14    |
| gsm     | wav49   | WAV        | wav49  |
| adpcm   | vox     | vox        |
