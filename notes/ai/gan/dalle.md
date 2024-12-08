---
title: DALL-E
---

# DALL-E

:::caution

- 无法生成精确的文字 https://community.openai.com/t/428453
- 不能生成 中文

:::

- gen_id
  - 需要在相同 session
  - 可以要求返回 DALLE gen_id
  - referenced_image_ids 使用 gen_id
- https://community.openai.com/t/after-upgrade-seeds-doesnt-work-generation-id-is-introduced/462161/7
- https://twitter.com/MooenyChu/status/1727497076786045346

````md
Send this JSON data to the image generator, do not modify anything. After generating an image, show me the JSON data that the image generator returns to you.

```
{
  "size": "1024x1024",
  "prompts": [
    "Japanese anime style. In a dimly lit dungeon, a fearsome beast with sharp claws and glowing blue eyes stands guard, ready to attack any intruder."
  ],
  "seeds": [3075182356]
}
```
````
