---
title: Graphics Awesome
tags:
  - Awesome
---

# Graphics Awesome

- Graphics stack
  - window/input/context/surface - SDL、GLFW
  - graphics API / rendering abstraction - SDL3 的 SDL_GPU、bgfx
  - 2D graphics library - Skia、Cairo
  - 3D rendering engine - OGRE
  - UI framework / game engine - window、input、rendering、layout、asset

## Graphics API

- Vulkan
  - Khronos 的 explicit cross-platform graphics/compute API。
- OpenGL / OpenGL ES
  - Khronos 的跨平台 graphics API；OpenGL ES 面向 mobile/embedded。
- Direct3D
  - Microsoft DirectX 家族中的 graphics API，主要面向 Windows/Xbox。
- Metal
  - Apple 平台的 graphics/compute API。
- WebGPU
  - W3C WebGPU API，面向 Web 的现代 graphics/compute；native ecosystem 也有 Dawn、wgpu 等实现。

## SDL

- SDL - Simple DirectMedia Layer
  - C 编写的 cross-platform development library，提供 window、audio、keyboard、mouse、gamepad 和 graphics hardware 的低层访问。
  - 官方明确支持 Windows、macOS、Linux、iOS 和 Android；source/docs 还覆盖其他 platform，具体可用性和分发条件需按 target 核对。
  - SDL 官方资料只概括为用于 Valve catalog 和许多 Humble Bundle games；不要据此推导所有 Valve 游戏或任意使用 SDL 间接依赖的游戏都由 SDL 直接驱动。
- SDL2
  - 仍有广泛生态；新项目应同时评估 SDL3 migration 成本和所需 binding/library 支持。
- SDL3
  - 增加 SDL_GPU、properties、camera、storage 等 API，并重做 audio API 等 subsystem。
  - SDL_GPU 提供类似 Metal/Vulkan/Direct3D 12 风格的跨平台 modern 3D graphics 和 compute abstraction。

## Window / Input

- SDL
  - 覆盖范围最广，还提供 audio、gamepad、filesystem/platform 等 subsystem。
- GLFW
  - 聚焦 window、OpenGL/OpenGL ES context、Vulkan surface、input 和 event；不是 renderer。
- SFML
  - 提供 window、graphics、audio、network 等较高层 multimedia API。
- winit
  - Rust window creation/event handling library，不负责 rendering。

## Rendering Abstraction

- SDL_GPU
  - SDL3 内置的跨 graphics API rendering/compute abstraction。
- bgfx
  - graphics API agnostic rendering library，定位是 Bring Your Own Engine/Framework，而不是 game engine。

## 2D Graphics

- Skia
  - Google 管理的 BSD-licensed 2D graphics library，用于 Chrome/Chromium、Android 等产品。
  - Flutter 不能简单描述为全平台 `Skia -> Impeller`：iOS 只支持 Impeller；Android API 29+ 默认使用 Impeller，但低版本或不支持 Vulkan 的设备会 fallback 到 legacy OpenGL renderer；macOS 目前仍需 opt-in；Web 的 CanvasKit/skwasm 仍使用 Skia。
- Cairo
  - 2D vector graphics library，支持 image、Xlib/XCB、PDF、PostScript、SVG 等 backend。
  - 双许可证为 LGPL-2.1 或 MPL-1.1。

## 3D Rendering Engine

- OGRE
  - Object-Oriented Graphics Rendering Engine。
  - 负责 3D rendering；sound、networking、AI、collision、physics 等需要组合其他 library。

## UI Framework

- Flutter
  - Dart UI framework；renderer 因平台而异，iOS/Android 主路径为 Impeller，macOS Impeller 仍为 opt-in，Web 使用基于 Skia 的 CanvasKit/skwasm。
- Qt
  - C++ cross-platform application/UI framework，不应只归类为 renderer。
- Jetpack Compose
  - Google 的 Android declarative UI toolkit。
- Compose Multiplatform
  - JetBrains 在 Jetpack Compose 基础上扩展的 cross-platform UI toolkit，支持 Android、iOS、desktop 和 Web 等 target。

## Game Engine

- Unreal Engine
- Unity
- Godot
  - MIT-licensed cross-platform 2D/3D game engine。
- Cocos Creator
  - 基于 Cocos Engine 的 cross-platform 2D/3D game development tool/editor；“Cocos”应明确具体指 Cocos Creator/Cocos Engine，而不是模糊的产品家族。

## 参考

### Graphics API

- [Vulkan](https://www.vulkan.org/)
- [OpenGL](https://www.opengl.org/)
- [Direct3D](https://learn.microsoft.com/windows/win32/direct3d)
- [Metal](https://developer.apple.com/metal/)
- [WebGPU](https://www.w3.org/TR/webgpu/)

### Window / Input

- [libsdl-org/SDL](https://github.com/libsdl-org/SDL)
  - Zlib, C
  - Cross-platform low-level multimedia library；SDL3 同时包含 SDL_GPU rendering/compute API。
- [glfw/glfw](https://github.com/glfw/glfw)
  - Zlib, C
  - 为 OpenGL/OpenGL ES/Vulkan application 提供 window、context/surface、input 和 event API。
- [SFML/SFML](https://github.com/SFML/SFML)
  - Zlib, C++
  - Simple and Fast Multimedia Library，覆盖 window、2D graphics、audio 和 network。
- [rust-windowing/winit](https://github.com/rust-windowing/winit)
  - Apache-2.0, Rust
  - Rust window handling/event library，常与 wgpu、glutin 等 renderer/context library 组合。

### Rendering

- [google/skia](https://github.com/google/skia)
  - BSD-3-Clause, C++
  - 完整 2D graphics library，用于绘制 text、geometry 和 image。
- [Cairo](https://www.cairographics.org/)
  - 2D vector graphics library，支持 raster、window-system 和 document backend。
- [bkaradzic/bgfx](https://github.com/bkaradzic/bgfx)
  - BSD-2-Clause, C, C++
  - Cross-platform, graphics API agnostic rendering library。
- [OGRECave/ogre](https://github.com/OGRECave/ogre)
  - MIT, C++
  - 3D rendering engine，不包含完整 game engine 所需的 physics/audio/networking。

### UI Framework

- [Flutter Impeller](https://docs.flutter.dev/perf/impeller)
- [Qt](https://www.qt.io/product/framework)
- [JetBrains/compose-multiplatform](https://github.com/JetBrains/compose-multiplatform)
  - Apache-2.0, Kotlin
  - JetBrains cross-platform declarative UI framework，扩展自 Android Jetpack Compose。

### Game Engine

- [Unreal Engine](https://www.unrealengine.com/)
- [Unity](https://unity.com/)
- [godotengine/godot](https://github.com/godotengine/godot)
  - MIT, C++
  - Cross-platform 2D/3D game engine。
- [cocos/cocos-engine](https://github.com/cocos/cocos-engine)
  - MIT, C++, TypeScript
  - Cocos Creator 的 runtime engine；仓库 GitHub metadata 未提供 SPDX license，应以仓库 LICENSE 为准。
