# Scrapy

## Tips

* [commands](https://docs.scrapy.org/en/latest/topics/commands.html)
* [scrapy-mongodb](https://github.com/sebdah/scrapy-mongodb)
  * 将 Item 存储到 Mongo
  * 建议拷贝到项目中使用, 只有单个文件

```bash
# 创建项目
scrapy startproject myproject

cd myproject
# 生成爬虫
scrapy genspider mydomain mydomain.com
# 运行爬虫
scrapy crawl mydomain
```

## FAQ

### 命令行工具
* 全局目录
  * startproject
    * 创建项目
  * genspider
    * 生成爬虫
    * `-l` 支持的爬虫模板
    * `-t` 指定爬虫模板
  * settings
    * 获取设置
  * runspider
    * 不创建项目运行爬虫
  * shell
  * fetch
  * view
  * version
* 项目相关命令
  * crawl
  * check
  * list
  * edit
  * parse
  * bench

### 返回单个值而不是数组
默认情况下取到的都是数组

``` python
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
