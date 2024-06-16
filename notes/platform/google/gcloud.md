---
title: gcloud
---

# gcloud

- https://cloud.google.com/sdk/gcloud/reference/

```bash
brew install google-cloud-sdk # by macOS Homebrew

# bash
# source "$(brew --prefix)/share/google-cloud-sdk/path.bash.inc"
# zsh
# source "$(brew --prefix)/share/google-cloud-sdk/path.zsh.inc"
# source "$(brew --prefix)/share/google-cloud-sdk/completion.zsh.inc"
# fish
# source "$(brew --prefix)/share/google-cloud-sdk/path.fish.inc"

gcloud config set disable_usage_reporting true

gcloud components update       # 更新
gcloud components install beta # 安装 beta 功能

gcloud auth login      # 登陆
gcloud alpha ml vision # 初始化 alpha 命令

gcloud projects list # 列出项目
gcloud config set project $PROJECT_ID


gcloud compute instances list

# 防火墙
gcloud compute firewall-rules list
# 新建规则
# 60000-61000 for mosh
gcloud compute firewall-rules create allow-ops \
    --allow tcp:60000-61000,udp:60000-61000 \
    --source-ranges 0.0.0.0/0 \
    --target-tags ops-server \
    --description "Allow OPS traffic"

# --zone
gcloud compute instances add-tags --tags ops-server INSTANCE_ID
```
