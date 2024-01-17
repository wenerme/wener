---
title: Netflix
---

# Netflix

- https://help.netflix.com/zh-tw/node/24926
- 标准+广告
- 标准
  - 2设备 同时观看
  - 2设备 下载
  - FHD
  - +1成员
- 高级
  - 4设备 同时观看
  - 6设备 下载
  - UHD
  - +2成员
- 额外成员
  - 1设备 同时观看
  - 1设备 下载
  - 1使用者
  - 地区相同
- US - $7,$15.5,$20 - +$7.99/slot
- 地区资源
  - 美国 - 最多，但中文字幕一般
  - 香港
  - 台湾
  - 日本
  - 新加坡
- 低价地区
  - 土耳其
  - 巴西

| Level             | USD      | Slot  | Note                      |
| ----------------- | -------- | ----- | ------------------------- |
| Standard with Ads | $7/月    |       | FullHD, 2设备             |
| Standard          | $15.5/月 | $8/月 | FullHD, 2设备, 1额外成员  |
| Premium           | $23/月   | $8/月 | UltraHD, 4设备, 2额外成员 |

<!--
https://nicechinavpn.com/netflix-vpn/
-->

:::tip

- 地区根据第一次注册时的 IP 地址决定
  - 注册地区不影响观看
- 在 土耳其、巴西 买便宜
  - 土耳其 Premium 199.99 TRY 约 50¥
  - 巴西 Premium R$55,90 约 90¥

:::

---

- CTRL+SHIFT+ALT+D
- CTRL+SHIFT+ALT+Q
- CTRL+SHIFT+ALT+S

# FAQ

```bash
# 如果 403 就是被 block
# Not Available 不在区域提供服务
# 输出结果也包含 region 信息: signup_tou_region
curl https://www.netflix.com/title/80018499
# 地址信息
curl http://api-global.netflix.com/apps/applefuji/config
```

```xml
<config>
  <device_supported>true</device_supported>
  <country>US</country>
  <enable_content_header_cache>true</enable_content_header_cache>
  <ncts>CLOUD</ncts>
  <stall_notification_intrplay>true</stall_notification_intrplay>
  <geolocation.locale>en-US</geolocation.locale>
  <movie_norminal_to_peak_bandwidth_multiplier>1.5</movie_norminal_to_peak_bandwidth_multiplier>
  <movie_peakbandwidth_multiplier>1.0</movie_peakbandwidth_multiplier>
  <instant_queue_enabled>true</instant_queue_enabled>
  <showDD>true</showDD>
  <geolocation.asn>205227</geolocation.asn>
  <geolocation.internal_network>false</geolocation.internal_network>
  <support_assistive_audio>true</support_assistive_audio>
  <connection_timeout_slow>16000</connection_timeout_slow>
  <geolocation.status>ALLOW</geolocation.status>
  <prefetch_timeout_in_seconds>60</prefetch_timeout_in_seconds>
  <manifest_expiration_in_seconds>7200</manifest_expiration_in_seconds>
  <geolocation.country>US</geolocation.country>
  <connection_retries>3</connection_retries>
  <header_downloader_cache_size>5</header_downloader_cache_size>
  <movie_iframe_bandwidth_multiplier>0.3</movie_iframe_bandwidth_multiplier>
  <cdn_open_connect_forced>4,6</cdn_open_connect_forced>
  <initial_bitrate_mask_wifi>1750</initial_bitrate_mask_wifi>
  <support_title_audio_selection>true</support_title_audio_selection>
  <selected_cdn_bandwidth_multiplier>1.0</selected_cdn_bandwidth_multiplier>
  <geolocation.language>en</geolocation.language>
  <dvd_service_allowed>false</dvd_service_allowed>
  <dd_5_1_enabled>true</dd_5_1_enabled>
  <min_cticket_renew_seconds>0</min_cticket_renew_seconds>
  <connection_timeout>6000</connection_timeout>
  <use_dash_profiles>true</use_dash_profiles>
  <generic_feed_url>http://api.netflix.com/catalog/titles/populars?v=2.0&amp;output=plist&amp;filters=http://api.netflix.com/categories/title_formats/instant</generic_feed_url>
  <geolocation>US</geolocation>
</config>
```

- 其他服务的检测方式
  - https://github.com/jinwyp/one_click_script/blob/master/netflix_check.sh
  - https://github.com/sjlleo/netflix-verify
- 地区内容 https://unogs.com/countrydetail
