---
title: MPD
---

# MPD

- [MusicPlayerDaemon/MPD](https://github.com/MusicPlayerDaemon/MPD)
  - https://en.wikipedia.org/wiki/Music_Player_Daemon
- 配置
  - /etc/mpd.conf
  - $XDG_CONFIG_HOME/mpd/mpd.conf - ~/.config/mpd/mpd.conf
- 参考
  - https://musicpd.org/clients/

```bash
apk add mpd # AlpineLinux /etc/mpd.conf

mkdir -p ~/.config/mpd  # ~/.config/mpd/mpd.conf
mpd --no-daemon         # 前台运行

```

```conf title="mpd.conf"
music_directory "/data/music"

# playlist_directory             "~/.mpd/playlists"
# db_file                        "~/.mpd/database"

log_file                "syslog"
#pid_file                       "~/.mpd/pid"
#state_file                     "~/.mpd/state"
#sticker_file                   "~/.mpd/sticker.sql"

user            "mpd"
#group                          "nogroup"
#bind_to_address                "any"
#bind_to_address                "~/.mpd/socket"
#port                           "6600"
#log_level                      "notice"
#restore_paused "no"
#save_absolute_paths_in_playlists       "no"
#metadata_to_use        "artist,album,title,track,name,genre,date,composer,performer,disc"
#metadata_to_use "+comment"
#auto_update    "yes"
#auto_update_depth "3"
#follow_outside_symlinks        "yes"
#follow_inside_symlinks         "yes"
#zeroconf_enabled               "yes"
#zeroconf_name                  "Music Player @ %h"
#password                        "password@read,add,control,admin"
#default_permissions             "read,add,control,admin"


database {
    plugin "simple"
    path "/var/lib/mpd/db"
}

#replaygain                     "album"
#replaygain_preamp              "0"
#replaygain_missing_preamp      "0"
#replaygain_limit               "yes"
#volume_normalization           "no"
#filesystem_charset             "UTF-8"
```

### 输出

```conf
# ALSA
audio_output {
  type            "alsa"
  name            "My Sound Card"
  mixer_type      "software"      # 可选
}

# PulseAudio
audio_output {
  type            "pulse"
  name            "pulse audio"
}
```

## mpc
