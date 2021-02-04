# 单应用设备

## Tips

## Corporate-Owned, Single-Use - COSU
* https://developer.android.com/work/cosu
* Android 5.0 +
* 两种模式
  * 固定应用模式
    * 可固定任何应用
    * 允许所有用户访问
    * Home 和最近访问按钮不能使用
    * 可通过按住 Home 和最近访问按钮退出
  * 锁定任务模式
    * 只有在 DPC 白名单下的应用可用
    * 只允许设备所属
    * Home 和 最近访问按钮不可见
    * 只能通过调用 `stopLockTask` 退出



 device policy controller (DPC) 

emm
https://developers.google.com/android/work/tools

https://github.com/googlesamples/android-testdpc


https://developers.google.com/android/work/terminology


device owner—Mode of operation where a device is managed by the customer organization, usually by means of a device policy controller. The device owner mode of operation supports corp-liable deployments. (Compare to profile owner. For details about provisioning device owner deployments, see Device owner provisioning methods.) Device owner also refers to the EMM bound to the device during setup; literally, “device owner.”

device policy controller (DPC)—An app that controls local device policies and system applications on devices. EMM partners are responsible for maintaining and deploying a DPC and an EMM console. For more about DPCs, see Device policy controller.

EMM—enterprise mobility management solution provider. EMMs provide a combination of MDM and MAM features.

EMM console—Center of the device management experience, typically created by the EMM and used by admins. EMM partners are responsible for maintaining and deploying an EMM console and a DPC. For more about EMM consoles, see EMM console.

EMM partner—EMM solution provider that is registered to partner with Google.

EMM token—Token used to bind an Android enterprise solution to a customer’s Google domain. For details, see Google Accounts.




https://developers.google.com/android/work/

https://www.android.com/enterprise/management/
