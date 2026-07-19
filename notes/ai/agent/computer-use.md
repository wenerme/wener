---
tags:
  - Automation
---

# Computer Use

| 输入方式                | UIA | input queue                       | 是否可后台        | 接近真实输入 | 可被区分            | 用户影响                                                           |
| ----------------------- | --- | --------------------------------- | ----------------- | ------------ | ------------------- | ------------------------------------------------------------------ |
| UIA                     | 是  | 否                                | 强                | 低           | 容易                | 不依赖鼠标键盘注入，适合控件级自动化，但受控件可访问性支持程度限制 |
| PostMessage(WM\_\*)     | 否  | 否，只进目标 window message queue | 可以              | 中低         | 容易                | 通常不抢焦点、不移动鼠标，适合直接向窗口投递消息                   |
| Synthetic Pointer       | 否  | 是，Windows pointer injection     | 有条件可以        | 中           | 可以                | 不移动真实鼠标，但目标必须在点击位置可命中                         |
| SendInput               | 否  | 是，系统全局 input queue          | 本质上 foreground | 中高         | 可以识别为 injected | 会切窗口、移动鼠标，之后 best-effort 恢复                          |
| Windows Virtual HID     | 否  | 更接近硬件层，进入系统输入路径    | 共享活动桌面      | 高           | 设备仍可枚举和识别  | 模拟独立输入设备，真实性更高，但仍可能被系统或应用识别             |
| 外部 USB HID / 物理 HID | 否  | 更接近硬件层                      | 共享活动桌面      | 最高         | 仍可能被行为分析    | 与用户共享输入设备，干扰最大                                       |

Windows Virtual HID通常仍会暴露：

- PnP device identity
- driver/service identity
- VID/PID和report descriptor
- 设备枚举与安装记录
- 异常输入时序
- 缺少真实人类pointer轨迹
- 应用状态与输入时序不一致

---

- macOS Quartz/HID -> system HID event stream
- Linux /dev/uinput backend
  - evdev::uinput::VirtualDevice
  - -> kernel virtual pointer
  - -> Xorg MPX/XI2

abbr.|stand for|cn
---|---
PnP|
VHF|
ViGEm|
KMDF|
VID|
PID|
HID|
UIA|
