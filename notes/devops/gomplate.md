---
title: gomplate
---

# gomplate

- [hairyhenderson/gomplate](https://github.com/hairyhenderson/gomplate) - 支持数据源的命令行模板
  - MIT, Go
  - 来源支持 JSON, EJSON, YAML, AWS EC2 metadata, Consul, Vault
  - binary 约 80MB
  - slim - UPX - https://github.com/hairyhenderson/gomplate/issues/326

```bash
brew install gomplate

echo 'Hello, {{ .Env.USER }}' | gomplate

gomplate -d .Env=.env -i 'Hello, {{ .Env.USER }}'
```


- `schema://userinfo@example.com:8042/over/there?name=ferret#nose`
  - schema
    - env, file, merge, stdin
    - git, git+file, git+http, git+https, git+ssh
- 支持格式 csv, json, yaml, toml, env
