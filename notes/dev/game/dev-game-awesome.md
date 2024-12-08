---
title: GameDev Awesome
tags:
  - Awesome
---

# GameDev Awesome

## Engine

- 选择依据
  - 支持的平台
    - 如果是要支持国内 小游戏/小程序平台，几乎没有什么选择 - Cocos Creator, LayaBox
  - 支持的语言
  - 2D/3D
  - 使用的场景
    - 小程序
    - 小游戏
    - 营销
    - 特效
    - 建模
    - CAD
    - ~~大型游戏~~ - Unity, Unreal, Godot, etc.
- 核心引擎主要特性
  - 性能
  - 跨平台
  - 渲染
  - EventLoop
- 完善生态
  - 可视化编辑器
  - IDE
  - 资源管理/资源编辑器
  - 动画编辑器
  - Asset Store - 资源商店
- 小游戏平台
  - HTML5
  - iOS
  - Android
  - 支付宝小游戏
  - 微信小游戏
  - 百度小游戏
  - 小米快游戏
  - OPPO 小游戏
  - vivo 小游戏
  - QQ 小游戏
  - 360 小游戏
  - 字节跳动小游戏
  - 华为快游戏
  - 淘宝创意互动
  - 淘宝小部件
  - Facebook Instant Game

---

- js/ts/web/小程序/小游戏
  - Phaser
  - Construct
  - createjs
  - [ct-js/ct-js](https://github.com/ct-js/ct-js)
    - MIT, TS, JS
    - visual editors
    - pixijs
  - [KilledByAPixel/LittleJS](https://github.com/KilledByAPixel/LittleJS)
    - MIT, JS
  - Babylon.js: https://github.com/BabylonJS/Babylon.js
  - Pixi.js: https://github.com/pixijs
  - Matter.js: https://github.com/liabru/matter-js
  - Cannon.js: https://github.com/schteppe/cannon.js
  - Brython (Python engine in JavaScript): https://github.com/brython-dev/brython
  - Fengari (Lua engine in JavaScript): https://github.com/fengari-lua
- 国内
  - Cocos Creator
  - Cocos2Dx
  - [layabox/LayaAir](https://github.com/layabox/LayaAir)
    - MIT, TS, JS
    - LayaBox
    - 2D, 3D
  - ~~[egret](./engine/egret.md)~~
    - BSD-3, JS, TS
    - 类似 Flash API
    - 2D
- 2D
  - Love2D
- GameEngine/Core/Render Engine
  - pixijs
  - threejs
  - [o3de/o3de](https://github.com/o3de/o3de)
    - Apache-2.0, C++
- 游戏引擎/GameEngine/SeriousGame
  - [godotengine/godot](https://github.com/godotengine/godot)
    - MIT, C++
- rust
  - [arewegameyet](https://arewegameyet.rs/)
    - Rust GameDev 组件
  - [bevyengine/bevy](https://github.com/bevyengine/bevy)
    - data-driven
  - [amethyst/amethyst](https://github.com/amethyst/amethyst)
    - data-driven
- [morgan3d/quadplay](https://github.com/morgan3d/quadplay)
- https://www.o3de.org/
- [OpenFL](./engine/openfl.md)
  - MIT, Haxe
  - 类似 Flash API
- [pmgl/microstudio](https://github.com/pmgl/microstudio)
  - MIT, JS
  - open source game engine online
  - platform to learn and practise programming
- [ensisoft/gamestudio](https://github.com/ensisoft/gamestudio)
  - Qt Editor
  - Windows, Linux, WASM
- [AmbientRun/Ambient](https://github.com/AmbientRun/Ambient)
  - Apache-2.0, MIT, Rust
  - multiplayer game engine

---

- [ellisonleao/magictools](https://github.com/ellisonleao/magictools)
  - A list of Game Development resources to make magic happen
- [ThusSpokeNomad/GameNetworkingResources](https://github.com/ThusSpokeNomad/GameNetworkingResources)
- [List of game engines](https://en.wikipedia.org/wiki/List_of_game_engines)
- https://github.com/topics/2d-game-engine

## Maze

- https://www.mazegenerator.net/
  - Shape - 正方形、圆形、三角、六边形
  - Style - orthogonal, sigma, delta
  - Cell
    - 宽、高
    - Inner width, inner height
  - 起点位置
  - E - elitism tendency - 精英主义倾向
  - R - river tendency - 河流倾向
- [keesiemeijer/maze-generator](https://github.com/keesiemeijer/maze-generator)
  - https://keesiemeijer.github.io/maze-generator/
- https://github.com/N7K5/Amazing-Maze


## Studio

- https://www.fairygui.com/
  - 广州花谷软件
  - 游戏 UI 解决方案
- [RPG-Paper-Maker/RPG-Paper-Maker](https://github.com/RPG-Paper-Maker/RPG-Paper-Maker)

## Server

- 主要功能
  - Room, Match making, Lobby
  - State Sync
  - Presence
  - Transport
    - UDP, TCP, WebSocke, WebTransport
  - Auth
  - Realtime
- MMO Framework
- multiplayer

---

- [colyseus/colyseus](https://github.com/colyseus/colyseus)
  - MIT, TS
  - Multiplayer Framework for Node.js
- [heroiclabs/nakama](https://github.com/heroiclabs/nakama)
  - Apache-2.0, Go
  - Distributed server for social and realtime games and apps.
- [boardgameio/boardgame.io](https://github.com/boardgameio/boardgame.io)
  - TS
- [TrinityCore/TrinityCore](https://github.com/TrinityCore/TrinityCore)
  - GPLv2, C++
  - MMORPG Framework
- [googleforgames/agones](https://github.com/googleforgames/agones)
  - Apache-2.0, Go, C++
  - Dedicated Game Server Hosting and Scaling for Multiplayer Games on Kubernetes
- [googleforgames/open-match](https://github.com/googleforgames/open-match)
  - Apache-2.0, Gp

---

- Photon Engine
- AWS GameLift
- Azure PlayFab
- Unity Multiplayer Services
- Hathora
- https://www.smartfoxserver.com/

## Learn

- [Alairion/captal-engine](https://github.com/Alairion/captal-engine)

## Tools

- [LDtk](https://deepnight.itch.io/ldtk)
  - level editor

## Service

- [googleforgames](https://github.com/googleforgames)
  - [googleforgames/agones](https://github.com/googleforgames/agones)
    - dedicated game server
  - [googleforgames/open-match](https://github.com/googleforgames/open-match)
    - 游戏匹配
  - [googleforgames/open-saves](https://github.com/googleforgames/open-saves)
    - 游戏保存

## Retro

- [Game Boy Studio](https://www.gbstudio.dev/)
  - [chrismaltby/gb-studio](https://github.com/chrismaltby/gb-studio)
  - [HN](https://news.ycombinator.com/item?id=26979879)
- [VGA ROM Fonts](http://www.alexandrugroza.ro/microelectronics/essays-research/vga-rom-fonts/index.html)

## Emu

- Nintendo Switch
  - [suyu-emu/suyu](https://github.com/suyu-emu/suyu)
    - GPLv3, C++
    - https://git.suyu.dev/suyu
  - [Ryujinx](https://github.com/Ryujinx/Ryujinx)
    - MIT, C#
  - ~~yuzu~~

## Resources

- http://Kenney.nl
- http://OpenGameArt.org
- http://Untamed.wild-refuge.net
- http://Crateboy.itch.io
- http://Opengamegraphics.com
- http://Gameart2d.com
- http://Wigdetworx.com
- http://GlitchtheGame.com
- http://Dumbanex.com
- http://Reinerstilesets.de
- http://Sharecg.com
- http://Roenica.com
- http://Blogoscoped.com
- http://Lostgarden.com
- http://Subtlepatterns.com
- http://Openclipart.org
- https://gist.github.com/EndangeredMassa/6b177f36b08a5b0798cf

## 3D

- https://www.turbosquid.com/
