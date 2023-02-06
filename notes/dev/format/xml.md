---
title: xml
---

# xml

```bash
# macOS 工具
brew install xmlstarlet

echo '<root><foo a="b">lorem</foo><bar value="ipsum" /></root>' > test.xml

# format
xmllint --format test.xml
tidy -xml -i -q test.xml
xmlstarlet format --omit-decl --indent-spaces 2 test.xml

# 添加属性
# -O omit xml tag
xmlstarlet ed -O --inplace -N x=http://www.w3.org/2000/svg \
  --update "x:svg/@fill" -v currentColor \
  --insert "/x:svg[not(@fill)]" --type attr -n fill -v currentColor
  icon.svg
```
