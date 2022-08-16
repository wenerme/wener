---
title: Ruby
---

# Ruby

- 管理界面
  - [Admin Interface](https://ruby.libhunt.com/categories/22-admin-interface)
  - [Administrate](https://github.com/thoughtbot/administrate)
    - 前段更现代，相对没那么成熟
  - [RailsAdmin](https://github.com/sferik/rails_admin) [demo](http://rails-admin-tb.herokuapp.com/)
    - 更追求自动化界面生成，更加复杂的查询能力 DSL
    - jQueryUI
  - [ActiveAdmin](https://github.com/activeadmin/activeadmin) [demo](http://demo.activeadmin.info/admin)
    - 简化构建管理界面，提倡修改
    - jQueryUI
    - 使用 sprockets 而不是 webpacker
    - [Alternatives](https://github.com/activeadmin/activeadmin/wiki/Alternatives)
  - [ForestAdmin](https://github.com/ForestAdmin/forest-rails)
    - 商业化产品 GPL3
- 前段
  - [reactjs/react-rails](https://github.com/reactjs/react-rails)
    - 集成 视图、控制器、资源 Pipeline、webpacker

```bash
brew install rbenv ruby-build

rbenv install 2.6.3
# init
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"

rbenv global 2.6.3
ruby -v

# https://mirror.tuna.tsinghua.edu.cn/help/rubygems/
# 添加 TUNA 源并移除默认源
gem sources --add https://mirrors.tuna.tsinghua.edu.cn/rubygems/ --remove https://rubygems.org/
# 列出已有源
gem sources -l
```

## Rails

```bash
gem install rails

# 创建站点
rails new my-site
```
