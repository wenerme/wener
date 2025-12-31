---
title: Rush
tags:
  - Node.js
  - Monorepo
  - Tooling
---

# Rush

- [microsoft/rushstack](https://github.com/microsoft/rushstack)
  - MIT, TypeScript
  - Rush: a scalable monorepo manager for the web
- [Official Site](https://rushjs.io/)

```bash
# Install
npm install -g @microsoft/rush

# Recreate symlinks
rush update

# Purge and update if corrupted
rush update --purge
```

Rush optimizes by installing all of your dependency packages in a central folder, and then uses symlinks to create the “node_modules” folder for each of your projects.
