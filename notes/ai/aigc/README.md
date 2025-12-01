---
title: AIGC
---

# AIGC

- PGC (Professional Generated Content) - 专业生成内容
- UGC (User Generated Content) - 用户生成内容
- AIGC (AI Generated Content) - 人工智能生成内容
- 文本、图像、音频、视频、代码、3D 模型
- Infra -> Model -> Application
- 问题
  - 幻觉
  - 版权
  - 可控性
  - 算力

## 图片

- **基础与创意生成 (Core Generation)**
  - **文生图 (Text-to-Image)**: 基础提示词生成。
  - **图生图 (Image-to-Image)**: 参考原图的构图或色彩生成新图。
  - **风格迁移 (Style Transfer)**: 保持内容结构不变，仅更换画风（如：照片转油画、3D转二次元）。
  - **草图/涂鸦生图 (Scribble-to-Image)**: 将潦草的简笔画渲染为精细成品图。
  - **线稿上色 (Lineart Colorization)**: 识别黑白线稿的闭合区域并自动上色。
  - **创意融合 (Image Mixer/Blend)**: 将两张或多张图片的概念、元素混合生成一张新图（如：猫 + 烤面包机）。
  - **多视角生成 (View Synthesis)**: 根据一张正面图，生成侧面、背面或俯视图（常用于三维资产设计）。
  - **无缝纹理生成 (Tileable Pattern)**: 生成上下左右可无限拼接的纹理贴图（用于布料、壁纸、游戏地表）。
  - **艺术字/光影字 (Text Effects)**: 将文字轮廓与自然场景融合（如：由森林树木组成的“HELLO”）。

- **智能编辑与修补 (Smart Editing & Inpainting)**
  - **局部重绘 (Inpainting)**: 指定区域修改内容。
  - **画面扩展 (Outpainting/Uncrop)**: 智能补全画面边缘，调整画幅比例（如 1:1 变 16:9）。
  - **智能擦除 (Object Erasure)**: 移除物体并补全背景。
  - **文字擦除 (Text Removal)**: 针对字幕、水印的特定擦除。
  - **生成式填充 (Generative Fill)**: 在特定区域“无中生有”地添加物体并自动匹配光影。
  - **智能位移 (Object Move/Drag)**: 选中物体并拖拽到新位置，AI 自动修复原位置背景并调整物体在新位置的透视。
  - **智能重构 (Reimagine/Variations)**: 保持原图大体结构，生成多个不同细节版本的变体。
  - **智能缩放 (Smart Resize)**: 类似“液化”缩放，在改变图片长宽比时，自动保护主体不被拉伸变形，只增减背景。

- **图像分割与合成 (Segmentation & Composition)**
  - **背景移除 (Background Removal)**: 抠图。
  - **背景替换 (Background Replacement)**: 换背景。
  - **天空替换 (Sky Replacement)**: 专门针对户外场景的天空置换。
  - **图层拆分 (Layer Decomposition)**: 将扁平图片拆解为前景、中景、背景、文字等独立图层（可导出 PSD）。
  - **语义分割 (Semantic Segmentation)**: 识别图片中每个像素的类别（路、人、树），用于精细化控制。

- **画质增强与修复 (Enhancement & Restoration)**
  - **超分辨率 (Upscaling)**: 2x/4x 放大并增加细节。
  - **面部修复 (Face Restoration)**: 修复模糊、崩坏的人脸五官。
  - **老照片修复 (Old Photo Restoration)**: 去划痕、折痕修复。
  - **黑白上色 (Colorization)**: 历史照片自动着色。
  - **去噪点/去伪影 (Denoise/De-JPEG)**: 修复 ISO 噪点或 JPG 压缩产生的马赛克块。
  - **低光照增强 (Low-light Enhancement)**: 提亮暗部细节，同时抑制噪点。
  - **去模糊 (Deblurring)**: 修复手抖或运动导致的模糊。

- **电商与营销垂直场景 (E-commerce & Marketing)**
  - **AI 模特换脸 (AI Model Swap)**: 将同款服装图中的模特脸部替换为不同国家/肤色的面孔（出海本地化）。
  - **假人变真人 (Mannequin to Human)**: 将服装店的人台/塑料模特图直接转化为真人穿版图。
  - **虚拟试衣 (Virtual Try-on)**:
    - **上装/下装试穿**: 指定衣服，生成模特穿在身上的效果。
    - **饰品/鞋帽佩戴**: 将手表、眼镜、鞋子自然合成到人物身上。
  - **商品场景化 (Product Background Generation)**: 保持商品（白底图）不变，生成符合商品调性的生活场景背景（如：将香水放到花丛中）。
  - **艺术二维码 (Artistic QR Code)**: 生成既能被手机扫码识别，又具有精美画面（如二次元、浮雕风格）的二维码。
  - **电商海报排版 (Banner Layout)**: 根据商品图自动生成背景、添加营销文案并进行智能排版。

- **建筑与室内设计垂直场景 (Architecture & Interior)**
  - **线稿渲染 (Wireframe to Render)**: 将 CAD 线框图或 SketchUp 裸模截图直接渲染为写实效果图。
  - **毛坯房装修 (Empty Room Furnishing)**: 识别毛坯房结构，自动“填入”家具和软装，生成装修后效果。
  - **风格重塑 (Interior Style Transfer)**: 将一张“中式装修”的照片，一键改为“北欧极简”或“日式原木”风格，保持家具布局不变。
  - **草图转建筑 (Sketch to Building)**: 建筑师手绘草图秒变建筑效果图。

- **游戏与 3D 资产垂直场景 (Game & 3D Assets)**
  - **矢量图转换 (Image to Vector)**: 将生成的位图图标转为 SVG 矢量图。
  - **贴图生成 (Texture Generation)**: 生成法线贴图 (Normal Map)、置换贴图 (Displacement Map)、粗糙度贴图 (Roughness Map)。
  - **三视图生成 (Character Sheet)**: 稳定生成角色的正、侧、背三视图，用于 3D 建模参考。
  - **像素画生成 (Pixel Art)**: 专门生成复古游戏风格的像素素材。
  - **全景图生成 (360° Panorama)**: 生成可用于 VR 或游戏天空盒 (Skybox) 的 360 度全景图片。

- **摄影与人像精修 (Photography & Portrait)**
  - **表情管理 (Expression Editing)**: 闭眼修复、大笑变微笑、视线矫正（注视镜头）。
  - **光影重绘 (Relighting)**: 改变照片的光源方向（如：从逆光改为侧光），重新计算面部阴影。
  - **景深控制 (Depth of Field Control)**: 后期改变对焦点，模拟大光圈虚化背景效果。
  - **妆容迁移 (Makeup Transfer)**: 将参考图的妆容（眼影、口红风格）完整迁移到目标人物脸上。
