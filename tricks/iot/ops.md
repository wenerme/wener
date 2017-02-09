# Operations

## Tips
```bash
# 查看支持的主板
# http://platformio.org/boards
platformio boards
# 查看已安装的
platformio boards --installed
# 查看所有的设备
platformio device list
# 设备监控
platformio device monitor
# 生成 CLion 项目
platformio init --ide clion --board uno

# 库管理
# 例如安装 http://platformio.org/lib/show/54/DallasTemperature/installation
# 可以使用 ID, 名字 或者名字加版本号来安装
# 会在 ini 中添加 lib_deps = DallasTemperature 记录
# 然后在 IDE 中更新索引重载项目即可
# 在线库搜索 http://platformio.org/lib
platformio lib install "DallasTemperature"

```
