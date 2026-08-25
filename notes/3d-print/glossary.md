---
tags:
  - Glossary
---

# Glossary

- 1.75mm - FDM/FFF 3D 打印丝材的直径, 桌面级 3D 打印机
- 2.85 mm：也称 3 mm filament，常见于部分打印机和挤出系统

| abbr. | stand for                         | cn                          |
| ----- | --------------------------------- | --------------------------- |
| ABS   | Acrylonitrile Butadiene Styrene   | 丙烯腈-丁二烯-苯乙烯        |
| ASA   | Acrylonitrile Styrene Acrylate    | 丙烯腈-苯乙烯-丙烯酸酯      |
| FDM   | Fused Deposition Modeling         | 熔融沉积成型                |
| HIPS  | High Impact Polystyrene           | 高抗冲聚苯乙烯              |
| PA    | Polyamide                         | 聚酰胺（尼龙）              |
| PC    | Polycarbonate                     | 聚碳酸酯                    |
| PCL   | Polycaprolactone                  | 聚己内酯                    |
| PETG  | Polyethylene Terephthalate Glycol | 聚对苯二甲酸乙二醇酯-共聚物 |
| PLA   | Polylactic Acid                   | 聚乳酸                      |
| PP    | Polypropylene                     | 聚丙烯                      |
| PVA   | Polyvinyl Alcohol                 | 聚乙烯醇                    |
| SLA   | Stereolithography                 | 光固化成型                  |
| SLS   | Selective Laser Sintering         | 选择性激光烧结              |
| TPE   | Thermoplastic Elastomer           | 热塑性弹性体                |
| TPU   | Thermoplastic Polyurethane        | 热塑性聚氨酯                |

| en                | cn  |
| ----------------- | --- |
| Filament diameter |
| Nozzle diameter   |

- STL = STereoLithography，立体光刻
- STL = Standard Tessellation Language，标准曲面细分语言
- STL = Standard Triangle Language，标准三角形语言
- .stl
  - 物体的表面几何形状
  - 由大量三角形组成的三角网格
  - 三角形顶点和法线方向
- .3mf
  - 模型、颜色、切片
- .gcode
  - 打印机命令

# 材料

- PCL (Polycaprolactone, 聚己内酯)
  - 温度 60-100°C
  - 低温打印，适合打印儿童玩具和低温要求的项目。
  - 生物可降解材料，无毒无味
  - 加入色素以后，塑形以后也比较鲜艳
- PLA (Polylactic Acid, 聚乳酸)
  - 温度 175-210°C
  - 易于打印，环保，适合打印原型和装饰品。
  - 无毒，加热有味道
  - 不耐冲击且柔韧性不足，摔倒时无法回弹，薄弱部分很容易会发生断裂
  - 适合制作一些小型的工艺品
  - 成人初学者、喜欢制作小工艺作品的成人手工达人及绘画达人
- ABS (Acrylonitrile Butadiene Styrene, 丙烯腈-丁二烯-苯乙烯)
  - 温度 190-230°C
  - **味道重**，**易收缩**
  - **可塑性强**，**强度高**
  - 颜色相对没那么鲜艳
  - 冷却时非常容易发生收缩，可能会引起模型的收缩变形翘边
  - 韧性好，耐高温，适合打印功能性零件和外壳。
  - 制作大型作品、需要柔韧度的作品

- PETG (Polyethylene Terephthalate Glycol, 聚对苯二甲酸乙二醇酯-共聚物)
  - 易于打印，韧性和耐化学性通常优于 PLA，适合功能性零件、容器和保护罩。
  - 层间结合较好，适合打印较大的零件；但桥接、悬垂和拉丝控制通常比 PLA 更困难。
  - 与打印平台的粘附力较强，打印前应确认平台表面和脱模设置，避免损伤打印面。
  - 丝材吸湿后容易出现拉丝、气泡和表面粗糙，受潮时应先干燥。

- TPU (Thermoplastic Polyurethane, 热塑性聚氨酯)
  - 柔性材料，适合打印脚垫、密封件、保护套、软连接和减震件。
  - 硬度通常用 Shore A 表示；数值越低通常越柔软，但实际可打印性还取决于配方和打印机结构。
  - 打印速度通常需要降低，送丝路径应尽量短且有支撑，避免柔性丝材在送料机构中打结或挤压变形。
  - 柔性并不等于高耐磨或高耐温，选型时应同时确认硬度、耐磨性、耐油性和工作温度。

- ASA (Acrylonitrile Styrene Acrylate, 丙烯腈-苯乙烯-丙烯酸酯)
  - 耐紫外线和耐候性较好，适合户外零件、设备外壳和长期暴露部件。
  - 与 ABS 类似，容易收缩和翘边，通常需要加热平台、良好粘附和封闭环境。
  - 打印时可能产生刺激性气味和挥发物，应保持通风，不要把“耐候”误解为无需表面或结构防护。

- PA / Nylon (Polyamide, 聚酰胺/尼龙)
  - 强度、韧性和耐磨性较好，适合齿轮、轴套、铰链和承力功能件。
  - 吸湿明显；受潮会导致气泡、表面粗糙、尺寸变化和层间性能下降，使用前后都应密封保存并按材料要求干燥。
  - 收缩和翘曲风险通常高于 PLA、PETG，对腔体温度、平台粘附和打印方向更敏感。
  - 碳纤维、玻璃纤维等增强填料会提高刚度，但也会加速普通黄铜喷嘴磨损。

