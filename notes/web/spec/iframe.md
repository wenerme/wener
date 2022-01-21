---
title: iframe
---

# iframe

- Inline Frame
- https://html.spec.whatwg.org/multipage/iframe-embed-object.html
- https://w3c.github.io/webappsec-cspee/
- mdn [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe)
- mdn [other embedding technologies](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Other_embedding_technologies)
- parent 消息
  - 发送消息 - iframe.contentWindow.postMessage
  - 接收消息 - window.addEventListener('message',e=>console.log(e.data))
  - iframe.contentDocument
- iframe 消息
  - 发送消息 - window.parent.postMessage
  - 接收消息 - window.addEventListener('message',e=>console.log(e.data))
  - window.onmessage
  - window.top.postMessage
