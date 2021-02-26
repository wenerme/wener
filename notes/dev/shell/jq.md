# jq
* https://jqplay.org/
* https://stedolan.github.io/jq/manual/

```bash
jq '.components.rows|=sort_by(.id)|.components.rows[].properties|=sort_by(.name)' file.json

# inplace edit
jqi() {
  cat <<< "$(jq "$1" < "$2")" > "$2"
}
jqi ".a=1" test.json
```
