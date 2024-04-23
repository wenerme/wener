---
title: ejbca
---

# ejbca

- [Keyfactor/ejbca-ce](https://github.com/Keyfactor/ejbca-ce)
  - LPLv2.1, Java
  - OAuth
  - https://hub.docker.com/r/keyfactor/ejbca-ce

```bash
# https://ejbca:443/ejbca/adminweb/
docker run -it --rm -p 80:8080 -p 443:8443 -h ejbca -e TLS_SETUP_ENABLED="simple" keyfactor/ejbca-ce
```

- /opt/keyfactor
- TLS_SETUP_ENABLED
  - simple - 测试用，不安全
    - ManagementCA
  - true
  - later
- DATABASE_JDBC_URL
  - `jdbc:h2:/mnt/persistent/ejbcadb;DB_CLOSE_DELAY=-1`
  - `jdbc:h2:mem:ejbcadb;DB_CLOSE_DELAY=-1`
- DATABASE_USER
- DATABASE_PASSWORD
- PASSWORD_ENCRYPTION_KEY
- CA_KEYSTOREPASS
- EJBCA_CLI_DEFAULTPASSWORD
