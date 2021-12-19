---
title: FileSystem
---

# FileSystem

- https://wicg.github.io/file-system-access/
  - [explainer](https://github.com/WICG/file-system-access/blob/main/EXPLAINER.md)
- https://w3c.github.io/FileAPI/
- https://web.dev/file-system-access/
  - [fs-helpers.js](https://github.com/GoogleChromeLabs/text-editor/blob/main/src/inline-scripts/fs-helpers.js)
- https://web.dev/browser-fs-access/
- Chrome
  - Chrome 86+
    - [window.showOpenFilePicker](https://developer.mozilla.org/en-US/docs/Web/API/Window/showOpenFilePicker)
    - navigator.storage.getDirectory
- dataurl 支持 blob:, filesystem:
- `<a href="" download="filename.txt">` - 触发下载
  - [download](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-download) 依赖服务端返回 [Content-Disposition]

[content-disposition]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition

```js
const dirHandle = await window.showDirectoryPicker();

const saveFileHandle = await self.showSaveFilePicker({
  suggestedName: 'Untitled Text.txt',
  types: [
    {
      description: 'Text documents',
      accept: {
        'text/plain': ['.txt'],
      },
    },
  ],
});

const openFileHandle = await self.showOpenFilePicker({
  // desktop, documents, downloads, music, pictures, videos
  startIn: 'pictures',
  // startIn: dirHandle,
});

// 创建目录
const neoDirHandle = await dirHandle.getDirectoryHandle('neo', { create: true });
// 创建文件
const readmeFileHandle = await neoDirHandle.getFileHandle('README.txt', { create: true });
// 删除文件
await neoDirHandle.removeEntry('README.txt');
// 递归删除目录
await dirHandle.removeEntry('neo', { recursive: true });
```

## Origin Private File System

- OPFS - Origin Private File System
- [chromestatus](https://www.chromestatus.com/feature/5702777582911488)
  - dev 94, trail 95, shiping 99

```js
// FileSystemDirectoryHandle
const root = await navigator.storage.getDirectory();
```

## Drop as Handle

```js title="drop-handle.js"
elem.addEventListener('dragover', (e) => {
  // Prevent navigation.
  e.preventDefault();
});

elem.addEventListener('drop', async (e) => {
  // Prevent navigation.
  e.preventDefault();
  // Process all of the items.
  for (const item of e.dataTransfer.items) {
    // Careful: `kind` will be 'file' for both file
    // _and_ directory entries.
    if (item.kind === 'file') {
      const entry = await item.getAsFileSystemHandle();
      if (entry.kind === 'directory') {
        handleDirectoryEntry(entry);
      } else {
        handleFileEntry(entry);
      }
    }
  }
});
```
