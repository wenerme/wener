---
title: Btrfs
---

# btrfs

:::caution

尽量不要用 BTRFS & LVM

:::


:::tip

- ext4 没什么不好
- btrfs 优于 lvm, raid
- btrfs raid5 raid6 还不够成熟稳定 - 可能会损坏数据
- 做 nas 优先选择 zfs

:::

- btrfs - butter fs - better fs - b-tree fs
- [Let's discuss. Why do you use or not use BTRFS? ](https://www.reddit.com/r/linux/comments/61js64)

```bash
apk add btrfs-progs btrfs-progs-extra
modprobe btrfs

btrfs device scan --all-devices

btrfs filesystem show
btrfs fi show

DEV=/dev/mapper/cachedev_0
btrfs scrub status $DEV

btrfs scrub start $DEV
btrfs scrub status $DEV
```

## Usage

```
usage: btrfs [--help] [--version] <group> [<group>...] <command> [<args>]

    btrfs subvolume create [-i <qgroupid>] [<dest>/]<name>
        Create a subvolume
    btrfs subvolume delete [options] <subvolume> [<subvolume>...]
        Delete subvolume(s)
    btrfs subvolume list [options] [-G [+|-]value] [-C [+|-]value] [--sort=gen,ogen,rootid,path] <path>
        List subvolumes (and snapshots)
    btrfs subvolume snapshot [-r] [-i <qgroupid>] [-u <subvolume id>|<subvolume path>] <source> <dest>|[<dest>/]<name>
        Create a snapshot of the subvolume
    btrfs subvolume get-default <path>
        Get the default subvolume of a filesystem
    btrfs subvolume set-default <subvolid> <path>
        Set the default subvolume of a filesystem
    btrfs subvolume find-new <path> <lastgen>
        List the recently modified files in a filesystem
    btrfs subvolume show <subvol-path>
        Show more information of the subvolume
    btrfs subvolume sync <path> [<subvol-id>...]
        Wait until given subvolume(s) are completely removed from the filesystem.
    btrfs subvolume size [-v] [-p] [-m] [-r <volume_path>] <subvolume|subvol_id> [<subvolume|subvol_id>...]
        Query the actual disk usage exclusively owned by selected snapshots.

    btrfs filesystem df [options] <path>
        Show space usage information for a mount point
    btrfs filesystem du [options] <path> [<path>..]
        Summarize disk usage of each file.
    btrfs filesystem show [options] [<path>|<uuid>|<device>|label]
        Show the structure of a filesystem
    btrfs filesystem sync <path>
        Force a sync on a filesystem
    btrfs filesystem defragment [options] <file>|<dir> [<file>|<dir>...]
        Defragment a file or a directory
    btrfs filesystem resize [devid:][+[?]/-]<newsize>[kKmMgGtTpPeE]|[devid:]max <path>
        Resize a filesystem
    btrfs filesystem label [<device>|<mount_point>] [<newlabel>]
        Get or change the label of a filesystem
    btrfs filesystem usage [options] <path> [<path>..]
        Show detailed information about internal filesystem usage .
    btrfs filesystem corrupted <mount_point>
        Pop the path of a cksumfailed file on this volume
    btrfs filesystem reclaim-space [options] <file>|<dir> [<file>|<dir>...]
        reclaim space from a file or a directory

    btrfs balance start [options] <path>
        Balance chunks across the devices
    btrfs balance pause <path>
        Pause running balance
    btrfs balance cancel <path>
        Cancel running or paused balance
    btrfs balance resume <path>
        Resume interrupted balance
    btrfs balance status [-v] <path>
        Show status of running or paused balance

    btrfs device add [options] <device> [<device>...] <path>
        Add a device to a filesystem
    btrfs device delete <device>|<devid> [<device>|<devid>...] <path>    btrfs device remove <device>|<devid> [<device>|<devid>...] <path>
        Remove a device from a filesystem
    btrfs device scan [(-d|--all-devices)|<device> [<device>...]]
        Scan devices for a btrfs filesystem
    btrfs device ready <device>
        Check device to see if it has all of its devices in cache for mounting
    btrfs device stats [-z] <path>|<device>
        Show current device IO stats.
    btrfs device usage [options] <path> [<path>..]
        Show detailed information about internal allocations in devices.

    btrfs scrub start [-BdqrRf] [-c ioprio_class -n ioprio_classdata] <path>|<device>
        Start a new scrub. If a scrub is already running, the new one fails.
    btrfs scrub cancel <path>|<device>
        Cancel a running scrub
    btrfs scrub resume [-BdqrR] [-c ioprio_class -n ioprio_classdata] <path>|<device>
        Resume previously canceled or interrupted scrub
    btrfs scrub status [-dR] <path>|<device>
        Show status of running or finished scrub

    btrfs check [options] <device>
        Check structural inegrity of a filesystem (unmounted).

    btrfs rescue chunk-recover [options] <device>
        Recover the chunk tree by scanning the devices one by one.
    btrfs rescue super-recover [options] <device>
        Recover bad superblocks from good copies
    btrfs rescue zero-log <device>
        Clear the tree log. Usable if it's corrupted and prevents mount.

    btrfs restore [options] <device> <path> | -l <device>
        Try to restore files from a damaged filesystem (unmounted)

    btrfs inspect-internal inode-resolve [-v] <inode> <path>
        Get file system paths for the given inode
    btrfs inspect-internal logical-resolve [-Pv] [-s bufsize] <logical> <path>
        Get file system paths for the given logical address
    btrfs inspect-internal subvolid-resolve <subvolid> <path>
        Get file system paths for the given subvolume ID.
    btrfs inspect-internal rootid <path>
        Get tree ID of the containing subvolume of path.
    btrfs inspect-internal min-dev-size [options] <path>
        Get the minimum size the device can be shrunk to. The
    btrfs inspect-internal dump-tree [options] device
        Dump tree structures from a given device
    btrfs inspect-internal dump-super [options] device [device...]
        Dump superblock from a device in a textual form
    btrfs inspect-internal tree-stats [options] <device>
        Print various stats for trees
    btrfs inspect-internal tree-info <[-t <tree_id> <mnt_point>]|[subvolume_path]>
        Get tree information about given tree id or subvolume path.
    btrfs inspect-internal punch-info [-o <offset>] -l <len> <file_path>
        Syno punch check with offset & len.
    btrfs inspect-internal chunk-info [-m] <volume_path>
        Get chunk information about given volume path.

    btrfs property get [-t <type>] <object> [<name>]
        Gets a property from a btrfs object.
    btrfs property set [-t <type>] <object> <name> <value>
        Sets a property on a btrfs object.
    btrfs property list [-t <type>] <object>
        Lists available properties with their descriptions for the given object.

    btrfs send [-ve] [-p <parent>] [-c <clone-src>] [-f <outfile>] <subvol> [<subvol>...]
        Send the subvolume(s) to stdout.
    btrfs receive [-ve] [-f <infile>] [--max-errors <N>] <mount>
        Receive subvolumes from stdin.

    btrfs quota enable <path>
        Enable subvolume quota support for a filesystem.
    btrfs quota enable-v1 <path>
        For 4.4 and 3.10 kernel, it enables syno v1 quota.
    btrfs quota enable-v2 <path>
        For 4.4 and 5.10 kernel, it enables syno v2 quota.
    btrfs quota disable <path>
        Disable subvolume quota support for a filesystem.
    btrfs quota unload <path>
        Unload qgroup from memory but do not erase on-disk quota btree.
    btrfs quota remove-v1 <path>
        Remove on-disk v1 quota btree.
    btrfs quota rescan [-sw] <path>
        Trash all qgroup numbers and scan the metadata again with the current config.
    btrfs quota syno-status <path>
        Show quota status of specified volume and subvolume.
    btrfs quota syno-rescan [-prR] <path>
        Do qouta 2.0 rescan on specified subvolume.

    btrfs qgroup assign [options] <src> <dst> <path>
        Assign SRC as the child qgroup of DST
    btrfs qgroup remove <src> <dst> <path>
        Remove a child qgroup SRC from DST.
    btrfs qgroup create <qgroupid> <path>
        Create a subvolume quota group.
    btrfs qgroup destroy <qgroupid> <path>
        Destroy a quota group.
    btrfs qgroup show -pcreFf [--sort=qgroupid,rfer,excl,max_rfer,max_excl] <path>
        Show subvolume quota groups.
    btrfs qgroup limit [options] <size>|none [<qgroupid>] <path>
        Set the limits a subvolume quota group.

    btrfs replace start [-Bfr] <srcdev>|<devid> <targetdev> <mount_point>
        Replace device of a btrfs filesystem.
    btrfs replace status [-1] <mount_point>
        Print status and progress information of a running device replace
    btrfs replace cancel <mount_point>
        Cancel a running device replace operation.

    btrfs usrquota enable <path>
        Enable subvolume usrquota support for a filesystem.
    btrfs usrquota enable-v1 <path>
        For 4.4 and 3.10 kernel, it enables syno v1 usrquota.
    btrfs usrquota enable-v1 <path>
        For 4.4 and 5.10 kernel, it enables syno v2 usrquota.
    btrfs usrquota disable <path>
        Disable subvolume usrquota support for a filesystem.
    btrfs usrquota unload <path>
        Unload user quota from memory but do not erase on-disk user quota btree.
    btrfs usrquota remove-v1 <path>
        Remove on-disk v1 user quota btree.
    btrfs usrquota show [-an] [-u <uid>|-U <user name>] <path>
        Show subvolume usrquota.
    btrfs usrquota limit -u <uid>|-U <user name> <size>|none <path>
        Set usr quota limit on a subvolume.
    btrfs usrquota rescan [-sw] <path>
        Trash all usrquota info items

    btrfs syno-usage enable <volume_path>
        Enable syno usage given volume path.
    btrfs syno-usage disable <volume_path>
        Disable syno usage given volume path.
    btrfs syno-usage status <volume_path>
        Get syno usage status given volume path.
    btrfs syno-usage rescan <volume_path>
        Rescan syno usage given volume path.
    btrfs syno-usage rescan-pause <volume_path>
        Rescan syno usage given volume path.
    btrfs syno-usage subvol-type-set <type> <subvol_path>
        Set syno usage type [2,255] given subvol path.
    btrfs syno-usage subvol-type-get <subvol_path>
        Get syno usage type given subvol path.
    btrfs syno-usage show <volume_path>
        Show usage for all type.

    btrfs syno-cache-protection enable <volume_path>
        Enable syno cache protection given volume path.
    btrfs syno-cache-protection disable <volume_path>
        Disable syno cache protection given volume path.
    btrfs syno-cache-protection replay [-v] <volume_path>
        Replay syno cache protection given volume path.
    btrfs syno-cache-protection clear <volume_path>
        Clear syno cache protection passive instance given volume path
    btrfs syno-cache-protection status <volume_path>
        Show syno cache protection status given volume path

    btrfs syno-xattr get -k <xattr key name> [-r <root_tree> -i <inode>] [-v] <device>
        manage xattr from raw device

    btrfs syno-feat-tree enable <volume_path>
        Enable syno feature tree for the given volume path.
    btrfs syno-feat-tree disable <volume_path>
        Disable syno feature tree for the given volume path.
    btrfs syno-feat-tree status <volume_path>
        Get status of syno feature tree for the given volume path.

    btrfs help [--full]
        Display help information
    btrfs version
        Display btrfs-progs version
```


## BTRFS critical (device dm-2): corrupt leaf

系统损坏，需要离线修复。
