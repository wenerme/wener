---
title: gRPC PHP
tags:
  - PHP
---

# grpc-php

- https://github.com/grpc/grpc/blob/master/src/php/README.md
- ext-grpc

```bash
composer require grpc/grpc
composer require google/protobuf

pecl install grpc       # by pecl - e.g. macOS
apk add php82-pecl-grpc # AlpineLinux
```

```json title=composer.json
{
  "autoload": {
    "psr-4": {
      "App\\": "app/",
      "": "gen/"
    }
  }
}
```

```php
<?php
$client = new Helloworld\GreeterClient('localhost:50051', [
  // 'credentials' => Grpc\ChannelCredentials::createSsl(file_get_contents('<path to certificate>')),
  'credentials' => Grpc\ChannelCredentials::createInsecure(),
  'grpc.primary_user_agent' => 'my-user-agent-identifier',
  'grpc.max_receive_message_length' => 8*1024*1024,
  'grpc.default_compression_algorithm' => 2,
  'grpc.default_compression_level' => 2,
]);
```

```ini
# pcntl_fork
grpc.enable_fork_support = 1
grpc.poll_strategy = epoll1

# Tracing and Logging
# /var/log/grpc.log
grpc.grpc_verbosity=debug
grpc.grpc_trace=all,-polling,-polling_api,-pollable_refcount,-timer,-timer_check
```

**grpc.default_compression_algorithm**

```
0: No compression
1: Compress with DEFLATE algorithm
2: Compress with GZIP algorithm
3: Stream compression with GZIP algorithm
```

**grpc.default_compression_level**

```
0: None
1: Low level
2: Medium level
3: High level
```
