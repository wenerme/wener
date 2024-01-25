---
title: GeoJSON
---

# GeoJSON

- https://datatracker.ietf.org/doc/html/rfc7946
- @types/geojson
- 数据类型
  - 包括点（Point）
  - 线（LineString）
  - 多边形（Polygon）
  - 多点（MultiPoint）
  - 多线（MultiLineString）
  - 多多边形（MultiPolygon）
  - 几何集合（GeometryCollection）
- 结构
  - Geometry - 几何 - 描述单个地理空间实体的形状，如点、线或多边形。
  - Feature - 特征 - 包含一个几何对象和一组与之关联的属性。
  - FeatureCollection - 特征集合
- 坐标系统 WGS 84
  - 先经度后纬度
- BBox - 边界框
  - 确定对象的地理范围
  - 西南、东北
  - [最小经度, 最小纬度, 最大经度, 最大纬度]
- url
  - lat,lon,alt,unc -> latitude, longitude, altitude, uncertainty

```ts
// Bounding Box
export type BBox = [number, number, number, number] | [number, number, number, number, number, number];
// x,y,z
export type Position = [number, number] | [number, number, number];
// 几何对象
export type Geometry = Point | MultiPoint | LineString | MultiLineString | Polygon | MultiPolygon | GeometryCollection;

export interface GeoJsonObject {
  type: string;
  /**
   * Bounding box of the coordinate range of the object's Geometries, Features, or Feature Collections.
   * The value of the bbox member is an array of length 2*n where n is the number of dimensions
   * represented in the contained geometries, with all axes of the most southwesterly point
   * followed by all axes of the more northeasterly point.
   * The axes order of a bbox follows the axes order of geometries.
   * https://tools.ietf.org/html/rfc7946#section-5
   */
  bbox?: BBox | undefined;
}

export interface Point extends GeoJsonObject {
  type: 'Point';
  coordinates: Position;
}

export interface MultiPoint extends GeoJsonObject {
  type: 'MultiPoint';
  coordinates: Position[];
}

export interface LineString extends GeoJsonObject {
  type: 'LineString';
  coordinates: Position[];
}

export interface MultiLineString extends GeoJsonObject {
  type: 'MultiLineString';
  coordinates: Position[][];
}

export interface Polygon extends GeoJsonObject {
  type: 'Polygon';
  coordinates: Position[][];
}

export interface MultiPolygon extends GeoJsonObject {
  type: 'MultiPolygon';
  coordinates: Position[][][];
}

export interface GeometryCollection<G extends Geometry = Geometry> extends GeoJsonObject {
  type: 'GeometryCollection';
  geometries: G[];
}

export type GeoJsonProperties = { [name: string]: any } | null;

export interface Feature<G extends Geometry | null = Geometry, P = GeoJsonProperties> extends GeoJsonObject {
  type: 'Feature';
  /**
   * The feature's geometry
   */
  geometry: G;
  /**
   * A value that uniquely identifies this feature in a
   * https://tools.ietf.org/html/rfc7946#section-3.2.
   */
  id?: string | number | undefined;
  /**
   * Properties associated with this feature.
   */
  properties: P;
}

export interface FeatureCollection<G extends Geometry | null = Geometry, P = GeoJsonProperties> extends GeoJsonObject {
  type: 'FeatureCollection';
  features: Array<Feature<G, P>>;
}
```
