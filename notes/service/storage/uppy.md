---
title: uppy
---

# uppy

- [transloadit/uppy](https://github.com/transloadit/uppy)
  - MIT, JS
  - Web 上传组件
- https://uppy.io/

```bash
npm add @uppy/core @uppy/tus @uppy/dashboard @uppy/locales @uppy/url
npm add @uppy/drag-drop @uppy/file-input @uppy/status-bar @uppy/progress-bar @uppy/react
npm add @uppy/webcam
```

- source - `@uppy/*` - 文件来源
  - audio - 录音
  - webcom - 摄像头
  - screen-captrue - 屏幕截图
  - box, dropbox, facebook, google-drive, google-photos, instagram, onedrive, zoom, unsplash
- UI
  - dashbord
    - inline - 显示为内联还是弹出窗
      - inline 会为 uppy-Dashboard-inner 设置 width & height
  - image-editor
    - 使用 [fengyuanchen/cropperjs](https://github.com/fengyuanchen/cropperjs)
  - informer
  - status-bar
  - thumbnail-generator
- @uppy/companion
  - 独立服务
  - Server to Server
  - 提供授权 - 上传到 google drive, dropbox, s3 等
  - 提供 fetch - 使用 url 上传
  - https://uppy.io/docs/companion/

```tsx
export interface State<M extends Meta, B extends Body> extends Record<string, unknown> {
  meta: M;
  capabilities: {
    uploadProgress: boolean;
    individualCancellation: boolean;
    resumableUploads: boolean;
    isMobileDevice?: boolean;
    darkMode?: boolean;
  };
  currentUploads: Record<string, CurrentUpload<M, B>>;
  allowNewUpload: boolean;
  recoveredState: null | Required<Pick<State<M, B>, 'files' | 'currentUploads'>>;
  error: string | null;
  files: {
    [key: string]: UppyFile<M, B>;
  };
  info: Array<{
    isHidden?: boolean;
    type: LogLevel;
    message: string;
    details?: string | Record<string, string> | null;
  }>;
  plugins: Plugins;
  totalProgress: number;
  companion?: Record<string, string>;
}
```

- 默认 Store 实现 - https://github.com/transloadit/uppy/blob/main/packages/%40uppy/store-default/src/index.ts

## React

- `<Dashboard uppy={uppy} />`
  - 底层逻辑是 组件内会 installPlugin
  - 等同于 `uppy.use(DashboardPlugin, options)`
  - 通过 ref 拿到 HTMLElement 作为 target
