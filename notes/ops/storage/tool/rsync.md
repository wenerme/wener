---
title: rsync
---

# rsync

## Tips
* https://www.cheatography.com/richardjh/cheat-sheets/rsync/
* https://wiki.archlinux.org/index.php/rsync
* unison
  * https://www.cis.upenn.edu/~bcpierce/unison/
* `--info=progress2` 显示速度

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
run_rsync; fswatch -o . | while read f; do run_rsync; done
```

## 并行
* https://wiki.ncsa.illinois.edu/display/~wglick/2013/11/01/Parallel+Rsync
* https://unix.stackexchange.com/questions/189878

```bash
rsync -avzm --stats --safe-links --ignore-existing --dry-run \
    --human-readable /data/projects REMOTE-HOST:/data/ > /tmp/transfer.log

# --relative 要求在 /data/projects 执行
cat /tmp/transfer.log | \
    parallel --will-cite -j 5 rsync -avzm --relative \
      --stats --safe-links --ignore-existing \
      --human-readable {} REMOTE-HOST:/data/ > result.log
```
