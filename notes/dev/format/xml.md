---
title: xml
---

# xml

```bash
echo '<root><foo a="b">lorem</foo><bar value="ipsum" /></root>' > test.xml

# format
xmllint --format test.xml
tidy -xml -i -q test.xml
xmlstarlet format --indent-tab test.xml
```
