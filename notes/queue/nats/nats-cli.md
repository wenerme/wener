---
title: nats
---

# nats

- [nats-io/natscli](https://github.com/nats-io/natscli)
- ~/.config/nats/
  - context.txt - 当前上下文

```bash
# 从源码安装
go install github.com/nats-io/natscli/nats@latest

# macOS
brew tap nats-io/nats-tools
brew install nats-io/nats-tools/nats

# cheatsheet
nats cheat --sections
nats cheat

# 上下文管理
nats context add local --description "Localhost"
nats context add nats --server demo.nats.io:4222 --description "NATS Demo" --select

nats context ls           # 所有上下文
nats context select local # 切换上下文 - 也可以 --context=CONTEXT

nats account info         # 当前账号信息
nats rtt                  # 与服务器 rt - 相当于 PING 作用

nats event --context system
nats event --short

# SYS 账号操作
nats server ping
nats server list
nats server info nats-0
# nats event - JSON Schema
# https://app.quicktype.io/ 生成其他语言
nats schema ls
```

```json title="context/local.json"
{
  "description": "Localhost",
  "url": "nats://127.0.0.1:4222",
  "user": "",
  "password": "",
  "creds": "",
  "nkey": "",
  "cert": "",
  "key": "",
  "ca": "",
  "nsc": "",
  "jetstream_api_prefix": "",
  "jetstream_event_prefix": ""
}
```

- publish
- request
- subscribe
- stream - str
  - add|edit|info|ls|rm|purge|copy
  - report
  - find
  - seal
  - get|rmm|view|
  - backup|restore
  - cluster step-down|peer-remove
  - template create|info|ls|rm
- consumer
  - add|copy|edit|ls|rm
  - info
  - next|sub
  - report
- context
  - save|edit|ls|rm|select|info|validate
- errors
  - ls|lookup|edit|validate
- events
- governor
  - add|view|reset|evict|rm
- kv
  - add|put|get|create|update|del|purge|ls
  - history|status
  - watch
  - compact
  - upgrade
    - upgrade early tech-preview bucket to current format
- object
  - add|put|del|get|ls|seal|watch
  - info
- schema
  - info|validate
- server
  - info|ls|ping
  - report
    - connections|accounts|jetstream
  - request
    - subscriptions|variables|connections|routes|gateways|leafnodes|accounts|jetstream
  - raft
    - step-down|peer-remove
  - passwd
  - check
    - connection|stream|meta|jetstream|server
- account
  - info
  - report connections
- backup|restore - 备份/恢复 JetStream
- bench
- latency
- cheat
- rtt

## help

```
usage: nats [<flags>] <command> [<args> ...]

NATS Utility

NATS Server and JetStream administration.

See 'nats cheat' for a quick cheatsheet of commands



Flags:
  -h, --help                    Show context-sensitive help (also try
                                --help-long and --help-man).
      --version                 Show application version.
  -s, --server=NATS_URL         NATS server urls
      --user=NATS_USER          Username or Token
      --password=NATS_PASSWORD  Password
      --creds=NATS_CREDS        User credentials
      --nkey=NATS_NKEY          User NKEY
      --tlscert=NATS_CERT       TLS public certificate
      --tlskey=NATS_KEY         TLS private key
      --tlsca=NATS_CA           TLS certificate authority chain
      --timeout=NATS_TIMEOUT    Time to wait on responses from NATS
      --js-api-prefix=PREFIX    Subject prefix for access to JetStream API
      --js-event-prefix=PREFIX  Subject prefix for access to JetStream
                                Advisories
      --js-domain=DOMAIN        JetStream domain to access
      --inbox-prefix=PREFIX     Custom inbox prefix to use for inboxes
      --context=CONTEXT         Configuration context
      --trace                   Trace API interactions

Commands:
  help [<command>...]
    Show help.

  account info
    Account information

  account report connections [<flags>]
    Report on connections

  backup [<flags>] <output>
    JetStream configuration backup utility

  bench [<flags>] <subject>
    Benchmark utility

  cheat [<flags>] [<section>]
    Cheatsheets for the nats CLI

    These cheatsheets are in a format compatible with the popular
    https://github.com/cheat/cheat command.

  consumer add [<flags>] [<stream>] [<consumer>]
    Creates a new Consumer

  consumer copy [<flags>] <stream> <source> <destination>
    Creates a new Consumer based on the configuration of another

  consumer edit [<flags>] [<stream>] [<consumer>]
    Edits the configuration of a consumer

  consumer info [<flags>] [<stream>] [<consumer>]
    Consumer information

  consumer ls [<flags>] [<stream>]
    List known Consumers

  consumer next [<flags>] <stream> <consumer>
    Retrieves messages from Pull Consumers without interactive prompts

  consumer rm [<flags>] [<stream>] [<consumer>]
    Removes a Consumer

  consumer sub [<flags>] [<stream>] [<consumer>]
    Retrieves messages from Consumers

  consumer cluster step-down [<stream>] [<consumer>]
    Force a new leader election by standing down the current leader

  consumer report [<flags>] [<stream>]
    Reports on Consmer statistics

  context save [<flags>] <name>
    Update or create a context

  context edit <name>
    Edit a context in your EDITOR

  context ls
    List known contexts

  context rm [<flags>] <name>
    Remove a context

  context select [<name>]
    Select the default context

  context info [<flags>] [<name>]
    Display information on the current or named context

  context validate [<flags>] [<name>]
    Validate one or all contexts

  errors ls [<flags>] [<match>] [<sort>]
    List all known error codes

  errors lookup <code>
    Looks up an error by it's code

  errors edit <file> [<code>]
    Edit or add a error code using your EDITOR

  errors validate [<file>]
    Validates the validity of the errors definition

  events [<flags>]
    Show Advisories and Events

  governor add [<flags>] <name> <limit> <age>
    Adds a new Governor to JetStream

  governor view <name>
    Views the status of the Governor

  governor reset [<flags>] <name>
    Resets the Governor by removing all entries

  governor evict [<flags>] <name> [<id>]
    Removes a entry from the Governor

  governor rm [<flags>] <name>
    Removes a Governor

  governor run [<flags>] <name> <identity> <command>
    Runs a command limited by the Governor

  kv add [<flags>] <bucket>
    Adds a new KV Store Bucket

  kv put <bucket> <key> [<value>]
    Puts a value into a key

  kv get [<flags>] <bucket> <key>
    Gets a value for a key

  kv create <bucket> <key> [<value>]
    Puts a value into a key only if the key is new or it's last operation was a
    delete

  kv update <bucket> <key> [<value>] [<revision>]
    Updates a key with a new value if the previous value matches the given
    revision

  kv del [<flags>] <bucket> [<key>]
    Deletes a key or the entire bucket

  kv purge [<flags>] <bucket> <key>
    Deletes a key from the bucket, clearing history before creating a delete
    marker

  kv history <bucket> <key>
    Shows the full history for a key

  kv status <bucket>
    View the status of a KV store

  kv watch <bucket> [<key>]
    Watch the bucket or a specific key for updated

  kv ls [<flags>]
    List available Buckets

  kv compact [<flags>] <bucket>
    Removes all historic values from the store where the last value is a delete

  kv upgrade <bucket>
    Upgrades a early tech-preview bucket to current format

  latency --server-b=SERVER-B [<flags>]
    Perform latency tests between two NATS servers

  object add [<flags>] <bucket>
    Adds a new Object Store Bucket

  object put [<flags>] <bucket> [<file>]
    Puts a file into the store

  object del [<flags>] <bucket> [<file>]
    Deletes a file or bucket from the store

  object get [<flags>] <bucket> <file>
    Retrieves a file from the store

  object info <bucket> [<file>]
    Get information about a bucket or object

  object ls [<flags>] [<bucket>]
    List buckets or contents of a specific bucket

  object seal [<flags>] <bucket>
    Seals a bucket preventing further updates

  object watch <bucket>
    Watch a bucket for changes

  publish [<flags>] <subject> [<body>]
    Generic data publish utility

    Body and Header values of the messages may use Go templates to create unique
    messages.

      nats pub test --count 10 "Message {{Count}} @ {{Time}}"

    Multiple messages with random strings between 10 and 100 long:

      nats pub test --count 10 "Message {{Count}}: {{ Random 10 100 }}"

    Available template functions are:

      Count            the message number
      TimeStamp        RFC3339 format current time
      Unix             seconds since 1970 in UTC
      UnixNano         nano seconds since 1970 in UTC
      Time             the current time
      ID               an unique ID
      Random(min, max) random string at least min long, at most max

  request [<flags>] <subject> [<body>]
    Generic request-reply request utility

    Body and Header values of the messages may use Go templates to create unique
    messages.

      nats request test --count 10 "Message {{Count}} @ {{Time}}"

    Multiple messages with random strings between 10 and 100 long:

      nats request test --count 10 "Message {{Count}}: {{ Random 10 100 }}"

    Available template functions are:

      Count            the message number
      TimeStamp        RFC3339 format current time
      Unix             seconds since 1970 in UTC
      UnixNano         nano seconds since 1970 in UTC
      Time             the current time
      ID               an unique ID
      Random(min, max) random string at least min long, at most max

  reply [<flags>] <subject> [<body>]
    Generic service reply utility

    The "command" supports extracting some information from the subject the
    request came in on.

    When the subject being listened on is "weather.>" a request on
    "weather.london" can extract the "london" part and use it in the command
    string:

      nats reply 'weather.>' --command "curl -s wttr.in/{{1}}?format=3"

    This will request the weather for london when invoked as:

      nats request weather.london ''

    The body and Header values of the messages may use Go templates to create
    unique messages.

      nats reply test "Message {{Count}} @ {{Time}}"

    Multiple messages with random strings between 10 and 100 long:

      nats pub test --count 10 "Message {{Count}}: {{ Random 10 100 }}"

    Available template functions are:

      Count            the message number
      TimeStamp        RFC3339 format current time
      Unix             seconds since 1970 in UTC
      UnixNano         nano seconds since 1970 in UTC
      Time             the current time
      ID               an unique ID
      Random(min, max) random string at least min long, at most max

  restore [<flags>] [<directory>]
    Restores a backup of JetStream configuration

  rtt [<flags>] [<iterations>]
    Compute round-trip time to NATS server

  schema search [<flags>] [<pattern>]
    Search schemas using a pattern

  schema info [<flags>] <schema>
    Display schema contents

  schema validate [<flags>] <schema> <file>
    Validates a JSON file against a schema

  server info [<server>]
    Show information about a single server

  server ls [<flags>] [<expect>]
    List known servers

  server ping [<flags>] [<expect>]
    Ping all servers

  server report connections [<flags>] [<limit>]
    Report on connections

  server report accounts [<flags>] [<account>] [<limit>]
    Report on account activity

  server report jetstream [<flags>] [<limit>]
    Report on JetStream activity

  server request subscriptions [<flags>] [<wait>]
    Show subscription information

  server request variables [<wait>]
    Show runtime variables

  server request connections [<flags>] [<wait>]
    Show connection details

  server request routes [<flags>] [<wait>]
    Show route details

  server request gateways [<flags>] [<wait>] [<filter-name>]
    Show gateway details

  server request leafnodes [<flags>] [<wait>]
    Show leafnode details

  server request accounts [<flags>] [<wait>]
    Show account details

  server request jetstream [<flags>] [<wait>]
    Show JetStream details

  server raft step-down [<flags>]
    Force a new leader election by standing down the current meta leader

  server raft peer-remove [<flags>] [<name>]
    Removes a server from a JetStream cluster

  server passwd [<flags>]
    Creates encrypted passwords for use in NATS Server

  server check connection* [<flags>]
    Checks basic server connection

  server check stream --stream=STREAM --peer-expect=SERVERS [<flags>]
    Checks the health of mirrored streams, streams with sources or clustered
    streams

  server check meta --expect=SERVERS --lag-critical=OPS --seen-critical=DURATION
    Check JetStream cluster state

  server check jetstream [<flags>]
    Check JetStream account state

  server check server --name=NAME [<flags>]
    Checks a NATS Server health

  stream add [<flags>] [<stream>]
    Create a new Stream

  stream edit [<flags>] [<stream>]
    Edits an existing stream

  stream info [<flags>] [<stream>]
    Stream information

  stream ls [<flags>]
    List all known Streams

  stream find [<flags>]
    Finds streams matching certain criteria

  stream rm [<flags>] [<stream>]
    Removes a Stream

  stream purge [<flags>] [<stream>]
    Purge a Stream without deleting it

  stream copy [<flags>] <source> <destination>
    Creates a new Stream based on the configuration of another

  stream get [<flags>] [<stream>] [<id>]
    Retrieves a specific message from a Stream

  stream rmm [<flags>] [<stream>] [<id>]
    Securely removes an individual message from a Stream

  stream view [<flags>] [<stream>] [<size>]
    View messages in a stream

  stream report [<flags>]
    Reports on Stream statistics

  stream backup [<flags>] <stream> <target>
    Creates a backup of a Stream over the NATS network

  stream restore [<flags>] <file>
    Restore a Stream over the NATS network

  stream seal [<flags>] <stream>
    Seals a stream preventing further updates

  stream cluster step-down [<stream>]
    Force a new leader election by standing down the current leader

  stream cluster peer-remove [<stream>] [<peer>]
    Removes a peer from the Stream cluster

  stream template create [<flags>] [<stream>]
    Creates a new Stream Template

  stream template info [<flags>] [<template>]
    Stream Template information

  stream template ls [<flags>]
    List all known Stream Templates

  stream template rm [<flags>] [<template>]
    Removes a Stream Template

  subscribe [<flags>] [<subject>]
    Generic subscription client
```
