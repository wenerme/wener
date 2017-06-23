# APNs

* [APNs Overview](https://developer.apple.com/library/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/APNSOverview.html)
* [Payload Key Reference](https://developer.apple.com/library/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/PayloadKeyReference.html)
* 限制
  * 一般的推送,最大大小为 4KB (4096 bytes)
  * VoIP 推送,最大大小为 5KB (5120 bytes)
* 通知类型
  * 提醒通知
    * 文字
    * 语音
    * badge
    * 支持自定义操作
      * 需要 APP 启动时进行注册操作定义
  * 静默通知
    * 用于唤醒后台
    * 可使用 30s
* 本地化
  * 可以通过检测设备的语言类型,在发送时使用指定的语言
  * 可以使用 APP 中打包的字符串,在推送时传参数
  * content-available 为 1, 并且没有 alert, sound, badge 配置
