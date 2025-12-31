---
title: GeoIP 与位置数据
tags:
  - Data
  - GeoIP
  - Location
  - IP
---

# GeoIP 与位置数据

- [P3TERX/GeoLite.mmdb](https://github.com/P3TERX/GeoLite.mmdb)
- [MaxMind GeoIP2-java](https://github.com/maxmind/GeoIP2-java)
- [NPM: maxmind](https://www.npmjs.com/package/maxmind)

## 数据结构参考

**块数据 (Block Data)**:
`network, geoname_id, registered_country_geoname_id, represented_country_geoname_id, is_anonymous_proxy, is_satellite_provider, postal_code, latitude, longitude, accuracy_radius`

**位置数据 (Location Data)**:
`geoname_id, locale_code, continent_code, continent_name, country_iso_code, country_name, subdivision_1_iso_code, subdivision_1_name, subdivision_2_iso_code, subdivision_2_name, city_name, metro_code, time_zone`

## 国内 ISP 代码片段

- **淘宝 IP**: `http://ip.taobao.com/service/getIpInfo.php?ip=101.81.78.60` (限制 < 10 QPS)

```json
{
  "code": 0,
  "data": {
    "country": "中国",
    "country_id": "CN",
    "region": "上海市",
    "city": "上海市",
    "isp": "电信",
    "ip": "101.81.78.60"
  }
}
```

### ISP 代码参考

- **Total (China)**: 336300750
- **电信 (Telecom)**: 137094453
- **联通 (Unicom)**: 79148611
- **移动 (Mobile)**: 35364631
- **铁通 (Tietong)**: 24553083
- **教育网 (Edu)**: 17143504
- **鹏博士 (Dr. Peng)**: 8763974
- **阿里巴巴 (Alibaba)**: 3170560

## 归档 / 镜像

- [db-ip.com Lite (2020-02)](https://download.db-ip.com/free/dbip-country-lite-2020-02.mmdb.gz)
