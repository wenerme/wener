---
title: rsync
---

# rsync

- 参考
  - [rsync.1](https://man7.org/linux/man-pages/man1/rsync.1.html)
  - https://www.cheatography.com/richardjh/cheat-sheets/rsync/
  - https://wiki.archlinux.org/index.php/rsync
  - unison
    - https://www.cis.upenn.edu/~bcpierce/unison/
  - `--info=progress2` 显示速度
- `--exclude='/.git' --filter="dir-merge,- .gitignore"`
  - 同步 git 内容

:::tip

- rsync 不支持检测 rename, --fuzzy 能对名字做模糊匹配
  - rclone 支持基于 hash, modtime, leaf 检测 rename
- rsync 不支持并行 - rclone 支持并行
- 更复杂的**同步**场景推荐 [rclone](./rclone.md)
- 更复杂的**备份**场景推荐 [restic](./restic.md)

:::

| flags                 | for                    |
| --------------------- | ---------------------- |
| --archive, -a         | `-rlptgoD`             |
| --recursive, -r       |
| --links, -l           |
| --perms, -p           |
| --times, -t           |
| --owner, -o           |
| --group, -g           |
| -D                    | `--devices --specials` |
| --verbose, -v         |
| --progress            | 显示传输进度           |
| --partial             | 保留部分传输文件       |
| -P                    | `--partial --progress` |
| --stats               |
| --remove-source-files | 同步后删除源文件       |
| --human-readable, -h  |
| --checksum,-c         |
| --prune-empty-dirs,-m    | 删除空目录             |

> **Note**
>
> - `rsync src dst` -> `rsync src/ dst/src` - src 含 `/` 表示不创建目录
> - dst 如果包含 `/` 则不存在时会创建目录，否则会被复制为指定文件

```bash
# 使用 SSH 同步
rsync -avz -e ssh remoteuser@remotehost:/remote/dir /this/dir/

# 远程使用 sudo
rsync --rsync-path="sudo rsync" -avz dnsmasq/ admin@10.1.1.1:/etc/dnsmasq/

# 备份整个系统
rsync -aAXv --exclude={"/dev/*","/proc/*","/sys/*","/tmp/*","/run/*","/mnt/*","/media/*","/lost+found"} / /path/to/backup/folder
# 使用 --info=progress2 显示总体的进度, 而不是每个文件
rsync -aAX --info=progress2 --exclude={"/dev/*","/proc/*","/sys/*","/tmp/*","/run/*","/mnt/*","/media/*","/lost+found"} / /path/to/backup/folder

# 不同步权限用户分组信息
rsync -avz --no-perms --no-owner --no-group mnt/wener abuild/

# 配合 fswatch 使用
# 拷贝
fswatch ./ | xargs -I{} cp {} ~/Dropbox/backup/latest/
# rsync
alias run_rsync='rsync -azP --exclude ".*/" --exclude ".*" --exclude "tmp/" ~/Documents/repos/my_repository username@host:~'
run_rsync
fswatch -o . | while read f; do run_rsync; done
```

## 并行

```bash
rsync -avzm --stats --safe-links --ignore-existing --dry-run \
  --human-readable /data/projects REMOTE-HOST:/data/ > /tmp/transfer.log

# --relative 要求在 /data/projects 执行
cat /tmp/transfer.log \
  | parallel --will-cite -j 5 rsync -avzm --relative \
    --stats --safe-links --ignore-existing \
    --human-readable {} REMOTE-HOST:/data/ > result.log
```

- https://wiki.ncsa.illinois.edu/display/~wglick/2013/11/01/Parallel+Rsync
- https://unix.stackexchange.com/questions/189878

## filter by extension

- --prune-empty-dirs
  - 3.1.2 `-m`

```bash
# 3.0.6+
rsync -zarv --include="*/" --include="*.sh" --exclude="*" "$from" "$to"
# < 3.0.6
rsync -zarv --include="*/" --exclude="*" --include="*.sh" "$from" "$to"
```

## Filter Rules

- exclude, `-`
- include, `+`
- merge, `.`
- dir-merge, `:`
- hide, H
- show, S
- protect, P
- risk, R
- clear, `!`
- Modifier
  - `/` - 绝对路径
  - `!`
  - C - CVS-exclude
  - s - sending side
  - r - receiving side
  - p - perishable
  - x - xattr

## ssh port

```bash
rsync -e 'ssh -p 2222'
```

## rsync: change_dir "/" (in f) failed: Permission denied (13)

## rsync: receiver mkstemp "/.file.tar.gz.XXXXXX" (in backup) failed: Permission denied (13)

## rsync: generator failed to set permissions on "/file.tar.gz" (in backup): No such file or directory (2)
