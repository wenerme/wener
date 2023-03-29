---
title: ijhttp
---

# ijhttp

```bash
curl -fLo ijhttp.zip https://jb.gg/ijhttp/latest
unzip ijhttp.zip
cd ijhttp
# Java 17+
./ijhttp

ijhttp run.http --env-file my.env.json --env dev -V SERVER_HOST=http://staging-server:8080 -P PRIVATE_PATH=super-secure-parameter -L VERBOSE

docker run --rm -i -t -v $PWD:/workdir \
  --name ijhttp jetbrains/intellij-http-client -e dev -v env.json -p private.env.json -D run.http
```

| flag                               | for                               |
| ---------------------------------- | --------------------------------- |
| --connect-timeout=3000             |
| -t,--socket-time=10000             |
| -D,--docker-mode                   | localhost -> host.docker.internal |
| -e,--environment=ENV_NAME          |
| --insecure                         |
| -L,--log-level                     | BASIC, HEADERS, VERBOSE
| -p,--private-env-file=FILE         |
| -P,--private-env-variables=KEY=VAL |
| -r,--report                        |
| -v,--env-file=FILE                 |
| -V,--env-variables=KEY=VAL         |

- report 只能在 TeamCity 里面查看
