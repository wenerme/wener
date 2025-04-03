---
tags:
  - Command
---

# vcgencmd

- https://www.raspberrypi.com/documentation/computers/os.html#vcgencmd

```bash
apk add raspberrypi-utils-vcgencmd

# 获取系统信息
vcgencmd version               # 显示固件版本
vcgencmd get_mem arm           # 显示分配给 ARM (CPU) 的内存大小 (MB)
vcgencmd get_mem gpu           # 显示分配给 GPU 的内存大小 (MB)
vcgencmd measure_temp          # 显示 GPU 温度 (摄氏度)
vcgencmd measure_clock arm     # 显示 ARM (CPU) 时钟频率 (Hz)
vcgencmd measure_clock core    # 显示核心时钟频率 (Hz)
vcgencmd measure_clock v3d     # 显示 3D 图形 (V3D) 时钟频率 (Hz)
vcgencmd measure_clock isp     # 显示图像信号处理器 (ISP) 时钟频率 (Hz)
vcgencmd measure_volts core    # 显示核心电压
vcgencmd measure_volts sdram_c # 显示 SDRAM 控制器电压
vcgencmd measure_volts sdram_i # 显示 SDRAM 输入/输出电压
vcgencmd measure_volts sdram_p # 显示 SDRAM PHY 电压
vcgencmd codec_stats           # 显示编解码器使用情况
vcgencmd codec_enabled H264    # 检查 H264 编解码器是否启用
vcgencmd codec_enabled MJPEG   # 检查 MJPEG 编解码器是否启用
vcgencmd codec_enabled VP9     # 检查 VP9 编解码器是否启用

# 配置和控制 (部分命令可能主要通过 config.txt 配置)
vcgencmd display_power             # 获取显示器电源状态 (0=关闭, 1=开启)
vcgencmd display_power 1           # 开启显示器电源
vcgencmd display_power 0           # 关闭显示器电源
vcgencmd get_config display_width  # 获取配置的显示宽度
vcgencmd get_config display_height # 获取配置的显示高度
vcgencmd get_config int            # 显示启动配置的整数值
# vcgencmd set_overscan left 20 # 设置左侧过扫描 (通常在 config.txt 中配置)

# 检查系统状态
# 0x0 表示正常
vcgencmd get_throttled # 检查是否发生过欠压、过热等问题

# 其他实用命令
vcgencmd dispmanx_update # 触发一次 GPU 同步 (通常用于图形调试)
vcgencmd read_otp        # 读取一次性可编程 (OTP) 内存
```

```
arm=948M
gpu=76M
temp=62.8'C
frequency(48)=800191424
frequency(1)=200008304
frequency(46)=360571296
frequency(45)=0
volt=0.8563V
volt=1.1000V
volt=1.1000V
volt=1.1000V
H264=enabled
MJPEG=disabled
VP9=disabled
display_power=1
```

**config init**

```
arm_64bit=1
arm_freq=1500
audio_pwm_mode=514
camera_auto_detect=-1
config_hdmi_boost=5
core_freq=500
core_freq_min=200
disable_commandline_tags=2
disable_l2cache=1
display_hdmi_rotate=-1
display_lcd_rotate=-1
dvfs=3
enable_gic=1
force_eeprom_read=1
force_pwm_open=1
framebuffer_ignore_alpha=1
framebuffer_swap=1
gpu_freq=500
gpu_freq_min=250
init_uart_clock=0x2dc6c00
initial_turbo=60
lcd_framerate=60
max_framebuffers=-1
over_voltage_avs=-23750
over_voltage_idle=-1
pause_burst_frames=1
pciex4_reset=1
pmic_turbo_threshold=600
program_serial_random=1
ramfsaddr=-1
total_mem=1024
hdmi_force_cec_address:0=65535
hdmi_force_cec_address:1=65535
hdmi_pixel_freq_limit:0=0x11e1a300
hdmi_pixel_freq_limit:1=0x11e1a300
```

**get_throttled**

| Bit | Description                                                                     |
| --- | ------------------------------------------------------------------------------- |
| 0   | Under-voltage detected (闪电标志出现)                                           |
| 1   | ARM frequency capped (ARM 频率被限制)                                           |
| 2   | Core frequency capped (核心频率被限制)                                          |
| 3   | V3D frequency capped (V3D 频率被限制)                                           |
| 4   | ISP frequency capped (ISP 频率被限制)                                           |
| 5   | Under-voltage has occurred since last reboot (自上次启动以来曾经发生过电压不足) |
| 16  | Soft temperature limit active (软温度限制生效)                                  |
| 17  | Under-voltage imminent (即将发生电压不足)                                       |
