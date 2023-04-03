# ChatGPT Awesome

- https://github.com/topics/chatgpt
- ChatGPT for Google https://chrome.google.com/webstore/detail/chatgpt-for-google/jgjaeacdkonaoafenlfkkkmbaopkbilf
- https://sharegpt.com/
- 注册激活
  - https://sms-activate.org/
    - https://sms-activate.org/en/info/ChatGPT
  - onlinesim.io
- VPN
  - nordvpn
  - expressvpn
- 统计
  - statsigapi.net

## WebUI

- [Niek/chatgpt-web](https://github.com/Niek/chatgpt-web)
- [Yidadaa/ChatGPT-Next-Web](https://github.com/Yidadaa/ChatGPT-Next-Web)

```bash
# CODE 访问密码，逗号分隔
# BASE_URL=api.openai.com
# PROTOCOL=https
docker run --rm -it \
  -e OPENAI_API_KEY="" -e CODE="" \
  -p 3000:3000 \
  --name chatgpt-next-web yidadaa/chatgpt-next-web
```

## Proxy

- [easychen/openai-api-proxy](https://github.com/easychen/openai-api-proxy)
  - MIT, JS, Express

```bash
# PORT
# PROXY_KEY - 限制访问密码 - <TOKEN>:<PROXY_KEY>
# TIMEOUT=30s
docker run --rm -it \
  -p 9000:9000 \
  --name openai-api-proxy easychen/ai.level06.com:latest
```
