---
title: onedev
---

# onedev

- https://code.onedev.io/projects/160
- [theonedev/onedev](https://github.com/theonedev/onedev)
  - MIT, Java
  - Kanban
  - CI/CD
  - Code Search
  - Service Desk
- manual https://code.onedev.io/projects/162

```bash
# http://localhost:6610
docker run -it --rm \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v $(pwd)/onedev:/opt/onedev \
  -p 6610:6610 -p 6611:6611 \
  1dev/server
```
