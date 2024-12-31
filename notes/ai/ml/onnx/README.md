---
title: ONNX
---

# ONNX

:::tip

核心价值是 ONNX Runtime for Inferencing

- 支持语言 Python, C++, C#, Java, JavaScript, Objective-C, Swift
- 支持环境 Web, WASM, Mobile, React Native, Node.js, Electron
- Web: WASM, WebGPU (Chrome 121+), ~~WebGL~~, WebNN (实验阶段 `--enable-features=WebMachineLearningNeuralNetwork`)
- 支持模型: PyTorch, Tensorflow/Keras, TFLite, scikit-learn, Paddle

:::

- ONNX - Open Neural Network Exchange - 开放神经网络交换
  - 开放的格式
  - 用于表示深度学习模型
  - 由微软和 Facebook 共同开发，旨在促进不同深度学习框架之间的互操作性。
- 特性
  - 互操作
  - 标准化
  - 优化&加速
  - 社区
- 场景
  - 模型转换
  - 模型部署 - ONNX Runtime
  - 模型优化
  - 跨平台开发
- [onnx/onnx](https://github.com/onnx/onnx)
- 数据结构使用 PB 定义  - https://github.com/search?q=repo%3Aonnx%2Fonnx+path%3A*.proto3&type=code
- [onnx.ai](https://onnx.ai/)
  - https://onnx.ai/models/
    - [onnx/models](https://github.com/onnx/models)
- [github.com/onnx](https://github.com/onnx)

| abbr. | stand for                    | meaning          |
| ----- | ---------------------------- | ---------------- |
| ORT   | ONNX Runtime                 | ONNX 运行时      |
| ONNX  | Open Neural Network Exchange | 开放神经网络交换 |
IR | Intermediate Representation | 中间表示 |

## Model

- 支持 protobuf v2, v3.
- components
  - A definition of an extensible computation graph model.
  - Definitions of standard data types.
  - Definitions of built-in operators.
- ONNX  Intermediate Representation - IR
  - https://github.com/onnx/onnx/blob/main/docs/IR.md
