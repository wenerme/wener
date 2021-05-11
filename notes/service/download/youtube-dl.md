---
title: youtube-dl
---

# youtube-dl

- 默认配置
  - ~/.config/youtube-dl/config
  - /etc/youtube-dl.conf
  - %APPDATA%/youtube-dl/config.txt
- ~/.cache/youtube-dl 缓存部分 yt 信息
- 参考
  - [支持站点](https://github.com/ytdl-org/youtube-dl/blob/master/docs/supportedsites.md)

```bash
sudo curl -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl
sudo chmod a+rx /usr/local/bin/youtube-dl

# 测试文件名
# --restrict-filenames 将空格转换为下划线
youtube-dl --get-filename -o '%(title)s.%(ext)s' d0yGdNEWdn0
# 默认格式
youtube-dl --get-filename -o '%(title)s-%(id)s.%(ext)s' d0yGdNEWdn0

# 生成列表增量下载
youtube-dl --download-archive archive.txt "https://www.youtube.com/playlist?list=PLwiyx1dc3P2JR9N8gQaQN_BCvlSlap7re"

# 当前目录 youtube-dl.conf
# 或直接指向文件
youtube-dl --config-location $PWD

# 可以同时利用全局配置
youtube-dl $(cat youtube-dl.conf)
```

| Option                          | Desc                                                          |
| ------------------------------- | ------------------------------------------------------------- |
| `-o ~/Movies/%(title)s.%(ext)s` | 按照模板输出到指定位置                                        |
| --proxy 127.0.0.1:3128          | 代理，支持 socks                                              |
| -f, --format best               | 选择最好的格式,默认                                           |
| --no-playlist                   | 复制了播放列表中的视频，但只下载单个视频                      |
| --all-subs                      | 下载所有字幕                                                  |
| -R 50                           | 失败重试                                                      |
| --ignore-errors                 | 忽略列表中的错误视频                                          |
| --download-archive archive.txt  | 记录已经下载的视频，下次不再下载，每行记录 `<extractor> <id>` |
| -a, --batch-file urls.txt       | 批量下载地址,支持 `#`,`;` 注释                                |
| --id                            | 批量文件里只有 ID                                             |
| -w, --no-overwrites             | 不覆盖                                                        |
| --write-thumbnail               | 写入缩略图                                                    |

**youtube-dl.conf**

```
--all-subs
--geo-bypass
--ignore-errors
--proxy socks5://127.0.0.1:8888
--write-thumbnail
-f best
-R 50
```
