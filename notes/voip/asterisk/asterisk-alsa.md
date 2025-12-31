---
title: Asterisk ALSA
tags:
  - Asterisk
  - ALSA
  - Volume
---

# Asterisk ALSA

- [Asterisks locks ALSA device if chan_alsa is loaded](https://unix.stackexchange.com/questions/502636)
- [Music Player Daemon](https://www.musicpd.org/)
- [Asterisk config alsaconf](https://www.voip-info.org/asterisk-config-alsaconf/)

alsa 作为 channel

ALSA channels allow calls to be placed to/from ALSA devices, using ALSA audio input/output devices as telephony devices.

## OSS

- [Open Sound System](https://en.wikipedia.org/wiki/Open_Sound_System)

```bash
cat /dev/random > /dev/dsp # plays white noise through the speaker
cat /dev/dsp > a.a         # reads data from the microphone and copies it to file a.a
```
