---
title: Messaging
---

# Messaging

- MessagePort extends EventTarget
  - postMessage
  - start - 开始发送消息 - 设置 onmessage 隐含 start
  - close
  - 事件
    - message
    - messageerror
- MessageChannel - port1 <-> port2
- BroadcastChannel - origin 纬度 - 多窗口信息传递
  - close - 停止接受
- 参考
  - [Channel Messaging API](https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API)
  - [web-messaging](https://html.spec.whatwg.org/multipage/web-messaging.html)

# Demo

## MessagePort

> MessagePort 只有 message 会互相传递

```ts
const ch = new MessageChannel();

// 非 message 只是监听当前 target 的自定义事件
ch.port1.addEventListener('Ready', (e) => {
  console.debug(`port 1`, e.type, e.detail);
});
ch.port1.addEventListener('message', (e) => {
  console.debug(`port 1`, e.type, e.data);
});

ch.port2.addEventListener('Ready', (e) => {
  console.debug(`port 2`, e.type, e.detail);
});
ch.port2.addEventListener('message', (e) => {
  console.debug(`port 2`, e.type, e.data);
});

// 会直接触发
ch.port1.dispatchEvent(new CustomEvent('Ready', { detail: 'to port2' }));
ch.port2.dispatchEvent(new CustomEvent('Ready', { detail: 'to port1' }));

// 不会触发 - 没有 start
ch.port1.postMessage({ type: 'MessageReady', detail: 'to port2' });
ch.port2.postMessage({ type: 'MessageReady', detail: 'to port1' });

console.debug(`setup`);

// 使用 addEventListener 需要手动 start
ch.port1.start();
ch.port2.start();
```

## BroadcastChannel

- 只要名字相同，在不同 Tab 都可以接收到

```ts
const a = new BroadcastChannel('Auth');
const b = new BroadcastChannel('Auth');
const c = new BroadcastChannel('Auth');

a.addEventListener('message', (e) => console.log(`a got`, e.data));
b.addEventListener('message', (e) => console.log(`b got`, e.data));
c.addEventListener('message', (e) => console.log(`c got`, e.data));

a.postMessage({ by: 'a' });
b.postMessage({ by: 'b' });
c.postMessage({ by: 'c' });
```

# FAQ

## Port at index 0 is already neutered

- 不能重复进行 transfer
- https://stackoverflow.com/a/38283644/1870054
