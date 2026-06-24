---
keywords:
  - 版本历史
  - 发布历史
tags:
  - Version
---

# macOS Version

- macOS 主版本通常每年 WWDC 公布、秋季正式发布；`softwareupdate --install --all` 适合安装当前可用更新。
- Apple 近年通常同时维护当前主版本和前两个主版本的安全更新，但支持窗口以 Apple Security Releases 实际列出的条目为准。
- 截至 Apple Security Releases 当前记录，latest macOS 为 `26.5.1`，同时仍有 Sequoia / Sonoma 安全更新线。

| macOS                 | Name        | Darwin | Released   | Latest / Status      | Safari    | Note                                                                                 |
| --------------------- | ----------- | ------ | ---------- | -------------------- | --------- | ------------------------------------------------------------------------------------ |
| [macOS 26](#macos-26) | Tahoe       | 25     | 2025-09-15 | latest 26.5.1        | Safari 26 | 统一到年份式平台版本号；Liquid Glass、Phone app、Spotlight action、Foundation Models |
| [macOS 15](#macos-15) | Sequoia     | 24     | 2024-09-16 | security line 15.7.x | Safari 18 | iPhone Mirroring、Passwords app、window tiling、Apple Intelligence                   |
| [macOS 14](#macos-14) | Sonoma      | 23     | 2023-09-26 | security line 14.8.x | Safari 17 | desktop widgets、Game Mode、Safari profiles、web apps                                |
| [macOS 13](#macos-13) | Ventura     | 22     | 2022-10-24 | EOL / legacy         | Safari 16 | Stage Manager、Continuity Camera、Passkeys、Virtualization.framework UEFI            |
| macOS 12              | Monterey    | 21     | 2021-10-25 | EOL / legacy         | Safari 15 | Shortcuts、Universal Control、AirPlay to Mac；12.3 移除 `/usr/bin/python`            |
| macOS 11              | Big Sur     | 20     | 2020-11-12 | EOL / legacy         | Safari 14 | Apple Silicon 过渡、arm64、系统卷签名                                                |
| macOS 10.15           | Catalina    | 19     | 2019-10-07 | EOL / legacy         | Safari 13 | 64-bit only、iTunes 拆分、Sidecar                                                    |
| macOS 10.14           | Mojave      | 18     | 2018-09-24 | EOL / legacy         | Safari 12 | Dark Mode、APFS Fusion Drive、最后支持 32-bit app 的 macOS                           |
| macOS 10.13           | High Sierra | 17     | 2017-09-25 | EOL / legacy         | Safari 11 | APFS 默认、HEVC、Metal 2                                                             |
| macOS 10.12           | Sierra      | 16     | 2016-09-20 | EOL / legacy         | Safari 10 | OS X 改名 macOS、Siri、Auto Unlock                                                   |
| OS X 10.11            | El Capitan  | 15     | 2015-09-30 | EOL / legacy         | Safari 9  | SIP、Metal for Mac、Split View                                                       |
| OS X 10.10            | Yosemite    | 14     | 2014-10-16 | EOL / legacy         | Safari 8  | Continuity、Handoff、新 UI                                                           |

:::tip

- `Darwin` 主版本并不等于 macOS 主版本：Big Sur 到 Sequoia 大致是 `macOS major + 9`，Tahoe 26 对应 Darwin 25。
- App 兼容性判断建议同时看 macOS 版本、Darwin/XNU、SDK、Xcode 版本和 CPU 架构（Intel / Apple Silicon）。
- 对终端脚本，优先使用 `sw_vers -productVersion`；不要只解析 marketing name。

:::

## 当前线 {#current}

| Line                    | 当前用途               | 关注点                                                                                    |
| ----------------------- | ---------------------- | ----------------------------------------------------------------------------------------- |
| macOS Tahoe 26          | 新机器与新项目默认目标 | Apple Intelligence / Foundation Models、Liquid Glass 视觉适配、AGL 移除、Rosetta 依赖检查 |
| macOS Sequoia 15        | 仍常见的生产桌面系统   | iPhone Mirroring、Passwords、window tiling、App Group container SIP 权限变化              |
| macOS Sonoma 14         | 安全维护线             | desktop widgets、Game Mode、Safari profiles；旧机型兼容和企业环境仍常见                   |
| macOS Ventura 13 及更早 | 仅 legacy / 兼容测试   | 逐步退出安全维护；CI/打包应避免把它作为新功能基线                                         |

## 命令

```bash
# 查看系统版本
sw_vers
sw_vers -productVersion
sw_vers -buildVersion

# 查看 Darwin / XNU
uname -a
uname -r

# 查看可用更新
softwareupdate --list

# 安装所有可用更新
sudo softwareupdate --install --all

# 查看完整 installer
softwareupdate --list-full-installers

# 下载完整 installer，例如 macOS 15.x
softwareupdate --fetch-full-installer --full-installer-version 15.7.7

# 查看硬件型号和芯片
system_profiler SPHardwareDataType
sysctl -n machdep.cpu.brand_string 2> /dev/null || true
uname -m
```

## macOS 26

- Release: 2025-09-15
- Codename: Tahoe
- Darwin: 25
- SDK: macOS 26 SDK / Xcode 26
- 重点
  - 全平台版本号切到 `26` 系列，与 iOS / iPadOS / watchOS / tvOS / visionOS 对齐。
  - 新设计语言 Liquid Glass；需要检查自定义窗口、toolbar、侧边栏、透明/材质和截图对比。
  - Apple Intelligence 继续扩展；Foundation Models framework 可访问设备端语言模型能力。
  - 新增 Phone app、Live Activities on Mac、Spotlight actions / quick keys。
  - Disk Images 新增 Apple Sparse Image Format（ASIF），可作为 VM backing store。
- 开发/兼容关注
  - AGL 从 macOS SDK 移除；旧 Carbon/OpenGL AGL 依赖应清理。
  - 可用 `sudo nvram boot-args="nox86exec=1"` 测试应用是否仍依赖 Rosetta；测试后记得清理 boot-args。
  - Foundation Models / Apple Intelligence 相关能力依赖硬件、语言、地区和系统设置，不应作为无条件功能。

## macOS 15

- Release: 2024-09-16
- Codename: Sequoia
- Darwin: 24
- SDK: macOS 15 SDK / Xcode 16
- 重点
  - iPhone Mirroring 可在 Mac 上查看和操作 iPhone。
  - 新 Passwords app 统一管理密码、passkeys、Wi-Fi password、verification codes。
  - Window tiling 改进，系统级窗口贴边布局更接近第三方 tiling 工具体验。
  - Apple Intelligence 分阶段上线，首批能力集中在 writing tools、Siri、Image Playground、Genmoji 等。
- 开发/兼容关注
  - App group containers（`~/Library/Group Containers`）受 SIP 保护；应用需正确 entitlement / Team ID / provisioning profile。
  - Virtualization 仍有 Rosetta / macOS VM 已知问题，做 Apple Silicon VM 测试时要关注具体 patch release。

## macOS 14

- Release: 2023-09-26
- Codename: Sonoma
- Darwin: 23
- SDK: macOS 14 SDK / Xcode 15
- 重点
  - Widgets 可放到桌面，并支持通过 Continuity 使用 iPhone widgets。
  - Game Mode 提升 Apple Silicon 上游戏/图形任务的调度优先级。
  - Safari profiles、web apps、private browsing 改进。
  - 视频会议增强 Presenter Overlay、Reactions 等体验。
- 开发/兼容关注
  - 继续推进 SwiftData、SwiftUI、TipKit、StoreKit 等新 API。
  - Virtualization.framework 相关能力继续演进，macOS VM 安装/更新问题要按 patch release 复核。

## macOS 13

- Release: 2022-10-24
- Codename: Ventura
- Darwin: 22
- SDK: macOS 13 SDK / Xcode 14
- 重点
  - Stage Manager、Continuity Camera、Passkeys、Spotlight 更新。
  - System Settings 替代旧 System Preferences。
  - Virtualization.framework 支持 UEFI。
- Virtualization.framework
  - 支持 UEFI
  - [Running GUI Linux in a virtual machine on a Mac](https://developer.apple.com/documentation/virtualization/running_gui_linux_in_a_virtual_machine_on_a_mac?language=objc)
  - [Code-Hex/vz](https://github.com/Code-Hex/vz)
  - [mac-vz/macvz](https://github.com/mac-vz/macvz)

## macOS 12.3

- 移除了 Python 2 shim：`/usr/bin/python` 不再可用。
- 新增/保留 `/usr/bin/python3`，但脚本仍建议显式使用 `python3` 或项目自己的 runtime。
- 影响
  - 老脚本里 `#!/usr/bin/env python` 可能失败。
  - 部分旧工具（例如老版本 VS Code 命令行、构建脚本）可能仍假设 `python` 存在。

```bash
# 临时解决 - Homebrew 路径按机器实际情况调整
ln -fs /usr/local/bin/python3 "$HOME/bin/python"

# 或在 PATH 内创建 python -> python3；不建议覆盖 /usr/bin
sudo ln -fs "$(which python3)" "$(dirname "$(which python3)")/python"
```

## 参考

- [macOS Release Notes](https://developer.apple.com/documentation/macos-release-notes)
- [Apple security releases](https://support.apple.com/en-us/100100)
- [Update macOS on Mac](https://support.apple.com/en-us/108382)
- [What's new in the updates for macOS Tahoe 26](https://support.apple.com/en-us/122868)
- [What's new in the updates for macOS Sequoia 15](https://support.apple.com/en-us/120283)
- [macOS Tahoe 26 Release Notes](https://developer.apple.com/documentation/macos-release-notes/macos-26-release-notes)
- [macOS Sequoia 15 Release Notes](https://developer.apple.com/documentation/macos-release-notes/macos-15-release-notes)
- [macOS Sonoma 14 Release Notes](https://developer.apple.com/documentation/macos-release-notes/macos-14-release-notes)
- [macOS version history](https://en.wikipedia.org/wiki/MacOS_version_history)
