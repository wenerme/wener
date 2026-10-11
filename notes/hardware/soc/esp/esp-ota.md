---
title: ESP OTA 基础与维护笔记
---

# ESP OTA 基础与维护笔记

本文面向 ESP-IDF 项目的固件维护、现场升级和故障判断。这里的 OTA 默认指应用分区 OTA；更新 bootloader、分区表或整片 Flash 属于另一类操作，风险和验收要求更高。

## 1. 常见分区布局

双槽 OTA 项目通常至少包含以下分区：

| 分区               | 作用                                                | 维护要点                                                        |
| ------------------ | --------------------------------------------------- | --------------------------------------------------------------- |
| `nvs`              | 保存 Wi-Fi、应用配置、校准或其他键值数据            | 不要因应用升级随意擦除；容量、命名空间和加密配置必须稳定        |
| `otadata`          | 保存 OTA 选择信息，通常占两个 Flash sector 以便冗余 | 不是应用镜像；损坏或被擦除后，bootloader 会按默认规则选择启动槽 |
| `phy_init`（可选） | 保存 PHY 初始化校准数据                             | 依赖项目配置；不要把它当成普通应用数据清除                      |
| `app0`/`ota_0`     | 第一个应用槽                                        | 镜像必须完全落在该分区范围内                                    |
| `app1`/`ota_1`     | 第二个应用槽                                        | 与 `ota_0` 一起形成回滚所需的备用槽                             |

实际标签可能叫 `factory`、`ota_0`、`ota_1`，应以设备实际分区表为准。`otadata` 的偏移和大小由分区表决定，通常为两个 0x1000 字节 sector；应用分区需要按 Flash 映射要求对齐。升级前应保存构建产物使用的分区 CSV、生成后的 `partitions.bin` 以及 bootloader 使用的实际分区摘要。

公开参考：

- https://docs.espressif.com/projects/esp-idf/en/latest/esp32c3/api-guides/partition-tables.html
- https://docs.espressif.com/projects/esp-idf/en/latest/esp32c3/api-reference/system/ota.html

## 2. `otadata`、启动选择与状态

`otadata` 中的每个 OTA 数据副本包含序列号、启动状态和校验信息。实现细节随 ESP-IDF 版本演进，但维护判断应抓住以下规则：

- `ota_seq` 是单调递增的槽选择序号。有效序号通常按 `ota_seq - 1` 映射到 `ota_0`，按槽数量取模后得到目标槽；不能把它直接当成分区编号。
- 启动时 bootloader 会读取两个 `otadata` 副本，校验其 CRC，并按有效性、序列号和启动状态选择数据。一个副本损坏时通常使用另一个副本；两个副本都无效时会回到默认启动选择。
- 不要只看当前运行分区地址判断下一次启动槽；应同时检查 `esp_ota_get_boot_partition()`、`esp_ota_get_running_partition()`、`esp_ota_get_next_update_partition()` 和 `otadata` 原始内容。
- `otadata` 的擦除、部分写入或与分区表不匹配，可能表现为反复启动、回到旧版本或启动 factory，而不是应用代码本身损坏。

`esp_ota_set_boot_partition()` 会更新启动选择。正常应用 OTA 通常由 OTA API 写入新槽、校验镜像，然后更新 `otadata`；应用在此时仍运行于旧槽，重启后才切换到新槽。

### 启动状态

启用 `CONFIG_BOOTLOADER_APP_ROLLBACK_ENABLE` 时，应用镜像可以经历以下状态：

- `NEW`：新镜像已写入并被设置为下一次启动目标，尚未完成首次启动确认。
- `PENDING_VERIFY`：新镜像已经启动，等待应用自检并确认可用。启动后应尽早完成关键外设、配置、通信和业务自检。
- `VALID`：应用已调用 `esp_ota_mark_app_valid_cancel_rollback()`，表示该版本可继续使用。
- `ABORTED`：该尝试被判定为失败，bootloader 不应继续把它当作可用的新版本。
- `INVALID`：镜像或选择记录明确不可用；具体显示方式与 ESP-IDF 版本和读取 API 有关。

应用不应仅在“启动函数进入”后就立即标记 `VALID`。确认前至少应完成能发现严重故障的最小自检；但也不宜等待依赖网络、云端或人工操作的长流程，否则掉电或看门狗复位会把一个实际可用版本误判为失败。

## 3. rollback 流程

典型流程如下：

1. 设备运行旧槽，OTA 将新镜像写入另一槽。
2. OTA API 校验镜像头、映像长度、分区边界和完整性；成功后把新槽设为下次启动目标。
3. bootloader 下次启动新槽，并将其置于需要验证的状态。
4. 新应用完成自检后调用 `esp_ota_mark_app_valid_cancel_rollback()`。
5. 如果应用在确认前崩溃、看门狗复位、外部复位或掉电，下一次启动会触发回滚，重新选择旧的有效槽。
6. 回滚后应记录原因、失败槽、镜像版本和复位原因，避免反复尝试同一坏版本。

回滚依赖旧槽仍然存在且可启动。若升级过程同时擦除了旧槽、重写了分区表、改变了不可兼容的 NVS 数据，或者只留下一个槽，就可能无法安全回退。应用数据迁移必须可重复执行、向后兼容，并在确认新版本前保留旧版本仍能读取的数据。

## 4. OTA 写入顺序与掉电安全

推荐的应用 OTA 顺序是：

