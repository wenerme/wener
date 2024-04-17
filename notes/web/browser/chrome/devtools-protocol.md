---
title: DevTool Protocol
---

# DevTool Protocol

- https://chromedevtools.github.io/devtools-protocol/
- `--remote-debugging-port=9222`

```bash
chrome --headless --remote-debugging-port=9222 --disable-infobars --disable-dev-shm-usage --no-sandbox --user-data-dir=$PWD/chrome --profile-directory=Default --remote-allow-origins='*'

curl http://localhost:9222/json
curl http://localhost:9222/session
```

```json
[
  {
    "description": "",
    "devtoolsFrontendUrl": "/devtools/inspector.html?ws=127.0.0.1:53430/devtools/page/<ID>",
    "id": "<ID>",
    "title": "New Tab",
    "type": "page",
    "url": "chrome://newtab/",
    "webSocketDebuggerUrl": "ws://127.0.0.1:53430/devtools/page/<ID>"
  }
]
```
