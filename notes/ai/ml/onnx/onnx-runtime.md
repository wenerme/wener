---
tags:
  - Runtime
---

# ONNX Runtime

- [microsoft/onnxruntime](https://github.com/microsoft/onnxruntime)
  - MIT, C++
  - C++, C, Python, C#, Java, JS, Node, React Native, Objective-C, Swift
  - pip:onnxruntime pip:onnxruntime-gpu
  - npm:onnxruntime-web npm:onnxruntime-node, npm:onnxruntime-react-native
- 参考
  - Julia [jw3126/ONNXRunTime.jl](https://github.com/jw3126/ONNXRunTime.jl)
  - Ruby [ankane/onnxruntime](https://github.com/ankane/onnxruntime)
  - Golang
    - [oramasearch/onnx-go](https://github.com/oramasearch/onnx-go)
    - [AdvancedClimateSystems/gonnx](https://github.com/AdvancedClimateSystems/gonnx)
  - https://onnxruntime.ai/
  - https://github.com/Aimol-l/OrtInference
    - yolov10,yolov10+SAM ,yolov10+bytetrack , SAM2, paddleOCR
- Inferencing
  - [Generative AI](https://github.com/microsoft/onnxruntime-genai) 实验阶段

```js
import * as ort from 'onnxruntime-web';
// Load the model and create InferenceSession
const modelPath = 'path/to/your/onnx/model';
const session = await ort.InferenceSession.create(modelPath);
// Load and preprocess the input image to inputTensor
// ...
// Run inference
const outputs = await session.run({ input: inputTensor });
console.log(outputs);
```
