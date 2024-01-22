---
title: mapbox
---

# mapbox

- Mapbox GL 512x512 pixel tiles
- Mapbox Raster Tiles 256x256 pixel tiles


```ts
export type ViewState = {
  /** Longitude at map center */
  longitude: number;
  /** Latitude at map center */
  latitude: number;
  /** Map zoom level */
  zoom: number;
  /** Map rotation bearing in degrees counter-clockwise from north */
  bearing: number;
  /** Map angle in degrees at which the camera is looking at the ground */
  pitch: number;
  /** Dimensions in pixels applied on each side of the viewport for shifting the vanishing point. */
  padding: PaddingOptions;
};
```

## zoom level

- 0-22
- $2^{zoom} \times 2^{zoom}$

| zoom | see      |
| ---- | -------- |
| 0    | 地球     |
| 3    | 一个大陆 |
| 4    | 大岛     |
| 6    | 大河     |
| 10   | 大路     |
| 15   | 建筑     |

- https://docs.mapbox.com/help/glossary/zoom-level/
