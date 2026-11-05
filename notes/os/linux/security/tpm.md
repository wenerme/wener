---
title: TPM
---

# TPM

- Trusted Platform Module，国际标准的安全加密处理器，专用微处理器，用于在硬件中集成加密密钥
- 用途：secure boot、密钥存储、随机数生成、磁盘加密解锁、attestation
- TPM 2.0 和 TPM 1.2 是两套不同规范，软件栈也不同；本文只涉及 TPM 2.0
  - TPM 2.0 需要 UEFI 启动；BIOS/Legacy 启动只能使用 TPM 1.2
  - 部分芯片可通过固件升级在 2.0/1.2 间切换，升级次数有限
- 参考
  - [Trusted Platform Module - ArchWiki](https://wiki.archlinux.org/title/Trusted_Platform_Module)
  - [Trusted Computing Group: TPM](https://www.trustedcomputinggroup.org/technologies/tpm)
  - [tpm2-software community](https://tpm2-software.github.io/)
  - [tpm2-tools docs](https://tpm2-tools.readthedocs.io/en/latest/)

## 检查支持

```bash
# 查看内核日志
journalctl -k --grep=tpm

# 查看版本/描述
cat /sys/class/tpm/tpm0/device/description
cat /sys/class/tpm/tpm0/tpm_version_major

# systemd 检测 TPM 2.0 及所需软件依赖
systemd-analyze has-tpm2
```

- 设备节点
  - `/dev/tpm0` - 直接访问，同一时间只允许一个客户端
  - `/dev/tpmrm0` - 内核管理访问（resource manager），推荐
  - tpm2-abrmd - 用户态 resource manager daemon，目前不再推荐
- 用户态工具
  - [tpm2-tools](https://github.com/tpm2-software/tpm2-tools)（Intel）
  - ibm-tss（IBM）

## 用途

- LUKS 加密
  - 将密钥存储在 TPM 中，只有 TPM 存在且满足特定条件（如固件完整性、Secure Boot 状态）才能解锁
  - `systemd-cryptenroll`、[Clevis](https://github.com/latchset/clevis) 支持将 LUKS 卷绑定到 TPM 中的密钥
  - `systemd-cryptenroll` 还支持绑定到签名策略而不是静态 PCR 值
  - :::caution
    整机被盗时，若仅依赖 TPM 自动解锁，数据保护退化为用户密码等基本措施；建议额外设置 TPM pin，或对用户数据单独加密（如 fscrypt、systemd-homed）。TPM pin 方式本身会增加冷启动攻击（cold boot attack）的风险。
    :::
- SSH
  - [ssh-tpm-agent](https://github.com/Foxboron/ssh-tpm-agent) - ssh-agent 兼容，密钥存储在 TPM 中
  - [tpm2-pkcs11](https://github.com/tpm2-software/tpm2-pkcs11) - PKCS#11 接口
- systemd-creds - 使用 TPM 安全存储/读取 systemd unit 的 credential
- GnuPG 2.3+ 支持将兼容密钥迁移到 TPM 中
- OpenSSL
  - [tpm2-openssl](https://github.com/tpm2-software/tpm2-openssl) - OpenSSL Provider
  - [tpm2-tss-engine](https://github.com/tpm2-software/tpm2-tss-engine) - OpenSSL Engine

## PCR（Platform Configuration Register）

- 将密钥解封（unseal）绑定到特定软件版本/系统状态的哈希值上；只有度量值匹配时才能访问被 seal 的密钥
- 用于启动前后硬件/软件完整性校验，防范 Evil Maid 攻击
- 定义来源：TCG PC Client Specific Platform Firmware Profile Specification；Linux 组件的编号分配见 Linux TPM PCR Registry

| PCR | 说明 | Extended by |
| --- | --- | --- |
| PCR0 | 核心系统固件可执行代码（Firmware），UEFI 升级后可能变化 | Firmware |
| PCR1 | 核心系统固件数据（UEFI 设置，例如启动顺序） | Firmware |
| PCR2 | 扩展/可插拔可执行代码（OpROM） | Firmware |
| PCR3 | 扩展/可插拔固件数据，Boot Device Select 阶段设置 | Firmware |
| PCR4 | Boot Manager 代码和启动尝试记录 | Firmware |
| PCR5 | Boot Manager 配置和数据，包含 GPT 分区表 | Firmware |
| PCR6 | S4/S5 电源状态恢复事件 | Firmware |
| PCR7 | Secure Boot 状态，含 PK/KEK/db 及校验证书 | Firmware, shim（追加 MokList、MokListX、MokSBState） |
| PCR8 | 内核命令行哈希 | GRUB |
| PCR9 | initramfs 和 EFI Load Options 哈希 | Linux |
| PCR10 | 保留 | - |
| PCR11 | Unified Kernel Image 哈希 | systemd-stub(7) |
| PCR12 | 被覆盖的内核命令行、Credentials | systemd-stub(7) |
| PCR13 | System Extensions | systemd-stub(7) |
| PCR14 | shim 的 MokList、MokListX、MokSBState | shim |
| PCR15 | LUKS 卷密钥哈希 | systemd-cryptsetup |
| PCR16 | Debug，随时可能被使用/重置 | - |
| PCR23 | Application Support，OS 可自行设置/重置 | - |

- PCR8-16 的具体用途由操作系统定义，不同 Linux 发行版/Windows 可能不同
- Windows BitLocker 使用 PCR8-11（Legacy）或 PCR11-14（UEFI）

```bash
# 查看当前 PCR 值
systemd-analyze pcrs

# 查看 TPM 可变属性，例如 pin 最大错误次数
tpm2_getcap properties-variable | grep MAX_AUTH_FAIL
```
