---
title: woodpecker cli
---

# woodpecker cli

```bash
curl -LO https://github.com/woodpecker-ci/woodpecker/releases/download/v0.15.7/woodpecker-cli_darwin_amd64.tar.gz
tar zxvf woodpecker-cli*.tar.gz
./woodpecker-cli

# --server --token
export WOODPECKER_SERVER="https://woodpecker.example.com"
export WOODPECKER_TOKEN=""
./woodpecker-cli info

woodpecker-cli secret add \
  --repository octocat/hello-world \
  --event push \
  --name docker_username \
  --value VALUE
# Value from file
woodpecker-cli secret add \
  --repository octocat/hello-world \
  --name ssh_key \
  --value @/root/ssh/id_rsa
```
