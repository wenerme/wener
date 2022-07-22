## 统计 Github 代码行数

```js
'use strict';

//replace jquery/jquery with the repo you're interested in
fetch('https://api.github.com/repos/jquery/jquery/stats/contributors')
  .then((response) => response.json())
  .then((contributors) =>
    contributors.map((contributor) => contributor.weeks.reduce((lineCount, week) => lineCount + week.a - week.d, 0)),
  )
  .then((lineCounts) => lineCounts.reduce((lineTotal, lineCount) => lineTotal + lineCount))
  .then((lines) => window.alert(lines));
```

## JS 载入脚本

```js
// jQuery
$.getScript('script.js');

// vanilla
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'script.js';
document.head.appendChild(script);

// 简化版
document.head.appendChild(
  Object.assign(document.createElement('script'), {
    src: 'https://rawgit.com/js-cookie/js-cookie/master/src/js.cookie.js',
  }),
);

// 可添加完成监听
document.head.appendChild(
  Object.assign(document.createElement('script'), {
    src: 'https://code.jquery.com/jquery-2.2.3.js',
    onload: () => console.log('Load Complete'),
  }),
);
```

## 常用脚本

- https://rawgit.com/js-cookie/js-cookie/master/src/js.cookie.js
- https://code.jquery.com/jquery-1.12.3.js
- https://code.jquery.com/jquery-2.2.3.js
- https://raw.githubusercontent.com/lodash/lodash/4.12.0/dist/lodash.js
- https://cdn.socket.io/socket.io-1.4.5.js

## Unicode 符号

- [箭头符号](<https://en.wikipedia.org/wiki/Arrow_(symbol)>)

## Emmet

http://docs.emmet.io/cheat-sheet/

## 修改日期显示格式

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.3/moment.min.js"></script>
<input type="date" data-date="" data-date-format="DD MM YYYY" value="2015-08-09" />
<script>
  $('input')
    .on('change', function () {
      this.setAttribute('data-date', moment(this.value, 'YYYY-MM-DD').format(this.getAttribute('data-date-format')));
    })
    .trigger('change');
</script>
```

## ES6

- [Exploring ES6: Upgrade to the next version of JavaScript](http://exploringjs.com/)

```js
// 使参数必选
function mandatory() {
    throw new Error('Missing parameter');
}
function foo(mustBeProvided = mandatory()) {
    return mustBeProvided;
}
// 简单的模板
const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
     <tr><td>${addr.first}</td></tr>
     <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`;
// 类混合
const Storage = Sup => class extends Sup {
    save(database) { ··· }
};
const Validation = Sup => class extends Sup {
    validate(schema) { ··· }
};
class Person { ··· }
class Employee extends Storage(Validation(Person)) { ··· }
```
