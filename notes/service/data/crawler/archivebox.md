---
title: archivebox
---

# archivebox

- [ArchiveBox/ArchiveBox](https://github.com/ArchiveBox/ArchiveBox)
  - MIT, Python
  - 针对唯一 URL 唯一提取类型 进行 Archive
  - 使用 chromium/chrome 生成 截屏、PDF、DOM HTML、headless JS
  - 使用 node & npm 生成 Readability, Mercury, SingleFile
  - 使用 wget 生成 纯 HTML, 静态文件, WARC
  - 使用 curl 获取 头、favicon、请求 archibe.org
  - 使用 youtube-dl 处理视频、音频、字幕
  - 使用 git 克隆仓库
- 输出格式
  - Chrome SingleFile
    - https://github.com/gildas-lormeau/SingleFile
  - Chrome PDF
  - Chrome Screenshot
  - Wget HTML
  - Archive.org
  - Original
  - Headers
  - Chrome HTML
  - Readability
    - https://github.com/mozilla/readability
  - Mercury
  - Media
  - Git
- [ArchiveBox/ArchiveBox/docker-compose.yml](https://raw.githubusercontent.com/ArchiveBox/ArchiveBox/master/docker-compose.yml)

:::caution

- 直接预览会执行 JS - 可能导致信息泄漏
  - 只有 wget 会提取 js，可以关闭集成
- 避免使用 EXT3/FAT 之类的 FS - 对单目录有 50k 的限制
- 不支持抓全站 - 目前 depth=0/1 [ArchiveBox/ArchiveBox#191](https://github.com/ArchiveBox/ArchiveBox/issues/191)
- 不支持单 URL 多快照 [#179](https://github.com/ArchiveBox/ArchiveBox/issues/179)
  - 目前通过添加 Hash 实现重写快照
- 没有 rest 接口 [#496](https://github.com/ArchiveBox/ArchiveBox/issues/496)

:::

```bash
docker run --rm -it \
  -v $PWD/archivebox:/data -p 8000:8000 \
  --name archivebox archivebox/archivebox
# 创建管理员账号
docker exec -it -u archivebox archivebox archivebox manage createsuperuser

# 命令行操作
# 管理集合 archivebox setup/init/config/status/manage
# 管理快照 archivebox add/schedule/remove/update/list/shell/oneshot
# archivebox schedule

archivebox server 0.0.0.0:8000          # 启动 Web
archivebox add 'https://example.com'    # 添加归档
archivebox list 'https://example.com'   # 查看
archivebox add 'https://example.com#2020-10-24' # 保存多份快照

archivebox schedule --every=day --depth=1 https://example.com/rss.xml

# 导出索引
archivebox list --html --with-headers > index.html
archivebox list --json --with-headers > index.json
archivebox list --csv=timestamp,url,title > index.csv

# --parser auto,pocket_api,wallabag_atom,pocket_html,pinboard_rss,shaarli_rss,medium_rss,netscape_html,rss,json,html,txt,url_list
# --extract title,favicon,headers,singlefile,pdf,screenshot,dom,wget,readability,mercury,git,media,archive_org
# --depth 0,1
# --update-all 同时执行 update
# --tags
# --index-only 只添加到 index 不执行
# --overwrite 从新归档
archivebox add

# 更新单个
archivebox update -t timestamp 1629214695.204162
# 更新所有 pending
# 重启 archivebox 后需要执行
archivebox update
# 从某个时间点开始
archivebox update --resume 1629218154.996784
```

## 配置

- [archivebox/config.py](https://github.com/ArchiveBox/ArchiveBox/blob/master/archivebox/config.py)
- [Configuration](https://github.com/ArchiveBox/ArchiveBox/wiki/Configuration)
- ArchiveBox.conf
- 配置优先级 - cli flag, env, config file, defaults

```bash
archivebox config --set MEDIA_TIMEOUT=600
env MEDIA_TIMEOUT=600 USE_COLOR=False archivebox server

# 避免触发 archive.org 保存
archivebox config --set SAVE_ARCHIVE_DOT_ORG=False
# 避免外部访问
archivebox config --set PUBLIC_INDEX=False
archivebox config --set PUBLIC_SNAPSHOTS=False
archivebox config --set PUBLIC_ADD_VIEW=False
```

```ini
[SHELL_CONFIG]
IS_TTY                   =#lambda _: sys.stdout.isatty()
USE_COLOR                =#lambda c: c['IS_TTY']
SHOW_PROGRESS            =#lambda c: (c['IS_TTY'] and platform.system() != 'Darwin') # progress bars are buggy on mac
IN_DOCKER                =False
# TODO: SHOW_HINTS      =True

[GENERAL_CONFIG]
OUTPUT_DIR               =None
CONFIG_FILE              =None
ONLY_NEW                 =True
TIMEOUT                  =60
MEDIA_TIMEOUT            =3600
OUTPUT_PERMISSIONS       ='755'
RESTRICT_FILE_NAMES      ='windows'
URL_BLACKLIST            =r'\.(css|js|otf|ttf|woff|woff2|gstatic\.com|googleapis\.com/css)(\?.*)?$'  # to avoid downloading code assets as their own pages

[SERVER_CONFIG]
# SECRET_KEY =
SECRET_KEY               =
BIND_ADDR                =# lambda c: ['127.0.0.1:8000', '0.0.0.0:8000'][c['IN_DOCKER']]
ALLOWED_HOSTS            ='*'
DEBUG                    =False
PUBLIC_INDEX             =True
PUBLIC_SNAPSHOTS         =True
PUBLIC_ADD_VIEW          =False
FOOTER_INFO              ='Content is hosted for personal archiving purposes only.  Contact server owner for any takedown requests.'
SNAPSHOTS_PER_PAGE       =40
CUSTOM_TEMPLATES_DIR     =
TIME_ZONE                ='UTC'


[ARCHIVE_METHOD_TOGGLES]
SAVE_TITLE               =True
# 依赖 Google 服务 https://www.google.com/s2/favicons?domain={domain}
SAVE_FAVICON             =True
SAVE_WGET                =True
# images/css/js
SAVE_WGET_REQUISITES     =True
# 从已经下载的内容提取文本
# https://github.com/mozilla/readability
SAVE_READABILITY         =True
# 功能同 READABILITY
# https://github.com/postlight/mercury-parser
SAVE_MERCURY             =True

SAVE_HEADERS             =True
SAVE_WARC                =True
SAVE_GIT                 =True
# youtube-dl 下载视频音频
SAVE_MEDIA               =True
# 提交到 Archive.org
SAVE_ARCHIVE_DOT_ORG     =True
# 依赖 Chrome
# https://github.com/gildas-lormeau/SingleFile
SAVE_SINGLEFILE          =True
SAVE_PDF                 =True
SAVE_SCREENSHOT          =True
# dump DOM
SAVE_DOM                 =True

[ARCHIVE_METHOD_OPTIONS]
RESOLUTION               ='1440,2000'
GIT_DOMAINS              ='github.com,bitbucket.org,gitlab.com,gist.github.com'
CHECK_SSL_VALIDITY       =True
MEDIA_MAX_SIZE           ='750m'
CURL_USER_AGENT          ='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.61 Safari/537.36 ArchiveBox/{VERSION} (+https://github.com/ArchiveBox/ArchiveBox/) curl/{CURL_VERSION}'
WGET_USER_AGENT          ='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.61 Safari/537.36 ArchiveBox/{VERSION} (+https://github.com/ArchiveBox/ArchiveBox/) wget/{WGET_VERSION}'
CHROME_USER_AGENT        ='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.61 Safari/537.36 ArchiveBox/{VERSION} (+https://github.com/ArchiveBox/ArchiveBox/)'
COOKIES_FILE             =None
CHROME_USER_DATA_DIR     =None
CHROME_HEADLESS          =True
CHROME_SANDBOX           = # lambda c: not c['IN_DOCKER']

YOUTUBEDL_ARGS           =
WGET_ARGS           =
CURL_ARGS           =
GIT_ARGS           =


[SEARCH_BACKEND_CONFIG]
USE_INDEXING_BACKEND     =True
USE_SEARCHING_BACKEND    =True
#
SEARCH_BACKEND_ENGINE    ='ripgrep'
SEARCH_BACKEND_HOST_NAME ='localhost'
SEARCH_BACKEND_PORT      =1491
SEARCH_BACKEND_PASSWORD  ='SecretPassword'
# sonic
# SEARCH_BACKEND_ENGINE=sonic
# SEARCH_BACKEND_HOST_NAME=sonic
# SEARCH_BACKEND_PASSWORD=SecretPassword
SONIC_COLLECTION         ='archivebox'
SONIC_BUCKET             ='snapshots'
SEARCH_BACKEND_TIMEOUT   =90

[DEPENDENCY_CONFIG]
USE_CURL                 =True
USE_WGET                 =True
USE_SINGLEFILE           =True
USE_READABILITY          =True
USE_MERCURY              =True
USE_GIT                  =True
USE_CHROME               =True
USE_NODE                 =True
USE_YOUTUBEDL            =True
USE_RIPGREP              =True
CURL_BINARY              ='curl'
GIT_BINARY               ='git'
WGET_BINARY              ='wget'
SINGLEFILE_BINARY        =# bin_path('single-file')
READABILITY_BINARY       =# bin_path('readability-extractor')
MERCURY_BINARY           =# bin_path('mercury-parser')
YOUTUBEDL_BINARY         ='youtube-dl'
NODE_BINARY              ='node'
RIPGREP_BINARY           ='rg'
CHROME_BINARY            =None
POCKET_CONSUMER_KEY      =None
POCKET_ACCESS_TOKENS     ={}
```

```ini
[GENERAL_CONFIG]
# 默认 60 有时候太短了
TIMEOUT =180
[SERVER_CONFIG]
# SECRET_KEY =

PUBLIC_INDEX    =False
PUBLIC_SNAPSHOTS=False
PUBLIC_ADD_VIEW =False

[ARCHIVE_METHOD_TOGGLES]
# 需要代理
SAVE_FAVICON             =False
SAVE_ARCHIVE_DOT_ORG     =False
# 一般用不上
SAVE_WARC                =False
# 有 SINGLEFILE 对 PDF 和 SCREENSHOT 需求不大
SAVE_PDF                 =False
SAVE_SCREENSHOT          =False

[ARCHIVE_METHOD_OPTIONS]
CURL_USER_AGENT          ='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.61 Safari/537.36'
WGET_USER_AGENT          ='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.61 Safari/537.36'
CHROME_USER_AGENT        ='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.61 Safari/537.36'
```

## 数据结构

- ./
  - index.sqlite3
  - ArchiveBox.conf
  - static/
  - sources/
  - logs/
  - archive/
    - 1617687755/ - timestamp
      - index.html - 描述性内容
      - index.json - 描述性内容
      - screenshot.png
      - media/
      - warc/
      - git/
