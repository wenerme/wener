---
title: Visual Studio Code
---

# Visual Studio Code

:::caution

- Remote Development 是不开源的
- 非 VSC 不能使用官方的插件

:::

- Web
  - https://github.com/microsoft/vscode/issues/135856

## 常用快捷键 {#shortcuts}

| 快捷键                        | 功能                                 |
| ----------------------------- | ------------------------------------ |
| <kbd>Ctrl + -</kbd>           | 后退编辑位置                         |
| <kbd>Shift + Ctrl + -</kbd>   | 前进编辑位置                         |
| <kbd>Ctrl + P</kbd>           | 快速打开文件                         |
| <kbd>Ctrl + Shift + P</kbd>   | 打开命令面板                         |
| <kbd>Ctrl + /</kbd>           | 注释/取消注释                        |
| <kbd>Alt + Shift + F</kbd>    | 格式化文档                           |
| <kbd>Ctrl + B</kbd>           | 切换侧边栏                           |
| <kbd>Ctrl + `</kbd>           | 切换终端                             |
| <kbd>Ctrl + Shift + N</kbd>   | 新建窗口                             |
| <kbd>Ctrl + W</kbd>           | 关闭窗口                             |
| <kbd>F8</kbd>                 | 下一个错误位置 Edit.GoToNextLocation |
| <kbd>Shift + F8</kbd>         | 上一个错误位置                       |
| <kbd>Ctrl + Shift + F12</kbd> | View.NextError                       |

- https://code.visualstudio.com/docs/configure/keybindings

## 插件

- [zenclabs/previewjs](https://github.com/zenclabs/previewjs)
  - Preview React, Vue

### Remote Development

- [ms-vscode-remote.vscode-remote-extensionpack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)
- 支持远程开发
  - WSL
  - 容器
  - SSH
    - ~还不支持 macOS [#24](https://github.com/microsoft/vscode-remote-release/issues/24)~
    - 不支持 musl AlpineLinux
      - insider 版本支持 [#54](https://github.com/microsoft/vscode-remote-release/issues/54#issuecomment-504385332)
      - musl 支持 [#423](https://github.com/microsoft/vscode-remote-release/issues/423)
        - 目前加 gcompat 可能可用
  - 未开源

```bash
# macOS 可通过容器来提供端口进行控制
docker run -d -p 2222:22 -v $HOME:/host --name sshd wener/app
docker exec sshd sh -c 'echo admin:admin | chpasswd'

docker exec sshd apk add musl libgcc libstdc++
# 测试本地登录
ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null admin@127.0.0.1 -p 2222

# glibc

# 远程打开
# code --remote ssh-remote+root@server.com <your-directory>
```

## setting

- Windows: `%APPDATA%\Code\User\settings.json`
- macOS: `$HOME/Library/Application Support/Code/User/settings.json`
- Linux: `$HOME/.config/Code/User/settings.json`
- Project `.vscode/settings.json`

```json
{
  "files.associations": {
    "*.md": "mdx"
  }
}
```

- 参考
  - https://code.visualstudio.com/docs/configure/settings
