---
tags:
  - DSL
---

# Shader

- Vertex Shader - 顶点着色器
- Fragment/Pixel Shader - 片段/像素着色器
  - Texture
  - PBR
- 语言
  - GLSL (OpenGL Shading Language)
    - OpenGL
    - Vulkan
    - .vert
    - .frag
  - HLSL (High-Level Shading Language)
    - by 微软 & NVIDIA
  - MSL (Metal Shading Language)
    - by Apple
    - C++14 子集
  - WGSL - WebGPU Shading Language
    - 类 Rust 语法
  - Slang
    - by NVIDIA&MS -> Vulkan Khronos Group
    - used by MaterialX
    - SLang-IR
    - 兼容 HLSL
    - Neural Shading
    - 支持处理为 -> GLSL、HLSL、MSL、WGSL、DXIL、SPIR-V
  - DXIL
  - SPIR-V
    - Bytecode
