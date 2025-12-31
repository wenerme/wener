---
title: PostgreSQL Configuration
---

# PostgreSQL Configuration

## Tools

- [PGTune](https://pgtune.leopard.in.ua/) - Calculate optimal config based on hardware.

## Common Settings (`postgresql.conf`)

```ini
# Network
listen_addresses = '*'
max_connections = 100

# Memory
shared_buffers = 128MB  # ~25% of RAM
dynamic_shared_memory_type = posix

# WAL
max_wal_size = 1GB
min_wal_size = 80MB

# Locale & Time
log_timezone = 'UTC'
timezone = 'UTC'
datestyle = 'iso, mdy'
lc_messages = 'en_US.utf8'
default_text_search_config = 'pg_catalog.english'
```

## Logging Configuration

```ini
# Rotation
log_truncate_on_rotation = on
log_rotation_age = 1d
log_filename = 'postgresql-%a.log'
log_rotation_size = 0  # 0 to disable size-based rotation
```

## References

- [Logfile Maintenance](https://www.postgresql.org/docs/current/logfile-maintenance.html)
- [Spilo Configuration Script (Zalando)](https://github.com/zalando/spilo/blob/master/postgres-appliance/scripts/configure_spilo.py)
