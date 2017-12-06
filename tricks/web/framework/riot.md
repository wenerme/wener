# riotjs

## Tips

## 直接通过浏览器使用

```js
var tags = `
<pusher>
  <h3>{ message }</h3>
  <ul>
    <li each={ techs }>{ name }</li>
  </ul>

  <script>
    this.message = 'Hello, Riot!'
    this.techs = [
      { name: 'HTML' },
      { name: 'JavaScript' },
      { name: 'CSS' }
    ]
  </script>

  <style scoped>
    :scope { font-size: 2rem }
    h3 { color: #444 }
    ul { color: #999 }
  </style>
</pusher>
`

if(!window.jQuery){
  document.head.appendChild(Object.assign(document.createElement('script'),{src:'https://code.jquery.com/jquery-2.2.3.js',onload: setup}));
}else {
  setup()
}

function setup(){
  $.getScript('https://cdn.jsdelivr.net/riot/2.3/riot+compiler.min.js')
  .done(()=>$('pusher, script[type="riot/tag"]').remove())
  .done(()=>$('body').append($('<script type="riot/tag"></script>').text(tags)).append($(`<pusher></pusher>`)))
  .done(()=>riot.mount('pusher'))
}
```
