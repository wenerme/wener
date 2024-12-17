---
title: konva
---

# konva

- [konvajs/konva](https://github.com/konvajs/konva)
  - MIT, JS+TS
  - Canvas 2D
  - 级联关系 Stage - Layer - Group - Shape
- 参考
  - [All Konva performance tips list](https://konvajs.org/docs/performance/All_Performance_Tips.html)

## Notes

- Stage - 根容器/绘图区域
  - 宽度、高度、缩放、拖拽
  - 事件监听
- Layer - 分离绘图内容的逻辑层
  - 拥有独立的 Canvas
  - 独立的透明度、可见性和绘图顺序管理
- Group
  - 分组管理一组图形的容器
  - 共同操作（如移动、缩放、旋转等）
- Shape
  - 绘图的最小单位
  - 位置、颜色、大小
  - 支持事件监听
  - Rect, Circle, Ellipse
  - Line, Polygon, Spline, Blob
  - Sprite
  - Image, Text, TextPath, Star, Ring, Arc, Label, SVG Path, RegularPolygon, Arrow
  - 通过 `sceneFunc={(context, shape)=>{}}` 来实现自定义图像画任意内容
- Image
- offset 是元素变化中心，而不是位置
- Konva.Image
- window.Image
- [konvajs/use-image](https://github.com/konvajs/use-image)
  - npm:use-image
  - url -> DOM image
- Node -> Container -> Stage & Layer & Group
- Node -> Shape

```ts
export interface NodeConfig {
  [index: string]: any;
  id?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  visible?: boolean;
  listening?: boolean;
  name?: string;
  opacity?: number;
  scale?: Vector2d;
  scaleX?: number;
  skewX?: number;
  skewY?: number;
  scaleY?: number;
  rotation?: number;
  rotationDeg?: number;
  offset?: Vector2d;
  offsetX?: number;
  offsetY?: number;
  draggable?: boolean;
  dragDistance?: number;
  dragBoundFunc?: (this: Node, pos: Vector2d) => Vector2d;
  preventDefault?: boolean;
  globalCompositeOperation?: globalCompositeOperationType;
  filters?: Array<Filter>;
}

export type ClipFuncOutput = void | [Path2D | CanvasFillRule] | [Path2D, CanvasFillRule];
export interface ContainerConfig extends NodeConfig {
  clearBeforeDraw?: boolean;
  clipFunc?: (ctx: SceneContext) => ClipFuncOutput;
  clipX?: number;
  clipY?: number;
  clipWidth?: number;
  clipHeight?: number;
}

export interface ShapeConfig extends NodeConfig {
  fill?: string | CanvasGradient;
  fillPatternImage?: HTMLImageElement;
  fillPatternX?: number;
  fillPatternY?: number;
  fillPatternOffset?: Vector2d;
  fillPatternOffsetX?: number;
  fillPatternOffsetY?: number;
  fillPatternScale?: Vector2d;
  fillPatternScaleX?: number;
  fillPatternScaleY?: number;
  fillPatternRotation?: number;
  fillPatternRepeat?: string;
  fillLinearGradientStartPoint?: Vector2d;
  fillLinearGradientStartPointX?: number;
  fillLinearGradientStartPointY?: number;
  fillLinearGradientEndPoint?: Vector2d;
  fillLinearGradientEndPointX?: number;
  fillLinearGradientEndPointY?: number;
  fillLinearGradientColorStops?: Array<number | string>;
  fillRadialGradientStartPoint?: Vector2d;
  fillRadialGradientStartPointX?: number;
  fillRadialGradientStartPointY?: number;
  fillRadialGradientEndPoint?: Vector2d;
  fillRadialGradientEndPointX?: number;
  fillRadialGradientEndPointY?: number;
  fillRadialGradientStartRadius?: number;
  fillRadialGradientEndRadius?: number;
  fillRadialGradientColorStops?: Array<number | string>;
  fillEnabled?: boolean;
  fillPriority?: string;
  fillRule?: CanvasFillRule;
  stroke?: string | CanvasGradient;
  strokeWidth?: number;
  fillAfterStrokeEnabled?: boolean;
  hitStrokeWidth?: number | string;
  strokeScaleEnabled?: boolean;
  strokeHitEnabled?: boolean;
  strokeEnabled?: boolean;
  lineJoin?: LineJoin;
  lineCap?: LineCap;
  sceneFunc?: (con: Context, shape: Shape) => void;
  hitFunc?: (con: Context, shape: Shape) => void;
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffset?: Vector2d;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  shadowOpacity?: number;
  shadowEnabled?: boolean;
  shadowForStrokeEnabled?: boolean;
  dash?: number[];
  dashOffset?: number;
  dashEnabled?: boolean;
  perfectDrawEnabled?: boolean;
}

export interface Vector2d {
  x: number;
  y: number;
}
export type Filter = (this: Node, imageData: ImageData) => void;
type globalCompositeOperationType =
  | ''
  | 'source-over'
  | 'source-in'
  | 'source-out'
  | 'source-atop'
  | 'destination-over'
  | 'destination-in'
  | 'destination-out'
  | 'destination-atop'
  | 'lighter'
  | 'copy'
  | 'xor'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten'
  | 'color-dodge'
  | 'color-burn'
  | 'hard-light'
  | 'soft-light'
  | 'difference'
  | 'exclusion'
  | 'hue'
  | 'saturation'
  | 'color'
  | 'luminosity';

export interface KonvaEventObject<EventType, This = Node> {
  type: string;
  target: Shape | Stage;
  evt: EventType;
  pointerId: number;
  currentTarget: This;
  cancelBubble: boolean;
  child?: Node;
}
```

## draggable

- 处理的是 xy
- 可以通过监听 drageEnd 来获取最终位置