1. 读取并记录当前运行槽、目标槽、当前版本、目标版本和 Flash 分区表摘要。
2. 在网络和存储条件允许时获取完整镜像，检查版本策略、目标芯片、镜像大小和签名要求。
3. 调用 `esp_ota_begin()` 打开目标应用分区，分块调用 `esp_ota_write()`；每块写入都应处理短写、超时、断链和错误码。
4. 调用 `esp_ota_end()` 完成镜像校验；失败时保留旧槽，不切换启动选择。
5. 调用 `esp_ota_set_boot_partition()` 设置新槽。该步骤写 `otadata`，应视为升级提交点。
6. 记录升级结果后重启；新应用通过自检后再调用确认 API。

掉电发生在提交点之前时，目标槽可能只有半个镜像，但旧槽和旧的启动选择仍应可用。掉电发生在 `otadata` 更新期间时，两个冗余副本和 CRC 用于降低选择记录损坏的概率。掉电安全依赖 bootloader、分区表、写入 API 和 Flash 供电稳定性共同保证，不能把“OTA 支持回滚”理解为任意擦写都可恢复。

不要在目标槽写入完成前擦除旧槽；不要把升级状态只保存在即将被覆盖的应用分区；不要在更新 bootloader 或分区表时套用应用 OTA 的安全假设。

## 5. 双槽迁移风险

双槽不是免费的兼容层。迁移时重点检查：

- 新旧 `ota_0`/`ota_1` 是否都能容纳最大镜像，而不是只容纳当前镜像。
- 新旧版本的分区表、bootloader 和应用是否对同一 `otadata` 布局有一致理解。
- NVS key、命名空间、结构体序列化格式和加密密钥是否兼容。需要迁移时先写新格式，再保留旧格式读取或准备可回滚的迁移标记。
- 新版本是否会改变 `phy_init`、校准数据、factory 数据或其他固定偏移内容。
- “整片擦除后烧录新布局”不能伪装成应用 OTA；它会删除 NVS、`otadata` 和用户数据，并使回滚失效。
- 从单槽迁移到双槽，或改变分区大小时，必须把 bootloader、分区表和应用镜像作为一个有明确恢复方案的发布单元验证。

## 6. 保护边界

维护和发布时应分别核对以下对象：

- **bootloader**：负责安全启动、分区发现、`otadata` 解析和回滚选择。bootloader 变更应使用专门的整包升级或受控刷写流程，并验证版本兼容性。
- **partition table**：决定每个分区的偏移、大小和类型。分区表变更可能改变所有数据解释，不能只替换应用 bin。
- **NVS**：保存配置、凭据或设备状态。启用 NVS encryption 时，密钥来源和恢复路径必须明确；未经授权不得擦除或导出敏感值。
- **PHY/calibration**：部分项目使用 `phy_init` 或其他校准区。擦除后可能出现射频性能变化、重新校准或联网异常。
- **eFuse**：安全启动、Flash encryption、JTAG/下载保护、设备密钥和回滚相关策略可能由 eFuse 锁定。eFuse 是单向或难以恢复的硬件状态，禁止把测试命令直接用于生产设备。
- **Secure Boot / Flash Encryption**：开启后必须确认签名密钥、加密模式、烧录工件和 OTA 镜像格式的完整链路；“能写入 Flash”不等于“bootloader 会接受并启动”。

公开参考：

- https://docs.espressif.com/projects/esp-idf/en/latest/esp32c3/security/secure-boot-v2.html
- https://docs.espressif.com/projects/esp-idf/en/latest/esp32c3/security/flash-encryption.html
- https://docs.espressif.com/projects/esp-idf/en/latest/esp32c3/api-reference/system/efuse.html

## 7. 应用 OTA 与整片擦除的区分

判断一次操作属于哪一类，先看写入范围和启动产物：

- 应用 OTA：通常只写目标 `ota_0` 或 `ota_1`，最后更新 `otadata`；bootloader、分区表、NVS 和旧应用槽应保留。
- 整片擦除：调用 `erase_flash` 或等价流程，之后重新写入 bootloader、分区表和应用；NVS、`otadata`、PHY 数据及用户数据通常全部清空。
- 工厂刷写/恢复：可能是全片擦除，也可能只覆盖固定镜像；必须查看脚本和实际命令，不能仅根据文件名判断。
- bootloader 或分区表升级：即使没有整片擦除，也不是普通应用 OTA；需要单独记录写入偏移、版本关系和失败恢复方法。

排查时保存公开的版本、分区布局、运行槽和错误码即可；不要在笔记、工单或日志中记录 Wi-Fi 密码、token、完整 Flash hash 或设备私密日志。

## 8. ESP32-C3 native USB 复位注意事项

ESP32-C3 的 native USB Serial/JTAG 连接可通过主机控制线或调试操作触发芯片复位。这个复位在 OTA 语义上仍是一次真实重启，USB 断开、重新枚举或终端重新连接不代表升级完成。

如果新应用已经被设置为启动目标，但尚未调用 `esp_ota_mark_app_valid_cancel_rollback()`，此时由 native USB、调试器、串口工具、看门狗或人工按键触发复位，都可能让 bootloader 把这次启动视为未通过验证，并回滚到旧槽。验证脚本应等待应用完成自检和明确确认，再执行复位、断开 USB 或关闭测试会话。

同时注意 USB 重新枚举会造成串口日志截断，不能以“串口消失”判定 OTA 失败。应在复位前持久化最小的升级阶段标记，复位后分别读取运行槽、启动槽、镜像版本、回滚状态和 reset reason。若设备在 bootloader 阶段复位，native USB 的可见性和端口名称也可能变化，应使用芯片/串口识别信息而不是固定端口名。
