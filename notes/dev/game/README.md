# GameDev

## Tips

## 个人见解
* 游戏开发其实和现在的网页开发区别并不大,都分为前后端,只是前后端的工作内容与网页开发会不太一样.

* 游戏开发最重要分为
  * 呈现 - 前段
  * 状态 - 后端
* 而用户的所有操作均牵扯到游戏状态的修改和逻辑判断,开开发实时性较高的游戏服务时,难度最大的也是状态的同步,

* 简单的游戏建议直接使用 HTML, 不要使用 Canvas
* 移动 Web 游戏最好都是竖屏的, 横屏不太好控制, 并且无法保证横屏


## JS 游戏引擎
* https://github.com/showcases/javascript-game-engines
* https://html5gameengine.com/
* https://github.com/photonstorm/phaser
  * Phaser is a fun, free and fast 2D game framework for making HTML5 games for desktop and mobile web browsers, supporting Canvas and WebGL rendering.
* https://github.com/pixijs/pixi.js
  * Super fast HTML 5 2D rendering engine that uses webGL with canvas fallback
  * features
    * WebGL renderer (with automatic smart batching allowing for REALLY fast performance)
    * Canvas renderer (Fastest in town!)
    * Full scene graph
    * Super easy to use API (similar to the flash display list API)
    * Support for texture atlases
    * Asset loader / sprite sheet loader
    * Auto-detect which renderer should be used
    * Full Mouse and Multi-touch Interaction
    * Text
    * BitmapFont text
    * Multiline Text
    * Render Texture
    * Primitive Drawing
    * Masking
    * Filters
    * User Plugins
* https://github.com/excaliburjs/Excalibur
  * A simple HTML5 Canvas game engine written in TypeScrip
* http://voxeljs.com/



## 状态同步
http://www.gamedevpensieve.com/network/synchronization


## 帧同步
http://blog.csdn.net/langresser_king/article/details/46756393

https://gocn.io/question/113

https://www.zhihu.com/question/36258781



https://github.com/skywind3000/kcp
https://github.com/xtaci/kcptun

## Web Game
requestAnimationFrame

* Key code
  * https://css-tricks.com/snippets/javascript/javascript-keycodes/
  * http://keycode.info/


## 游戏资源
http://gamedev.stackexchange.com/questions/20/where-can-i-find-free-sprites-and-images

搜索关键字 2d game art

* Game art
  * [Open Game art](http://opengameart.org/)
  * [2D Game art for Programmers](http://www.2dgameartguru.com/)
  * [Kenney](https://kenney.itch.io/)
  * [pixeljoint](http://pixeljoint.com/)
  * 绘图工具
    * [piskel](http://www.piskelapp.com/) [HN](https://news.ycombinator.com/item?id=13539085)
    * [eight-bits](http://www.eight-bits.com/)
      * 8 位色编辑器
    * [aseprite](https://www.aseprite.org/)
      * 收费工具



## 属于
* tileset
  * 多个精灵图在一个图上
* texture atlas
  * 定义了一个精灵图中各个图片的位置和尺寸
  * 可以通过工具将多个图片合并成一个图片并生成 texture atlas 信息
  * 工具
    * https://www.codeandweb.com/texturepacker
    * http://renderhjs.net/shoebox/
    * https://github.com/krzysztof-o/spritesheet.js/
* 位图字体
  * 工具
    * Mac https://www.bmglyph.com/
    * Windows http://www.angelcode.com/products/bmfont/

http://mathworld.wolfram.com/DihedralGroupD4.html
