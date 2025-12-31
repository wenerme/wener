---
title: PostgreSQL SSL Configuration
tags:
  - SSL
---

# PostgreSQL SSL

## Introspection

```sql
SHOW ssl;
SHOW ssl_cert_file;
SHOW ssl_key_file;

-- Check backend SSL status
SELECT ssl FROM pg_stat_ssl WHERE pid = pg_backend_pid();
```

## Setup Script

Reference: [docker-postgres generate-ssl-certs.sh](https://github.com/infrastructure-as-code/docker-postgres/blob/main/generate-ssl-certs.sh)

```bash
SSL_DOMAIN=${SSL_DOMAIN:="pg.local"}
SSL_DAYS=${SSL_DAYS:=3650}
PGDATA=/var/lib/postgresql/data

echo "Generating self-signed SSL certificates for ${SSL_DOMAIN}"
openssl req -new -x509 -days ${SSL_DAYS} -nodes -text \
  -out "${PGDATA}/server.crt" \
  -keyout "${PGDATA}/server.key" \
  -subj "/CN=${SSL_DOMAIN}"

chown postgres:postgres "${PGDATA}/server.crt" "${PGDATA}/server.key"
chmod 0600 "${PGDATA}/server.key"

cat >> "${PGDATA}/postgresql.conf" << EOF
ssl = on
ssl_cert_file = '${PGDATA}/server.crt'
ssl_key_file = '${PGDATA}/server.key'
ssl_prefer_server_ciphers = on
EOF
```
