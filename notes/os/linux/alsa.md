---
title: ALSA (Advanced Linux Sound Architecture)
tags:
  - Linux
  - Audio
  - ALSA
---

# ALSA (Advanced Linux Sound Architecture) {#alsa}

- [How to stream audio over network? - Ask Ubuntu](https://askubuntu.com/a/894680/267103)

```bash
sudo modprobe snd_aloop
mpc add alsa://hw:1,1
```

```conf
audio_output {
    type            "httpd"
    name            "My HTTP Stream"
    encoder         "vorbis" # optional, vorbis or lame
    port            "8000"
    bind_to_address "192.168.1.38" # optional, IPv4 or IPv6
    quality         "5.0" # do not define if bitrate is d$

    # bitrate "128" # do not define if quality is d$

    format          "44100:16:1"
    max_clients     "0"                     # optional 0=no limit

}
```

```bash
aplay -l
```

## Docker 中使用 ALSA {#alsa-in-docker}

- [Using ALSA in Docker - Stack Overflow](https://stackoverflow.com/a/41084959/1870054)

```bash
--device /dev/snd
```

## 参考资源 {#references}

- [jessfraz/dockerfiles](https://github.com/jessfraz/dockerfiles)
- [Streaming audio over the network in linux](https://ywwg.com/wordpress/archives/1201)
- [AudioSocket - Asterisk Wiki](https://wiki.asterisk.org/wiki/display/AST/AudioSocket)
- [trx: Realtime audio over IP](http://www.pogo.org.uk/~mark/trx/)
  - [Streaming desktop audio](http://www.pogo.org.uk/~mark/trx/streaming-desktop-audio.html)
- [How to pipe audio output to a microphone input? - Unix & Linux Stack Exchange](https://unix.stackexchange.com/a/1896/47774)
- [Sound server - Wikipedia](https://en.wikipedia.org/wiki/Sound_server)
