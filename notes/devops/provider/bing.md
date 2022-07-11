---
title: bing
---

# Bing

# FAQ

## 显示隐藏结果

```js
// 原因
$$('.b_algo').map((v) => v.style.display);
// 显示
if($$('.b_algo').map((v) => v.style.display).find(v=>v === 'none')){
  r = $('#b_results').cloneNode(true);
  Array.from(r.querySelectorAll('.b_algo')).map((v) => v.style.display = 'block');
  $('#b_results').remove()
  $('#b_content').append(r);
}
```
