---
title: 电话号码元数据
---

# PhoneNumber

- E.164
  - 国际标准格式
    - +国家代码 区号 电话号码
    - +86 10 12345678
  - 分组格式
    - +1 (202) 555-0123
    - +86 138-1234-5678
- ITU-T E.123
  - 国际格式 +1 202 555 0123
  - 本地格式 202-555-0123。

```ts
interface PhoneNumberMetadata {
  phoneNumber: string;
  countryCode: string;
  areaCode: string;

  isp: string;
  province: string;
  city: string;
  divisionCode: string;
  latitude: number;
  longitude: number;

  // 可能存在定位不准确有多个地址的情况
  locations: Array<{
    province: string;
    city: string;
    divisionCode: string;
    latitude: number;
    longitude: number;
  }>;
}
```

- https://en.wikipedia.org/wiki/National_conventions_for_writing_telephone_numbers
- [google/libphonenumber](https://github.com/google/libphonenumber)
  - 支持非常多语言
- Javascript/Node
  - [catamphetamine/libphonenumber-js](https://gitlab.com/catamphetamine/libphonenumber-js)
    - npm:libphonenumber-js
  - [google/libphonenumber](https://github.com/google/libphonenumber)
    - npm:google-libphonenumber - 非官方
  - [aftership/phone](https://github.com/aftership/phone)
    - npm:phone
  - [grantila/awesome-phonenumber](https://github.com/grantila/awesome-phonenumber)
    - npm:awesome-phonenumber
  - https://npmtrends.com/awesome-phonenumber-vs-google-libphonenumber-vs-libphonenumber-js-vs-phone

**US 10 digits**

```
^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$
```

- https://stackoverflow.com/a/16699507/1870054
- https://regex101.com/r/j48BZs/2

## 中国 {#china}

- Landlines
  - (0XXX) YYY YYYY
    - XXX ,2-3 位, trunks
    - YYYY YYYY, 7-8 位, subscriber/local number
- 手机号
  - 1WX YYYY ZZZZ
    - W 3-9
- Toll Free
  - 400 XXX XXXX
  - 800 XXXX XXXX
- Service numbers
  - 3-5 位

---

- [中国大陆服务电话号码](https://zh.wikipedia.org/zh-sg/中国大陆服务电话号码)
  - 1××：通常为紧急电话或查号台；
  - 100××：通常为电信运营商的客服电话；
  - 12×××：通常为政府部门的服务热线；
  - 400-×××-××××、800-×××-××××、95／96×××（5－8位数）：通常为商业服务类电话；

## Carrier

- Mobile Country Code (MCC) 和 Mobile Network Code (MNC)
  - by 国际电信联盟（ITU-T）
  - 用于 标识移动网络运营商
  - MCC（Mobile Country Code）：表示国家代码（如中国是 460，美国是 310）。
  - MNC（Mobile Network Code）：表示运营商代码（如中国移动的 MNC 是 00, 02, 07）。
  - MCC-MNC 标识某个国家的某个运营商
  - 中国移动：460-00
  - 中国联通：460-01
  - 美国 AT&T：310-410
  - http://mcc-mnc.com/
- Carrier Identification Codes (CIC) 运营商识别码
  - by 美国 FCC
- Public Land Mobile Network (PLMN) - 公共陆地移动网络
  - =MCCMNC
  - 广泛应用于 GSM 和 LTE 网络
- ITU-T E.212
  - 定义了 IMSI（International Mobile Subscriber Identity，国际移动用户标识）的结构，包含 MCC 和 MNC。
  - IMSI：460000123456789
    - MCC = 460（中国）
    - MNC = 00（中国移动）
- 商业
  - GSMA Mobile Network Code (MNC) Database
  - Twilio Lookup API
