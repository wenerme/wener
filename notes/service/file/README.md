---
title: File Sharing & Storage Services
tags:
  - Service
  - FileSharing
  - Storage
  - CloudProvider
---

# File Sharing & Storage Services

- [Web Delta Sync](https://webdeltasync.github.io/)
- [Rsync Algorithm](https://rsync.samba.org/how-rsync-works.html)

## P2P & Browser-based Transfer

- [ShareDrop](https://www.sharedrop.io/) - [GitHub](https://github.com/cowbell/sharedrop)
- [FilePizza](https://github.com/kern/filepizza) - P2P file transfers in browser
- [Firefox Send](https://github.com/mozilla/send) (Discontinued)
- [NitroShare](https://nitroshare.net/) - Cross-platform network file transfer
- [OnionShare](https://onionshare.org/) - Secure file sharing over Tor

## Self-Hosted Solutions

### Enterprise & Team

- [Nextcloud](https://nextcloud.com/)
- [ownCloud](https://owncloud.com/)
- [Seafile](https://www.seafile.com/)
- [Pydio Cells](https://pydio.com/) (Golang rewrite)
- [FileCloud](https://www.getfilecloud.com/)
- [LinShare](https://www.linshare.org/) - Open Source Enterprise File Sharing
- [ProjectSend](https://www.projectsend.org/) - Client-oriented file sharing
- [Aurora Files](https://github.com/afterlogic/aurora-files/)
- [YouTransfer](https://github.com/YouTransfer/YouTransfer)

### Lightweight & Misc

- [FileDrop](https://github.com/mjumbewu/filedrop) - Web-based UI
- [Syncthing](https://syncthing.net/) - Decentralized P2P file sync (Go)

## Storage Platforms

- [Ceph](https://ceph.io/) - Distributed object, block, and file storage

## Descriptions

### 1. ownCloud

Open source alternative to Dropbox. Client-server software for file hosting.
Originally PHP, now rewritten in Go (ownCloud Infinite Scale).

### 2. Syncthing

Open source, decentralized P2P file synchronization tool. No central server.
Data stays on your devices. Strong encryption (TLS).

### 3. FileCloud

Self-hosted file-sharing solution for enterprise. Integrates with existing NTFS permissions.

### 4. Nextcloud

Fork of ownCloud. Enterprise-ready, GDPR-compliant.
Features: Files, Talk, Groupware, Office.

### 5. Seafile

Focuses on reliability and performance. Core written in C.
Efficient syncing algorithm.

Syncthing allows you to synchronize as many folders with as many people as you need. You can configure and monitor Syncthing using a responsive web GUI that runs flawlessly in all major web browsers. Syncthing itself works on macOS, Windows, Linux, FreeBSD, Solaris, OpenBSD, Android, and iOS, enabling you to seamlessly access your files from virtually any device.

3. FileCloud
   Designed with enterprise users in mind, FileCloud is a self-hosted file-sharing solution designed to be integrated with enterprise networks and storage. With FileCloud, employees can access their organization’s files securely over the web, using a virtual drive and mobile apps, or with web browser add-ons.

FileCloud offers many sharing options, and it honors existing Microsoft NTFS permissions and authentication. Thanks to its integration with Office and Outlook, it’s possible to open, edit, and save any Office files stored in FileCloud right from the browser. FileCloud comes with a wide range of powerful admin tools, including an admin dashboard that displays usage trends, peak usage, access by geo, and other key file analytics.

4. Nextcloud
   Licensed under the GNU Affero General Public License, Nextcloud a suite of client-server software for creating and using file hosting services. The part of Nextcloud that will probably interest you the most is Nextcloud Files, which is an enterprise- and GDPR-ready file-sharing solution that keeps data under your control.

Nextcloud Files is an open source, self-hosted product with powerful on-server and end-to-end encryption and a modern and easy-to-use web interface. Desktop clients and mobile apps are available for all mainstream platforms, allowing you to access your files and collaborate in real time from any device, anywhere.

It’s worth noting that Nextcloud is a fork of ownCloud, with the former currently being more popular. The main advantages of Nextcloud over ownCloud include a faster speed of development, Red Hat-style licensing, and greater extendibility.

5. Seafile
   Seafile is a mature file-sharing software that was first conceived by Daniel Pan and other former students of Tsinghua University, Beijing in 2009. Seafile focuses on reliability and performance. The core of Seafile server is written in C, and many years of polishing by hundreds of thousands of developers from around the world have made Seafile’s syncing algorithm extremely stable and dependable.

Seafile supports state-of-the-art encryption, and upgrades to new versions are handled by a single script that takes just a few seconds to run because Seafile records very few items in a database.
