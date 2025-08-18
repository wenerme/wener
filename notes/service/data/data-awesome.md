---
title: Data Awesome
tags:
  - Awesome
---

# Data Awesome

- douban
  - https://github.com/mythsman/mouban
  - https://github.com/mythsman/hexo-douban
- 工商数据
  - https://github.com/kinginsun/Enterprise-Registration-Data-of-Chinese-Mainland
  - https://gitee.com/skyoo/Enterprise-Registration-Data-of-Chinese-Mainland
  - https://github.com/chenli90s/govinfo
- 企业数据
- 手机归属地
  - 《电信网编号计划（2017年版）》
    - https://nac.miit.gov.cn/#/noticeDetail?id=600126024
  - [xluohome/phonedata](https://github.com/xluohome/phonedata)
  - [ls0f/phone](https://github.com/ls0f/phone)
- geo
  - https://github.com/wp-statistics/GeoLite2-City
- service
  - https://github.com/OpenRefine/OpenRefine
- [microsoft/Data-Science-For-Beginners](https://github.com/microsoft/Data-Science-For-Beginners)
- https://odesli.co/
  - song.link
  - artist.link
- 商业
  - https://opencorporates.com
    - https://api.opencorporates.com/documentation/API-Reference

## UID

- DOI - Digital Object Identifier - 数字对象标识符
  - 学术论文、数据集、软件等数字对象的永久标识
  - [doi.org](https://doi.org)
  - `10.1000/182` (前缀/后缀结构)
  - by International DOI Foundation (IDF)
- ORCID - Open Researcher and Contributor ID - 开放研究者和贡献者标识符
  - 研究人员的唯一标识，解决同名问题
  - 0000-0000-0000-0000 (16位数字，每4位用连字符分隔)
  - 免费注册和使用、与多个学术平台集成、可关联研究成果、资助信息等
  - https://orcid.org/
- ISBN - International Standard Book Number - 国际标准书号
  - 图书的唯一标识
  - 包含国家/地区、出版社、书目和校验码信息
  - ISBN-13 (978-0-123456-78-9) 或 ISBN-10 (0-123456-78-9)
  - by International ISBN Agency
  - https://www.isbn-international.org/
- ISSN - International Standard Serial Number - 国际标准连续出版物号
  - 期刊、杂志、报纸等连续出版物标识
  - 不区分载体形式，同一刊物的印刷版和电子版有不同ISSN
  - by ISSN International Centre
  - https://www.issn.org/
- ISNI - International Standard Name Identifier - 国际标准名称标识符
  - 创作者、表演者、研究人员等公共身份的标识
  - 涵盖范围比ORCID更广，包括艺术家、作家等
  - 16位数字，通常以4位为一组显示
  - by ISNI International Agency
  - https://isni.org/
- ARK - Archival Resource Key
  - 开放标准，免费使用；支持版本控制和元数据访问；独立于特定技术平台
  - 数字资源的持久标识，特别适用于文化遗产机构
  - `ark:/NAAN/Name` (Name Assigning Authority Number/名称)
  - https://www.ark.org/
- Handle System
  - 字对象的分布式信息系统
  - DOI 底层所基于的技术、提供分布式解析服务、支持多种数据类型的标识
  - https://handle.net/
- IMDb ID - Internet Movie Database Identifier
  - 电影、电视剧、演员、导演等的标识
  - 标题: `tt1234567` (tt + 7位数字)
  - 人员: `nm1234567` (nm + 7位数字)
- RFC - Request for Comments
  - IETF 和其他组织发布的技术文档标识符
  - 格式: `RFC 1234`
- PMID - PubMed Identifier - PubMed 文献标识符
  - 生物医学与生命科学文献的唯一标识
  - 纯数字，例如 `12345678`
  - 解析示例: https://pubmed.ncbi.nlm.nih.gov/12345678/
  - by U.S. National Library of Medicine (NLM)
- arXiv ID - arXiv Identifier - 预印本文章标识符
  - 学术预印本与电子论文
  - 新式: `yymm.nnnnn[vN]`（如 `2101.01234v2`），旧式: `archive/YYMMNNN`
  - 解析示例: https://arxiv.org/abs/2101.01234
  - by arXiv (Cornell University 运营，社区支持)
- VIAF - Virtual International Authority File - 虚拟国际权威文件标识符
  - 人名、机构名、作品等规范数据的聚合标识
  - 纯数字，例如 `113230702`
  - 解析示例: https://viaf.org/viaf/113230702/
  - by OCLC 与各国家/地区图书馆联合维护
- Wikidata QID - Wikidata Item Identifier - 维基数据实体标识符
  - 各类实体项（人、地、组织、概念等）的唯一标识
  - 格式: `Q` + 数字，例如 `Q42`
  - 解析示例: https://www.wikidata.org/wiki/Q42
  - by Wikimedia Foundation

| 标识符 | 适用范围 | 格式                | 费用 | 持久性 | 解析服务 |
| ------ | -------- | ------------------- | ---- | ------ | -------- |
| DOI    | 数字对象 | 10.xxxx/xxxx        | 付费 | 高     | 全球     |
| ORCID  | 研究人员 | 0000-0000-0000-0000 | 免费 | 高     | 全球     |
| ISBN   | 图书     | 978-x-xxx-xxxxx-x   | 付费 | 高     | 全球     |
| ISSN   | 期刊     | xxxx-xxxx           | 付费 | 高     | 全球     |
| ARK    | 档案资源 | ark:/xxxxx/xxxx     | 免费 | 高     | 分布式   |
| Handle | 数字对象 | xxxx/xxxx           | 付费 | 高     | 分布式   |

```markdown
<!-- 在HTML中引用DOI -->

<a href="https://doi.org/10.1000/182">doi:10.1000/182</a>

<!-- 在学术引用中 -->

Author, A. (2023). Title. _Journal_, 1(1), 1-10. https://doi.org/10.1000/182

<!-- ORCID集成示例 -->
<a href="https://orcid.org/0000-0000-0000-0000">
  <img src="https://orcid.org/sites/default/files/images/orcid_16x16.png" alt="ORCID iD">
  0000-0000-0000-0000
</a>
```

:::tips

- UID - Unique Identifier
- PID - Persistent Identifier

:::

## Crawler

- Scrapy
- [crawlab-team/crawlab](https://github.com/crawlab-team/crawlab)
  分布式爬虫管理平台，支持任何语言和框架
- [MontFerret/ferret](https://github.com/MontFerret/ferret)
  - Declarative web scraping
- [BruceDone/awesome-crawler](https://github.com/BruceDone/awesome-crawler)
- Go
  - [eddycjy/fake-useragent](https://github.com/eddycjy/fake-useragent)
  - [asciimoo/colly](https://github.com/asciimoo/colly)
- [BruceDone/awesome-crawler](https://github.com/BruceDone/awesome-crawler)
- 参考
  - [The State of Web Scraping in 2021](https://mihaisplace.blog/2021/10/03/the-state-of-web-scraping-in-2021/)
    - [HN](https://news.ycombinator.com/item?id=28827509)

## ETL Pipeline

- Apache NiFi
- [singer.io](https://github.com/singer-io)
- [transferwise/pipelinewise](https://github.com/transferwise/pipelinewise)
  - Apache-2.0, Python
  - Tap 为 AGPL-3.0
  - Data Pipeline Framework using the singer.io spec
  - postgres tap 基于 wal2json
- [apache/arrow-datafusion](https://github.com/apache/arrow-datafusion)
  - https://news.ycombinator.com/item?id=28296227
- [dask/dask](https://github.com/dask/dask)
  Parallel computing with task scheduling
- [airbytehq/airbyte](https://github.com/airbytehq/airbyte)
  - MIT, Java+Python+TypeScript
- [nuclio/nuclio](https://github.com/nuclio/nuclio)
  Serverless event and data processing platform
  - Apache-2.0, Go
- [pditommaso/awesome-pipeline](https://github.com/pditommaso/awesome-pipeline)
- [rudderlabs/rudder-server](https://github.com/rudderlabs/rudder-server)
  - AGPL-3.0, Go, TS, React
  - Segment-alternative
  - 后端 PostgreSQL
  - Customer Data Platform, CDP

## ML Pipeline

- [flyteorg/flyte](https://github.com/flyteorg/flyte)
  Kubernetes-native workflow automation platform - Machine Learning & Data Processing
- [polyaxon/polyaxon](https://github.com/polyaxon/polyaxon)
  Machine Learning Platform for Kubernetes

## Workflow

- [spotify/luigi](https://github.com/spotify/luigi)
- [apache/airflow](https://github.com/apache/airflow)

## Archive

- [freereadorg/awesome-libgen](https://github.com/freereadorg/awesome-libgen)
  - [repository_torrent](http://libgen.rs/scimag/repository_torrent/)
- [ArchiveBox/ArchiveBox](https://github.com/ArchiveBox/ArchiveBox)

## Wayback Machine

- [hartator/wayback-machine-downloader](https://github.com/hartator/wayback-machine-downloader)
- [jsvine/waybackpack](https://github.com/jsvine/waybackpack)
- [oduwsdl/archivenow](https://github.com/oduwsdl/archivenow)

## Dataset

- [datasets/awesome-data](https://github.com/datasets/awesome-data)
- [Denied Persons List](https://www.bis.doc.gov/index.php/policy-guidance/lists-of-parties-of-concern/denied-persons-list)
  - https://bis.doc.gov/dpl/dpl.txt
- [NYPL-publicdomain/data-and-utilities](https://github.com/NYPL-publicdomain/data-and-utilities)

## File Format

- Parquet - 列格式
  - 压缩比、存储效率高
  - 支持嵌套数据结构
- Avro - 行格式
  - 包含 schema - JSON
  - 数据为 Binary
  - https://zymeworks.github.io/avro-viewer/
- ORC - Optimized Row Columnar
  - 记录额外索引信息
- Arrow - 内存
  - 主要用于处理
- CSV, TSV
- JSON
- JSONL - `.jsonl`, `.ndjson`
  - 每行一个 JSON

## Misc

- [facebookresearch/AugLy](https://github.com/facebookresearch/AugLy)
  data augmentations library for audio, image, text, and video
- [Profil3r – OSINT Tool To Find Social Media Profiles & Their Email Addresses](https://skynettools.com/profil3r-osint-tool-to-find-social-media-profiles-their-email-addresses/)
- [Open-source intelligence](https://en.wikipedia.org/wiki/Open-source_intelligence)
- [ml874/Data-Science-Cheatsheet](https://github.com/ml874/Data-Science-Cheatsheet)
- [looker-open-source/malloy](https://github.com/looker-open-source/malloy)
- [thalo-rs/thalo](https://github.com/thalo-rs/thalo)
  - Event sourcing suite for Rust

## Tools

- [TomWright/dasel](https://github.com/TomWright/dasel)
  - MIT, Go
  - JSON, TOML, YAML, XML, CSV
- [johnkerl/miller](https://github.com/johnkerl/miller)
  - MIT, Go
  - awk, sed, cut, join, and sort for name-indexed data such as CSV, TSV, and tabular JSON
- [simeji/jid](https://github.com/simeji/jid)
  - MIT, Go
  - json incremental digger
- [fiatjaf/jiq](https://github.com/fiatjaf/jiq)
  - jid in jq syntax
- [tomnomnom/gron](https://github.com/tomnomnom/gron)
  - MIT, Go
  - JSON greppable
- [saulpw/visidata](https://github.com/saulpw/visidata)
  - GPLv3, Python
  - terminal spreadsheet
- [multiprocessio/dsq](https://github.com/multiprocessio/dsq)
  - Apache-2.0, Go
  - SQL for JSON, CSV, Excel, Parquet
- [x2bool/xlite](https://github.com/x2bool/xlite)
  - MIT, Rust
  - SQLite for .xlsx, .xls, .ods
- jq
- [dbcrossbar/dbcrossbar](https://github.com/dbcrossbar/dbcrossbar)
  - 支持 jsonl https://github.com/dbcrossbar/dbcrossbar/issues/132
- Twitter
  - [DocNow/twarc](https://github.com/DocNow/twarc)
- mdb
  - [mdbtools/mdbtools](https://github.com/mdbtools/mdbtools)
  - [pavlov99/mdb-export-all](https://github.com/pavlov99/mdb-export-all)
  - [AccelerationNet/access2csv](https://github.com/AccelerationNet/access2csv)

## Extract

- [XHXIAIEIN/split-string-address](https://github.com/XHXIAIEIN/split-string-address)

## Understand

![](http://dlib.net/ml_guide.svg)

## Online

- https://www.marinetraffic.com/en/ais/home/shipid:4248775/zoom:14

## Chinese

- 诗词
  - https://github.com/KonghaYao/classic-poetry

## Datasets

- AA
  - https://annas-archive.se/torrents
  - https://annas-archive.org/datasets
  - Meta torrented & seeded 81.7 TB dataset containing copyrighted data
    - https://news.ycombinator.com/item?id=42971446
- 1985年至2021年的裁判文书全量数据（94.36G）
  - magnet:?xt=urn:btih:c6aac12ebd697041ba60a8cba9f7326155921fae
  - ResilioSync key: BC76W4N26A3ZCOQEIAQYMMBGY7PRWE6TG
- [Hacker News](https://github.com/HackerNews/API)
  - Dump
    - November 1, 2023 https://huggingface.co/datasets/OpenPipe/hacker-news
      - parquet, 10GB
      - 41,813,385 行
    - https://console.cloud.google.com/marketplace/details/y-combinator/hacker-news
  - https://huggingface.co/datasets/julien040/hacker-news-posts
  - https://huggingface.co/datasets/OpenPipe/hacker-news
- bigquery-public-data
  - https://cloud.google.com/bigquery/public-data
- https://huggingface.co/datasets
- https://www.kaggle.com/datasets
- IMDB
  - https://huggingface.co/datasets/minato-ryan/imdb-wiki
