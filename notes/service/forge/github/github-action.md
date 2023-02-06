---
title: Github Action
---

# Github Action

- [actions/virtual-environments](https://github.com/actions/virtual-environments)

:::caution

- 不支持允许错误 [#399](https://github.com/actions/toolkit/issues/399)

:::

:::info

- golangci-lint-action CI 耗时非常长 [#297](https://github.com/golangci/golangci-lint-action/issues/297)

:::

## pnpm template

```yaml
name: Build

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  build:
    runs-on: ubuntu-22.04

    steps:
      - uses: actions/checkout@v3
      - name: Install Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16
      - uses: pnpm/action-setup@v2.0.1
        name: Install pnpm
        id: pnpm-install
        with:
          version: 7
          run_install: false
      - name: Get pnpm store directory
        id: pnpm-cache
        run: |
          echo "::set-output name=pnpm_cache_dir::$(pnpm store path)"
      - name: Build Cache
        id: build-cache
        uses: actions/cache@v2
        with:
          path: ${{ steps.pnpm-cache.outputs.pnpm_cache_dir }}
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-pnpm-store-

      # Real build
      - run: make ci

      - name: Deploy Pages
        uses: JamesIves/github-pages-deploy-action@releases/v4
        with:
          branch: gh-pages
          folder: out
          single-commit: true
```

# FAQ

## compile: version does not match go tool version

```yaml
- name: Run CI
  run: |
    export PATH=${GOROOT}/bin:$PATH
    go version
```

- https://github.com/actions/setup-go/issues/107#issuecomment-854071850
