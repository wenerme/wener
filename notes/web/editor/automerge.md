---
title: automerge
---

# automerge

- [automerge](https://github.com/automerge/automerge)
  - MIT, JS, Rust, WASM
  - 2.3 MB, 865.9kB
- 参考
  - [Binary Document Format](https://automerge.org/automerge-binary-format-spec/)
- `@automerge/automerge-wasm`
  - Rust -> WASM
- @automerge/automerge-repo-storage-indexeddb
- @automerge/automerge-repo-storage-nodefs
- @automerge/automerge-repo-network-websocket
- @automerge/automerge-repo-network-messagechannel
- @automerge/automerge-repo-network-broadcastchannel

```bash
pnpm add @automerge/automerge @automerge/automerge-repo
```

```ts
// NodeJS
import { next as A } from "@automerge/automerge"


// 自定义初始化逻辑
import wasmUrl from "@automerge/automerge/automerge.wasm?url";
// import { automergeWasmBase64 } from "@automerge/automerge/automerge.wasm.base64.js";
import { next as Automerge } from "@automerge/automerge/slim";
import { Repo } from `@automerge/automerge-repo/slim`;

await next.initializeWasm(wasmUrl)
const repo = new Repo({})
```

## StorageAdapter

```ts
export type StorageKey = string[];

export abstract class StorageAdapter {
  abstract load(key: StorageKey): Promise<Uint8Array | undefined>;
  abstract save(key: StorageKey, data: Uint8Array): Promise<void>;
  abstract remove(key: StorageKey): Promise<void>;
  abstract loadRange(keyPrefix: StorageKey): Promise<{ key: StorageKey; data: Uint8Array }[]>;
  abstract removeRange(keyPrefix: StorageKey): Promise<void>;
}
```

- `[<document ID>, <chunk type>, <chunk identifier>]`
  - chunk type -> snapshot, incremental

## Rich Text

- Mark
  - strong
  - em
  - link
- Block
  - paragraph heading code-block blockquote ordered-list-item unordered-list-item image
- https://automerge.org/docs/documents/rich_text/
