---
title: OCR API
---

# Design OCR API

- 场景
  - 文本识别
  - 表格识别
  - 图像识别
    - Caption
    - Object Detection
    - Summary
  - Layout 分析
  - 公式识别
  - Text Detection
  - Adhoc Text Recognition - 预处理+识别+后处理
- 通过 Annotation 来表示大多的 OCR 结果
  - 标注文本、表格、图像
  - 标注 Layout 分析结果

```ts
export const AnnotationSchema = z.looseObject({
  id: z.string().optional(),
  title: z.string().trim().optional().describe('标题'),
  description: z.string().trim().optional().describe('描述'),
  summary: z.string().trim().optional().describe('摘要'),
  type: z.string().trim().optional().describe('类型'),

  // 内容字段
  text: z.string().optional().describe('文本内容'),
  markdown: z.string().optional().describe('Markdown 内容'),
  csv: z.string().optional().describe('CSV 内容'),
  html: z.string().optional().describe('HTML 内容'),
  data: z.any().optional().describe('任意数据'),

  // 定位信息
  field: z.string().trim().optional().describe('目标字段'),
  file: z.string().trim().optional().describe('源文件'),
  page: z.coerce.number().int().nonnegative().optional().describe('页码'),

  // 几何/边界框信息
  bbox: z.array(z.number()).optional().describe('边界框'),
  xywh: z
    .array(z.number())
    .length(4, { error: 'xywh 必须包含4个数字 [x, y, width, height]' })
    .optional()
    .describe('XYWH'),
  xyxy: z.array(z.number()).length(4, { error: 'xyxy 必须包含4个数字 [x1, y1, x2, y2]' }).optional().describe('XYXY'),
  polygon: z.array(z.number().array()).optional().describe('Polygon'),
  x: z.coerce.number().optional().describe('X 坐标'),
  y: z.coerce.number().optional().describe('Y 坐标'),
  w: z.coerce.number().nonnegative().optional().describe('宽度'),
  h: z.coerce.number().nonnegative().optional().describe('高度'),

  // 识别内部信息
  label: z.string().trim().optional().describe('标签'),
  confidence: z.coerce.number().min(0).max(1).optional().describe('置信度'),
  score: z.coerce.number().optional().describe('原始分数'),

  classes: z
    .array(
      z.object({
        label: z.string().nonempty({ error: '分类标签不能为空' }).describe('分类标签'),
        confidence: z.coerce.number().min(0).max(1).optional().describe('分类置信度 (0-1)'),
        score: z.coerce.number().optional().describe('分类原始分数'),
      }),
    )
    .optional()
    .describe('多分类结果'),

  // 元数据和标签
  tags: z.array(z.string()).optional().describe('标签'),
  metadata: z.record(z.string(), z.any()).optional().describe('元数据'),
  attributes: z.record(z.string(), z.any()).optional().describe('属性'),
  properties: z.record(z.string(), z.any()).optional().describe('属性'),

  // 子注释
  get annotations(): z.ZodOptional<z.ZodArray<typeof AnnotationSchema>> {
    return z.array(AnnotationSchema).optional().describe('子注释');
  },
});
```
