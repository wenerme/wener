---
id: mosquitto
---

# mosquitto

* [mosquitto](https://mosquitto.org/) - MQTT broker
  * [eclipse/mosquitto](https://github.com/eclipse/mosquitto)
* Topic
  * sensors/COMPUTER_NAME/temperature/HARDDRIVE_NAME
    * 级联关系
  * `sensors/+/temperature/+`
    * 匹配 sensors/a/temperature/b
  * `a/b/#`
    * 匹配 a/b/c, a/b/c/d
* QoS
  * 订阅方控制
  * 0 - 发送一次
  * 1 - 至少一次，会请求确认
  * 2 - 准确一次，使用 4 次握手保证
* 默认端口 1883

```bash
# macOS
brew install mosquitto
# AlpineLinux
apk add mosquitto mosquitto-clients

# 启动 broker
mosquitto

# 订阅
mosquitto_sub -t 'test/topic' -v
# 发布
mosquitto_pub -t 'test/topic' -m 'hello world'

# 订阅所有
mosquitto_sub -t '#' -v
```

