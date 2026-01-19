---
title: tssh
---
# tssh


- [trzsz/trzsz-ssh](https://github.com/trzsz/trzsz-ssh)
  - MIT, Go
  - 支持 zmodem
  - 支持 expect
  - 支持密码
  - 支持 UDP, KCP - UdpMode Yes/QUIC/KCP
    - tsshd

```bash
# go install github.com/trzsz/trzsz-ssh/cmd/tssh@latest

brew install trzsz-ssh
```

- $XDG_CONFIG_HOME/tssh/tssh.conf
- ~/.tssh.conf
- PromptThemeLayout
- PromptThemeColors

```
Host *
#!! EnableDragFile Yes
# 覆盖上传
#!! DragFileUploadCommand trz -y
# 剪切板, Linux xclip, xsel
#!! EnableOSC52 Yes

# tssh --zmodem
#!! EnableZmodem Yes
#!! DragFileUploadCommand rz
```
