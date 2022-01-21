---
title: Parcel
---

# Parcel

## Get Started

```bash
yarn init -y
cat <<HTML > index.html
<html>
<body>
  <script src="./src/index.ts"></script>
</body>
</html>
HTML
mkdir -p src
cat <<TS > src/index.ts
export {};
console.log('hello world');
TS

yarn add parcel-bundler --dev

# dev
yarn parcel index.html
```
