---
title: Rundeck
---

# Rundeck

- https://docs.rundeck.com/3.0.9/manual/getting-started.html
- admin:admin
- RUNDECK_DATABASE_URL
- RUNDECK_DATABASE_USERNAME
- RUNDECK_DATABASE_PASSWORD

```bash
# -v /home/protip/.ssh:/home/rundeck/.ssh
docker run --rm -it --name some-rundeck -p 4440:4440 -v $PWD/data:/home/rundeck/server/data rundeck/rundeck:3.0.9
```
