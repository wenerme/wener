---
title: Heritrix
---

# Heritrix

- [internetarchive/heritrix3](https://github.com/internetarchive/heritrix3)
- 下载 https://github.com/internetarchive/heritrix3/releases
- https://heritrix.readthedocs.io/en/latest/
- https://github.com/internetarchive/heritrix3/wiki/Heritrix%20Configuration

```bash
export JAVA_HOME=$HOME/jdk/11/Contents/Home
export HERITRIX_HOME=$PWD
export JAVA_OPTS=-Xmx1024M
export FOREGROUND=true
#HERITRIX_OUT=$HERITRIX_HOME/heritrix_out.log
# https://127.0.0.1:8443
$HERITRIX_HOME/bin/heritrix -a admin:admin
```

**初次使用**

- 创建 Job
- 进入 Job - 配置
  - 修改 seeds.textSource.value 为待抓取地址
  - 建议修改 metadata.operatorContactUrl
  - 左下角 save changes
- build
- launch
- unpause

```title="seeds-report.txt"
[code] [status] [seed] [redirect]
200 CRAWLED http://www.smokebox.net
```

- #urls #bytes host #robots #remaining
- #novel-urls #novel-bytes
- #dup-by-hash-urls #dup-by-hash-bytes
- #not-modified-urls #not-modified-bytes

```title="hosts-report.txt"
1337 23877316 www.smokebox.net 0 0
1 59 dns: 0 0
0 0 dns: 0 0
```

- source-report.txt
  - source
  - host
  - #urls
- mimetype-report.txt
  - #urls
  - #bytes
  - mime-types
- responsecode-report.txt
  - #urls
  - rescode

```
./job/
  .seeds
  .recover
  .include
  .schedule
  .force
```

## crawler-beans.cxml

- https://heritrix.readthedocs.io/en/latest/configuring-jobs.html
- https://heritrix.readthedocs.io/en/latest/bean-reference.html

```xml
<bean id="crawlLimitEnforcer" class="org.archive.crawler.framework.CrawlLimitEnforcer">
  <property name="maxBytesDownload" value="100000000" />
  <property name="maxDocumentsDownload" value="100" />
  <property name="maxTimeSeconds" value="10000" />
</bean>
<bean id="crawlController" class="org.archive.crawler.framework.CrawlController">
  <property name="maxToeThreads" value="50" />
</bean>
<bean id="simpleOverrides" class="org.springframework.beans.factory.config.PropertyOverrideConfigurer">
  <property name="properties">
    <value>
      metadata.operatorContactUrl=http://www.archive.org
      metadata.jobName=basic
      metadata.description=Basic crawl starting with useful defaults
    </value>
  </property>
</bean>

<bean id="metadata" class="org.archive.modules.CrawlMetadata" autowire="byName">
  <!-- obey, classic, ignore -->
  <property name="robotsPolicyName" value="obey"/>
</bean>
```
