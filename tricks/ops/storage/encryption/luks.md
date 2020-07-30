---
id: luks
title: LUKS
---

# LUKS

## Tips
- [Linux Unified Key Setup](https://en.wikipedia.org/wiki/Linux_Unified_Key_Setup)
  - [dm-crypt](https://en.wikipedia.org/wiki/Dm-crypt)
- [admin-guide/device-mapper/dm-crypt](https://www.kernel.org/doc/html/latest/admin-guide/device-mapper/dm-crypt.html)
- 注意
  - 每个块设备密码独立
    - 可以考虑使用 keyfile 然后使用 crypttab 挂载
- 加密方案
  - ROOT 加密
  - 非 ROOT 加密
- kernel
  - AlpineLinux 配置方式 `cryptroot=UUID=<UUID> cryptdm=cryptroot`
    - cryptdm - mapper 名字
    - 实际处理脚本 [initramfs-init.in#L443-L482](https://github.com/alpinelinux/mkinitfs/blob/961726b6aeb8e12176009675f22ed0ffc2b26e14/initramfs-init.in#L443-L482)
  - `cryptdevice=UUID=<UUID>:cryptroot`
  - `root=UUID={unencrypted} rw cryptdevice=/dev/disk/by-uuid/{encrypted}:root quiet`
    nomodeset quiet rootfstype=ext4 cryptroot=UUID=3cb7aacf-4975-466b-bb6d-92a13ad60496 cryptdm=rootCrypt cryptdiscards cryptkey
- 参考
  - ArchLinux [dm-crypt](https://wiki.archlinux.org/index.php/Dm-crypt)
  - [qemu luks](https://blog.csdn.net/isclouder/article/details/80731388)

```bash
blkid -t TYPE=crypto_LUKS

# 修改密码
cryptsetup luksChangeKey /dev/sdb2

uuidgen | tr -d '\n' > new-key.txt
cryptsetup luksAddKey /dev/sdb2 new-key.txt -d key.txt

# 查看上级设备
dmsetup deps -o devname /dev/mapper/decrypted
```

## Root 分区加密安装

```bash
apk add cryptsetup util-linux

# 分区
dev=/dev/sdb
boot_dev=${dev}1
root_dev=${dev}2


# +128M - boot
# rest  - root
cat <<CONF | sfdisk --wipe always ${dev}
label: dos
unit: sectors
sector-size: 512

/dev/sdb1 : size=+128M, type=83, bootable
/dev/sdb2 : type=83
CONF


# 初始化
# ======
# 格式化 - 设置密码
# 设置密码文件 - 或者使用 cryptsetup 生成
uuidgen > key.txt
yes | cryptsetup -y -v luksFormat $root_dev -d key.txt
# 打开 - 挂载为 mapper
cryptsetup open $root_dev cryptroot -d key.txt
# 格式化 fs
mkfs.ext4 /dev/mapper/cryptroot
# 挂载到目录
mount /dev/mapper/cryptroot /mnt

# 卸载再次挂载确保生效
umount /mnt
cryptsetup close cryptroot

# format bootfs
mkfs.ext4 $boot_dev

# root
cryptsetup open $root_dev cryptroot -d key.txt
mount /dev/mapper/cryptroot /mnt

# boot
mkdir -p /mnt/boot
mount $boot_dev /mnt/boot

# install system
setup-disk -m sys -o sysfs.apkvol.tar.gz -s 0 -v -k virt $/mnt
apk --root /mnt add syslinux

# setup luks support
apk --root /mnt add cryptsetup util-linux
echo 'features="ata base ide scsi usb virtio ext4 cryptsetup cryptkey"' > /mnt/etc/mkinitfs/mkinitfs.conf
mkinitfs -c /mnt/etc/mkinitfs/mkinitfs.conf -b /mnt/ $(ls /mnt/lib/modules/)

# add cryptroot
# cryptroot=UUID=<UUID> cryptdm=cryptroot
# other options - https://github.com/alpinelinux/mkinitfs/blob/961726b6aeb8e12176009675f22ed0ffc2b26e14/initramfs-init.in#L443-L482
sed -i -r "s/^(default_kernel_opts)=\"([^\"]*)\"/\1=\"\2 cryptroot=UUID=$(blkid ${ROOT_DEV} -o value | head -n 1) cryptdm=cryptroot\"/" /mnt/etc/update-extlinux.conf
chroot /mnt update-extlinux

# done - close
umount -R /mnt
cryptsetup close cryptroot
```


# FAQ

## WARNING: Locking directory /run/cryptsetup is missing!

## LUKS vs LUKS2
* LUKS2
  * Full disk authenticated (FDA) 提供数据 confidentiality 和 data integrity protection
    * Integrity cannot prevent a replay attack
  * `cryptsetup luksFormat --type luks2 <device>`
  * 新的格式，与 LUKS1 不兼容
  * sector 级别完整性校验 - Linux 4.12 - dm-integrity
    * `integritysetup` - 命令
  * veritysetup 支持设备 FEC（Forward Error Correction） - 安装 Linux 4.5 已有在使用
  * sector 最大支持 4096 
    * 确保硬件使用相同大小，如果硬件 sector 更小可能导致数据损坏 - 部分 sector 写入
  * 使用 Argon2i 和 Argon2id 作为 PBKDF
    * memory-hard - 增加内存使用 - 是的 GPU 攻击更难 - 因为 GPU 内存成本高
    * 赢得 Password Hashing Competition 的算法
  * 默认 Argon2i (data independent variant) - 内存 cost 128MB，时间 cost 800ms，并行取决于 CPU <= 4
    * 单独配置 --pbkdf, --pbkdf-memory, --pbkdf-parallel, --iter-time
    * 迭代周期 --pbkdf-force-iterations
  * 使用 Token 独立抽象 cryptsetup 硬件部分
  * `--persistent` - 持久打开，之后打开不需要密钥
  * Linux kernel keyring
    * 避免每次 ioctl 发送密钥
    * 自动解锁 - 例如使用 TMP 存储用户密钥
    * [keyrings.7](https://www.man7.org/linux/man-pages/man7/keyrings.7.html)
      * `apk add keyutils`
    * [KERNEL KEY RETENTION SERVICE](https://www.kernel.org/doc/Documentation/security/keys.txt)
  * Keyslot priorities
    * normal,prefer,ignore
    * `cryptsetup config <device> --key-slot 1 --priority prefer`
  * LUKS2 label and subsystem
    * `cryptsetup config <device> --label my_device --subsystem ""`
  * 支持转换
    * `cryptsetup convert <device> --type luks2`
    * `cryptsetup convert <device> --type luks1`
    * 验证 `cryptsetup luksDump <device>`
* LUKS1
  * Full disk encryption (FDE)
  * 保留长度加密 - length-preserving - encryption - 明文密文长度相同
    * 提供数据可信 （confidentiality），但不保证数据完整性
  * 使用 PBKDF (Password-Based Key Derivation Function) 增加攻击者耗时
  * PBKDF2 增加迭代次数
    * 目前 GPU 已经可以并行执行

* 参考
  * [Cryptsetup 2.0.0 Release Notes](https://gitlab.com/cryptsetup/cryptsetup/blob/master/docs/v2.0.0-ReleaseNotes)


```bash
# aes-xts-plain64 + hmac-sha256 / hmac-sha512 作为 authentication tag - IEEE 1619.1
# (Common FDE mode + independent authentication tag. Authentication key for HMAC is independently generated. This mode is very slow.)
cryptsetup luksFormat --type luks2 <device> --cipher aes-xts-plain64 --integrity hmac-sha256

# aes-gcm-random (native AEAD mode) - IEEE 1619.1
# 不要用于生产 - GCM 使用 96-bit nonce - GCM 硬件支持好 - AES-NI - 可以用于性能测试
cryptsetup luksFormat --type luks2 <device> --cipher aes-gcm-random --integrity aead

# ChaCha20 with Poly1305 authenticator (according to RFC7539)
cryptsetup luksFormat --type luks2 <device> --cipher chacha20-random --integrity poly1305

# LUKS2 Token
# 添加 Token
cryptsetup token add --key-description "my_token" <device>
# 设置密码
echo -n <passphrase> | keyctl padd user my_token @u
# 如果找到了密码则自动会打开
cryptsetup open <device> <name>


```

## help

| action                                      | desc                                  |
| ------------------------------------------- | ------------------------------------- |
| open `<device> [--type <type>][<name>]`     | 打开设备，映射为 `<name>`             |
| close `<name>`                              | 关闭设备，移除映射                    |
| resize `<name>`                             | resize active device                  |
| status `<name>`                             | show device status                    |
| benchmark `[--cipher <cipher>]`             | 压测编码解码性能                      |
| repair `<device>`                           | 修复元数据                            |
| reencrypt `<device>`                        | LUKS2 从新加密                        |
| erase `<device>`                            | 擦除所有 key，移除加密密钥            |
| convert `<device>`                          | LUKS、LUKS2 格式转换                  |
| config `<device>`                           | LUKS2 配置                            |
| luksFormat `<device> [<new key file>]`      | LUKS 格式化                           |
| luksAddKey `<device> [<new key file>]`      | 添加密钥                              |
| luksRemoveKey `<device> [<key file>]`       | 移除密钥                              |
| luksChangeKey `<device> [<key file>]`       | 修改密钥                              |
| luksConvertKey `<device> [<key file>]`      | 修改密钥为新的 pbkdf 参数             |
| luksKillSlot `<device> <key slot>`          | 移除 key                              |
| luksUUID `<device>`                         | UUID                                  |
| isLuks `<device>`                           | 检测 luks 分区头                      |
| luksDump `<device>`                         | 分区信息                              |
| tcryptDump `<device>`                       | TCRYPT 信息                           |
| bitlkDump `<device>`                        | BITLK 信息                            |
| luksSuspend `<device>`                      | 停止 LUKS 设备，移除 key，终止所有 IO |
| luksResume `<device>`                       | 恢复                                  |
| luksHeaderBackup `<device>`                 | 备份头                                |
| luksHeaderRestore `<device>`                | 恢复头                                |
| token `<add|remove|import|export> <device>` | LUKS2 令牌管理                        |

```
$ cryptsetup --help
cryptsetup 2.3.2
Usage: cryptsetup [OPTION...] <action> <action-specific>
  -v, --verbose                         Shows more detailed error messages
      --debug                           Show debug messages
      --debug-json                      Show debug messages including JSON metadata
  -c, --cipher=STRING                   The cipher used to encrypt the disk (see /proc/crypto)
  -h, --hash=STRING                     The hash used to create the encryption key from the passphrase
  -y, --verify-passphrase               Verifies the passphrase by asking for it twice
  -d, --key-file=STRING                 Read the key from a file
      --master-key-file=STRING          Read the volume (master) key from file.
      --dump-master-key                 Dump volume (master) key instead of keyslots info
  -s, --key-size=BITS                   The size of the encryption key
  -l, --keyfile-size=bytes              Limits the read from keyfile
      --keyfile-offset=bytes            Number of bytes to skip in keyfile
      --new-keyfile-size=bytes          Limits the read from newly added keyfile
      --new-keyfile-offset=bytes        Number of bytes to skip in newly added keyfile
  -S, --key-slot=INT                    Slot number for new key (default is first free)
  -b, --size=SECTORS                    The size of the device
      --device-size=bytes               Use only specified device size (ignore rest of device). DANGEROUS!
  -o, --offset=SECTORS                  The start offset in the backend device
  -p, --skip=SECTORS                    How many sectors of the encrypted data to skip at the beginning
  -r, --readonly                        Create a readonly mapping
  -q, --batch-mode                      Do not ask for confirmation
  -t, --timeout=secs                    Timeout for interactive passphrase prompt (in seconds)
      --progress-frequency=secs         Progress line update (in seconds)
  -T, --tries=INT                       How often the input of the passphrase can be retried
      --align-payload=SECTORS           Align payload at <n> sector boundaries - for luksFormat
      --header-backup-file=STRING       File with LUKS header and keyslots backup
      --use-random                      Use /dev/random for generating volume key
      --use-urandom                     Use /dev/urandom for generating volume key
      --shared                          Share device with another non-overlapping crypt segment
      --uuid=STRING                     UUID for device to use
      --allow-discards                  Allow discards (aka TRIM) requests for device
      --header=STRING                   Device or file with separated LUKS header
      --test-passphrase                 Do not activate device, just check passphrase
      --tcrypt-hidden                   Use hidden header (hidden TCRYPT device)
      --tcrypt-system                   Device is system TCRYPT drive (with bootloader)
      --tcrypt-backup                   Use backup (secondary) TCRYPT header
      --veracrypt                       Scan also for VeraCrypt compatible device
      --veracrypt-pim=INT               Personal Iteration Multiplier for VeraCrypt compatible device
      --veracrypt-query-pim             Query Personal Iteration Multiplier for VeraCrypt compatible device
  -M, --type=STRING                     Type of device metadata: luks, luks1, luks2, plain, loopaes, tcrypt,
                                        bitlk
      --force-password                  Disable password quality check (if enabled)
      --perf-same_cpu_crypt             Use dm-crypt same_cpu_crypt performance compatibility option
      --perf-submit_from_crypt_cpus     Use dm-crypt submit_from_crypt_cpus performance compatibility option
      --deferred                        Device removal is deferred until the last user closes it
      --serialize-memory-hard-pbkdf     Use global lock to serialize memory hard PBKDF (OOM workaround)
  -i, --iter-time=msecs                 PBKDF iteration time for LUKS (in ms)
      --pbkdf=STRING                    PBKDF algorithm (for LUKS2): argon2i, argon2id, pbkdf2
      --pbkdf-memory=kilobytes          PBKDF memory cost limit
      --pbkdf-parallel=threads          PBKDF parallel cost
      --pbkdf-force-iterations=LONG     PBKDF iterations cost (forced, disables benchmark)
      --priority=STRING                 Keyslot priority: ignore, normal, prefer
      --disable-locks                   Disable locking of on-disk metadata
      --disable-keyring                 Disable loading volume keys via kernel keyring
  -I, --integrity=STRING                Data integrity algorithm (LUKS2 only)
      --integrity-no-journal            Disable journal for integrity device
      --integrity-no-wipe               Do not wipe device after format
      --integrity-legacy-padding        Use inefficient legacy padding (old kernels)
      --token-only                      Do not ask for passphrase if activation by token fails
      --token-id=INT                    Token number (default: any)
      --key-description=STRING          Key description
      --sector-size=INT                 Encryption sector size (default: 512 bytes)
      --persistent                      Set activation flags persistent for device
      --label=STRING                    Set label for the LUKS2 device
      --subsystem=STRING                Set subsystem label for the LUKS2 device
      --unbound                         Create or dump unbound (no assigned data segment) LUKS2 keyslot
      --json-file=STRING                Read or write the json from or to a file
      --luks2-metadata-size=bytes       LUKS2 header metadata area size
      --luks2-keyslots-size=bytes       LUKS2 header keyslots area size
      --refresh                         Refresh (reactivate) device with new parameters
      --keyslot-key-size=BITS           LUKS2 keyslot: The size of the encryption key
      --keyslot-cipher=STRING           LUKS2 keyslot: The cipher used for keyslot encryption
      --encrypt                         Encrypt LUKS2 device (in-place encryption).
      --decrypt                         Decrypt LUKS2 device (remove encryption).
      --init-only                       Initialize LUKS2 reencryption in metadata only.
      --resume-only                     Resume initialized LUKS2 reencryption only.
      --reduce-device-size=bytes        Reduce data device size (move data offset). DANGEROUS!
      --hotzone-size=bytes              Maximal reencryption hotzone size.
      --resilience=STRING               Reencryption hotzone resilience type (checksum,journal,none)
      --resilience-hash=STRING          Reencryption hotzone checksums hash
      --active-name=STRING              Override device autodetection of dm device to be reencrypted

Help options:
  -?, --help                            Show this help message
      --usage                           Display brief usage
  -V, --version                         Print package version

<action> is one of:
	open <device> [--type <type>] [<name>] - open device as <name>
	close <name> - close device (remove mapping)
	resize <name> - resize active device
	status <name> - show device status
	benchmark [--cipher <cipher>] - benchmark cipher
	repair <device> - try to repair on-disk metadata
	reencrypt <device> - reencrypt LUKS2 device
	erase <device> - erase all keyslots (remove encryption key)
	convert <device> - convert LUKS from/to LUKS2 format
	config <device> - set permanent configuration options for LUKS2
	luksFormat <device> [<new key file>] - formats a LUKS device
	luksAddKey <device> [<new key file>] - add key to LUKS device
	luksRemoveKey <device> [<key file>] - removes supplied key or key file from LUKS device
	luksChangeKey <device> [<key file>] - changes supplied key or key file of LUKS device
	luksConvertKey <device> [<key file>] - converts a key to new pbkdf parameters
	luksKillSlot <device> <key slot> - wipes key with number <key slot> from LUKS device
	luksUUID <device> - print UUID of LUKS device
	isLuks <device> - tests <device> for LUKS partition header
	luksDump <device> - dump LUKS partition information
	tcryptDump <device> - dump TCRYPT device information
	bitlkDump <device> - dump BITLK device information
	luksSuspend <device> - Suspend LUKS device and wipe key (all IOs are frozen)
	luksResume <device> - Resume suspended LUKS device
	luksHeaderBackup <device> - Backup LUKS device header and keyslots
	luksHeaderRestore <device> - Restore LUKS device header and keyslots
	token <add|remove|import|export> <device> - Manipulate LUKS2 tokens

You can also use old <action> syntax aliases:
	open: create (plainOpen), luksOpen, loopaesOpen, tcryptOpen, bitlkOpen
	close: remove (plainClose), luksClose, loopaesClose, tcryptClose, bitlkClose

<name> is the device to create under /dev/mapper
<device> is the encrypted device
<key slot> is the LUKS key slot number to modify
<key file> optional key file for the new key for luksAddKey action

Default compiled-in metadata format is LUKS2 (for luksFormat action).

Default compiled-in key and passphrase parameters:
	Maximum keyfile size: 8192kB, Maximum interactive passphrase length 512 (characters)
Default PBKDF for LUKS1: pbkdf2, iteration time: 2000 (ms)
Default PBKDF for LUKS2: argon2i
	Iteration time: 2000, Memory required: 1048576kB, Parallel threads: 4

Default compiled-in device cipher parameters:
	loop-AES: aes, Key 256 bits
	plain: aes-cbc-essiv:sha256, Key: 256 bits, Password hashing: ripemd160
	LUKS: aes-xts-plain64, Key: 256 bits, LUKS header hashing: sha256, RNG: /dev/urandom
	LUKS: Default keysize with XTS mode (two internal keys) will be doubled.
```
