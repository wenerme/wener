---
title: WebCrypto
---

# WebCrypto

- 部分浏览器要求 HTTPS
- 参考
  - [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
  - [sha256](https://gist.github.com/GaspardP/fffdd54f563f67be8944)
  - https://lapo.it/asn1js/
  - [travist/jsencrypt](https://github.com/travist/jsencrypt)
    - 非常古早的加密库
    - OpenSSL RSA Encryption, Decryption, Key Generation
    - https://travistidwell.com/jsencrypt/demo/
    - PKCS#5 [#35](https://github.com/travist/jsencrypt/issues/35)
  - [brix/crypto-js](https://github.com/brix/crypto-js)
    - 不再维护
  - [safebash/opencrypto](https://github.com/safebash/opencrypto)
  - 支持的算法
    - https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto#supported_algorithms
    - [Choice of Algorithms in the W3C Crypto API](https://cryptosense.com/blog/choice-of-algorithms-in-the-w3c-crypto-api)
  - ⚠️ 不支持 RSASSA-PKCS1-v1_5
- format
  - raw
  - pkcs8 - PKCS #8
    - PKCS#1 是旧的格式
  - spki - SubjectPublicKeyInfo
  - jwk
- PKCS5
  - 密码
  - unwrapKey
    - https://stackoverflow.com/questions/59349485
    - https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/unwrapKey

```bash
# pkcs1 -> pkcs8
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in pkcs1.key -out pkcs8.key
```

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
