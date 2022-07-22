---
title: hardhat
---

# hardhat

- [NomicFoundation/hardhat](https://github.com/NomicFoundation/hardhat)
- hardhat.config.js
- localhost
  - chainId: 1337
  - http://127.0.0.1:8545

:::tip

- MetaMask 需要设置 chainId 为 1337
  - https://hardhat.org/metamask-issue.html
  - https://github.com/MetaMask/metamask-extension/issues/10290

:::

```bash
npx hardhat
npx hardhat compile
npx hardhat node

npx hardhat run scripts/deploy.ts --network localhost
```

- https://hardhat.org/config/
