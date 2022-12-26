---
title: WebCrypto
---

# WebCrypto

- 部分浏览器要求 HTTPS
- 参考
  - [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
  - [sha256](https://gist.github.com/GaspardP/fffdd54f563f67be8944)
  - https://lapo.it/asn1js/
  - https://travistidwell.com/jsencrypt/demo/
- format
  - raw
  - pcks8 - PKCS #8
  - spki - SubjectPublicKeyInfo
  - jwk


## Member RsaHashedImportParams.hash is required and must be an instance of (object or DOMString)

```ts
await crypto.subtle.importKey('raw', PEM.decode(key).block.bytes, 'RSA-OAEP', false, ['decrypt']);
await crypto.subtle.importKey(
  'raw',
  PEM.decode(key).block.bytes,
  {
    name: 'RSA-OAEP',
    hash: 'SHA-265',
  },
  false,
  ['decrypt'],
);
```
