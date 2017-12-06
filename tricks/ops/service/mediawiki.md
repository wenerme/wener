# MediaWiki

## Tips

* https://hub.docker.com/_/mediawiki/
* PostgreSQL
  * 从 1.7 开始支持
  * 官方都是使用 MySQL 进行开发测试, Postgres 由志愿者维护
  * https://www.mediawiki.org/wiki/Manual:PostgreSQL
* 安装
  * https://www.mediawiki.org/wiki/Manual:Installing_MediaWiki
* 插件
  * https://www.mediawiki.org/wiki/Category:Extensions_by_category
* 配置
  * https://www.mediawiki.org/wiki/Manual:LocalSettings.php/zh
  * https://www.mediawiki.org/wiki/Manual:Configuring_file_uploads/zh
  * 默认配置 [DefaultSettings.php](https://github.com/wikimedia/mediawiki/blob/master/includes/DefaultSettings.php)

```bash
# 进入后会加入配置页面
# 默认 SQLite 目录 /var/www/data/
# 最后生成 LocalSettings.php, 需要放到 /var/www/html/
docker run --rm -it --name mw -p 8080:80 -d mediawiki
# 备份出必要的数据
docker cp LocalSettings.php some-mediawiki:/var/www/html
docker cp some-mediawiki:/var/www/html/images ./files/
docker cp some-mediawiki:/var/www/data ./data/

# 同步到其他地方
rsync -azv . root@192.168.1.2:/data/mediawiki/

# 确保权限正确 www-data
chown 33:33 -R /data/mediawiki/data /data/mediawiki/files
# 再次使用 Docker 启动
docker run -it --rm -v /etc/localtime:/etc/localtime:ro \
  -v /data/mediawiki/LocalSettings.php:/var/www/html/LocalSettings.php \
  -v /data/mediawiki/data:/var/www/data \
  -v /data/mediawiki/files:/var/www/html/images \
  -p 8081:80 \
  --name mediawiki mediawiki
```

```php
<?php
// ============
// 文件上传
// ============
// 启用上传
$wgEnableUploads = true; 
// 允许其他扩展
$wgFileExtensions = array_merge( $wgFileExtensions, array( 
	// office
	'doc', 'docx','xls','xlsx','ppt','pptx',
	'pdf', 'mpp',  'jpg', 
	'tiff', 'odt', 'odg', 'ods', 'odp'
	)
);
// 文件大小
// php.ini 中定义了 post_max_size 8m upload_max_filesize 2m 限制了文件大小
// php -i | grep max_filesize
// 如果使用 docker, 则默认目录为 /usr/local/etc/php/conf.d

// MediaWiki 中关于文件大小的配置
$wgUploadSizeWarning = 50000000;// 50MB
$wgMaxUploadSize = 50000000;// 50MB

// 上传目录
$wgUploadDirectory = "/var/www/html/images";
// 删除目录
$wgDeletedDirectory = "{$wgUploadDirectory}/deleted";

// 分组权限
// https://www.mediawiki.org/wiki/Manual:$wgGroupPermissions
```

## 编写指南
* 格式说明
  * [格式化文本](https://www.mediawiki.org/wiki/Help:Formatting/zh)
    * 基本的格式语法
    * 类似于 Markdown
  * [链接](https://www.mediawiki.org/wiki/Help:Links/zh)
    * 阐述如何在内容中添加链接
    * 链接主要分为
      * 内部链接到同一wiki中的其他页面（通常称作“wiki链接”）
      * 外部链接到其他网站的页面
      * 外部链接到内部页面，指的是同一wiki
      * 跨wiki链接到其他使用预先注册的特殊前缀的网站
      * 跨语言链接到已注册为当前wiki的不同语言版本的其他wiki
  * [图像](https://www.mediawiki.org/wiki/Help:Images/zh)
  * [表格](https://www.mediawiki.org/wiki/Help:Tables/zh)
  * [列表](https://www.mediawiki.org/wiki/Help:Lists)
    * 列表相对简单
    * 目前没有中文页面, 可参考案例进行学习
  * [引用](https://www.mediawiki.org/wiki/Extension:Cite/zh)
    * 用于引用外部文档
  * [子页面](https://www.mediawiki.org/wiki/Help:Subpages/zh)
* Wikipedia [新手入門/主頁](https://zh.wikipedia.org/wiki/Wikipedia:新手入門/主頁)
  * 维基百科的中文新手入门文档, 可作为参考

```mediawiki
<!-- 这里是注释 -->

``斜体``
```粗体```
````粗斜体````

<nowiki>这里的内容不受格式影响</nowiki>

== 二级标题 ==
=== 三级标题 ===
==== 四级标题 ====
===== 五级标题 =====
====== 六级标题 ======

<!-- 无序列表 -->
* 一级
** 二级
*** 三级

<!-- 有序列表 -->
# 一级
## 二级
### 三级

<!-- 定义 -->
; 名词
: 解释
: 解释二

: 一级缩进
:: 二级缩进
:::: 三级缩进

<!-- 
  链接
-->

<!-- 链接到某个页面, 常见的页面前缀 Category, File, Media 或者 分类, 文件, 媒体文件 为特殊页面-->
[[首页]]
[[Help:Contents]]

<!-- 为页面添加分类 -->
[[Category:分类名]]
<!-- 链接到分类 -->
[[:Category:分类名]]

<!-- 外部链接 -->
[https://yikaiye.com 易开业官网]
<!-- 会以数字显示 -->
[https://yikaiye.com]
<!-- 会直接变为可点击链接 -->
https://yikaiye.com
```
