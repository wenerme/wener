---
title: mermaid
---

# mermaid

- [mermaid-js/mermaid](https://github.com/mermaid-js/mermaid)
- [Live Editor](https://mermaid-js.github.io/mermaid-live-editor)
- GitHub 和 Gitlab 支持 mermaid

:::caution

- 无法调整 rank [#3723](https://github.com/mermaid-js/mermaid/issues/3723)

:::

| type            |
| --------------- | ----------- |
| graph           | Flow        |
| sequenceDiagram | Sequence    |
| classDiagram    | Class       |
| stateDiagram-v2 | State       |
| gantt           | Gantt       |
| pie             | Pie         |
| erDiagram       | ER          |
| gitGraph        | Git         |
| journey         | UserJourney |
| flowchart       |

```mermaid
graph TD;
    A-->B
    A-->C
    B-->D
    C-->D
```

## API

```html
<pre class="mermaid">
    graph LR
    A --- B
    B-->C[fa:fa-ban forbidden]
    B-->D(fa:fa-spinner);
</pre>

<style>
  div.mermaid {
    font-family: 'trebuchet ms', verdana, arial;
  }
</style>
<script type="module">
  import mermaid from 'https://unpkg.com/mermaid@9/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true });
</script>
```
