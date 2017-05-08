# CSS




<!--

https://github.com/duojs/duo

https://github.com/componentjs/component

http://www.voxelcss.com/


https://github.com/search?o=desc&q=grid+language%3Acss&s=stars&type=Repositories&utf8=%E2%9C%93


https://github.com/peterramsing/lost
https://github.com/mojotech/jeet
https://github.com/kumailht/gridforms
https://js.coach/react
http://postcss.parts/

https://github.com/dogfalo/materialize/

https://materializecss.com
https://getmdl.io/
-->



* CSS 参考手册
  * https://tympanus.net/codrops/css_reference/
  * https://css-tricks.com/almanac/
  * [cssreference](http://cssreference.io/)
    * [HN](https://news.ycombinator.com/item?id=13031492)
    * 可视化的方式解释 CSS 属性

http://htmlreference.io/

* scss
  * long shadow http://codepen.io/danieltott/pen/AjKay

### CSS 滤镜
* https://css-tricks.com/almanac/properties/f/filter/
* http://codepen.io/akademy/pen/FlkzB
  * 使用 :before 做背景并添加滤镜

```css
/* 对滤镜使用渐变 */
.active{
  transition: 1s filter linear;
  -webkit-transition: 1s -webkit-filter linear;
  -moz-transition: 1s -moz-filter linear;
  -ms-transition: 1s -ms-filter linear;
  -o-transition: 1s -o-filter linear;
}
```

### 在 CSS 中使用 FontAwesome
* [A list of Font Awesome icons and their CSS content values](http://astronautweb.co/snippet/font-awesome/)

```css
.mytextwithicon {
    position:relative;
}    
.mytextwithicon:before {
    content: "\25AE"; /* 修改为需要的值 */
    font-family: FontAwesome;
    left:-5px;
    position:absolute;
    top:0;
 }
```

### flex

* [caniuse](http://caniuse.com/#feat=flexbox)
* [flexbugs](https://github.com/philipwalton/flexbugs) 由社区维护的 flex 在各个浏览器中的 BUG 和解决方法
* float, clear 和 vertical-align 不影响 flex 元素
* [A guide to flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
* [滚动内容](http://stackoverflow.com/a/14964944/1870054)

```css
/* 针对容器的属性 */
.container{
  display: flex;
  /* 排序方向 */
  flex-direction: row;
  /*flex-direction: row | row-reverse | column | column-reverse;*/

  /* 换行控制 */
  flex-wrap: nowrap
  /*flex-wrap: nowrap | wrap | wrap-reverse;*/

  /* flex-direction 和 flex-wrap 的缩写 */
  flex-flow: row nowrap;
  /*flex-flow: <‘flex-direction’> || <‘flex-wrap’>*/

  /* 内容间隔控制 */
  justify-content: flex-start;
  /*justify-content: flex-start | flex-end | center | space-between | space-around;*/

  /* 内容对齐控制 */
  align-items: flex-start;
  /*align-items: flex-start | flex-end | center | baseline | stretch;*/

  /* 控制内容有多行时的行间距 */
  align-content: flex-start;
  /*align-content: flex-start | flex-end | center | space-between | space-around | stretch;*/
}
/* 针对自身的属性 */
.item{
  /* 顺序控制 */
  /*order: <integer>;*/

  /* 宽度增长控制 */
  flex-grow: 0;
  /*flex-grow: <number>;*/

  /* 宽度收缩控制 */
  flex-shrink: 0;
  /*flex-shrink: <number>;*/

  /* 基础尺寸控制 */
  flex-basis: auto;
  /*flex-basis: <length> | auto;*/

  /* 参数缩写 */
  flex: 0 0 auto;
  /*flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]*/

  /* 元素对齐控制 */
  align-self: flex-start;
  /*align-self: auto | flex-start | flex-end | center | baseline | stretch;*/
}
```



### 文本溢出显示省略号
```css
.over-test {
  width: 300px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

### 比例宽高

```css
.container {
  width: 100%;
  /* 4:3 */
  padding-bottom: 75%;
}
```

aspect ratio  | padding-bottom value
--------------|----------------------
    16:9      |       56.25%
    4:3       |       75%
    3:2       |       66.66%
    8:5       |       62.5%

http://stackoverflow.com/questions/1495407
