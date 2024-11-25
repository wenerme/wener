---
title: 密集架
---

## 密集架

- 密集架 Compact Shelving
- 密集柜 Movable Rack
  - [Mobile shelving](https://en.wikipedia.org/wiki/Mobile_shelving)
  - 日语 移动棚
- 起源于日本
- 用于机关、企事业单位图书资料室、档案室、样品室等存放图书资料、档案、货价、档案财务凭证、货物的新型装具。
- 与传统式书架、货架、档案架相比，储存量大，节省空间且更有传统性。
- 固定列
  - 控制列 - 一般不动
  - 上面通常能统管其他移动列
- 参考
  - DA/T 7-1992 直列式档案密集架
  - GB/T 13667.3 图书密集架
- 产品
  - https://www.bjroit.com/news/list-80-cn.html
  - https://www.jx-jh.cn/product/473.html
  - https://www.jx-jh.cn/product/12/
  - RFID 档案柜 https://www.cykeo.com/dangan/117.html
  - 档案库房综合管理系统 https://zhuanlan.zhihu.com/p/699025522


## 档案柜

- 凭证盒
  - 250×145×20
- 档案盒
  - 200×310×20
  - 200×310×35
- 档案柜
  - 列 - 横排
    - 高 - 2300mm
    - 宽 - 570mm
  - 组 - 纵排
    - 宽 900m
    - 一列一组 宽约 1050mm
    - 一列二组 宽约 1950mm
    - 以此类推
  - 轨道余 1米
  - 固定列
    - 主机
- 智能、电动、手动、固定

```ts
// 档案柜位置编码
interface CabinetLocationCode {
  region?: string; // 区域
  org?: string; // 机构
  repository?: string; // 库房

  area: string; // 区号
  column: number; // 列号
  section: number; // 节号
  shelf?: number; // 架号
  level: number; // 层号
  side: number; // 左右号 1左 2右, A, B
  serial: number; // 顺序号
}

// 档案柜设置
interface CabinetSetting {
  areaCode?: string; // 区号
  columnCount: number; // 列数
  sectionCount: number; // 节数
  levelCount: number; // 层数
  sideCount?: number; // 左右数
  sideType?: string; // 左右类型 A, B , AB
  // serialCount?: number; // 顺序号数
  fixedColumnNumber: number; // 固定列号
  firstColumnNumber: number; // 起始列号
  // 每格容量
}
```

---

- 常见
  - 5节 6 层
- 同时会记录档案存储状态
- 可能会存储 盒 信息
  - 盒号、盒内号
- 可能会存储顺序号
- 可能的编号方式
  - 从左到右
  - 从右到左
- 固定列
  - 通常为 Android/Windows
  - 可能支持存储基础的档案信息
    - 标题、年度、案号、位置、借阅状态
