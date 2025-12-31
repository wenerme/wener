---
title: BitTorrent Tracker
tags:
  - Protocol
  - P2P
  - BitTorrent
---

# Trackers

[Wiki: BitTorrent tracker](https://en.wikipedia.org/wiki/BitTorrent_tracker)

- [chihaya/chihaya](https://github.com/chihaya/chihaya)
  - A customizable, multi-protocol BitTorrent Tracker
  - built for developers looking to integrate BitTorrent into a preexisting production environment
- [HDVinnie/Torrent-Tracker-Platforms](https://github.com/HDVinnie/Torrent-Tracker-Platforms)
  - A Curated List Of Torrent Tracker Platforms/Codebases Written In Multiple Coding Languages
- [webtorrent/bittorrent-tracker](https://github.com/webtorrent/bittorrent-tracker)
- [opentracker](http://erdgeist.org/arts/software/opentracker/)

# Clients

[qBitTorrent](https://www.qbittorrent.org/) — Windows/Mac (an open-source, free variant of uTorrent)

## Deluge

- [Deluge](https://deluge-torrent.org/) — Windows/Mac
  - A lightweight, Free Software, cross-platform BitTorrent client.
- [Deluge UserGuide ThinClient](https://dev.deluge-torrent.org/wiki/UserGuide/ThinClient)
  - Client-Server
  - Full Encryption, WebUI, GTK UI, Console UI
- Plugin System

## Transmission

- [Transmission](https://transmissionbt.com/) — mainly for Mac, but an “early preview” Windows version is available.
  - [transmission/transmission](https://github.com/transmission/transmission)
  - Uses fewer resources than other clients
  - Native Mac, GTK+ and Qt GUI clients
  - Daemon ideal for servers, embedded systems, and headless use
  - All these can be remote controlled by Web and Terminal clients
  - Local Peer Discovery
  - Full encryption, DHT, µTP, PEX and Magnet Link support

## Tixati

- [Tixati](https://www.tixati.com/) — Windows (simple and skinnable!)
  - Simple and easy to use
  - Ultra-fast downloading algorithms
  - DHT, PEX, and Magnet Link support
  - Easy and quick install - no java, no .net
  - Super-efficient peer selection and choking
  - RC4 connection encryption for added security
  - Detailed bandwidth management and charting
  - UDP Peer Connections and NAT router hole-punching
  - Advanced features such as RSS, IP Filtering, Event Scheduler

## CLI Usage

### Transmission CLI

```bash
brew install transmission

transmission-create ubuntu.bin.7z -t udp://tracker.openbittorrent.com:80

transmission-daemon -c ~/p2p
```

- [Transmission: EditConfigFiles](https://trac.transmissionbt.com/wiki/EditConfigFiles)
- [Transmission: Editing Configuration Files](https://github.com/transmission/transmission/wiki/Editing-Configuration-Files)

```bash
TRANSDIR=/var/lib/transmission-daemon
cp -p $1 $TRANSDIR/downloads/

transmission-remote -l
transmission-create $TRANSDIR/downloads/$1 -t udp://tracker.openbittorrent.com:80 -o $HOME/$1.torrent
transmission-remote --add $HOME/$1.torrent

# transmission-create@ transmission-daemon@ transmission-edit@ transmission-remote@ transmission-show@
```

### Alpine Linux

```bash
apk add transmission-cli transmission-daemon

mkdir torrent

echo Hello Torrent! > torrent/hello.txt
transmission-create torrent/hello.txt -t udp://tracker.openbittorrent.com:80

transmission-daemon -c $PWD/torrent
# transmission-remote --add hello.txt.torrent

transmission-show torrent/hello.txt.torrent.added

transmission-remote -l

mkdir ~/bt
mkdir ~/torrent
```

### aria2c

```bash
aria2c http://site/file.torrent

# magnet
aria2c --follow-torrent=mem http://site/file.torrent
```
