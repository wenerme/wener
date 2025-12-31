---
title: OpenSearch
tags:
  - Spec
  - Search
---

# OpenSearch

- [MDN: OpenSearch](https://developer.mozilla.org/en-US/docs/Web/OpenSearch)

## Template

`OpenSearchDescription.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/"
                       xmlns:moz="http://www.mozilla.org/2006/browser/search/">
  <ShortName>engineName</ShortName>
  <Description>engineDescription</Description>
  <InputEncoding>inputEncoding</InputEncoding>
  <Image width="16" height="16" type="image/x-icon">data:image/x-icon;base64,imageData</Image>
  <Url type="text/html" method="method" template="searchURL">
    <Param name="paramName1" value="paramValue1"/>
    <Param name="paramNameN" value="paramValueN"/>
  </Url>
  <Url type="application/x-suggestions+json" template="suggestionURL"/>
  <moz:SearchForm>searchFormURL</moz:SearchForm>
</OpenSearchDescription>
```

## Auto Discovery

Add `<link>` to `head`:

```html
<link
  rel="search"
  type="application/opensearchdescription+xml"
  title="MySite: By Author"
  href="http://www.mysite.com/mysiteauthor.xml"
/>
<link
  rel="search"
  type="application/opensearchdescription+xml"
  title="MySite: By Title"
  href="http://www.mysite.com/mysitetitle.xml"
/>
```
