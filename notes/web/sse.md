---
title: Server-Sent Events
---

# Server-Sent Events

- https://web.dev/eventsource-basics/

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
  console.log(e.data)
};
```

- https://github.com/rexxars/eventsource-parser
