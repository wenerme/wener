---
title: Cryptography
tags:
  - Cryptography
  - Security
---

# Cryptography

- [IJCSET: A Comparison of Symmetric Key Algorithms](https://www.ijcset.com/docs/IJCSET15-06-05-055.pdf)
  - A COMPARISON OF SYMMETRIC KEY ALGORITHMS DES, AES, BLOWFISH, RC4, RC6: A SURVEY
- [Wiki: Symmetric-key algorithm](https://en.wikipedia.org/wiki/Symmetric-key_algorithm)
- [Symmetric Key Encryption: Why, Where and How it's Used in Banking](https://www.cryptomathic.com/news-events/blog/symmetric-key-encryption-why-where-and-how-its-used-in-banking)
- [WebCrypto Supported algorithms](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto#Supported_algorithms)
- WebCrypto 支持算法

## WebCrypto Operations

- `sign()`
- `verify()`
- `encrypt()`
- `decrypt()`
- `digest()`
- `deriveBits()`
- `deriveKey()`
- `wrapKey()`
- `unwrapKey()`

## Symmetric Encryption Algorithms

对称加密算法包括:

- **AES (Advanced Encryption Standard)**
- **DES (Data Encryption Standard)**
- **IDEA (International Data Encryption Algorithm)**
- **Blowfish** (Drop-in replacement for DES or IDEA)
- **RC4 (Rivest Cipher 4)**
- **RC5 (Rivest Cipher 5)**
- **RC6 (Rivest Cipher 6)**

两类对称加密算法:

1.  **Block algorithms**: Set lengths of bits are encrypted in blocks of electronic data with the use of a specific secret key. As the data is being encrypted, the system holds the data in its memory as it waits for complete blocks.
2.  **Stream algorithms**: Data is encrypted as it streams instead of being retained in the system’s memory.

AES, DES, IDEA, Blowfish, RC5 and RC6 are block ciphers. RC4 is stream cipher.

### Key Algorithms

- **AES (Advanced Encryption Standard)**
  - Supersedes DES.
  - Block size: 128 bits.
  - Key lengths: 128, 192, 256 bits.
  - [Wiki: Advanced Encryption Standard](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard)
  - [Wiki: Block cipher mode of operation](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Common_modes)
- **DES (Data Encryption Standard)**
  - 64-bit cipher, considered weak.
  - 3DES (Triple DES) still used in EMV chip cards but not recommended by NIST.
