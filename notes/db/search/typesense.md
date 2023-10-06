---
title: typesense
---

# typesense

- [typesense/typesense](https://github.com/typesense/typesense)
  - GPL-3.0, C++

:::caution

- 不支持 CJK
  - Support for writing systems without spaces between words [typesense/typesense#228](https://github.com/typesense/typesense/issues/228)

:::

```bash
# TYPESENSE_API_KEY=$(uuidgen| tr -d '[:space:]' | tee -a /dev/fd/2 )
TYPESENSE_API_KEY=CHANGEME
docker run --rm -it \
  -v $PWD/data:/data \
  -p 8108:8108 \
  --name typesense typesense/typesense:0.25.1 \
  --data-dir /data --api-key=$TYPESENSE_API_KEY --enable-cors

TYPESENSE_HOST='http://localhost:8108'
TYPESENSE_API_KEY=CHANGEME

curl "${TYPESENSE_HOST}/health"

curl "${TYPESENSE_HOST}/collections" \
  -X POST \
  -H "Content-Type: application/json" \
  -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" \
  -d '{
        "name": "tang-poetry",
        "fields": [
          {"name": "author", "type": "string" },
          {"name": "paragraphs", "type": "string[]" },
          {"name": "tags", "type": "string[]"},
          {"name": "title", "type": "string" },
          {"name": "id", "type": "string", "facet": true  }
        ]
      }'

curl -LO https://github.com/chinese-poetry/chinese-poetry/raw/master/全唐诗/唐诗三百首.json
jq -c '.[]' 唐诗三百首.json > tang-poetry.jsonl

curl "${TYPESENSE_HOST}/collections/tang-poetry/documents/import" \
  -X POST \
  -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" \
  --data-binary @tang-poetry.jsonl

curl -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" \
  "${TYPESENSE_HOST}/collections/tang-poetry/documents/search?q=天涯&query_by=paragraphs"
```

- https://typesense.org/docs/0.25.1/api/server-configuration.html
