---
tags:
  - Daemon
---

# Spotlight

- /System/Volumes/Data/.Spotlight-V100
- /System/Volumes/Data/.Spotlight-V100/VolumeConfiguration.plist
- /.Spotlight-V100/Store-V1/Exclusions.plist
- /.Spotlight-V100/VolumeConfiguration.plist
- mdutil
- mdfind
- mdimport
- mdls
- mds_stores
- mds
- mdbulkimport
- mdflagwriter
- mdsync
- mdworker
- mdworker_shared
- mdwrite
- mddiagnose
- `kMD*`
- 特殊文件
  - `*.noIndex`
  - ~~.metadata_never_index~~
  - ~~.nosync~~ - iCloud 不同步

```bash
mdutil -as  # 所有 Volume 的状态
mdutil -s / # 指定 Volume 的状态

# 访问情况
sudo fs_usage -w | grep Spotlight

# 重启 Spotlight
# Not privileged to stop service.
sudo launchctl stop com.apple.metadata.mds
sudo launchctl start com.apple.metadata.mds

sudo mdutil -a -i off # 关闭索引
sudo mdutil -a -i on  # 重新开启索引

sudo mdutil -i off /Volumes/YourDisk # 关闭指定磁盘索引

sudo mdutil -Ea # 重建索引

# sudo mdutil -i off $HOME # 排除目录
# sudo mdutil -i off /Users/
# sudo mdutil -i off /private/

sudo mdutil -a -i off # 关闭所有磁盘索引

# 关闭服务
sudo launchctl unload -w /System/Library/LaunchDaemons/com.apple.metadata.mds.plist

mdutil -t $PWD
mdutil -L / # 列出索引目录

# sudo defaults write /.Spotlight-V100/Store-V1/Exclusions Exclusions -array-add path/to/exclude
```

```
Usage: mdutil -pEsa -i (on|off) -d volume ...
       mdutil -t {volume-path | deviceid} fileid
        Utility to manage Spotlight indexes.
        -i (on|off)    Turn indexing on or off.
        -d             Disable Spotlight activity for volume (re-enable using -i on).
        -E             Erase and rebuild index.
        -s             Print indexing status.
        -a             Apply command to all stores on all volumes.
        -t             Resolve files from file id with an optional volume path or device id.
        -p             Publish metadata.
        -V vol         Apply command to all stores on the specified volume.
        -v             Display verbose information.
        -r plugins     Ask the server to reimport files for UTIs claimed by the listed plugin.
        -L volume-path List the directory contents of the Spotlight index on the specified volume.
        -P volume-path Dump the VolumeConfig.plist for the specified volume.
        -X volume-path Remove the Spotlight index directory on the specified volume.  Does not disable indexing.
                       Spotlight will reevaluate volume when it is unmounted and remounted, the
                       machine is rebooted, or an explicit index command such as 'mdutil -i' or 'mdutil -E' is
                       run for the volume.
NOTE: Run as owner for network homes, otherwise run as root.
```

- 参考
  - https://developer.apple.com/library/archive/documentation/Carbon/Conceptual/SpotlightQuery/Concepts/QueryFormat.html

## mds_stores

- Spotlight Metadata Server Stores
- 索引文件时会占用大量资源

## spotlightknowledged high CPU

正在索引
