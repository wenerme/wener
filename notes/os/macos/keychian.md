---
title: macOS Keychain
---

# Keychain

```bash
# /usr/bin/security
# /Library/Keychains/System.keychain
# $HOME/Library/Keychains/login.keychain-db
security list-keychains

# -d decrypt
security dump-keychain

# DataGrip
security find-generic-password -s 'IntelliJ Platform DB — c0adc4b7-1cff-44f1-ac52-65d5a133f7bc'
```

- key
  - cap
    - derive
    - sign
    - unwrap
    - verify
    - wrap
  - type
    - symmetric, public, private
- https://apple.stackexchange.com/q/137250/103557
