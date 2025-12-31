---
title: Asterisk REST Interface (ARI)
tags:
  - Asterisk
  - ARI
  - HTTP
---

# Asterisk REST Interface (ARI)

- `res_ari.so`
- `res_ari_applications.so`
- `res_ari_asterisk.so`
- `res_ari_bridges.so`
- `res_ari_channels.so`
- `res_ari_device_states.so`
- `res_ari_endpoints.so`
- `res_ari_events.so`
- `res_ari_model.so`
- `res_ari_playbacks.so`
- `res_ari_recordings.so`
- `res_ari_sounds.so`

- [Introduction to ARI and Channels](https://wiki.asterisk.org/wiki/display/AST/Introduction+to+ARI+and+Channels)
- [Asterisk REST Interface (ARI)](https://wiki.asterisk.org/wiki/pages/viewpage.action?pageId=29395573)
- [How to get all dialer events from Asterisk REST API (ARI)?](https://stackoverflow.com/a/28080228/1870054)

The basic flow of an HTTP request is

- ast_ari_callback()
  1. Initial request validation
  2. Routes as either a doc request (ast_ari_get_docs) or API
     request (ast_ari_invoke)
  - ast_ari_invoke()
    1. Further request validation
    2. Routes the request through the tree of generated
       \ref stasis_rest_handlers.
    3. Dispatch to the generated callback
       - \c ast*ari*\*\_cb
         1. Populate \c \*\_args struct with path and get params
         2. Invoke the request handler
  3. Validates and sends response
