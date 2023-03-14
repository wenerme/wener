---
title: tinode
---

# tinode

- [tinode/chat](https://github.com/tinode/chat)

## message format

```json
{
  "txt": "this is bold, code and italic, strike combined bold and italic an url: https://www.example.com/abc#fragment and another www.tinode.co this is a @mention and a #hashtag in a string second #hashtag",
  "fmt": [
    { "at": 8, "len": 4, "tp": "ST" },
    { "at": 14, "len": 4, "tp": "CO" },
    { "at": 23, "len": 6, "tp": "EM" },
    { "at": 31, "len": 6, "tp": "DL" },
    { "tp": "BR", "len": 1, "at": 37 },
    { "at": 56, "len": 6, "tp": "EM" },
    { "at": 47, "len": 15, "tp": "ST" },
    { "tp": "BR", "len": 1, "at": 62 },
    { "at": 120, "len": 13, "tp": "EM" },
    { "at": 71, "len": 36, "key": 0 },
    { "at": 120, "len": 13, "key": 1 },
    { "tp": "BR", "len": 1, "at": 133 },
    { "at": 144, "len": 8, "key": 2 },
    { "at": 159, "len": 8, "key": 3 },
    { "tp": "BR", "len": 1, "at": 179 },
    { "at": 187, "len": 8, "key": 3 },
    { "tp": "BR", "len": 1, "at": 195 }
  ],
  "ent": [
    { "tp": "LN", "data": { "url": "https://www.example.com/abc#fragment" } },
    { "tp": "LN", "data": { "url": "http://www.tinode.co" } },
    { "tp": "MN", "data": { "val": "mention" } },
    { "tp": "HT", "data": { "val": "hashtag" } }
  ]
}
```

| fmt  | for                                                                                                                |
| ---- | ------------------------------------------------------------------------------------------------------------------ |
| `BR` | line break.                                                                                                        |
| `CO` | code or monotyped text, possibly with different background: `monotype`.                                            |
| `DL` | deleted or strikethrough text: ~~strikethrough~~.                                                                  |
| `EM` | emphasized text, usually represented as italic: _italic_.                                                          |
| `FM` | form / set of fields; may also be represented as an entity.                                                        |
| `HD` | hidden content.                                                                                                    |
| `HL` | highlighted text, such as text in a different color or with a different background; the color cannot be specified. |
| `RW` | logical grouping of formats, a row; may also be represented as an entity.                                          |
| `ST` | strong or bold text: **bold**.                                                                                     |

| ent  | for                                                                                |
| ---- | ---------------------------------------------------------------------------------- |
| `AU` | embedded audio.                                                                    |
| `BN` | interactive button.                                                                |
| `EX` | generic attachment.                                                                |
| `FM` | form / set of fields; may also be represented as a basic decoration.               |
| `HT` | hashtag, e.g. [#hashtag](#).                                                       |
| `IM` | inline image.                                                                      |
| `LN` | link (URL) [https://api.tinode.co](https://api.tinode.co).                         |
| `MN` | mention such as [@tinode](#).                                                      |
| `RW` | logical grouping of formats, a row; may also be represented as a basic decoration. |
| `VC` | video (and audio) calls.                                                           |
| `VD` | inline video.                                                                      |

- ent.data
  - mime
  - val
  - ref
  - preview
  - duration
  - name
  - size
  - width
  - height
- VC ent.data
  - incoming
  - aonly
  - state
    - accepted
    - finished
    - disconnected
    - missed
    - declined
  - preref - preview ref
  - premime - preview mime
- act
  - pub
  - url
  - note
- https://github.com/tinode/chat/blob/master/docs/drafty.md
- card
  - https://github.com/tinode/chat/blob/master/docs/thecard.md
- c -> s
  - hi
    - id
    - ver
    - ua
    - dev
    - platf
    - lang
  - acc
    - id
    - user
    - token
    - status - ok
    - schema
    - secret
    - login
    - tags
    - cred
    - desc
  - sub
    - topic
    - bkg - by an automated agent
    - set
    - get
    - data
  - leave
  - pub
  - get
  - set
  - note - ephemeral notification
- s -> c
  - data
  - ctrl
  - meta
  - pres - important event
    - https://docs.google.com/spreadsheets/d/e/2PACX-1vStUDHb7DPrD8tF5eANLu4YIjRkqta8KOhLvcj2precsjqR40eDHvJnnuuS3bw-NcWsP1QKc7GSTYuX/pubhtml?gid=1959642482&single=true
  - info - Forwarded client-generated notification

```json
{
  "abc": {},
  "extra": {
    "attachments": ["/v0/file/s/sJOD_tZDPz0.jpg"],
    "obo": "usr2il9suCbuko", // Alternative user ID set by the root user (obo = On Behalf Of).
    "authlevel": "auth" // Altered authentication level set by the root user.
  }
}
```
