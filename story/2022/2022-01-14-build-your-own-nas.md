---
title: 组建你自己的 NAS 服务器
slug: build-your-own-nas
---

# 组建你自己的 NAS 服务器

- HP MicroServer 全新微塔 参考价格: ¥4000 , 功耗 60W
  - HP MicroServer Gen 10
    - 全新 AMD x3216 8G ¥2300
    - 最多 4 个硬盘
  - SAS 6T×4 - ¥1600
  - SAS 卡 - ¥100
- 二手塔式 参考价格: ¥4700 , 功耗 120W
  - DDR4 服务器 - ~¥2000
    - 1U 4×3.5 寸盘位
    - 2U 8×3.5 寸盘位
  - CPU XeonE5v4×2 ~¥1000 - 32 核 64 线程
  - 内存 DDR4 ECC REG 16G×4 - 64G ~¥1000
  - SAS 6T×4 - ¥1600
  - SAS 卡 - ¥100

<!-- more -->

## 部件参考价格

| 部件                | 规格             | ¥      | taobao                                           |
| ------------------- | ---------------- | ------ | ------------------------------------------------ |
| SAS                 | 6T 3.5 寸 7.2K   | ¥400   | https://item.taobao.com/item.htm?id=560836442610 |
| SAS                 | 1.2T 2.5 寸 10K  | ¥160   | https://item.taobao.com/item.htm?id=547264783830 |
| SAS 直通卡          |                  | ¥100   | https://item.taobao.com/item.htm?id=521090584542 |
| 内存 DDR4 ECC REG   | 16G              | ~¥250  | https://item.taobao.com/item.htm?id=567468034444 |
| 内存 DDR4 ECC REG   | 32G              | ~¥600  | https://item.taobao.com/item.htm?id=567468034444 |
| 内存 DDR4 ECC NOREG | 16G              | ~¥500  |
| 内存 DDR4 ECC NOREG | 32G              | ~¥1000 |
| CPU [E5-2683V4]     | 2.1G 16C32T 120W | ~¥500  | https://item.taobao.com/item.htm?id=597514302182 |
| CPU [E3-1235Lv5]    |

[e5-2683v4]: https://ark.intel.com/content/www/us/en/ark/products/91766/intel-xeon-processor-e52683-v4-40m-cache-2-10-ghz.html
[e3-1235lv5]: https://www.intel.cn/content/www/cn/zh/products/sku/88170/intel-xeon-processor-e31235l-v5-8m-cache-2-00-ghz/specifications.html

:::caution PC 和 企业级服务器 过渡产品

- 服务器市场有比 PC 强，但比服务器弱的一个产品线，通常用于个人工作室之类的场景。
- 特点
  - 服务器体积小
  - CPU 功耗低 - 25W
  - 内存使用 ECC NOREG
    - 二手市场少，价格偏高
    - 需要 CPU 支持
    - 需要主板支持

:::

## 主机选择

- 机型选择
  - 微塔 - 噪音小，功耗一般 ~60w
    - 二手少 - 大多买新的，价格高
    - 体积小
    - 一般主板不支持 ECC REG 内存
  - 服务器 - 噪音大，功耗一般 ~120w
    - 二手多 - 便宜
    - 体积大 - 一般 1U
    - 扩展能力强 - 通常支持 一个半高+一个全高 PCI - 因此可以配 GPU
    - 如果没有书房、库房或隐瞒角落不推荐
    - 部分服务器噪音也不是特别大
- 世代选择
  - 通常二手都是落后好几个世代，但建议至少选择 DDR4
- 配置选择
  - 全新整套主机 - 包含 CPU+内存
    - 性价比不高，但省事
  - 二手服务器
    - 性价比最高，省事
    - 可选性不多
  - 自己配主机 - 主板+机箱+电源+CPU+内存
    - 事情最多，如果不是喜欢搞这个，建议不要
- 服务器选择
  - 架式
    - 二手市场最多，占地面积大
    - 1U
      - 8 个 2.5 寸盘位
      - 4 个 3.5 寸盘位
  - 塔式
    - 二手市场不多，占地面积大
    - 和普通台式电脑差不多
    - 服务器主板
  - 刀片
    - 二手市场很少
  - 模块
    - 二手市场不太多，占地面积很小
    - 魔改后的非常安静
- 成品 NAS 服务器
  - 群晖 - 不再这里的讨论范围内

### 配置目标

| -    | 机型     | CPU      | 内存  | 硬盘        |
| ---- | -------- | -------- | ----- | ----------- |
| 最低 | 微塔,ITX | 4 核     | 8G    | 6T×4 raidz1 |
| 推荐 | -        | 4 核+    | 16G+  |
| 更高 | 服务器   | 32 核心+ | 128G+ |

> 通常配置个最低，后期能够调整组件即可

### 全新整套主机

