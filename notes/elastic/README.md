
SIEM
https://www.elastic.co/cn/siem

SIEMonster, they have a full SIEM toolset integration with OpenDistro that’s available in a community edition.

https://siemonster.com/download-community-edition/

# ELK

ELK 是 Elasticsearch, Logstash 和 Kibana 工具栈的缩写.是一组用于构建 [Logging as a Service] 的开源组件.
![](https://upload.wikimedia.org/wikipedia/commons/9/9c/Logging_as_a_Service_Architectural_Model.jpg)

[Elasticsearch](https://github.com/elastic/elasticsearch)
: 分布式 RESTful 搜索引擎
: 基于 Lucene

[Logstash](https://github.com/elastic/logstash)
: 使用 JRuby 实现的代理应用
: 用于收集各种格式的日志
: 可对日志进行过滤
: 支持多种输出格式

[Kibana](https://github.com/elastic/kibana)
: Kibana 是 Elasticsearch 的分析搜索面板.

![](http://plantuml.com/plantuml/svg/IybCBqeio51mLwZcKW22eiIyx9JC8bkV82umFoy_9LKXkZWZiI3LDYc_8jOQB9gQaWuKpKdDipMCvUBCoK-FJixFoI-oLL9sStCsDpPJqYakgSn9jKtBpCb9JT79IKnApR6riKdBpoknyybFBov9BCwmIIhIjmCBAGJuU_g5w0PxHhdQAbaesJsRiktbx3QT5yiNFvitGUVPZjRd4zfqdatVzdBwbgUx-fzsJ7_QCyr67smObB83kg8uDR4eEGFk46TpDpVy3d7DIImkoKo6wCFjcgThPpnjMg7pRCASvriMwJpjQ0Cw2jFsyjGakDN6PY3ByLdjdPcKc9U8nyw97S_xDc3O0WvxO6Zhsa4ShMi7j1Og2Z8-9p_PLgb42I5Wg-JguwqGK9IVd5fShCHL2m00)

ELK 的亮点在于 ELK 是由一家公司开发的,因此相互之间配合很好.实际上 ELK 如果单独来看,是有很多替代产品的.


## 传统日志处理遇到的问题
* 日志不一致
	* 每个应用和设备都有自己格式的日志
	* 每个日志都需要专人才能理解
	* 由于日志格式不同难以对日志进行检索
* 时间格式不同
* 分散的日志
	* 日志发布在各个服务器上
	* 许多服务都有不同的日志
	* 日志存放于不同的地方
* 当需要日志时通常会
	* 没有访问日志的权限
	* 没有人能理解日志数据
	* 不知道日志在哪里

## 参考
* [Introduction ELK stack](https://www.elastic.co/webinars/introduction-elk-stack)
* [Elastic 产品列表](https://www.elastic.co/products)
* [Docker日志自动化: ElasticSearch、Logstash、Kibana以及Logspout](http://dockone.io/article/373)
* [Elasticsearch、Logstash & Kibana 和 Docker的结合](http://dockone.io/article/58)
* [ELK Docker](http://elk-docker.readthedocs.org/)
* [Logging as a Service]
	* ELK as a Service
		* [logz](http://logz.io/product/)
		* [logsene](https://sematext.com/logsene/)
		* [elastic](https://www.elastic.co/subscriptions)
		* [logit](https://logit.io/)
	* [Takipi](http://takipi.com) 代码异常监控
	* [Google Cloud Logging](https://cloud.google.com/logging/docs/)
	* [Loggly](https://www.loggly.com/)
	* [Papertrailapp](https://papertrailapp.com/)
	* [Logentries](https://logentries.com/)
	* [Splunk](http://www.splunk.com/)


   [Logging as a Service]: https://en.wikipedia.org/wiki/Logging_as_a_service
