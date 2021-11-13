---
title: kroki
---

# kroki

- [yuzutech/kroki](https://github.com/yuzutech/kroki)
  - MIT, Java
  - https://kroki.io
- 参考
  - [asciiflow](https://asciiflow.com/)
    - 画图可用 ditaa 渲染
  - JS Zlib [nodeca/pako](https://github.com/nodeca/pako)

```bash
# GET deflate + base64
# POST plain
enc=$(echo 'digraph G {Hello->World}' | python -c "import sys; import base64; import zlib; print(base64.urlsafe_b64encode(zlib.compress(sys.stdin.read(), 9)))")
curl https://kroki.io/graphviz/svg/$enc
```

```http
### POST json
POST https://kroki.io

{
  "diagram_source": "digraph G {Hello->World}",
  "diagram_type": "graphviz",
  "output_format": "svg"
}

### POST accept
POST https://kroki.io/graphviz
Accept: image/svg+xml
Content-Type: text/plain

digraph G {
  Hello->World
}

### POST plain
POST https://kroki.io/graphviz/svg
Content-Type: text/plain

digraph G {
  Hello->World
}

### POST json with format in path
POST https://kroki.io/graphviz/svg

{
  "diagram_source": "digraph G {Hello->World}"
}
```
