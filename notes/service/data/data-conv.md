---
title: Conv
---

# Conv

- https://github.com/dilshod/xlsx2csv
  - python

## gnumeric

- gnumeric - 桌面应用
- ssconvert
- ssdiff
- ssgrep
- ssindex
- libspreadsheet.so
- https://help.gnome.org/users/gnumeric/stable/index.html.en

```bash
brew install gnumeric # macOS
apk add gnumeric      # AlpineLinux

ssconvert --list-importers
ssconvert --list-exporters

ssconvert in.xls out.csv

for i in *.xlsx; do
  o="${i%.xlsx}.csv"
  [ ! -e "$o" ] && ssconvert "$i" "$o"
done

libreoffice --headless --convert-to csv $filename --outdir $outdir
# users ALL=(ALL) NOPASSWD: libreoffice
```

### Fallback font 'Sans 10.000000' not available, trying 'fixed'

- gnu-free-sans-fonts

```bash
apk add font-opensans
```
