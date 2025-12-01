---
title: stable-diffusion.cpp
---

# stable-diffusion.cpp

- [leejet/stable-diffusion.cpp](https://github.com/leejet/stable-diffusion.cpp)
  - MIT
  - Stable Diffusion in C++
- 参考
  - https://github.com/daniandtheweb/sd.cpp-webui
  - pure go binding https://github.com/seasonjs/stable-diffusion
- 只能命令行单次生成

```bash
# 没有 GPU
curl -LO https://github.com/leejet/stable-diffusion.cpp/releases/download/master-377-2034588/sd-master-2034588-bin-Linux-Ubuntu-24.04-x86_64.zip
unzip sd-master-2034588-bin-Linux-Ubuntu-24.04-x86_64.zip
./sd -h


git clone https://github.com/leejet/stable-diffusion.cpp.git
cd stable-diffusion.cpp
mkdir build
cd build
PATH=/usr/local/cuda/bin:$PATH cmake .. -DSD_CUDA=ON
make -j$(nproc)

./sd -m models/checkpoints/sd1.5/realisianV60Fp16.fq7X.safetensors -p "a lovely cat" -o output/sd_test_cat_gpu.png -v

# 变相通过文件读取 flag 参数
xargs -a params.txt ./bin/sd
```
