---
title: rename
---

# rename

- util-linux - rename - c 版本
  - [rename.1](https://man7.org/linux/man-pages/man1/rename.1.html)
- renameutils
- perl 版本 - 支持正则
- zsh - zmv

```bash
# C 版本 - util-linux
# ==========
# from to files
rename .htm .html *.htm
rename .txt '' *.txt


# qmv, qcp, imv, icp, deurlname
# https://www.nongnu.org/renameutils/
brew install renameutils

# Perl 版本
# macOSrename
brew install rename

rename 'y/a-z/A-Z/' *
rename 's/\.txt$//' *.txt
# s01e01 -> S01E01
rename -v 's/s(\d+)e(\d+)/S\1E\2/' *.ass
# 【1997】05蜡笔小新 -> 蜡笔小新 (1997)
rename -nv 's/【(\d+)】.*?蜡笔小新/蜡笔小新 (\1)'
# 提取集 为完整名字
rename -nv 's/^.*?\[(\d+)\].*?(-thumb.jpg|[.]\w+)$/胜者即是正义.S01E$1$2/' '[胜者即是正义]'*

# 蜡笔小新.abc.mkv -> /Volumes/Movie/蜡笔小新.abc/蜡笔小新.abc.mkv
ls 蜡笔小新*.{mkv,mp4} | xargs -I {} -n 1 sh -c 'f="{}";mkdir -p "/Volumes/Movie/${f%.*}";mv "$f" "/Volumes/Movie/${f%.*}"'

# zsh
zmv 'image(*.png)' '$1'
zmv -w 'image*.png' '$1.png'

# mmv
mmv "image*.png" "#1.png"

# for loop
for i in image*jpg
do
  mv -v "$i" "$(echo "$i" | sed -e 's/^\.\/image//' - )"
done

# 调整剧集名字 [Name][01].mkv -> Name.S01E01.mkv
echo "[Name][01].mkv" | sed -re 's/\[([^]]+)\]\[([^]]+)\](.*?)/\1.S01E\2\3/' -

#
for i in \[*\]\[*\]*
do
  mv -v "$i" "$(echo "$i" | sed -re 's/\[([^]]+)\]\[([^]]+)\](.*?)/\1.S01E\2\3/' - )"
done
```

## 批量重命名

```bash
# 正则
find . -type f | perl -pe 'print $_; s/input/output/' | xargs -d "\n" -n2 mv

# 去掉单引号 - escape 比较复杂
find . -type f | grep "[']" | perl -pe "print \$_; s/'//g" | xargs -d "\n" -n2 mv

# 电视剧第N集 -> 电视剧 N
# echo - dry run
find . -type f | perl -pe 'print $_; s/第(\d+)集/ \1/' | xargs -d "\n" -n2 echo mv
# 电视剧.01.mp4 -> 电视剧.EP01.mp4
find . -type f | perl -pe 'print $_; s/[.](\d+)[.]/.EP\1./' | xargs -d "\n" -n2 echo mv
```
