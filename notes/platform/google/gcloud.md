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


# 自定义仓库
gcloud artifacts repositories create quay-proxy \
    --repository-format=docker \
    --mode=REMOTE_REPOSITORY \
    --location=asia-southeast1 \
    --description="Remote repository for Quay.io images" \
    --upstream-uris=https://quay.io

# 配置 Docker 认证
# gcr.io us.gcr.io eu.gcr.io asia.gcr.io staging-k8s.gcr.io marketplace.gcr.io
gcloud auth configure-docker


gcloud run deploy hello_world \
  --image gcr.io/first_gcloud_project-67/hello_world:main \
  --platform managed \
  --region us-central1 \
  --set-env-vars=SECRET_VALUE="secret" \
  --project first_gcloud_project-67
```

- Supported container registries and images https://cloud.google.com/run/docs/deploying#images
