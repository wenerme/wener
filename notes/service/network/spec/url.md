---
tags:
  - RFC
---

# URI

- URL - Uniform Resource Locator
  - URI > URL & URN
  - [List of URI schemes](https://en.wikipedia.org/wiki/List_of_URI_schemes)
  - https://www.iana.org/assignments/uri-schemes/uri-schemes.xhtml
- URN - Uniform Resource Name
  - `<URN>:<NID>:<NSS>`
  - `urn:isbn:X`
  - URN 一般为 urn
  - NID - Namespace Identifier
  - NSS - Namespace Specific String
  - [rfc2141](https://datatracker.ietf.org/doc/html/rfc2141)
- URI - Uniform Resource Identifier
  - Scheme + Resource Identifier
  - [rfc3986](https://datatracker.ietf.org/doc/html/rfc3986)

## URL

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                            href                                                  │
├──────────┬──┬─────────────────────┬─────────────────────┬───────────────────────────┬────────────┤
│ protocol │  │        auth         │        host         │           path            │    hash    │
│          │  │                     ├──────────────┬──────┼──────────┬────────────────┤            │
│          │  │                     │   hostname   │ port │ pathname │     search     │            │
│          │  │                     │              │      │          ├─┬──────────────┤            │
│          │  │                     │              │      │          │ │    query     │            │
"  https:   //    user   :   pass   @ sub.host.com : 8080   /p/a/t/h  ?  query=string   #fragment  "
│          │  │          │          │   hostname   │ port │          │                │            │
│          │  │          │          ├──────────────┴──────┤          │                │            │
│ protocol │  │ username │ password │        host         │          │                │            │
├──────────┴──┼──────────┴──────────┼─────────────────────┤          │                │            │
│   origin    │                     │       origin        │ pathname │     search     │    hash    │
├─────────────┴─────────────────────┴─────────────────────┴──────────┴────────────────┴────────────┤
│                                            href                                                  │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

- protocol=schema
- hash=`#` fragment

**URL 长度限制**

- 一般建议 < 2000
- cloudfront 8k - header 20k
- fastly 8Kb
- cloudflare 16k

| Browser | Address bar | document.location |
| ------- | ----------- | ----------------- |
| Chrome  | 32779       | >64k              |
| Android | 8192        | >64k              |
| Firefox | >64k        | >64k              |
| Safari  | >64k        | >64k              |
| IE11    | 2047        | 5120              |
| Edge 16 | 2047        | 10240             |

- https://url.spec.whatwg.org/
- [medialize/URI.js](https://github.com/medialize/URI.js)

## References

- [rfc3986](https://datatracker.ietf.org/doc/html/rfc3986)
  Uniform Resource Identifier (URI): Generic Syntax
  - 2005
- [rfc1738](https://datatracker.ietf.org/doc/html/rfc1738)
  Uniform Resource Locators (URL)
  - 1994
- [rfc6570](https://datatracker.ietf.org/doc/html/rfc6570)
  URI Template
  - 2012
- [rfc8615](https://datatracker.ietf.org/doc/html/rfc8615)
  Well-Known Uniform Resource Identifiers (URIs)
  - 2019
  - `/.well-known/`
  - https://www.iana.org/assignments/well-known-uris/well-known-uris.xhtml
