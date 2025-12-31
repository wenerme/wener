---
title: Dev Awesome
tags:
  - Awesome
---

# Dev Awesome

- [Roadmap](https://roadmap.sh/)
- [The Book of Secret Knowledge](https://github.com/trimstray/the-book-of-secret-knowledge)
- [Spark Joy](https://github.com/sw-yx/spark-joy)
- [Every Programmer Should Know](https://github.com/mtdvio/every-programmer-should-know)
- [Bogdanp/awesome-advent-of-code](https://github.com/Bogdanp/awesome-advent-of-code)
- [mehdihadeli/awesome-software-architecture](https://github.com/mehdihadeli/awesome-software-architecture)
- [geek-cookbook/geek-cookbook](https://github.com/geek-cookbook/geek-cookbook)
- [jlevy/the-art-of-command-line](https://github.com/jlevy/the-art-of-command-line)
- [papers-we-love/papers-we-love](https://github.com/papers-we-love/papers-we-love)
- jobs
  - [poteto/hiring-without-whiteboards](https://github.com/poteto/hiring-without-whiteboards)
  - http://goo.gl/FsgnGi
    Salaries
- Task Runner
  - Makefile
  - Justfile
  - Magefile
  - [joerdav/xc](https://github.com/joerdav/xc)
    - MIT, Go
    - Markdown defined task runner.
  - [runme-ai/runme](https://github.com/runme-ai/runme)
    - MIT, Go
    - DevOps Notebooks Built with Markdown
  - [go-task/task](https://github.com/go-task/task)
    - MIT, Go
    - A task runner / simpler Make alternative
    - Taskfile.yml
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
  - [ast-grep/ast-grep](https://github.com/ast-grep/ast-grep)
    - MIT, Rust
    - code structural search, lint and rewriting
- pkgs
  - [deps.dev](https://deps.dev)
- package mamager/version manager/env manager
  - [mise](https://github.com/jdx/mise)
  - [nvm-sh/nvm](https://github.com/nvm-sh/nvm)
    - `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash`
  - [tj/n](https://github.com/tj/n)
    - `curl -fsSL https://raw.githubusercontent.com/tj/n/master/bin/n | bash -s install lts`
- Terminal UI
  - kitty
    - Kitty Graphics Protocol
    - icat 看图
  - hyper
  - Tabby
  - [iTerm2]
  - [withfig/autocomplete](https://github.com/withfig/autocomplete)
    - for bash, zsh, fish
  - [ghostty-org/ghostty](https://github.com/ghostty-org/ghostty)
    - MIT, Zig, Swift
    - `brew install --cask ghostty`
    - 支持 Tmux Control Mode
  - [wavetermdev/waveterm](https://github.com/wavetermdev/waveterm)
    - Electron
    - 重新定义 terminal 概念
    - ⚠️ ssh config 不支持 Include, tmux 不能复制, claude code 滚动有问题, AI 目前不支持 BYOK
  - [wezterm/wezterm](https://github.com/wezterm/wezterm)
    - Rust, Lua
    - Lua 配置
  - [warpdotdev/Warp](https://github.com/warpdotdev/Warp)
    - [Warp Home](https://warp.dev)
    - 闭源, 商业 [Pricing](https://www.warp.dev/pricing)
      - $20/month
      - BYOK 需要 $20/month 的 Build License
        - https://github.com/warpdotdev/warp/issues/7936
    - `brew install --cask warp`
- dotfiles
  - [twpayne/chezmoi](https://github.com/twpayne/chezmoi)
  - [Dotfiles Utilities](https://dotfiles.github.io/utilities/)
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
- ide/editor
  - Jetbrains IDE
  - [zed-industries/zed](https://github.com/zed-industries/zed)
  - vsc
  - windsurf
  - cursor
  - Augment Code
- HTTP
  - [Kong/httpsnippet](https://github.com/Kong/httpsnippet)
    - HTTP Request snippet generator for many languages & libraries
- JSON
  - [microsoft/node-jsonc-parser](https://github.com/microsoft/node-jsonc-parser)
  - [s3u/JSONPath](https://github.com/s3u/JSONPath)
- AI Coding Assistant/agent
  - Github Copilot
  - ContinueDev
  - Claude Code
  - Gemini CLI
  - Codex
  - Sweep: AI
    - for JetBrains IDEs
  - [ZenCoder](https://zencoder.ai/)
  - [Lovable](https://lovable.dev/)
  - [vllm-project/vllm-omni](https://github.com/vllm-project/vllm-omni)
    - Apache-2.0, Python
    - A framework for efficient model inference with omni-modality models
  - [midday-ai/ai-sdk-tools](https://github.com/midday-ai/ai-sdk-tools)
    - Essential utilities for building production-ready AI applications with Vercel AI SDK
  - [Product Hunt: AI Coding](https://www.producthunt.com/categories/ai-coding)

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

- [Cloud Design Patterns](https://docs.microsoft.com/en-us/azure/architecture/patterns/)
- [Microservices Patterns](https://microservices.io/patterns/)
- [每个架构师都应该研究下康威定律](http://www.infoq.com/cn/articles/every-architect-should-study-conway-law)
- [度量驱动开发](http://www.infoq.com/cn/articles/metrics-driven-development)
- [Conway's law](https://en.wikipedia.org/wiki/Conway%27s_law)
- [Sidecar pattern](https://docs.microsoft.com/en-us/azure/architecture/patterns/sidecar)
- 《Building Evolutionary Architectures》

## Book

- Logic
  - Mathematical Logic for Computer Science
  - Logic in Computer Science
    - https://www.cs.bham.ac.uk/research/projects/lics/
  - https://www.lix.polytechnique.fr/Labo/Samuel.Mimram/teaching/INF551/
  - https://slc.openlogicproject.org/
- [Software Engineering at Google](https://abseil.io/resources/swe-book)
- [Free Programming Books](https://ebookfoundation.github.io/free-programming-books/books/free-programming-books-langs.html)

## Read

- [facundoolano/software-papers](https://github.com/facundoolano/software-papers)
- [Chronofold: a data structure for versioned text](https://arxiv.org/abs/2002.09511)
- [Principles of Distributed Computing](https://disco.ethz.ch/courses/podc_allstars/)
- https://martinfowler.com/articles/patterns-of-distributed-systems/
- [Theoretical Computer Science Cheat Sheet](https://www.tug.org/texshowcase/cheat.pdf)
  - [HN](https://news.ycombinator.com/item?id=29347885)
- [cs-books/influential-cs-books](https://github.com/cs-books/influential-cs-books)
- [The Log: What every software engineer should know about real-time data's unifying abstraction](https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying)
- [Jeff Dean: Building Software Systems At Google and Lessons Learned](http://static.googleusercontent.com/media/research.google.com/en/us/people/jeff/stanford-295-talk.pdf)
- [42 things I learned from building a production database](https://maheshba.bitbucket.io/blog/2021/10/19/42Things.html)
- [Fundamental theorem of software engineering](https://en.wikipedia.org/wiki/Fundamental_theorem_of_software_engineering)
- [Indirection](https://en.wikipedia.org/wiki/Indirection)
- [The Architect Elevator](https://architectelevator.com)
- [Learn In Public](https://learninpublic.org/)
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

- [Creating Visual Explain](https://www.singlestore.com/blog/creating-visual-explain/)
- [d3/d3-hierarchy](https://github.com/d3/d3-hierarchy)

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
- [afatcoder/LeetcodeTop](https://github.com/afatcoder/LeetcodeTop)
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
  - [nehan-player](https://tategakibunko.github.io/nehan-playe)

## CICD

- drone
- gitlab-runner
- jenkins
- [concourse/concourse](https://github.com/concourse/concourse)

## Jobs

- [Nithur-M/work-from-anywhere](https://github.com/Nithur-M/work-from-anywhere)
- [CoFoundersLab](https://cofounderslab.com/)
- [JobsDB](https://www.jobsdb.com/)
- Frelance
  - [upwork](https://www.upwork.com/)
  - [FreeHunter](https://freehunter.hk/)
- Remote
  - [We Work Remotely](https://weworkremotely.com/)
  - [Remote.co](https://remote.co/)
  - [Working Nomads](https://www.workingnomads.com/)

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
- [Code Quality Topics](https://github.com/topics/code-quality)

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
  - [Github 趋势](https://github.com/trending)
  - [Software Lead Weekly](https://softwareleadweekly.com/)
  - [DevOps Weekly](https://www.devopsweekly.com/)
- 技术博客
  - [技术博客](https://web.dev/blog)
  - 官方网站博客/Docs
- [TrendShift](https://trendshift.io/)
- Awesome - 发现项目和技术
  - [Wener Notes Tags: Awesome](https://wener.me/notes/tags/awesome)
  - [sindresorhus/awesome](https://github.com/sindresorhus/awesome)
  - [zudochkin/awesome-newsletters](https://github.com/zudochkin/awesome-newsletters)
  - [davidgasquez/awesome-duckdb](https://github.com/davidgasquez/awesome-duckdb)
    - Apache-2.0, Shell
    - 🦆 A curated list of awesome DuckDB resources
