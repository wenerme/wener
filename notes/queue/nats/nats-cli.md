---
title: nats
---

# nats

- [nats-io/natscli](https://github.com/nats-io/natscli)
- ~/.config/nats/
  - context.txt - 当前上下文

```bash
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

```
usage: nats [<flags>] <command> [<args> ...]

NATS Utility

NATS Server and JetStream administration.

See 'nats cheat' for a quick cheatsheet of commands



Flags:
  -h, --help                    Show context-sensitive help (also try --help-long and --help-man).
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
      --js-event-prefix=PREFIX  Subject prefix for access to JetStream Advisories
      --context=CONTEXT         Configuration context
      --trace                   Trace API interactions

Commands:
  help [<command>...]
    Show help.

  account info
    Account information

  backup [<flags>] <output>
    JetStream configuration backup utility

  bench [<flags>] <subject>
    Benchmark utility

  consumer add [<flags>] [<stream>] [<consumer>]
    Creates a new Consumer

  consumer copy [<flags>] <stream> <source> <destination>
    Creates a new Consumer based on the configuration of another

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

  context show [<flags>] [<name>]
    Show the current or named context

  context validate [<flags>] [<name>]
    Validate one or all contexts

  events [<flags>]
    Show Advisories and Events

  latency --server-b=SERVER-B [<flags>]
    Perform latency tests between two NATS servers

  pub [<flags>] <subject> [<body>]
    Generic data publish utilty

    Body and Header values of the messages may use Go templates to create unique messages.

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
    Generic data request utility

    Body and Header values of the messages may use Go templates to create unique messages.

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

  rtt [<flags>] [<iterations>]
    Compute round-trip time to NATS server

  reply [<flags>] <subject> [<body>]
    Generic service reply utility

    The "command" supports extracting some information from the subject the request came in on.

    When the subject being listened on is "weather.>" a request on "weather.london" can extract the "london" part and
    use it in the command string:

      nats reply 'weather.>' --command "curl -s wttr.in/{{1}}?format=3"

    This will request the weather for london when invoked as:

      nats request weather.london ''

    The body and Header values of the messages may use Go templates to create unique messages.

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

  schema search [<flags>] [<pattern>]
    Search schemas using a pattern

  schema show [<flags>] <schema>
    Show the contents of a schema

  schema validate [<flags>] <schema> <file>
    Validates a JSON file against a schema

  server info [<server>]
    Show information about a single server

  server list [<flags>] [<expect>]
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
    Checks the health of mirrored streams, streams with sources or clustered streams

  server check meta --expect=SERVERS --lag-critical=OPS --seen-critical=DURATION
    Check JetStream cluster state

  stream add [<flags>] [<stream>]
    Create a new Stream

  stream edit [<flags>] [<stream>]
    Edits an existing stream

  stream info [<flags>] [<stream>]
    Stream information

  stream ls [<flags>]
    List all known Streams

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

  stream restore [<flags>] <stream> <file>
    Restore a Stream over the NATS network

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

  sub [<flags>] [<subject>]
    Generic subscription client

  cheat [<flags>] [<section>]
    Cheatsheets for the nats CLI

    These cheatsheets are in a format compatible with the popular https://github.com/cheat/cheat command.
```
