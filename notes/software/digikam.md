---
title: digiKam
tags:
  - Software
  - Photography
  - DAM
---

# digiKam

- [digiKam](https://www.digikam.org/)
- [KDE/digikam](https://github.com/KDE/digikam)
  - GPL-2.0-or-later, C++, Qt
  - 专业开源跨平台数字资产与数码照片管理套件（DAM / RAW Editor）
- 官方文档：https://docs.digikam.org/
- 源码镜像 / 仓库：
  - KDE Invent: https://invent.kde.org/graphics/digikam
  - GitHub 镜像: https://github.com/KDE/digikam

```bash
# macOS
brew install --cask digikam

# Linux (Flatpak)
flatpak install flathub org.kde.digikam

# Arch Linux
pacman -S digikam

# Ubuntu / Debian
apt install digikam
```

## 核心架构与功能

- **照片与元数据管理（DAM）**：基于 Exiv2 支持 Exif、IPTC、XMP 读写，支持将评分/标签/人脸信息直接内嵌回文件或生成 `.xmp` Sidecar 侧车文件。
- **选片与对比（Light Table）**：支持双图/多图并排缩放、同步滚动对比（`Shift+L`），快速剔除脱焦或废片。
- **图像编辑与 RAW 解码**：基于 LibRaw 解码 16-bit 原生 RAW；内置 Image Editor 支持无损调色、色彩管理与去噪。
- **人脸检测与识别**：内置基于 OpenCV DNN 的深度学习模型，支持本地离线识别人物并建立人脸库。
- **批处理队列管理器（Batch Queue Manager, BQM）**：批量转码、重命名、加水印、调色、元数据批量清洗。
- **数据库架构**：
  - **SQLite**（默认）：适合单机本地运行，分为 `digikam4.db`（核心元数据）、`thumbnails-digikam.db`（缩略图缓存）、`recognition.db`（人脸特征库）与 `similarity.db`（相似度指纹）。
  - **MySQL / MariaDB**：支持内嵌（Internal）或外部远程（External）服务器，便于在 NAS / 局域网服务器部署，多台机器并发访问同一照片库。

## 常用快捷键

### 评级与选片标记（Culling & Rating）

| 快捷键                      | 功能                   | 说明                                   |
| --------------------------- | ---------------------- | -------------------------------------- |
| `Ctrl+0`                    | 无评级                 | 清除星级                               |
| `Ctrl+1` ~ `Ctrl+5`         | 1 ~ 5 星评级           | 快速分级筛选优质照片                   |
| `Alt+0`                     | 无挑选标记             | None                                   |
| `Alt+1`                     | 拒绝（Rejected）       | 标记为废片，便于后续批量清理           |
| `Alt+2`                     | 待定（Pending）        | 待审片/待处理                          |
| `Alt+3`                     | 接受（Accepted）       | 挑选通过                               |
| `Ctrl+Alt+0`                | 清除颜色标签           | None                                   |
| `Ctrl+Alt+1` ~ `Ctrl+Alt+5` | 红 / 橙 / 黄 / 绿 / 蓝 | 工作流颜色标记（如红=修图、绿=已交付） |
| `Ctrl+Alt+6` ~ `Ctrl+Alt+9` | 洋红 / 灰 / 黑 / 白    | 扩展颜色标签                           |

### 浏览与导航（Navigation）

| 快捷键                   | 功能              | 说明                            |
| ------------------------ | ----------------- | ------------------------------- |
| `Space`                  | 下一张照片        | 顺序浏览                        |
| `Backspace`              | 上一张照片        | 倒退浏览                        |
| `F3`                     | 预览模式开关      | 在缩略图网格与大图预览之间切换  |
| `Esc`                    | 退出预览模式      | 返回缩略图视图                  |
| `Ctrl+Shift+F`           | 全屏模式          | 沉浸式检片                      |
| `Ctrl+Home` / `Ctrl+End` | 第一张 / 最后一张 | 快速跳转至首尾                  |
| `Alt+Left` / `Alt+Right` | 后退 / 前进       | 历史浏览位置导航                |
| `Ctrl+Alt+Left`          | 折叠/展开左侧栏   | 扩展可视画面                    |
| `Ctrl+Alt+Right`         | 折叠/展开右侧栏   | 扩展可视画面                    |
| `F5` / `Ctrl+F5`         | 刷新              | 普通刷新 / 刷新（不更新缩略图） |

### 画面缩放（Zooming）

| 快捷键              | 功能          | 说明                     |
| ------------------- | ------------- | ------------------------ |
| `Ctrl++` / `Ctrl+-` | 放大 / 缩小   | 缩放检视局部细节         |
| `Ctrl+.`            | 100% 原始尺寸 | 1:1 查看细节与焦点清晰度 |
| `Ctrl+Alt+E`        | 适应窗口      | 居中完整显示             |
| `Ctrl+Alt+S`        | 适应选区      | 缩放到当前框选区域       |

### 视图切换（Views）

| 快捷键          | 视图                     | 说明                       |
| --------------- | ------------------------ | -------------------------- |
| `Shift+Ctrl+F1` | 相册视图（Albums）       | 按物理目录组织浏览         |
| `Shift+Ctrl+F2` | 标签视图（Tags）         | 按层级标签系统管理         |
| `Shift+Ctrl+F3` | 标签/评级视图（Labels）  | 按星级、颜色、挑选标记过滤 |
| `Shift+Ctrl+F4` | 日期视图（Dates）        | 按年/月/日日历检索         |
| `Shift+Ctrl+F5` | 时间线视图（Timeline）   | 按时间轴分布检索           |
| `Shift+Ctrl+F6` | 搜索视图（Search）       | 自定义复合检索             |
| `Shift+Ctrl+F7` | 相似度视图（Similarity） | 查找视觉相似照片           |
| `Shift+Ctrl+F8` | 地图视图（Map）          | 基于 GPS 地理标记浏览      |
| `Shift+Ctrl+F9` | 人物视图（People）       | 人脸检测与人物库分类       |

### 核心工具（Tools）

| 快捷键         | 功能                    | 说明                                        |
| -------------- | ----------------------- | ------------------------------------------- |
| `F4`           | 在图像编辑器中打开      | 进入 digiKam 内置 Image Editor              |
| `Ctrl+F4`      | 用系统默认程序打开      | 外部软件（如 Photoshop / Krita / Affinity） |
| `Shift+L`      | 打开灯箱（Light Table） | 独立检片窗口                                |
| `Ctrl+L`       | 放入灯箱                | 替换当前灯箱内容                            |
| `Ctrl+Shift+L` | 追加到灯箱              | 多图并排对比脱焦与画质                      |
| `Shift+B`      | 批处理队列管理器（BQM） | 批量转换/调色/导出                          |
| `Ctrl+B`       | 加入当前批处理队列      | 快速加入待处理列表                          |
| `Ctrl+Shift+B` | 创建并加入新批处理队列  | 多组任务编排                                |

### 照片与元数据操作（Item & Metadata）

| 快捷键                                 | 功能                | 说明                           |
| -------------------------------------- | ------------------- | ------------------------------ |
| `F2`                                   | 重命名文件          | 单张重命名                     |
| `T`                                    | 分配标签（Tag）     | 弹出快速标签输入浮层           |
| `Alt+Shift+A`                          | 显示已分配标签      | 检查当前打标状态               |
| `Ctrl+Shift+M`                         | 编辑元数据          | 编辑 Exif/IPTC/XMP 详情        |
| `Ctrl+Shift+G`                         | 编辑地理位置        | 手动或从 GPX 轨迹写入 GPS 坐标 |
| `Ctrl+Shift+D`                         | 调整拍摄日期与时间  | 校正相机时钟偏差               |
| `Del`                                  | 移至回收站          | 软删除                         |
| `Shift+Del`                            | 永久删除            | 直接物理删除                   |
| `Ctrl+Shift+Left` / `Ctrl+Shift+Right` | 向左 / 向右旋转 90° | 旋转无损记录                   |
| `Ctrl+*` / `Ctrl+/`                    | 水平 / 垂直翻转     | 镜像翻转                       |
| `Ctrl+D`                               | 查找重复项          | 查重清理                       |
| `Ctrl+F` / `Ctrl+Alt+F`                | 快速搜索 / 高级搜索 | 快速检索照片                   |

## 实践要点

### 1. 元数据同步与 Sidecar 文件设置

- 强烈建议在 `Settings -> Configure digiKam -> Metadata -> Sidecars` 开启：
  - **Write to XMP sidecar for read-only items only** 或 **Write to XMP sidecar files**。
  - 将照片的评级、标签、人脸区域（Face Tags）写入 `.xmp` 副文件。即使未来重建 digiKam 数据库或更换软件（如 Darktable、Lightroom），元数据也不会丢失。
- 如果照片是只读存储（如归档只读 NAS），使用 Sidecar 是唯一可以保存标签元数据而不修改原文件的方法。

### 2. 外部 MySQL / MariaDB 共享数据库

- 默认 SQLite 保存在本地，多设备或虚拟机挂载同一 NAS 照片目录时无法安全并发写入。
- 局域网多机共享方案：
  1. 在 NAS 或服务器搭建 MariaDB / MySQL 实例；
  2. 在 digiKam 中配置数据库驱动为 `MySQL Server (Remote)`；
  3. 分别设置 `Core`、`Thumbs`、`Recognition`、`Similarity` 数据库库名和连接凭据。

### 3. 高效选片工作流（Culling）

1. **粗筛（First Pass）**：使用 `Ctrl+Shift+F` 进入全屏预览，左手用 `Alt+1`（Rejected）剔除废片，右手用 `Space` 切换下一张；
2. **精选（Second Pass）**：使用 `Shift+L` 启动灯箱（Light Table），多张连拍图并排放大到 100%（`Ctrl+.`）对比对焦点锐度，符合要求的打 `Ctrl+3`~`Ctrl+5` 星；
3. **标签与分类**：按 `T` 键快速为合照或场景指定标签。
