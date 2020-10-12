# jq
* https://jqplay.org/
* https://stedolan.github.io/jq/manual/

```bash
jq '.components.rows|=sort_by(.id)|.components.rows[].properties|=sort_by(.name)' file.json
```
