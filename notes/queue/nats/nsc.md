---
title: nsc
---

# nsc

- [nats-io/nsc](https://github.com/nats-io/nsc)
  - tool for creating nkey/jwt based configurations
- 参考
  - [nsc](https://nats-io.github.io/nsc) manual

| env        | default  |
| ---------- | -------- |
| NKEYS_PATH | ~/.nkeys |
| NSC_HOME   | ~/.nsc   |

- ~/.nkeys - 私钥、credential
  - `creds/{operator}/{account}/{user}.creds`
  - `keys/{O|A|U}/{..}/{....}.nk`
    - S - seed
    - O - operator
    - A - account
    - U - user
- $NSC_HOME/nats

```bash
# Docker
docker run --rm -it -v $PWD/nsc:/nsc natsio/nats-box:latest
# 可直接下载 https://github.com/nats-io/nsc/releases

# Download
curl -LO https://echo.wener.cc/https://github.com/nats-io/nsc/releases/download/v2.7.6/nsc-darwin-amd64.zip
unzip nsc-darwin-amd64.zip

# 环境配置
nsc env

nsc add operator O
nsc edit operator --service-url nats://localhost:4222
nsc add account A
# ~/.nkeys/creds/O/A/U.creds
nsc add user U

nsc list keys
# 私钥
nsc list keys --show-seeds

nsc describe operator
nsc describe account

nats-account-server -nsc ~/.nsc/nats/O

# 使用证书监听
nats-sub -creds ~/.nkeys/creds/O/A/U.creds ">"
# 使用证书发布
nats-pub -creds ~/.nkeys/creds/O/A/U.creds hello NATS

nsc sub --user U ">"
nsc pub --user U hello NATS

# 限定 s 可以 sub, c 可以 pub
nsc add user s --allow-pub "_INBOX.>" --allow-sub q
nsc describe user s
nsc add user c --allow-pub q --allow-sub "_INBOX.>"
nsc describe user c
```

```
~/.nsc/nats
└── O
    ├── O.jwt
    └── accounts
        └── A
            ├── A.jwt
            └── users
                └── U.jwt
```

nkeys 包含私钥信息

```
~/.nkeys
├── creds
│   └── O
│       └── A
│           └── U.creds
└── keys
    ├── A
    │   └── DE
    │       └── ADETPT36WBIBUKM3IBCVM4A5YUSDXFEJPW4M6GGVBYCBW7RRNFTV5NGE.nk
    ├── O
    │   └── AF
    │       └── OAFEEYZSYYVI4FXLRXJTMM32PQEI3RGOWZJT7Y3YFM4HB7ACPE4RTJPG.nk
    └── U
        └── DB
            └── UDBD5FNQPSLIO6CDMIS5D4EBNFKYWVDNULQTFTUZJXWFNYLGFF52VZN7.nk
```
