---
title: Scalars
---

# Scalar Formats

- 字符串的格式
  - stringify
  - parse

| format             | example                                                                                                              |
| ------------------ | -------------------------------------------------------------------------------------------------------------------- |
| **Structure Data** |
| JSON               | `[]`,`{}`,`null`                                                                                                     |
| JSONObject         | `{}`                                                                                                                 |
| XML                | `<tag>value</tag>`                                                                                                   |
| **Primative**      |
| String             | `"string"`                                                                                                           |
| Number             | `1`,`1.1`                                                                                                            |
| Boolean            | `true`,`false`                                                                                                       |
| NULL               | `null`                                                                                                               |
| Undefined          | `undefined`                                                                                                          |
| **Collection**     |
| Array/Set/Map      | `[]`, `{}`                                                                                                           |
| **Temporal**       |
| Duration           | `1h30m`                                                                                                              |
| Timestamp          |
| DateTime           | `2021-01-01T00:00:00Z`                                                                                               |
| Date               | `2021-01-01`                                                                                                         |
| **Spec/Std**       |
| CountryCode        | `US`                                                                                                                 |
| Currency           | `USD`                                                                                                                |
| TimeZone/Offset    | `Asia/Shanghai`, `+08:00`, `CST`, `UTC+8`                                                                            |
| **ID/Key**         |
| CUID               | `cjo2j3n4k0000z1zj1z1z1z1z`                                                                                          |
| ULID               | `01D3XZ6Z1E4QZQZQZQZQZQZQZQ`                                                                                         |
| UUID               | `550e8400-e29b-41d4-a716-446655440000`                                                                               |
| DID                | `did:example:123456`                                                                                                 |
| LanguageCode       | `en`                                                                                                                 |
| DeweyDecimal       | `123.456`                                                                                                            |
| HexColor           | `#ff0000`                                                                                                            |
| Hexadecimal        | `0xff0000`                                                                                                           |
| ISBN               | `978-3-16-148410-0`                                                                                                  |
| MD5                | `d41d8cd98f00b204e9800998ecf8427e`                                                                                   |
| **Network**        |
| IPV4               | `1.1.1.1`                                                                                                            |
| IPV6               | `2001:0db8:85a3:0000:0000:8a2e:0370:7334`                                                                            |
| CIDR               | `1.1.1.1/24`                                                                                                         |
| MAC                | `00:11:22:33:44:55`                                                                                                  |
| URL                | `https://example.com`                                                                                                |
| URI                |
| URN                | `urn:isbn:0451450523`                                                                                                |
| UserAgent          | `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3` |

- CUID https://github.com/paralleldrive/cuid
- Currency https://en.wikipedia.org/wiki/ISO_4217
- CountryCode https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
- https://the-guild.dev/graphql/scalars/docs/scalars/account-number
- https://www.postgresql.org/docs/current/datatype.html
