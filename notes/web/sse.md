---
title: Server-Sent Events
---

# Server-Sent Events

- https://developer.mozilla.org/en-US/docs/Web/API/EventSource
  - 非 HTTP/2 时，一个 domain 最多开 **6** 个 SSE 链接（同时影响正常请求），HTTP/2 时默认 100
- https://web.dev/eventsource-basics/
- https://news.ycombinator.com/item?id=35953171
  - 包含了一些场景和问题

**\n\n 分隔 **

```
data: message\n\n
```

**可以多行**

```
data: first line\n
data: second line\n\n
```

**支持额外字段**

```
id: 12345\n
data: GOOG\n
data: 556\n\n
```

---

- id
  - Last-Event-ID
  - e.lastEventId
- data
- retry: 3000
  - 3s
- event
  - 事件名字

```js
var source = new EventSource('/events');
source.onmessage = function (e) {
  console.log(e.data);
};
```

- https://github.com/rexxars/eventsource-parser
