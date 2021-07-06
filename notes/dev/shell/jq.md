---
title: jq
---

# jq

- https://jqplay.org/
- https://stedolan.github.io/jq/manual/

```bash
jq '.components.rows|=sort_by(.id)|.components.rows[].properties|=sort_by(.name)' file.json

# inplace edit
jqi() {
  cat <<< "$(jq "$1" < "$2")" > "$2"
}
jqi ".a=1" test.json

# merge
jq -s add a.json b.json c.json

# deep merge
jq -s 'reduce .[] as $x ({}; . * $x)' a.json b.json
```
