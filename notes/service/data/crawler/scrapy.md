---
title: Scrapy
---

# Scrapy

- https://github.com/scrapy/scrapy/
- https://github.com/scrapy/scrapyd
- [commands](https://docs.scrapy.org/en/latest/topics/commands.html)
- [scrapy-mongodb](https://github.com/sebdah/scrapy-mongodb)
  - 将 Item 存储到 Mongo
  - 建议拷贝到项目中使用, 只有单个文件
  - `pip install scrapy-mongodb`

```python
ITEM_PIPELINES = [
  'scrapy_mongodb.MongoDBPipeline',
]

# 链接配置
MONGODB_URI = 'mongodb://localhost:27017'
MONGODB_DATABASE = 'scrapy'
# 集合名
MONGODB_COLLECTION = 'my_items'
# 唯一键
MONGODB_UNIQUE_KEY = 'url'

# 副本链接
MONGODB_REPLICA_SET = 'myReplicaSetName'
MONGODB_URI = 'mongodb://host1.example.com:27017,host2.example.com:27017,host3.example.com:27017'

# 添加时间戳
MONGODB_ADD_TIMESTAMP = True

# 可设置缓冲, 默认未开启
MONGODB_BUFFER_DATA = 10
```

- [scrapy-random-useragent](https://github.com/cnu/scrapy-random-useragent)
  - 使用一个 UA 列表
  - http://useragentstring.com/
  - https://udger.com/resources/ua-list
- [alecxe/scrapy-fake-useragent](https://github.com/alecxe/scrapy-fake-useragent)
  - 生成 UA
  - `pip install scrapy-fake-useragent`

```python
DOWNLOADER_MIDDLEWARES = {
    'scrapy.downloadermiddlewares.useragent.UserAgentMiddleware': None,
    'scrapy_fake_useragent.middleware.RandomUserAgentMiddleware': 400,
}
```

- `start_urls = ["file:///home/my/test.html"]`
  - 不要指定 `allowed_domains`
  - 可用于直接访问本地文件
- 默认 Telnet 端口 `6023`
- Spider 可以指定 `custom_settings` 来设置单个 Spider 的配置
- 选择器
  - `/html/head/following-sibling::body` 找兄弟节点
  - `//div[@id="abc"]` 属性匹配的节点
  - `//*[@id="abc"]` 任意标签类型
  - `//div[contains(@class,"top")]` 属性包含判断
  - `//div[@id="abc" and contains(@class,"top")]` 逻辑条件

```bash
#########
# 基础操作
#########
# 创建项目
scrapy startproject myproject
cd myproject
# 生成爬虫
scrapy genspider mydomain mydomain.com
# 运行爬虫
scrapy crawl mydomain
# 输出到文件
scrapy crawl basic -o item.json


```

## Settings

- [Settings](https://doc.scrapy.org/en/latest/topics/settings.html)
- 默认配置文件 `scrapy/settings/default_settings.py`

**生成的默认配置**

```python
BOT_NAME = 'abcd'

SPIDER_MODULES = ['abcd.spiders']
NEWSPIDER_MODULE = 'abcd.spiders'

# 在 User-Agent 中标识爬虫身份
# USER_AGENT = 'abcd (+http://www.yourdomain.com)'

# 是否遵循 robots.txt 规则, 默认为遵循
ROBOTSTXT_OBEY = True

# 链接配置
# 最大并发请求, 默认 16
# CONCURRENT_REQUESTS = 32

# 对同一个站点配置请求延时, 默认 0
# 参考 http://scrapy.readthedocs.org/en/latest/topics/settings.html#download-delay
# See also autothrottle settings and docs
# DOWNLOAD_DELAY = 3
# 下载延时会遵循以下的规则之一
# 每个域名的并发请求数
# CONCURRENT_REQUESTS_PER_DOMAIN = 16
# 每个 IP 的并发请求数
# CONCURRENT_REQUESTS_PER_IP = 16

# 禁用 Cookie, 默认启用
# COOKIES_ENABLED = False

# 禁用 Telnet 控制台, 默认启用
# TELNETCONSOLE_ENABLED = False

# 重写默认请求头
# DEFAULT_REQUEST_HEADERS = {
#   'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
#   'Accept-Language': 'en',
# }

# 启用或禁用爬虫中间件
# See http://scrapy.readthedocs.org/en/latest/topics/spider-middleware.html
# SPIDER_MIDDLEWARES = {
#    'abcd.middlewares.AbcdSpiderMiddleware': 543,
# }

# 启用或禁用下载器中间件
# See http://scrapy.readthedocs.org/en/latest/topics/downloader-middleware.html
# DOWNLOADER_MIDDLEWARES = {
#    'abcd.middlewares.MyCustomDownloaderMiddleware': 543,
# }

# 启用或禁用扩展
# See http://scrapy.readthedocs.org/en/latest/topics/extensions.html
# EXTENSIONS = {
#    'scrapy.extensions.telnet.TelnetConsole': None,
# }

# 配置 Item 管道
# 优先级为 1-1000
# See http://scrapy.readthedocs.org/en/latest/topics/item-pipeline.html
ITEM_PIPELINES = {
   # 'abcd.pipelines.SbcxPipeline': 300,
}

# 启用和配置自动限流 AutoThrottle 扩展, 默认禁用
# See http://doc.scrapy.org/en/latest/topics/autothrottle.html
# AUTOTHROTTLE_ENABLED = True
# 初始下载延时
# AUTOTHROTTLE_START_DELAY = 5
# 最大下载延时,高延时时使用
# AUTOTHROTTLE_MAX_DELAY = 60
# Scrapy 并发请求远程服务的平均请求量
# AUTOTHROTTLE_TARGET_CONCURRENCY = 1.0
# 是否对每个请求都显示限流统计
# AUTOTHROTTLE_DEBUG = False

# 启用和配置 HTTP 缓存, 默认禁用
# See http://scrapy.readthedocs.org/en/latest/topics/downloader-middleware.html#httpcache-middleware-settings
# HTTPCACHE_ENABLED = True
# HTTPCACHE_EXPIRATION_SECS = 0
# HTTPCACHE_DIR = 'httpcache'
# HTTPCACHE_IGNORE_HTTP_CODES = []
# HTTPCACHE_STORAGE = 'scrapy.extensions.httpcache.FilesystemCacheStorage'
```

```python
# 用于移除下载图片和文件使用的字段
class CleanupPipeline(object):
    def process_item(self, item, spider):
        item.pop('file_urls', None)
        item.pop('image_urls', None)
        return item
```

### 配置说明

```python
# HTTP 缓存相关配置
# 启用缓存, 默认不启用
HTTPCACHE_ENABLED = True
# 缓存失效时间, 秒
HTTPCACHE_EXPIRATION_SECS = 60 * 60 * 72
# 缓存目录, 会在 .scrapy 下创建该目录
# 不同的 spider 会在该目录下创建不同的目录
HTTPCACHE_DIR = 'httpcache'
# 不缓存指定的 HTTP 状态码
# HTTPCACHE_IGNORE_HTTP_CODES = []
# 缓存存储
HTTPCACHE_STORAGE = 'scrapy.extensions.httpcache.FilesystemCacheStorage'
# 缓存策略
HTTPCACHE_POLICY = 'scrapy.contrib.httpcache.RFC2616Policy'
# 是否总是缓存
HTTPCACHE_ALWAYS_STORE = True

# 设置默认的请求头
DEFAULT_REQUEST_HEADERS = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'zh-CN,zh',
}

# 设置编码格式
FEED_EXPORT_ENCODING = 'utf-8'
```

### 管道

- `scrapy.pipelines`
- [Item Pipeline](https://doc.scrapy.org/en/latest/topics/item-pipeline.html)

```python
class DummyPipeline(object):
    # 必须实现的方法
    # 会针对管道中的每一个 item 进行调用
    # 必须返回一个 dict
    # 可返回一个 Twisted Deferred 或抛出一个 `scrapy.exceptions.DropItem` 异常
    # 丢掉的 item 不会再被后面的管道处理
    def process_item(self, item, spider):
        return item

    def open_spider(self, spider):
        pass
    def close_spider(self, spider):
        pass
    # 用于从一个 crawler 创建该管道实例的方法.
    # 必须返回一个新的管道实例.
    # 从 crawler 处可访问到核心的组件,例如配置,信号量等,用于组装该管道
    @classmethod
    def from_crawler(cls, crawler):
        return cls()
```

#### `scrapy.pipelines.files.FilesPipeline`

- 文件下载管道
- 继承自 `scrapy.pipelines.media.MediaPipeline`
- 会最小化网络传输和文件处理
- 文件路径为 url 的 sha1 值
- 文件的校验和为 md5

```python
# 文件存储路径
# 支持 file(FSFilesStore) 和 s3(S3FilesStore), 默认为 file
# FILES_STORE='data/files'
# 过期时间, 天
FILES_EXPIRES=90
# 存储下载文件 URL 的字段
FILES_URLS_FIELD='file_urls'
# 存储已下载文件信息的字段
FILES_RESULT_FIELD='files'

# s3 配置设置
# AWS_ACCESS_KEY_ID='abc'
# AWS_SECRET_ACCESS_KEY='abc'
# FILES_STORE_S3_ACL='abc'
```

#### `scrapy.pipelines.images.ImagesPipeline`

- 图片下载管道
- 继承自 `scrapy.pipelines.files.FilesPipeline`

```python
# 存储位置
# IMAGES_STORE='data/images'

IMAGES_EXPIRES=90
IMAGES_RESULT_FIELD='images'
IMAGES_URLS_FIELD='image_urls'

# 下载图片的最小尺寸
IMAGES_MIN_WIDTH=0
IMAGES_MIN_HEIGHT=0
# 生成不同尺寸的图片预览
# IMAGES_THUMBS={}

# s3 配置
# id 和 key 的配置是相同的
# IMAGES_STORE_S3_ACL=''
```

### Feed

- 用于序列化和存储

**默认配置**

```python
FEED_TEMPDIR = None
FEED_URI = None
FEED_URI_PARAMS = None  # a function to extend uri arguments
FEED_FORMAT = 'jsonlines'
FEED_STORE_EMPTY = False
FEED_EXPORT_ENCODING = None
FEED_EXPORT_FIELDS = None
FEED_STORAGES = {}
FEED_STORAGES_BASE = {
    '': 'scrapy.extensions.feedexport.FileFeedStorage',
    'file': 'scrapy.extensions.feedexport.FileFeedStorage',
    'stdout': 'scrapy.extensions.feedexport.StdoutFeedStorage',
    's3': 'scrapy.extensions.feedexport.S3FeedStorage',
    'ftp': 'scrapy.extensions.feedexport.FTPFeedStorage',
}
FEED_EXPORTERS = {}
FEED_EXPORTERS_BASE = {
    'json': 'scrapy.exporters.JsonItemExporter',
    'jsonlines': 'scrapy.exporters.JsonLinesItemExporter',
    'jl': 'scrapy.exporters.JsonLinesItemExporter',
    'csv': 'scrapy.exporters.CsvItemExporter',
    'xml': 'scrapy.exporters.XmlItemExporter',
    'marshal': 'scrapy.exporters.MarshalItemExporter',
    'pickle': 'scrapy.exporters.PickleItemExporter',
}
FEED_EXPORT_INDENT = 0

```

### 扩展

- [Extensions](https://doc.scrapy.org/en/latest/topics/extensions.html)
- scrapy.extensions.logstats.LogStats
- scrapy.extensions.corestats.CoreStats
- scrapy.extensions.telnet.TelnetConsole
  - TELNETCONSOLE_ENABLED
  - TELNETCONSOLE_PORT
- scrapy.extensions.memusage.MemoryUsage
- scrapy.extensions.memdebug.MemoryDebugger
- scrapy.extensions.closespider.CloseSpider
- scrapy.extensions.statsmailer.StatsMailer
- scrapy.extensions.debug.StackTraceDump
- scrapy.extensions.debug.Debugger

```python
# 默认
EXTENSIONS_BASE = {
    'scrapy.extensions.corestats.CoreStats': 0,
    'scrapy.extensions.telnet.TelnetConsole': 0,
    'scrapy.extensions.memusage.MemoryUsage': 0,
    'scrapy.extensions.memdebug.MemoryDebugger': 0,
    'scrapy.extensions.closespider.CloseSpider': 0,
    'scrapy.extensions.feedexport.FeedExporter': 0,
    'scrapy.extensions.logstats.LogStats': 0,
    'scrapy.extensions.spiderstate.SpiderState': 0,
    'scrapy.extensions.throttle.AutoThrottle': 0,
}

EXTENSIONS = {
    'scrapy.extensions.corestats.CoreStats': 500,
    'scrapy.extensions.telnet.TelnetConsole': 500,
}
```

### 下载器中间件

- [Downloader Middleware](https://doc.scrapy.org/en/latest/topics/downloader-middleware.html)
- `scrapy.downloadermiddlewares.cookies.CookiesMiddleware`

```python
COOKIES_ENABLED=True
COOKIES_DEBUG=False
```

- `scrapy.downloadermiddlewares.defaultheaders.DefaultHeadersMiddleware`
- `scrapy.downloadermiddlewares.downloadtimeout.DownloadTimeoutMiddleware`
- `scrapy.downloadermiddlewares.httpauth.HttpAuthMiddleware`
- `scrapy.downloadermiddlewares.httpcache.HttpCacheMiddleware`
  - `HTTPCACHE_STORAGE`
    - 存储
    - `scrapy.extensions.httpcache.FilesystemCacheStorage`
      - 文件系统
    - `scrapy.extensions.httpcache.DbmCacheStorage`
      - 默认使用 `HTTPCACHE_DBM_MODULE=anydbm`
      - DBM
    - `scrapy.extensions.httpcache.LeveldbCacheStorage`
      - LevelDB
      - `pip install leveldb`
  - `HTTPCACHE_POLICY`
    - 缓存策略
    - `scrapy.extensions.httpcache.RFC2616Policy`
      - RFC2616
    - `scrapy.extensions.httpcache.DummyPolicy`
      - 默认
      - 总是缓存
- `scrapy.downloadermiddlewares.httpcompression.HttpCompressionMiddleware`
- `scrapy.downloadermiddlewares.httpproxy.HttpProxyMiddleware`
- `scrapy.downloadermiddlewares.redirect.RedirectMiddleware`
- `scrapy.downloadermiddlewares.redirect.MetaRefreshMiddleware`
- `scrapy.downloadermiddlewares.retry.RetryMiddleware`
- `scrapy.downloadermiddlewares.robotstxt.RobotsTxtMiddleware`
- `scrapy.downloadermiddlewares.stats.DownloaderStats`
- `scrapy.downloadermiddlewares.useragent.UserAgentMiddleware`
- `scrapy.downloadermiddlewares.ajaxcrawl.AjaxCrawlMiddleware`

```python
class DownloaderMiddleware:
  def process_request(request, spider):
    pass
  def process_response(request, response, spider):
    pass
  def process_exception(request, exception, spider):
    pass
```

```python
# 默认
DOWNLOADER_MIDDLEWARES_BASE = {
    # Engine side
    'scrapy.downloadermiddlewares.robotstxt.RobotsTxtMiddleware': 100,
    'scrapy.downloadermiddlewares.httpauth.HttpAuthMiddleware': 300,
    'scrapy.downloadermiddlewares.downloadtimeout.DownloadTimeoutMiddleware': 350,
    'scrapy.downloadermiddlewares.defaultheaders.DefaultHeadersMiddleware': 400,
    'scrapy.downloadermiddlewares.useragent.UserAgentMiddleware': 500,
    'scrapy.downloadermiddlewares.retry.RetryMiddleware': 550,
    'scrapy.downloadermiddlewares.ajaxcrawl.AjaxCrawlMiddleware': 560,
    'scrapy.downloadermiddlewares.redirect.MetaRefreshMiddleware': 580,
    'scrapy.downloadermiddlewares.httpcompression.HttpCompressionMiddleware': 590,
    'scrapy.downloadermiddlewares.redirect.RedirectMiddleware': 600,
    'scrapy.downloadermiddlewares.cookies.CookiesMiddleware': 700,
    'scrapy.downloadermiddlewares.httpproxy.HttpProxyMiddleware': 750,
    'scrapy.downloadermiddlewares.stats.DownloaderStats': 850,
    'scrapy.downloadermiddlewares.httpcache.HttpCacheMiddleware': 900,
    # Downloader side
}

DOWNLOADER_MIDDLEWARES = {
    'myproject.middlewares.CustomDownloaderMiddleware': 543,
    # 禁用內建
    'scrapy.downloadermiddlewares.useragent.UserAgentMiddleware': None,
}


```

### 爬虫中间件

- `scrapy.spidermiddlewares`
- [Spider Middleware](https://doc.scrapy.org/en/latest/topics/spider-middleware.html)
- `scrapy.spidermiddlewares.depth.DepthMiddleware`
- `scrapy.spidermiddlewares.httperror.HttpErrorMiddleware`
- `scrapy.spidermiddlewares.offsite.OffsiteMiddleware`
- `scrapy.spidermiddlewares.referer.RefererMiddleware`
- `scrapy.spidermiddlewares.urllength.UrlLengthMiddleware`

**默认配置**

```python
SPIDER_LOADER_CLASS = 'scrapy.spiderloader.SpiderLoader'
SPIDER_LOADER_WARN_ONLY = False

SPIDER_MIDDLEWARES = {}

# 默认启用的中间件
SPIDER_MIDDLEWARES_BASE = {
    # Engine side
    'scrapy.spidermiddlewares.httperror.HttpErrorMiddleware': 50,
    'scrapy.spidermiddlewares.offsite.OffsiteMiddleware': 500,
    'scrapy.spidermiddlewares.referer.RefererMiddleware': 700,
    'scrapy.spidermiddlewares.urllength.UrlLengthMiddleware': 800,
    'scrapy.spidermiddlewares.depth.DepthMiddleware': 900,
    # Spider side
}

SPIDER_MODULES = []
```

```python
class DummyMiddlewares:
    # 针对每个响应进行回调
    # 返回 None 或抛出异常
    def process_spider_input(response, spider):
        pass
    # 针对 Spider 的结果进行回调
    # 返回 Request, dict, Item 的 iterable 对象
    def process_spider_output(response, result, spider):
        pass
    # 异常处理
    # 返回 None | iterable< Response | dict | Item >
    def process_spider_exception(response, exception, spider):
        pass
    # 开始请求时
    # sinc 0.15
    # 返回 iterbale< Request >
    def process_start_requests(start_requests, spider):
        pass

```

## FAQ

### 命令行工具

- 全局目录
  - startproject
    - 创建项目
  - genspider
    - 生成爬虫
    - `-l` 支持的爬虫模板
    - `-t` 指定爬虫模板
  - settings
    - 获取设置
  - runspider
    - 不创建项目运行爬虫
  - shell
  - fetch
  - view
  - version
- 项目相关命令
  - crawl
  - check
  - list
  - edit
  - parse
  - bench

### 返回单个值而不是数组

默认情况下取到的都是数组

```python
# 方法 1. 为字段设置预处理
class MyItemClass(Item):
    url = Field(output_processor=TakeFirst())
    title = Field(output_processor=TakeFirst())
    developer = Field(output_processor=TakeFirst())

# 方法 2. ItemLoader 设置默认 预处理
l.default_output_processor = TakeFirst()
# 如果有个别字段不想被处理,可以考虑先加一层
l.add_xpath('authors', './div/article/header/div/div[2]/dl/dd[1]/a/text()', lambda v: [v])
```
