---
# date: 2016-8-6 23:43 # TODO
tags:
  - Game
  - Android
---

# Play Titans using shell

[Tap Titans](https://play.google.com/store/apps/details?id=com.gamehivecorp.taptitans) on Play Store

## Features

- Auto upgrade
- Auto spell skill
- Auto start challenge
- Auto close ad dialog
- Verify fast tap (0.03s/tap)

> **NOTE**
>
> - Only tested on Nexus 5, different devices may use different coordinates and event dev.
> - Used to plat tiantis long time ago, may not works in current version.Different version may use different color and coordinates

## Requirement

- ADB
- Image Magic
- Bash

## Get started

- Start game
- Get source [tap-titans-play.sh](https://github.com/wenerme/wener/tree/master/story/2016/tap-titans-play.sh)

```bash
chmod +x play.sh
# Connect through lan, so you don't have to use the usb
./play.sh use-tcp
# Push the pre-generated event file
adb push events /mnt/sdcard
# Start playing
./play.sh
```

## How is works ?

### Why fast ?

- Because I don't use `adb shell input tap`, instead use a generated file that represent a tap event, then `cat tap > /dev/input/event1`.
- Use generated shell run in android.

### How to detect the screen event ?

Use screen capture, then use the image magic to check the color,kind of slowly, but works.

## More

Check the [source](https://github.com/wenerme/wener/tree/master/story/2016/tap-titans-play.sh)
