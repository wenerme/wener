---
title: Apple MDM
tags:
  - Platform
  - Apple
  - MDM
---

# Apple MDM

- [h-mdm/h-mdm](https://github.com/h-mdm/h-mdm)
- [Flyve MDM](https://www.flyve-mdm.com/)
- [The Best Mobile Device Management (MDM) Software](https://www.pcmag.com/g00/article/342695/the-best-mobile-device-management-mdm-software)
- [multunus/onemdm-server](https://github.com/multunus/onemdm-server)
  - Ruby
- [micromdm/micromdm](https://github.com/micromdm/micromdm/)
  - Mobile Device Management server
- [Mobile Device Management (MDM) Protocol](https://developer.apple.com/library/archive/documentation/Miscellaneous/Reference/MobileDeviceManagementProtocolRef/3-MDM_Protocol/MDM_Protocol.html)
- [Wiki: Mobile device management](https://en.wikipedia.org/wiki/Mobile_device_management)
  - both company-owned and employee-owned (BYOD)
- BYOD: bring your own device
- [What is Apple’s MDM Solution?](https://medium.com/@Scalefusion/what-is-apples-mdm-solution-9cdd8d6b33c8)
- [Apple iOS Management](https://www.manageengine.com/mobile-device-management/apple-ios-management.html)
- [Apple Device Management](https://developer.apple.com/documentation/devicemanagement)
- [Device Management Commands and Queries](https://developer.apple.com/documentation/devicemanagement/commands_and_queries)

## iOS

- 批量下发应用和策略
- 更加完善的策略管理
- 推送邮件和交换设置
- 应用黑白名单
- 网站黑白名单
- 发布企业应用 - 不需要上架 AppStore
- 推送网络设置和安全设置
- 远程投屏 - 需要 ITSM 工具
- 加密消息 和 VoIP 通话
- 配置设备为单应用模式 - Kiosk
- 在设备上发布内容和幻灯片
- 定时重启、锁定、解锁和动态应用策略
- 电池和数据流量使用的定期提醒
- 在不干涉用户隐私的情况下管理自带设备 - 自己提供设备在办公中使用 - 自带手机
- 案例
  - 锁定丢失手机并显示失主信息

## macOS

- Enroll bulk devices and apply policies out of the box with Apple DEP
- Allow or restrict applications, set app preferences
- Whitelist websites and enforce content filters
- Apple curfews to limit device usage
- Restrict media and sharing
- Configure email and exchange settings
- Manage employee-owned devices without compromising on user privacy

## LDAP

- [Apple Device Management: LDAP](https://developer.apple.com/documentation/devicemanagement/ldap)
- [Apple LDAP Schema](https://opensource.apple.com/source/OpenLDAP/OpenLDAP-208.5/OpenLDAP/servers/slapd/schema/apple.schema.auto.html)
- [Linux Address Book](https://www.brennan.id.au/20-Shared_Address_Book_LDAP.html)

```ldif
dn:cn=Tom Thumb,ou=addressbook,dc=example,dc=com
cn: Tom Thumb
gn: Tom
sn: Thumb
o: Home
l: Brisbane
street: 12 Banana Ave
st: QLD
postalCode: 4100
pager: 5555 1111
homePhone: 5555 1234
telephoneNumber: 5555 1235
facsimileTelephoneNumber: 5555 1236
mobile: 0400 123 123
mail: tom.thumb@somedomain.com
objectClass: top
objectClass: inetOrgPerson
```
