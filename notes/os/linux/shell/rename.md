---
title: rename
---

# rename

- util-linux - rename - c 版本
  - [rename.1](https://man7.org/linux/man-pages/man1/rename.1.html)
- perl 版本 - 支持正则
- zsh - zmv

```bash
# C 版本 - util-linux
# ==========
# from to files
rename .htm .html *.htm
rename .txt '' *.txt

# Perl 版本
# macOS
brew install rename

rename 'y/a-z/A-Z/' *
rename 's/\.txt$//' *.txt
# s01e01 -> S01E01
rename -v 's/s(\d+)e(\d+)/S\1E\2/' *.ass
# 【1997】05蜡笔小新 -> 蜡笔小新 (1997)
rename -nv 's/【(\d+)】.*?蜡笔小新/蜡笔小新 (\1)'
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

# 测试 [Name][01].mkv -> Name.S01E01.mkv
echo "[Name][01].mkv" | sed -re 's/\[([^]]+)\]\[([^]]+)\](.*?)/\1.S01E\2\3/' -

#
for i in \[*\]\[*\]*
do
  mv -v "$i" "$(echo "$i" | sed -re 's/\[([^]]+)\]\[([^]]+)\](.*?)/\1.S01E\2\3/' - )"
done
```
