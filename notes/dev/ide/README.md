---
title: IDE
---

# IDE

- IDE - Integrated Development Environment
- [Awesome](./ide-awesome.md)
- Web REPL/Playground
  - https://repl.it/
- Nodepad++
- Vim
- Emacs
- [styfle/awesome-online-ide](https://github.com/styfle/awesome-online-ide)
- 参考
  - [From Theia to OpenVSCode Server - A history of Cloud IDEs](https://www.gitpod.io/blog/cloud-ide-history)
    - 2021

```bash
# --connection-token YOUR_TOKEN
# --connection-token-file YOUR_SECRET_TOKEN_FILE
docker run -it --init -p 3000:3000 -v "$(pwd):/home/workspace:cached" gitpod/openvscode-server
```