- PC (Polycarbonate, 聚碳酸酯)
  - 耐冲击性和耐热性较好，适合功能性结构件、支架和设备部件。
  - 通常需要较高的喷嘴和热床温度，并且对封闭环境、平台粘附和防翘边要求较高。
  - 不同 PC 配方的打印窗口差异很大，应优先使用丝材厂商提供的温度和干燥参数。

- PP (Polypropylene, 聚丙烯)
  - 密度低、耐化学性和耐疲劳性较好，适合铰链、卡扣、薄壁容器和需要反复弯折的零件。
  - 由于收缩明显且不易粘附在常见打印平台上，打印难度较高，通常需要匹配的打印表面和适当的腔体环境。

- HIPS (High Impact Polystyrene, 高抗冲聚苯乙烯)
  - 可用于功能件，也常作为 ABS 的可溶性支撑材料。
  - 通常使用柠檬烯溶解支撑；溶解剂、废液和溶解后的残余物需要按化学品要求处理。
  - 与 ABS 类似存在收缩和气味问题，仍需要控制打印环境和通风。

- PVA / BVOH (Polyvinyl Alcohol / Butanediol Vinyl Alcohol Copolymer, 聚乙烯醇/丁烯二醇乙烯醇共聚物)
  - 水溶性支撑材料，适合复杂悬垂、内腔和多材料打印。
  - 极易吸湿，应使用密封容器或干燥设备保存；受潮后打印质量会明显下降。
  - PVA 和 BVOH 的溶解速度、储存要求和适配材料并不完全相同，应按具体产品说明使用。

## 材料选择

- 原型、装饰件和入门：优先 PLA。
- 需要韧性、耐化学性或较大尺寸：优先 PETG。
- 柔性、密封和减震：选择 TPU，并确认硬度与耐磨性。
- 户外使用：优先 ASA；需要更高耐热和强度时再考虑 PC 或工程级 PA。
- 齿轮、轴套和耐磨件：考虑 PA / Nylon 或增强尼龙，同时确认吸湿和喷嘴磨损问题。
- 复杂支撑：根据模型材料和溶解条件选择 PVA、BVOH 或 HIPS。
- 所有温度、风扇、速度和干燥参数都应以具体打印机、喷嘴、平台、丝材品牌及配方的官方建议为起点，再通过校准模型调整。

## 文件格式

### G-code

G-code 是切片软件生成的打印机执行指令。它通常以文本形式描述喷嘴和平台的移动、挤出量、温度、风扇、速度、换层和换料等操作。

- G-code 是面向具体打印机、材料、喷嘴和切片配置的输出，不是通用的三维模型文件。
- 同一个 STL 或 3MF 项目，换用不同打印机、喷嘴、材料或切片参数后，通常需要重新切片生成 G-code。
- 打印前应使用 G-code Viewer 或打印机预览功能检查首层、支撑、填充、换料和温度指令。
- G-code 可能包含打印机控制指令或自定义起始/结束脚本。下载或接收他人提供的 G-code 时，不应直接发送到打印机，应先检查内容和目标设备。
- 部分切片软件和打印机也支持压缩的 Binary G-code，例如 `.bgcode`；它与普通文本 G-code 的用途相同，但不适合直接用文本编辑器阅读。

### 3MF

3MF（3D Manufacturing Format）是用于交换和保存三维打印项目的格式。它可以保存一个或多个模型，以及颜色、纹理、缩略图、切片软件设置和修改器等附加信息；在切片软件中保存的 3MF project 可以看作一次打印项目的快照。

- 3MF 更适合保存和分享“可继续编辑的切片项目”，而不是只保存几何形状。
- 打开 3MF project 后，可以继续调整打印机、材料、层高、支撑、填充和修改器，再重新生成适配当前设备的 G-code。
- 3MF 文件通常是 ZIP 容器，可以解压查看其中的 XML、模型和缩略图等内容；不要因为扩展名是 `.3mf` 就认为其中一定只有一个模型。
- 不同切片软件对 3MF 中的设置和扩展内容支持程度可能不同。跨软件或跨打印机分享时，应确认模型、材料配置和切片结果是否被正确识别。

### 关系

```text
STL / STEP / OBJ / 3MF model
            │
            ▼
          Slicer
            │
            ├── 3MF project：模型 + 设置 + 修改器 + 项目状态
            └── G-code：当前打印机可执行的打印指令
```

简单区分：**3MF 保存“怎么继续编辑和切片”，G-code 保存“打印机现在怎么执行”。** 通常应保留 3MF project 作为可复现源文件，同时保留经过预览和验证的 G-code 作为某台打印机的一次具体输出。

## 参考

- [Prusa Knowledge Base: Material guide](https://help.prusa3d.com/product/mk3s-2/material-guide_220)
- [Prusa Knowledge Base: Saving projects as 3MF](https://help.prusa3d.com/article/saving-projects-as-3mf_1773)
- [Prusa Knowledge Base: PrusaSlicer input/output](https://help.prusa3d.com/product/prusaslicer/input-output_209)
