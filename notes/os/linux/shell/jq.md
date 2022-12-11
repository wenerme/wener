---
title: jq
---

# jq

- https://jqplay.org/
- https://stedolan.github.io/jq/manual/

:::tip

- jq 不支持 inplace 修改

:::

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

# array
# 非对象场景
jq -c '.[]' names.json | xargs -L 1 echo
# 对象场景
jq -j '.[] | tostring + "\u0000"' names.json | xargs -0 -n1 -I {} jq -n {}
# 便利数组对象字段
jq -j '.builds[] | tostring + "\u0000"' build.json | xargs -0 -n1 -I {} sh -c "jq -n '{}' | jq -r .name"


mapfile -t configArr < <(jq -c '.[]'  < app-cnfg.json)
for config in "${configArr[@]}"; do
    aws dynamodb put-item --table-name "xxx" --item "$config"
done

while IFS= read -r config; do
    aws dynamodb put-item --table-name "xxx" --item "$config"
done< <(jq -c '.[]' < app-cnfg.json)

# arg
jq --arg v "$PRJNAME" '.dev.projects[$v]' config.json


# 通过 redirect
jq '.key' <<< "$json_data"
# 通过 arg
jq -n --argjson data "$json_data" '$data.key'
# 通过环境变量
json_data="$json_data" jq -n 'env.json_data | fromjson.key'
# 通过变量
jq -n "$json_data" | jq .key

# jsonl
jq -c '.[]'                           # array to jsonl
jq -n '[inputs]' <in.jsonl >out.json  # jsonl to array
jq --slurp . <in.jsonl >out.json      # jsonl to array
```

## parse error: Invalid numeric literal at line 1, column 3

- 可能是因为有 BOM

```bash
dos2unix in.json
```
