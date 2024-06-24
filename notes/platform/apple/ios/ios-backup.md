---
title: iOS Backup
---

# iOS Backup

- [jfarley248/iTunes_Backup_Reader](https://github.com/jfarley248/iTunes_Backup_Reader)
- [avibrazil/iOSbackup](https://github.com/avibrazil/iOSbackup)
- [knoopx/mobilesync](https://github.com/knoopx/mobilesync)
- [richinfante/iphonebackuptools](https://github.com/richinfante/iphonebackuptools)
- [Siguza/imobax](https://github.com/Siguza/imobax)

# FAQ

## Move messages from iPhone to Android

- https://gist.github.com/perplexes/2884630

```sql
.output iphone_sms_content.xml
SELECT '  <sms protocol="0" address="'||address||'" date="'||date||'000" type="'||(flags-1)||'" subject="null" body="'|| REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(text,'&','&amp;'),'<','&lt;'),'>','&gt;'),'"','&quot;'),x'0d0a','#13;')||'" toa="null" sc_toa="null" service_center="null" read="1" status="-1" locked="0" />' FROM message;
.quit
```