- [hp microserver gen 10]
  - AMD x3216 8G ¥2300
  - https://item.taobao.com/item.htm?id=564308249868#detail
- hp microserver gen 10 plus
  - **非常小巧**
  - 需要海淘
  - ¥5000
- mineNAS 至强 微塔
  - Core 系列 CPU https://item.taobao.com/item.htm?id=546747046542
    - ¥3600
  - Xeon 系列 CPU https://item.taobao.com/item.htm?id=523041473305
    - ¥7500+

[hp microserver gen 10 spec]: https://support.hpe.com/hpesc/public/docDisplay?docId=a00028525en_us&docLocale=en_US
[hp microserver gen 10]: https://www.hpe.com/psnow/doc/a00008701enw

### 二手服务器

- 架式
  - HP DL160G9 https://item.taobao.com/item.htm?id=564082577179
    - 准系统 ¥750
    - E5-4650V3\*2 24 核 48 线 + 64G + Intel 800G SSD ¥3290
    - 8×2.5 寸盘位
  - DELL R430 X99 https://item.taobao.com/item.htm?id=567440742661
    - 准系统 ¥2200
    - 4×3.5 寸盘位
  - DELL R630 https://item.taobao.com/item.htm?id=557304169457
    - 准系统 ¥1449
    - 8×2.5 寸盘位
  - DELL R730 - https://item.taobao.com/item.htm?id=604846119404
    - 2U
    - 8-12 3.5 寸盘位, 8-24 2.5 寸盘位,
- 模块服务器
  - 广达 单模块即可
  - 改装后的非常安静
  - 价格 ~¥500
  - **注意** 硬盘可能不太好放

### 装机

:::tip

- 装机通常主板都是买新的
- 机箱看情况买新的或二手的或定制的
- 明确装机要达成的目标 - 不要为了装机而装机
  - 容量？
  - 尺寸大小？
  - 硬盘、内存、CPU？

:::

- 主板
  - https://www.asrockrack.com/
    - 选择好后可淘二手
- 机箱
  - 确定好主板类型后决定
  - 小的情况可定制 亚克力 机箱
- 电源
  - 功耗 < 120W 时可考虑外置
  - 服务器功耗最好买 二手 服务器电源模块

## 系统

1. 黑群晖

- 安装使用容易
- 现成的应用
- 适用于新手或不愿意折腾的玩家
- 相对封闭 - 不建议用服务器运行，可以考虑开虚拟机

2. Linux

### Linux

- AlpineLinux
- zfs
  - 看情况使用 raidz1,raidz2,draid
    - raidz1=raid5 - 4 盘时
    - raidz2=raid6 - 6 盘时
    - draid - >= 12 盘时
  - SSD 缓存 - 如果有预算
- 应用场景
  - 多媒体 - Jeylyfin, Plex, 照片, 音乐
  - 下载器 - aria2, qtorrent, transimision
  - 家庭 - Nextcloud
  - 共享 - samba, afp
  - 备份 - afp/TimeMachine
  - 常用应用 - vaultwarden
  - 服务器
    - Kubernetes/k3s - 推荐
    - Docker
    - 虚拟机

# 常见问题

## 如何选择硬盘缓存

- 如果使用 ZFS+SSD 作为缓存，那硬盘的缓存影响不大
- 如果使用 硬件 RAID，那硬盘的缓存能提效

## 为什么选择 SAS 硬盘

- SAS 为企业级硬盘 - 二手质量高
- 二手市场多
- 支持热插拔 - 更换容易
- **但** 通常需要额外的 SAS 卡 - 一般选择半高 PCI
- SAS 还需要注意区分 2.5 和 3.5
  - 3.5 - 容量 300G-5T, 转速 7200+
  - 2.5 - 容量 120G-1T, 转速 10000-15000

## 如何选择 CPU

- 志强 Xeon
  - 优点
    - 二手市场多
    - 价格便宜
    - 性能非常好 - 核心多
  - 缺点
    - 功耗高 - 120W
    - 需要主板支持
    - 一般媒体能力普通
    - 全新非常贵
- 志强 Xeon L
  - 优点
    - 功耗低 - 25W
  - 缺点
    - ECC NOREG
    - 通常内存只支持 2 通道 - 一般家用 NAS 足矣
- 酷睿 Core
  - 优点
    - 单核频率高
    - 媒体处理能力强
    - 功耗一般 - 60W
  - 缺点
    - 贵
    - 核心数少 - 作为服务器核心数比单核频率更重要
- 凌动 Celeron
  - 优点
    - 功耗非常低 - 10W
  - 缺点
    - 能力有限

## 服务器 和 PC/HTPC 的区别

- 服务器通常支持管理模块
  - 启动慢
  - 支持远程远离 - 开机，停机，健康检查，KVM
  - 固件升级
- PC/HTPC 一般直接启动即可
