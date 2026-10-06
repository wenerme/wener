---
title: darktable
tags:
  - Software
  - Photography
  - RAW
---

# darktable

- [darktable](https://www.darktable.org/)
- [darktable-org/darktable](https://github.com/darktable-org/darktable)
  - GPL-3.0-or-later, C, OpenCL
  - 开源专业虚拟灯光台与暗房摄影工作流套件（RAW 开发、色彩调校与非破坏性照片管理）
- 官方文档：https://docs.darktable.org/usermanual/
- 源码仓库：https://github.com/darktable-org/darktable

```bash
# macOS
brew install --cask darktable

# Linux (Flatpak)
flatpak install flathub org.darktable.darktable

# Arch Linux
pacman -S darktable

# Ubuntu / Debian
apt install darktable
```

## 核心架构与设计理念

- **非破坏性编辑（Non-destructive Pipeline）**：RAW 原始文件始终保持只读不变。所有显影历史、模块参数和蒙版均保存在 SQLite 资料库以及每个照片同目录的 `.xmp` 伴侣文件（Sidecar）中。
- **基于场景的色彩工作流（Scene-referred Workflow）**：现代 darktable 核心采用线性的场景参考空间（Scene-referred），配合 **Filmic RGB / AgX**、**Color Balance RGB**（色彩平衡 RGB）和 **Color Calibration**（色彩校准），提供更宽的动态范围保护、更自然的高光滚降与色彩过渡。
- **固定像素管道（Pixelpipe）**：模块在底层管道中的执行顺序由严格的物理与数学色彩学逻辑固定，不受用户调整模块的先后顺序影响，避免调色顺序混乱引发色彩失真。支持单模块多实例（Multiple Instances）。
- **参数化与绘制蒙版（Masking）**：几乎所有处理模块均支持组合使用矢量绘制蒙版（画笔、圆形、路径、渐变）和参数化蒙版（按明度、色相、饱和度阈值选取）。
- **硬件加速（OpenCL）**：全面支持 GPU OpenCL 加速，可大幅缩短 RAW 去马赛克、去噪点和导出的运算耗时。

## 常用快捷键

在任意界面按下 `H` 键可随时呼出当前视图专属的交互快捷键字典。

### 全局与视图切换

| 快捷键   | 功能                       | 说明                              |
| -------- | -------------------------- | --------------------------------- |
| `L`      | 切换至灯光台（Lighttable） | 照片目录浏览与选片管理            |
| `D`      | 切换至暗房（Darkroom）     | 进入当前选定照片的 RAW 显影与精修 |
| `M`      | 地图视图（Map）            | 按 GPS 地理标记浏览               |
| `T`      | 联机拍摄视图（Tethering）  | 相机 USB 联机实时取景与回传       |
| `P`      | 打印视图（Print）          | 软打样与排版打印                  |
| `S`      | 幻灯片播放（Slideshow）    | 全屏放映展示                      |
| `Tab`    | 显示/隐藏所有侧边栏        | 最大化主工作区视界                |
| `H`      | 快捷键帮助                 | 弹出当前视图支持的全部快捷键      |
| `F11`    | 切换全屏模式               | 沉浸式工作模式                    |
| `Ctrl+,` | 首选项设置                 | 全局偏好与 OpenCL 配置            |
| `Ctrl+Q` | 退出软件                   | 退出 darktable                    |

### 灯光台（Lighttable）— 选片与管理

| 快捷键                          | 功能                          | 说明                                    |
| ------------------------------- | ----------------------------- | --------------------------------------- |
| `0` ~ `5`                       | 设置星级评定                  | 单键快捷设置 0 到 5 星，选片核心操作    |
| `R`                             | 标记为拒绝（Reject）          | 剔除废片，后续可一键隐藏或删除          |
| `F1` ~ `F5`                     | 切换颜色标签                  | 红、黄、绿、蓝、紫颜色标记              |
| `W`                             | 瞬时全屏大图预览              | **长按**展示原图，松开自动返回缩略图    |
| `Ctrl+W`                        | 带对焦峰值的全屏预览          | 显示绿色的对焦清晰区域（Focus Peaking） |
| `Space`                         | 勾选/取消勾选当前照片         | 多选操作                                |
| `Ctrl+A` / `Ctrl+Shift+A`       | 全选 / 取消全选               | 批量操作选区                            |
| `Ctrl+D`                        | 创建图像副本                  | 创建虚拟副本，尝试不同调色版本          |
| `Ctrl+C` / `Ctrl+V`             | 复制 / 粘贴全部历史处理栈     | 将某张照片的全部调色步骤应用到选中照片  |
| `Ctrl+Shift+C` / `Ctrl+Shift+V` | 选择性复制 / 粘贴历史处理模块 | 仅应用特定模块配置（如去噪或白平衡）    |
| `Ctrl+E`                        | 导出选定照片                  | 按导出模块预设批量输出                  |
| `Del`                           | 从资料库中移除照片            | 仅移出库，不删除磁盘原文件              |
| `Shift+Del`                     | 彻底从磁盘删除                | 物理删除原文件及 `.xmp` 伴侣文件        |

### 暗房（Darkroom）— 显影与精修

| 快捷键         | 功能                        | 说明                                      |
| -------------- | --------------------------- | ----------------------------------------- |
| `Space`        | 下一张照片                  | 保持在暗房视图并加载下一张                |
| `Backspace`    | 上一张照片                  | 保持在暗房视图并加载上一张                |
| `Alt+1`        | 缩放至 100% 原始尺寸        | 1:1 检查焦点锐度与噪点                    |
| `Alt+2`        | 缩放至填满视窗（Fill）      | 铺满编辑区域                              |
| `Alt+3`        | 缩放至适应视窗（Fit）       | 完整展示全貌                              |
| `中键点击`     | 循环切换缩放倍率            | 在“适应窗口 / 100% / 200%”间循环          |
| `Ctrl+滚轮`    | 缩放画布                    | 自由连续缩放                              |
| `E`            | 激活曝光模块（Exposure）    | 快速进入全局曝光调整                      |
| `C`            | 激活裁剪模块（Crop）        | 调整画幅构图与旋转校正                    |
| `G`            | 切换构图辅助线（Guides）    | 黄金分割/三分线/对角线辅助构图            |
| `O`            | 切换过曝/欠曝警告           | 标记过曝（红）与死黑（蓝）区域            |
| `Shift+O`      | 切换 RAW 原始感光器过曝警告 | 查看未解马赛克前 RAW 数据是否发生高光溢出 |
| `Ctrl+B`       | 色调评估模式                | 切换至中性灰背景以消除视觉环境干扰        |
| `Ctrl+S`       | 切换软打样（Softproof）     | 模拟打印机或目标色彩空间表现              |
| `Ctrl+Shift+H` | 切换直方图显示              | 观察亮度与 RGB 通道分布                   |

## 实践要点

### 1. 现代 Scene-referred 推荐调色工作流

1. **白平衡与去噪**：
   - 依赖 `color calibration`（色彩校准）模块设置白平衡（CAT16 适应变换算法）；
   - 使用 `denoise (profiled)`（相机预设去噪）模块降低高感噪点。
2. **曝光基准**：
   - 使用 `exposure` 模块调整中灰（18% 中性灰）亮度，先不要担心高光溢出。
3. **动态范围映射（Tone Mapping）**：
   - 使用 `filmic rgb` 或 `AgX` 模块收拢超宽动态范围，设置白色与黑色相对曝光值，实现平滑的高光衰减。
4. **色彩与对比**：
   - 在 `color balance rgb` 模块中调节色彩对比度、高光/阴影色调偏向和饱和度。

### 2. 与 digiKam 协同配置

- 两者可形成互补：**digiKam 专注数字资产管理（DAM）与人脸检索**，**darktable 专注 RAW 显影与高画质输出**。
- 协同规范：
  - 在 darktable 首选项中勾选“写入 sidecar 文件”；
  - 避免两个软件同时开启全自动冲突写入。评级星级（Rating）和色彩标签可通过标准 XMP 字段跨软件识别。
