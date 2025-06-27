---
title: Dev Awesome
tags:
  - Awesome
---

# Dev Awesome

- https://roadmap.sh/
- [trimstray/the-book-of-secret-knowledge](https://github.com/trimstray/the-book-of-secret-knowledge)
- [sw-yx/spark-joy](https://github.com/sw-yx/spark-joy)
- [mtdvio/every-programmer-should-know](https://github.com/mtdvio/every-programmer-should-know)
- [Bogdanp/awesome-advent-of-code](https://github.com/Bogdanp/awesome-advent-of-code)
- [mehdihadeli/awesome-software-architecture](https://github.com/mehdihadeli/awesome-software-architecture)
- [geek-cookbook/geek-cookbook](https://github.com/geek-cookbook/geek-cookbook)
- [jlevy/the-art-of-command-line](https://github.com/jlevy/the-art-of-command-line)
- [papers-we-love/papers-we-love](https://github.com/papers-we-love/papers-we-love)
- jobs
  - [poteto/hiring-without-whiteboards](https://github.com/poteto/hiring-without-whiteboards)
  - http://goo.gl/FsgnGi
    Salaries
- Github Copilot
  - [CodedotAl/gpt-code-clippy](https://github.com/CodedotAl/gpt-code-clippy)
- formatter
  - [dprint/dprint](https://github.com/dprint/dprint)
  - prettier
  - go fmt
  - clang fmt
  - [diffplug/spotless](https://github.com/diffplug/spotless)
- lint
  - eslint
  - go vet
- pkgs
  - https://deps.dev
- dotfiles
  - [twpayne/chezmoi](https://github.com/twpayne/chezmoi)
  - https://dotfiles.github.io/utilities/
  - yadm
  - bare git repository
  - symlinks
  - [anishathalye/dotbot](https://github.com/anishathalye/dotbot)
    - MIT, Python
  - [stow](https://www.gnu.org/software/stow/)
    - Perl
    - symlink farm manager
  - demo
    - [renemarc/dotfiles](https://github.com/renemarc/dotfiles)
- reference/framework
  - [YunaiV/yudao-cloud](https://github.com/YunaiV/yudao-cloud)
    - MIT, Java
    - Spring Cloud Alibaba + MyBatis Plus + Vue & Element
    - 后台管理系统 + 用户小程序
    - 支持 RBAC 动态权限、多租户、数据权限、工作流、三方登录、支付、短信、商城、CRM、ERP、AI 大模型等
  - [YunaiV/ruoyi-vue-pro](https://github.com/YunaiV/ruoyi-vue-pro)
    - MIT, Java
    - Spring Boot + MyBatis Plus + Vue & Element

```bash
# 使用 Bare Git Repository 管理 dotfiles
git init --bare $HOME/.dotfiles
alias dotfiles='/usr/bin/git --git-dir=$HOME/.dotfiles/ --work-tree=$HOME'
dotfiles config --local status.showUntrackedFiles no

dotfiles add .bashrc
dotfiles commit -m 'Add .bashrc'
dotfiles push
```

## Big Corp

| Github                  | for      |
| ----------------------- | -------- |
| https://github.com/YMFE | 去哪儿网 |
| https://github.com/thx  | 阿里妈妈 |

## Design

- https://docs.microsoft.com/en-us/azure/architecture/patterns/
- https://microservices.io/patterns/
- [每个架构师都应该研究下康威定律](http://www.infoq.com/cn/articles/every-architect-should-study-conway-law)
- [度量驱动开发](http://www.infoq.com/cn/articles/metrics-driven-development)
- [Conway's law]
- https://docs.microsoft.com/en-us/azure/architecture/patterns/sidecar
- 《Building Evolutionary Architectures》

[Conway's law](https://en.wikipedia.org/wiki/Conway%27s_law)

## Book

- Logic
  - Mathematical Logic for Computer Science
  - Logic in Computer Science
    - https://www.cs.bham.ac.uk/research/projects/lics/
  - https://www.lix.polytechnique.fr/Labo/Samuel.Mimram/teaching/INF551/
  - https://slc.openlogicproject.org/
- Software Engineering at Google
  - https://abseil.io/resources/swe-book
- https://ebookfoundation.github.io/free-programming-books/books/free-programming-books-langs.html

## Read

- [facundoolano/software-papers](https://github.com/facundoolano/software-papers)
- [Chronofold: a data structure for versioned text](https://arxiv.org/abs/2002.09511)
- [Principles of Distributed Computing](https://disco.ethz.ch/courses/podc_allstars/)
- https://martinfowler.com/articles/patterns-of-distributed-systems/
- [Theoretical Computer Science Cheat Sheet](https://www.tug.org/texshowcase/cheat.pdf)
  - [HN](https://news.ycombinator.com/item?id=29347885)
- [cs-books/influential-cs-books](https://github.com/cs-books/influential-cs-books)
- [The Log: What every software engineer should know about real-time data's unifying abstraction](https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying)
- http://static.googleusercontent.com/media/research.google.com/en/us/people/jeff/stanford-295-talk.pdf
- [42 things I learned from building a production database](https://maheshba.bitbucket.io/blog/2021/10/19/42Things.html)
- [Fundamental theorem of software engineering](https://en.wikipedia.org/wiki/Fundamental_theorem_of_software_engineering)
- [Indirection](https://en.wikipedia.org/wiki/Indirection)
- [The Architect Elevator](https://architectelevator.com)
- https://learninpublic.org/
- [Developer-Y/cs-video-courses](https://github.com/Developer-Y/cs-video-courses)
- [The Configuration Complexity Clock](http://mikehadlow.blogspot.com/2012/05/configuration-complexity-clock.html?m=1)
  - 硬编码 - 配置 - 规则引擎 - DSL

## Article

- [Software Architecture and Design InfoQ Trends Report—April 2021](https://www.infoq.com/articles/architecture-trends-2021/)

## Misc

- [google/or-tools](https://github.com/google/or-tools)
- [boyter/scc](https://github.com/boyter/scc)
  - fast accurate code counter

## Service Discovery

- consul
- zookeeper
- mDNS

## Conf

- consul
- zookeeper
- [ctripcorp/apollo](https://github.com/ctripcorp/apollo)

## Audio

- [emicklei/melrose](https://github.com/emicklei/melrose)
- [katspaugh/wavesurfer.js](https://github.com/katspaugh/wavesurfer.js)
- [plewto/Pigiron](https://github.com/plewto/Pigiron)

## Profiling

- [grafana/pyroscope](https://github.com/grafana/pyroscope)

## Metrics

- cloc
- [boyter/scc](https://github.com/boyter/scc)

```bash
brew install scc
# -M '[.]pb[.]' -M 'generated'
# Golang
scc --exclude-dir={vendor,.gen,node_modules} -M '_test.go' --no-gen .
scc --no-gen --exclude-dir=gql ./src
scc --by-file ./src # 找到大文件

scc --exclude-dir={vendor,.gen,node_modules} --by-file --sort=lines --include-ext=vue
```

## 协作

- A simple way to build collaborative web apps
  - [HN](https://news.ycombinator.com/item?id=28209736)

## Microservices

- [Event-Driven Data Management for Microservices](https://www.nginx.com/blog/event-driven-data-management-microservices/)

## Conf

- [Flagsmith/flagsmith](https://github.com/Flagsmith/flagsmith)

## Benchmark

> Benchmark, Load-testing

- vegeta
- jmeter
  - Java
- microbenchmark
  - [google/benchmark](https://github.com/google/benchmark)
    - C++
  - JMH
- HTTP
  - wrk
  - ab
    - ApacheBench
  - [rakyll/hey](https://github.com/rakyll/hey)
    - ab relacement
- [grafana/k6](https://github.com/grafana/k6)
- [locustio/locust](https://github.com/locustio/locust)
  - MIT, Python
  - WebUI
  - https://locust.io/
- [tag1consulting/goose](https://github.com/tag1consulting/goose)
  - Apache-2.0, Rust
  - 类似 rust 版的 locust
- [sharkdp/hyperfine](https://github.com/sharkdp/hyperfine)
  - Apache-2.0, MIT, Rust
  - command-line benchmarking tool

## Graph

- https://www.singlestore.com/blog/creating-visual-explain/
- https://github.com/d3/d3-hierarchy

## Tools

- [comby-tools/comby](https://github.com/comby-tools/comby)
  - structural code search and replace

## Secrets

- [mozilla/sops](https://github.com/mozilla/sops)
  - editor of encrypted files
  - AWS KMS, GCP KMS, Azure Key Vault, age, PGP
- [gopasspw/gopass](https://github.com/gopasspw/gopass)
  - password manager for teams

## 有趣 {#fun}

- [ASCII progress indicators](https://glama.ai/blog/2024-09-25-ascii-progress-indicators)
- [denigma](https://denigma.app/)
- [Leetcode has taught me that I'm a bad engineer](https://news.ycombinator.com/item?id=29804607)
- https://github.com/afatcoder/LeetcodeTop
  - 各大互联网公司容易考察的高频 leetcode 题

## Books

- Software Architecture Patterns

## Layout Engine

- [facebook/yoga](https://github.com/facebook/yoga)
  - MIT, C++, JS
  - Flexbox. Follow
- [tategakibunko/nehan](https://github.com/tategakibunko/nehan)
  - MIT, TS
  - paged-media - 书籍
  - https://tategakibunko.github.io/nehan-playe

## CICD

- drone
- gitlab-runner
- jenkins
- [concourse/concourse](https://github.com/concourse/concourse)

## Jobs

- https://github.com/Nithur-M/work-from-anywhere
- https://cofounderslab.com/
- https://www.jobsdb.com/
- Frelance
  - [upwork](https://www.upwork.com/)
  - https://freehunter.hk/
- Remote
  - https://weworkremotely.com/
  - https://remote.co/
  - https://www.workingnomads.com/

## Code quality

- [facebook/infer](https://github.com/facebook/infer)
  - MIT, OCaml
  - Java, C, C++, Objective-C
- [realm/SwiftLint](https://github.com/realm/SwiftLint)
  - Swift
- [detekt/detekt](https://github.com/detekt/detekt)
  - Kotlin
- [pmd/pmd](https://github.com/pmd/pmd)
- [SonarSource/sonarqube](https://github.com/SonarSource/sonarqube)
- [checkstyle/checkstyle](https://github.com/checkstyle/checkstyle)
- [reviewdog/reviewdog](https://github.com/reviewdog/reviewdog)

---

- [analysis-tools-dev/static-analysis](https://github.com/analysis-tools-dev/static-analysis)
- https://github.com/topics/code-quality

## 合规

- [google/licensecheck](https://github.com/google/licensecheck)

## news

:::tip Newsletter

- 让你及时了解行业动态、技术发展、市场趋势和政策变化等信息
- 通常由行业专家、领军人物或专业机构编写，提供深入的分析和独到的见解。这些内容可以帮助你拓宽视野，深化理解特定主题。
- 订阅精选的 Newsletter，你可以节省在互联网上搜索和筛选信息的时间。
- 提供的案例研究、最佳实践和教程等内容，是持续学习和技能提升的宝贵资源。
- 阅读不同主题和领域的 Newsletter 可以激发新的想法和创意，有助于解决工作中的问题，甚至启动新的项目或创新。
- 电子邮件形式的 Newsletter 便于存档和分类，当需要回顾某个话题或信息时，可以轻松查找。

:::

- 新闻
  - Hacker News https://news.ycombinator.com/news
  - Twitter https://twitter.com
- 语言技术主题相关 Weekly Newsletter
  - Golang https://golangweekly.com/
  - NodeJS https://nodeweekly.com/
  - PostgreSQL https://postgresweekly.com/
  - React https://thisweekinreact.com/
- 非技术相关 Weekly Newsletter
  - Github 趋势 https://github.com/trending
  - https://softwareleadweekly.com/
  - https://www.devopsweekly.com/
- 技术博客
  - https://web.dev/blog
  - 官方网站博客/Docs
- https://trendshift.io/
- Awesome - 发现项目和技术
  - https://wener.me/notes/tags/awesome
  - [sindresorhus/awesome](https://github.com/sindresorhus/awesome)
  - [zudochkin/awesome-newsletters](https://github.com/zudochkin/awesome-newsletters)
