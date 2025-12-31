---
title: Asterisk Tips
tags:
  - Asterisk
  - Tips
---

# Asterisk Tips

```bash
core show settings
core set verbose 6

./configure
make -j $(nproc)
make install DESTDIR=$PWD/bin
make samples DESTDIR=$PWD/bin
```

## Moduels for pg ara

```conf
[modules]
; ARA use Postgres
preload => res_config_pgsql.so
preload => res_realtime.so

autoload = yes

; Use pg as realtime backend
noload => res_odbc.so
noload => res_config_odbc.so
noload => res_config_sqlite3.so
noload => res_odbc_transaction.so

noload => func_odbc.so

; Unused cel backend
noload => cel_tds.so
noload => cel_odbc.so
noload => cel_sqlite3_custom.so
noload => cel_custom.so

; Unused cdr backend
noload => cdr_tds.so
noload => cdr_sqlite3_custom.so
noload => cdr_odbc.so
noload => cdr_mysql.so
noload => cdr_adaptive_odbc.so
noload => cdr_csv.so
noload => cdr_custom.so

; Use pgsip instead
noload => chan_mobile.so
noload => chan_dongle.so
noload => chan_skinny.so
noload => chan_phone.so
noload => chan_unistim.so
noload => chan_mgcp.so
noload => chan_sip.so

; Unused chan
noload => chan_console.so
noload => chan_oss.so
noload => chan_alsa.so

; DAHDi
; noload => chan_dahdi.so
; noload => codec_dahdi.so

noload => pbx_dundi.so
noload => pbx_gtkconsole.so
noload => pbx_ael.so
; noload => pbx_lua.so

; Use sip instead of pjsip
; load => chan_sip.so
; noload => res_pjsip.so
; noload => res_pjsip_pubsub.so
; noload => res_pjsip_session.so
; noload => chan_pjsip.so
; noload => res_pjsip_exten_state.so
; noload => res_pjsip_log_forwarder.so


; Unused resources
noload => res_hep.so
noload => res_hep_pjsip.so
noload => res_hep_rtcp.so

noload => res_phoneprov.so

; Not works in container
noload => fun_aes.so

```
