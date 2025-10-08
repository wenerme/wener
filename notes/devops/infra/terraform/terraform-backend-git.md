---
title: terraform-backend-git
---

# terraform-backend-git

- [plumber-cd/terraform-backend-git](https://github.com/plumber-cd/terraform-backend-git)
  - Apache-2.0, Golang
  - HTTP Backend by Git
- 通过分支实现 lock `locks/PATH`

```bash
curl -LO https://github.com/plumber-cd/terraform-backend-git/releases/download/v0.1.4/terraform-backend-git-darwin-amd64
chmod +x terraform-backend-git-darwin-amd64
mv terraform-backend-git-darwin-amd64 ~/bin/terraform-backend-git

# by Wrapper
# ==========
# 操作瞬间生成 *.auto.tf
export TF_BACKEND_HTTP_ENCRYPTION_PROVIDER=sops
export TF_BACKEND_HTTP_SOPS_PGP_FP=

terraform-backend-git git \
  --repository git@gitlab.com:wener/wener-ops-vault.git \
  --ref main \
  --state tf-statealiyun.state.json \
  terraform -- $@

# by HCL
# ===========
cat << TF > terraform-backend-git.hcl
git.repository = "https://github.com/my-org/tf-state"
git.ref = "main"
git.state = "my/state.json"
TF

# by HTTP
# ===========
# backend.http.username
TF_BACKEND_GIT_HTTP_USERNAME=
TF_BACKEND_GIT_HTTP_PASSWORD=
terraform-backend-git -l
```

| env                           | for |
| ----------------------------- | --- |
| TF_BACKEND_GIT_GIT_REPOSITORY |

# FAQ

## HTTP remote state already locked

删除分支 `locks/tf-state/wener/aliyun.state.json`
