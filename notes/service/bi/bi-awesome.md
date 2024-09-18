---
title: BI Awesome
tags:
  - Awesome
---

# BI Awesome

- [thenaturalist/awesome-business-intelligence](https://github.com/thenaturalist/awesome-business-intelligence)
- [evidence-dev/evidence](https://github.com/evidence-dev/evidence)
  - MIT, Svelte
  - Business intelligence as code
  - SSG 方式
- [datalens-tech](https://github.com/datalens-tech)
  - by Yandex
  - https://cloud.yandex.com/en/services/datalens
- [observablehq/plot](https://github.com/observablehq/plot)
  - ISC, JS
  - https://observablehq.com/plot/
- BI/Business Intelligence
  - Metabase
  - Redash
  - Superset
  - [jitsucom/jitsu](https://github.com/jitsucom/jitsu)
    - open-source Segment alternative
    - [vs-segment](https://jitsu.com/vs-segment)
  - [snowplow/snowplow](https://github.com/snowplow/snowplow)
    - Apache-2.0, Scala
    - behavioral data engine
  - [meltano/meltano](https://gitlab.com/meltano/meltano)
    - MIT, Python
    - ELT for the DataOps
  - [lightdash](https://github.com/lightdash/lightdash)
    - MIT, Typescript
    - Looker alternative
  - [dbt-labs/dbt-core](https://github.com/dbt-labs/dbt-core)
    - Apache-2.0, Python
  - [cube-js/cube.js](https://github.com/cube-js/cube.js)
    - Client Apache-2.0 TS, Backend MIT, Rust
- Pipeline/Data Integration
  - airbytehq/airbyte
  - [honeycombio/honeytail](https://github.com/honeycombio/honeytail)
    - Apache-2.0, Go
    - extracting structured data out of common log files

## 可视化 {#visualization}

- 基础图形
  - 折线图、区域图
  - 饼图、叠加饼图
  - 柱状图
  - 散点图
- 扩展图形
  - 饼图
    - 旭日图
    - Percentage Charts - 展开的水平饼图 - 子弹图
    - Radial Bar Chart - 放射饼图
    - 进度环图
    - 玫瑰图
    - 玉珏图
  - 条形图
    - 对称条形图
  - 柱状图
    - Histogram - 直方图
    - 对称条形图
  - sankey chart - 桑基图
  - PolarAxis - 极坐标
  - BoxPlot - 箱形图
    - 最大值、最小值、中位数、及上下四分位数
  - Heatmap - 热力图
  - Calendar - 日历图
  - Treemap - 矩形树图
  - Funnel Chart - 漏斗图
  - RadarChart - 雷达图
  - Candlestick chart - K 线图
    - 阳线 - 红 - 香港&欧美 为 绿 - 收盘价 > 开盘价
    - 阴线 - 绿 - 香港&欧美 为 红 - 收盘价 < 开盘价
    - 中立线 - 收盘价 = 开盘价
    - 实体 - 粗 - 收盘价, 开盘价
    - 影线 - 细 - 最高价, 最低价
    - K 线组合出来的图为 K 线图
  - ErrorBar - 误差棒
    - 统计 standard deviation, standard error,
  - Voronoi Diagram - 维诺图, 沃罗诺伊图
    - 空间切分
  - 气泡图
  - Chord - 弦图
  - 密度热力图
  - 瀑布图
  - 词云图
  - violin plot - 小提琴图
  - 韦恩图
  - Circle Packing
  - 分面图
  - Gantt - 甘特图 - Ranged Bar Marks
- 选择考量标准
  - SVG/Canvas
  - Bundle 大小 - 有的框架动不动就上 MB
    - treeshake
    - 依赖复用 - 例如 d3, react-spring, lodash, lodash-es
  - 图类型 - 2D, 3D, Geo, 基础, 高级
  - 基于框架 - 更容易自定义, 更好处理事件、渲染
    - React 对 SVG 有天生优势
  - 基于 JSON 定义 - plotly, vega, apexcharts
    - 更适合 Editor 场景 - 方便保存复现
    - 跨语言框架
  - 基于 D3 - 基础逻辑通用 - bundle 复用
    - 即便不基于 D3 的也可能会用 D3 的基础库
    - d3-shape, d3-hierarchy, d3-path
    - d3-scale, d3-scale-chromatic, d3-array, d3-format, d3-time-format, d3-time, d3-interpolate
    - d3-color
  - 依赖
    - lodash, lodash-es, react-spring
  - 其他功能
    - BI, 透视/Pivot, crossfilter, crosshair, 动画
    - 交互: 拖拉、选择，平滑
  - 可组合使用
    - 例如 BI 时使用 plotly 这种，table 或 其他自定义显示时使用 recharts

---

**React**

- [FormidableLabs/victory](https://github.com/FormidableLabs/victory)
  - 530K
  - React, d3
  - Victory Native 支持 React Native
  - 支持 极坐标、桑基图、BoxPlot
  - 绘图能力强
- [recharts/recharts](https://github.com/recharts/recharts)
  - React and D3
  - 自定义能力强
  - 支持 桑基图、Treemap、漏斗、放射饼图、雷达图
  - Support for histogram chart [recharts#1580](https://github.com/recharts/recharts/issues/1580)
- [plouc/nivo](https://github.com/plouc/nivo)
  - 图表类型为独立包 - 例如 @nivo/bar, @nivo/funnel
- [airbnb/visx](https://github.com/airbnb/visx/)
  - React
  - visualization components
  - 原子组件
- [tannerlinsley/react-charts](https://github.com/tannerlinsley/react-charts)
  - React
  - 基于 visx
- [reactchartjs/react-chartjs-2](https://github.com/reactchartjs/react-chartjs-2)
  - 基于 chart.js
- [nhn/tui.chart](https://github.com/nhn/tui.chart)
- https://github.com/VisActor
  - by ByteDance

---

**Declarative**

> Declarative 类型的图和框架一般结合不太好 - 例如: 不方便直接渲染 React, 只能使用 DOM

- [plotly/plotly.js](https://github.com/plotly/plotly.js)
  - 3.5 MB
  - 基于 @plotly/d3
  - 核心包很大，包含所有功能，因为是定义式的，不可以 treeshake
  - 不少 BI 工具都是直接集成 plotly 提供绘图能力
- vega
  - [vega/vega](https://github.com/vega/vega)
    - 500 KB
    - 基于 D3
    - 完全基于 JSON 定义
    - [editor](https://vega.github.io/editor/)
  - [vega/vega-lite](https://github.com/vega/vega-lite)
    - 300 KB
    - 会编译为 Vega
    - data, transform, mark, encoding
    - 数据优先
    - [vega/vega-lite#1657](https://github.com/vega/vega-lite/issues/1657) Legends & Axes 不支持交互
  - [vega/react-vega](https://github.com/vega/react-vega)
    - 基于 vega-embed
    - [doc](https://github.com/vega/react-vega/tree/master/packages/react-vega)
  - [vega/voyager](https://github.com/vega/voyager)
    - http://vega.github.io/voyager/
  - [vega/vega-embed](https://github.com/vega/vega-embed)
    - Vega visualizations as embedded web component
  - [vega/falcon](https://github.com/vega/falcon)
    - Brushing and linking for big data
- [apache/echarts](https://github.com/apache/echarts)
  - 百度
  - 1 MB
  - zrender 渲染
  - 图像优先,定数据
  - Apache Superset 使用 ECharts - 因为同为 Apache 项目 - 替代 NVD3
    - NVD3 不再维护
  - ECharts v4 支持 SVG
  - ECharts v5 支持 [transform](https://echarts.apache.org/handbook/zh/concepts/data-transform/)
- [observablehq/plot](https://github.com/observablehq/plot)
  - concise API for exploratory data visualization
- [apexcharts/apexcharts.js](https://github.com/apexcharts/apexcharts.js)
  - 472 KB
  - 与 plotly 非常相似
  - 功能弱一些
- [naver/billboard.js](https://github.com/naver/billboard.js)
  - 300 KB
  - 基于 D3

---

- [d3](https://github.com/d3/d3)
  - d3-hierarchy
  - d3-format
  - [d3/d3-color](https://github.com/d3/d3-color)
- [highcharts/highcharts](https://github.com/highcharts/highcharts)
  - **收费** - 1 SaaS - 535$
    - Stock, Map, Gantt 额外收费
  - 个人和非盈利组织免费
- [palantir/plottable](https://github.com/palantir/plottable)
  - library of modular chart components built on D3
- [frappe/charts](https://github.com/frappe/charts)
  - SVG Charts, zero dependencies
  - Heatmap
- antvis
  - [G2](https://github.com/antvis/g2) 可视化引擎
    - [antvis/G2Plot](https://github.com/antvis/G2Plot)
      - 基于 g2 的图表库
  - [G6](https://github.com/antvis/g6) 图可视化引擎
    - [antvis/graphin](https://github.com/antvis/graphin)
      - React, G6
    - [antvis/x6](https://github.com/antvis/x6)
      - 图编辑器
  - [F2](https://github.com/antvis/f2) 移动可视化方
  - [L7](https://github.com/antvis/L7) 地理空间数据可视化
  - [antvis/AVA](https://github.com/antvis/AVA) - automated visual analytics
  - [S2](https://github.com/antvis/S2) - 多维交叉分析表格
  - https://antv.vision/
- antvis based
  - [alibaba/BizCharts](https://github.com/alibaba/BizCharts)
    - React
  - [ant-design/ant-design-charts](https://github.com/ant-design/ant-design-charts)
    - React, G2Plot, G6, X6, L7
- [DataV-Team/DataV-React](https://github.com/DataV-Team/DataV-React)
- chart.js
- [cytoscape/cytoscape.js](https://github.com/cytoscape/cytoscape.js)
- [visjs/vis-network](https://github.com/visjs/vis-network)
- [leeoniya/uPlot](https://github.com/leeoniya/uPlot)
- [thingsboard/thingsboard](https://github.com/thingsboard/thingsboard)
  - IoT
- [jwilber/roughViz](https://github.com/jwilber/roughViz)
- [dc-js/dc.js](https://github.com/dc-js/dc.js)
  - Multi-Dimensional charting
- [rawgraphs/rawgraphs-app](https://github.com/rawgraphs/rawgraphs-app)
- [britecharts/britecharts](https://github.com/britecharts/britecharts)
- [ChartsCSS/charts.css](https://github.com/ChartsCSS/charts.css)
- [vizzuhq/vizzu-lib](https://github.com/vizzuhq/vizzu-lib)
- https://textvis.lnu.se/
  - Text Visualization Browser
- [Kanaries/Rath](https://github.com/Kanaries/Rath)
  - AGPL-3.0, Typescript
  - Automated data exploratory analysis and visualization

---

- [Comparison of JavaScript charting libraries](https://en.wikipedia.org/wiki/Comparison_of_JavaScript_charting_libraries)
- npmtrends [vs](https://www.npmtrends.com/bizcharts-vs-echarts-vs-plotly.js-vs-recharts-vs-vega-vs-vega-lite-vs-victory-vs-@nivo/core)

---

- [microsoft/datamations](https://github.com/microsoft/datamations)
- https://github.com/riccardoscalco/textures
- https://github.com/visgl/deck.gl
- https://github.com/keplergl/kepler.gl
- https://github.com/projectstorm/react-diagrams
- [wbkd/react-flow](https://github.com/wbkd/react-flow)
- [JavaScript Open-Source Spreadsheets and Data Grids](https://jspreadsheets.com/)
- [Handsoncode](https://handsontable.com)
  - 使用 RuleJS 实现公式
- [Formulas in Microsoft Excel](http://chandoo.org/excel-formulas/index.shtml)
- [epochjs/epoch](https://github.com/epochjs/epoch)
  A general purpose, real-time visualization library.
- [chartbrew/chartbrew](https://github.com/chartbrew/chartbrew)
- [tabixio/tabix](https://github.com/tabixio/tabix)
- [finos/perspective](https://github.com/finos/perspective)
- [d3fc/d3fc](https://github.com/d3fc/d3fc)
- [vizzuhq/vizzu-lib](https://github.com/vizzuhq/vizzu-lib)

## dashboard

:::tip

- 自定义 Dashboard 带 Builder 性质
  - 有些特性和 BlockBuilder、PageBuilder 类似
  - 序列化
- 基础大多基于 react-grid-layout

:::

- react-grid-layout
- https://cumul.io/library/react
- https://dev.to/sm0ke/react-dashboards-open-source-apps-1c7j
- [iGaoWei/BigDataView](https://github.com/iGaoWei/BigDataView)
- https://dataease.io/templates/archives/电商消费大数据

## ML

- https://github.com/poloclub/cnn-explainer
- https://github.com/microsoft/MMdnn
- https://github.com/tensorspace-team/tensorspace
- https://github.com/tensorflow/lucid
- https://github.com/PaddlePaddle/VisualDL
