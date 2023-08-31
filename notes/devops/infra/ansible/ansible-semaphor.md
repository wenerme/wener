---
title: semaphore
---

# semaphore

- [ansible-semaphore/semaphore](https://github.com/ansible-semaphore/semaphore)
  - MIT, Go, Vue

```bash
# /etc/semaphore/config.json
docker run --rm -it \
  -e SEMAPHORE_ADMIN_NAME=admin \
  -e SEMAPHORE_ADMIN=admin \
  -e SEMAPHORE_ADMIN_EMAIL=admin@localhost \
  -e SEMAPHORE_ADMIN_PASSWORD=CHANGEME \
  -e SEMAPHORE_DB_DIALECT=bolt \
  -p 3000:3000 \
  -v $PWD/conf:/etc/semaphore \
  -v $PWD/data:/var/lib/semaphore \
  semaphoreui/semaphore:latest
```

```json
{
  "ansible_ssh_common_args": "-F ./ssh.config"
}
```
