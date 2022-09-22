---
title: krakend
---

# krakend

- [krakendio/krakend-ce](https://github.com/krakendio/krakend-ce)
  - Apache-2.0, Go
- 参考
  - https://www.krakend.io/docs/benchmarks/

```bash
# https://github.com/krakendio/krakend-playground
docker run --rm -it \
  -p 8080:8080 \
  -v $PWD:/etc/krakend/ \
  devopsfaith/krakend run --config /etc/krakend/krakend.json

# macOS
brew install krakend
```

# FAQ

## Lura vs KrakenD

- Lura is the KrakenD’s engine - 之前叫 KrakenD framework
- lura is toolkit/set of libraries to build API gateways
- KrakenD CE - 开源 API Gateway
- KrakenD Enterprise

---

- https://www.krakend.io/docs/overview/lura-vs-krakend/
