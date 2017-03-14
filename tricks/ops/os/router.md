# Router

## 参考
* [Udoo x86](http://www.udoo.org/udoo-x86/) 相当不错的单片机, x86 架构

http://raspberrypihq.com/how-to-turn-a-raspberry-pi-into-a-wifi-router/

网络相关博客
https://jenssegers.com/
Golang DHCP4 服务器
https://github.com/krolaw/dhcp4

esp8266 Wifi 收发模块 http://www.nodemcu.com/index_cn.html 开发平台

xbee
wifly

TP 和 UNET 都有比较好的 AP
基本思路是 LAN->Server->AP
Server 层可以做到 Packet sniffer

http://askubuntu.com/questions/180733/how-to-setup-an-access-point-mode-wi-fi-hotspot

https://github.com/oblique/create_ap
https://github.com/mdlayher/dhcp6
https://github.com/miekg/dns

https://advancedtomato.com/downloads/router/r7000

没落的 http://www.dualwan.cn
VPN 可以使两边内网互通
http://www.dualwan.cn/index.php/tomato-faq/27-vpn-pptp/512-tomato-dualwan-pptp-serverclient

原版 tomato http://tomato.groov.pl/
https://github.com/Jackysi/advancedtomato
https://advancedtomato.com/ tomato 的 GUI
https://advancedtomato.com/downloads 支持列表

https://en.wikipedia.org/wiki/Tomato_(firmware)


CFE
https://wiki.openwrt.org/doc/techref/bootloader/cfe
https://www.dd-wrt.com/wiki/index.php/Serial_Recovery
https://en.wikipedia.org/wiki/Common_Firmware_Environment

## Tomato
https://zh.wikipedia.org/wiki/Tomato
https://en.wikibooks.org/wiki/Tomato_Firmware
https://advancedtomato.com/
https://github.com/Jackysi/advancedtomato

### Optimize

#### 提升无线的功率
* [TX_Power](http://www.dd-wrt.com/wiki/index.php/Advanced_wireless_settings#TX_Power)
* http://www.dd-wrt.com/wiki/index.php/Atheros/ath_wireless_settings#TX_Power
* 番茄默认为 42
* 具体值应该参照设备和国家, 否则可能导致功率过高过热

```bash
wl -i eth1 txpwr 70 #will set your adapter to 70 mW for the 5GHz
wl -i eth0 txpwr 70 #will set your adapter to 70 mW for the 2.4GHz
wl -i eth1 txpwr1 #check transmitt power for 5 GHz
wl -i eth0 txpwr1 #check transmitt power for 2.4 GHz
```

```bash
# CPU 超频
# r6300v2
# CPU 1200, 内存 800 默认为 800,533
nvram set clkfreq=1200,800
nvram commit
reboot
```


## wl
```
Usage: wl [-a|i <adapter>] [-h] [-d|u|x] <command> [arguments]

  -h        this message and command descriptions
  -h [cmd]  command description for cmd
  -a, -i    adapter name or number
  -d        output format signed integer
  -u        output format unsigned integer
  -x        output format hexdecimal

ver	get version information

cmds	generate a short list of available commands

up	reinitialize and mark adapter up (operational)

down	reset and mark adapter down (disabled)

out	mark adapter down but do not reset hardware(disabled)
	On dualband cards, cards must be bandlocked before use.

clk	set board clock state. return error for set_clk attempt if the driver is not down
	0: clock off
	1: clock on

restart	Restart driver.  Driver must already be down.

reboot	Reboot platform

radio	Set the radio on or off.
	"on" or "off"

dump	Give suboption "list" to list various suboptions

ol_stats
	Give suboption "list" to list various suboptions

ol_eventlog
	Give suboption "list" to list various suboptions

ol_cons	Give suboption "list" to list various suboptions

ol_wowl_cons
	Give suboption "list" to list various suboptions

ol_clr	Give suboption "list" to list various suboptions

srclear	Clears first 'len' bytes of the srom, len in decimal or hex
	Usage: srclear <len>

srdump	print contents of SPROM to stdout

srwrite	Write the srom: srwrite byteoffset value

srcrc	Get the CRC for input binary file

ciswrite
	Write specified <file> to the SDIO CIS source (either SROM or OTP)

cisupdate
	Write a hex byte stream to specified byte offset to the CIS source (either SROM or OTP)
--preview option allows you to review the update without committing it
	<byte offset> <hex byte stream> [--preview]

cisdump	Display the content of the SDIO CIS source
	-b <file> -- also write raw bytes to <file>
	<len> -- optional count of bytes to display (must be even)

cis_source
	Display which source is used for the SDIO CIS

cisconvert
	Print CIS tuple for given name=value pair

rdvar	Read a named variable to the srom

wrvar	Write a named variable to the srom

nvram_source
	Display which source is used for nvram

nvram_dump
	print nvram variables to stdout

nvset	set an nvram variable
	name=value (no spaces around '=')

nvget	get the value of an nvram variable

nvram_get
	get the value of an nvram variable

revinfo	get hardware revision information

customvar1
	print the value of customvar1 in hex format

taf_rule
	set taf rule bitvector
	type 'wl taf_rule ?' for values

msglevel
	set driver console debugging message bitvector
	type 'wl msglevel ?' for values

phymsglevel
	set phy debugging message bitvector
	type 'wl phymsglevel ?' for values

PM	set driver power management mode:
	0: CAM (constantly awake)
	1: PS  (power-save)
	2: FAST PS mode

wake	set driver power-save mode sleep state:
	0: core-managed
	1: awake

promisc	set promiscuous mode ethernet address reception
	0 - disable
	1 - enable

monitor	set monitor mode
	0 - disable
	1 - enable active monitor mode (interface still operates)

frag	Deprecated. Use fragthresh.

rts	Deprecated. Use rtsthresh.

cwmin	Set the cwmin.  (integer [1, 255])

cwmax	Set the cwmax.  (integer [256, 2047])

srl	Set the short retry limit.  (integer [1, 255])

lrl	Set the long retry limit.  (integer [1, 255])

rate	force a fixed rate:
	valid values for 802.11a are (6, 9, 12, 18, 24, 36, 48, 54)
	valid values for 802.11b are (1, 2, 5.5, 11)
	valid values for 802.11g are (1, 2, 5.5, 6, 9, 11, 12, 18, 24, 36, 48, 54)
	-1 (default) means automatically determine the best rate

mrate	force a fixed multicast rate:
	valid values for 802.11a are (6, 9, 12, 18, 24, 36, 48, 54)
	valid values for 802.11b are (1, 2, 5.5, 11)
	valid values for 802.11g are (1, 2, 5.5, 6, 9, 11, 12, 18, 24, 36, 48, 54)
	-1 (default) means automatically determine the best rate

a_rate	force a fixed rate for the A PHY:
	valid values for 802.11a are (6, 9, 12, 18, 24, 36, 48, 54)
	-1 (default) means automatically determine the best rate

a_mrate	force a fixed multicast rate for the A PHY:
	valid values for 802.11a are (6, 9, 12, 18, 24, 36, 48, 54)
	-1 (default) means automatically determine the best rate

bg_rate	force a fixed rate for the B/G PHY:
	valid values for 802.11b are (1, 2, 5.5, 11)
	valid values for 802.11g are (1, 2, 5.5, 6, 9, 11, 12, 18, 24, 36, 48, 54)
	-1 (default) means automatically determine the best rate

bg_mrate
	force a fixed multicast rate for the B/G PHY:
	valid values for 802.11b are (1, 2, 5.5, 11)
	valid values for 802.11g are (1, 2, 5.5, 6, 9, 11, 12, 18, 24, 36, 48, 54)
	-1 (default) means automatically determine the best rate

2g_rate	Force a fixed rate for data frames in the 2.4G band:

	Either "auto", or a simple CCK/DSSS/OFDM rate value:
	1 2 5.5 11 6 9 12 18 24 36 48 54

	Or options to specify legacy, HT, or VHT rate:
	-r R, --rate=R        : legacy rate (CCK, DSSS, OFDM)
	-h M, --ht=M          : HT MCS index [0-23]
	-v M[xS], --vht=M[xS] : VHT MCS index M [0-9],
	                      : and optionally Nss S [1-8], eg. 5x2 is MCS=5, Nss=2
	-c cM[sS]             : VHT (c notation) MCS index M [0-9],
	                      : and optionally Nss S [1-8], eg. c5s2 is MCS=5, Nss=2
	-s S, --ss=S          : VHT Nss [1-8], number of spatial streams, default 1.
	                      : Only used with -v/--vht when MxS format is not used
	-x T, --exp=T         : Tx Expansion, number of tx chains (NTx) beyond the minimum
	                      : required for the space-time-streams, exp = NTx - Nsts
	--stbc                : Use STBC expansion, otherwise no STBC
	-l, --ldpc            : Use LDPC encoding, otherwise no LDPC
	-g, --sgi             : SGI, Short Guard Interval, otherwise standard GI
	-b, --bandwidth       : transmit bandwidth MHz; 20, 40, 80

2g_mrate
	Force a fixed rate for mulitcast/broadcast data frames in the 2.4G band:

	Either "auto", or a simple CCK/DSSS/OFDM rate value:
	1 2 5.5 11 6 9 12 18 24 36 48 54

	Or options to specify legacy, HT, or VHT rate:
	-r R, --rate=R        : legacy rate (CCK, DSSS, OFDM)
	-h M, --ht=M          : HT MCS index [0-23]
	-v M[xS], --vht=M[xS] : VHT MCS index M [0-9],
	                      : and optionally Nss S [1-8], eg. 5x2 is MCS=5, Nss=2
	-c cM[sS]             : VHT (c notation) MCS index M [0-9],
	                      : and optionally Nss S [1-8], eg. c5s2 is MCS=5, Nss=2
	-s S, --ss=S          : VHT Nss [1-8], number of spatial streams, default 1.
	                      : Only used with -v/--vht when MxS format is not used
	-x T, --exp=T         : Tx Expansion, number of tx chains (NTx) beyond the minimum
	                      : required for the space-time-streams, exp = NTx - Nsts
	--stbc                : Use STBC expansion, otherwise no STBC
	-l, --ldpc            : Use LDPC encoding, otherwise no LDPC
	-g, --sgi             : SGI, Short Guard Interval, otherwise standard GI
	-b, --bandwidth       : transmit bandwidth MHz; 20, 40, 80

5g_rate	Force a fixed rate for data frames in the 5G band:

	Either "auto", or a simple OFDM rate value:
	6 9 12 18 24 36 48 54

	Or options to specify legacy OFDM, HT, or VHT rate:
	-r R, --rate=R        : legacy OFDM rate
	-h M, --ht=M          : HT MCS index [0-23]
	-v M[xS], --vht=M[xS] : VHT MCS index M [0-9],
	                      : and optionally Nss S [1-8], eg. 5x2 is MCS=5, Nss=2
	-c cM[sS]             : VHT (c notation) MCS index M [0-9],
	                      : and optionally Nss S [1-8], eg. c5s2 is MCS=5, Nss=2
	-s S, --ss=S          : VHT Nss [1-8], number of spatial streams, default 1.
	                      : Only used with -v/--vht when MxS format is not used
	-x T, --exp=T         : Tx Expansion, number of tx chains (NTx) beyond the minimum
	                      : required for the space-time-streams, exp = NTx - Nsts
	--stbc                : Use STBC expansion, otherwise no STBC
	-l, --ldpc            : Use LDPC encoding, otherwise no LDPC
	-g, --sgi             : SGI, Short Guard Interval, otherwise standard GI
	-b, --bandwidth       : transmit bandwidth MHz; 20, 40, 80

5g_mrate
	Force a fixed rate for mulitcast/broadcast data frames in the 5G band:

	Either "auto", or a simple OFDM rate value:
	6 9 12 18 24 36 48 54

	Or options to specify legacy OFDM, HT, or VHT rate:
	-r R, --rate=R        : legacy OFDM rate
	-h M, --ht=M          : HT MCS index [0-23]
	-v M[xS], --vht=M[xS] : VHT MCS index M [0-9],
	                      : and optionally Nss S [1-8], eg. 5x2 is MCS=5, Nss=2
	-c cM[sS]             : VHT (c notation) MCS index M [0-9],
	                      : and optionally Nss S [1-8], eg. c5s2 is MCS=5, Nss=2
	-s S, --ss=S          : VHT Nss [1-8], number of spatial streams, default 1.
	                      : Only used with -v/--vht when MxS format is not used
	-x T, --exp=T         : Tx Expansion, number of tx chains (NTx) beyond the minimum
	                      : required for the space-time-streams, exp = NTx - Nsts
	--stbc                : Use STBC expansion, otherwise no STBC
	-l, --ldpc            : Use LDPC encoding, otherwise no LDPC
	-g, --sgi             : SGI, Short Guard Interval, otherwise standard GI
	-b, --bandwidth       : transmit bandwidth MHz; 20, 40, 80

infra	Set Infrastructure mode: 0 (IBSS) or 1 (Infra BSS)

ap	Set AP mode: 0 (STA) or 1 (AP)

bssid	Get the BSSID value, error if STA and not associated

bssmax	get number of BSSes

bw_cap	Get/set the per-band bandwidth.
Usage: wl bw_cap <2g|5g> [<cap>]
	2g|5g - Band: 2.4GHz or 5GHz respectively
cap:
	0x1 - 20MHz
	0x3 - 20/40MHz
	0x7 - 20/40/80MHz
	0xff - Unrestricted

channel	Set the channel:
	valid channels for 802.11b/g (2.4GHz band) are 1 through 14
	valid channels for 802.11a  (5 GHz band) are:
		36, 40, 44, 48, 52, 56, 60, 64,
		100, 104, 108, 112, 116,120, 124, 128, 132, 136, 140,
		149, 153, 157, 161,
		184, 188, 192, 196, 200, 204, 208, 212, 216

cur_mcsset
	Get the current mcs set

clmver	Get version information for CLM data and tools

chanspecs
	Get all the valid chanspecs (default: all within current locale):
	-b band (5(a) or 2(b/g))
	-w bandwidth, 20, 40 or 80
	[-c country_abbrev]

chanspec
	Set current or configured channel:
	20MHz : [2g|5g]<channel>[/20]
	40MHz : [2g|5g]<channel>/40[u,l]
	80MHz :    [5g]<channel>/80
	optional band 2g or 5g, default to 2g if channel <= 14
	channel number (0-200)
	bandwidth, 20, 40, or 80, default 20
	primary sideband for 40MHz on 2g, l=lower, u=upper
OR Set channel with legacy format:
	-c channel number (0-224)
	-b band (5(a) or 2(b/g))
	-w bandwidth 20 or 40
	-s ctl sideband, -1=lower, 0=none, 1=upper

rclass	Get operation class:
	 chanspec


dfs_channel_forced
	Set <channel>[a,b][n][u,l]
	channel number (0-224)
	band a=5G, b=2G, default to 2G if channel <= 14
	bandwidth, n=10, non for 20 & 40
	ctl sideband, l=lower, u=upper

tssi	Get the tssi value from radio

txpwr	Set tx power in milliwatts.  Range [1, 84].

txpwr1	Set tx power in in various units. Choose one of (default: dbm):
	-d dbm units
	-q quarter dbm units
	-m milliwatt units
Can be combined with:
	-o turn on override to disable regulatory and other limitations
Use wl txpwr -1 to restore defaults

txpathpwr
	Turn the tx path power on or off on 2050 radios

txpwrlimit
	Return current tx power limit

powerindex
	Set the transmit power for A band(0-63).
	-1 - default value

atten	Set the transmit attenuation for B band. Args: bb radio txctl1.
	auto to revert to automatic control
	manual to supspend automatic control

phyreg	Get/Set a phy register:
	offset [ value ] [ band ]

radioreg
	Get/Set a radio register:
	offset [ value ] [ band/core ]
HTPHY:
	Get a radio register: wl radioreg [ offset ] [ cr0/cr1/cr2 ]
	Set a radio register: wl radioreg [ offset ] [ value ] [ cr0/cr1/cr2/all ]
ACPHY:
	Get a radio register: wl radioreg [ offset ] [ cr0/cr1/cr2/pll ]
	Set a radio register: wl radioreg [ offset ] [ value ] [ cr0/cr1/cr2/pll/all ]

ucflags	Get/Set ucode flags 1, 2, 3(16 bits each)
	offset [ value ] [ band ]

shmem	Get/Set a shared memory location:
	offset [ value ] [band ]

macreg	Get/Set any mac registers(include IHR and SB):
	macreg offset size[2,4] [ value ] [ band ]

ucantdiv
	Enable/disable ucode antenna diversity (1/0 or on/off)

gpioout	Set any GPIO pins to any value. Use with caution as GPIOs would be assigned to chipcommon
	Usage: gpiomask gpioval

devpath	print device path

pcieserdesreg
	g/set SERDES registers: dev offset [val]

ampdu_activate_test
	actiate

ampdu_tid
	enable/disable per-tid ampdu; usage: wl ampdu_tid <tid> [0/1]

ampdu_retry_limit_tid
	Set per-tid ampdu retry limit; usage: wl ampdu_retry_limit_tid <tid> [0~31]

ampdu_rr_retry_limit_tid
	Set per-tid ampdu regular rate retry limit; usage: wl ampdu_rr_retry_limit_tid <tid> [0~31]

ampdu_send_addba
	send addba to specified ea-tid; usage: wl ampdu_send_addba <tid> <ea>

ampdu_send_delba
	send delba to specified ea-tid; usage: wl ampdu_send_delba <tid> <ea>

ampdu_clear_dump
	clear ampdu counters

ampdu_txq_prof_start
	start sample txq profiling data

ampdu_txq_prof_dump
	show txq histogram

ampdu_txq_ss
	take txq snapshot

dpt_deny
	adds/removes ea to dpt deny list
	usage: wl dpt_deny <add,remove> <ea>

dpt_endpoint
	creates/updates/deletes dpt endpoint for ea
	usage: wl dpt_endpoint <create, update, delete> <ea>

dpt_pmk	sets DPT pre-shared key

dpt_fname
	sets/gets DPT friendly name

dpt_list
	gets status of all dpt peers

actframe
	Send a Vendor specific Action frame to a channel
	usage: wl actframe <Dest Mac Addr> <data> channel dwell-time <BSSID>

antdiv	Set antenna diversity for rx
	0 - force use of antenna 0
	1 - force use of antenna 1
	3 - automatic selection of antenna diversity

txant	Set the transmit antenna
	0 - force use of antenna 0
	1 - force use of antenna 1
	3 - use the RX antenna selection that was in force during
	    the most recently received good PLCP header

plcphdr	Set the plcp header.
	"long" or "auto" or "debug"

phytype	Get phy type

rateparam
	set driver rate selection tunables
	arg 1: tunable id
	arg 2: tunable value

wepstatus
	Set or Get WEP status
	wepstatus [on|off]

primary_key
	Set or get index of primary key

addwep	Set an encryption key.  The key must be 5, 13 or 16 bytes long, or
	10, 26, 32, or 64 hex digits long.  The encryption algorithm is
	automatically selected based on the key size. keytype is accepted
	only when key length is 16 bytes/32 hex digits and specifies
	whether AES-OCB or AES-CCM encryption is used. Default is ccm.
	WAPI is selected if key len is 32 and arguments contain wapi.
	addwep <keyindex> <keydata> [ocb | ccm | wapi] [notx] [xx:xx:xx:xx:xx:xx]

rmwep	Remove the encryption key at the specified key index.

keys	Prints a list of the current WEP keys

tsc	Print Tx Sequence Couter for key at specified key index.

wsec_test
	Generate wsec errors
	wsec_test <test_type> <keyindex|xx:xx:xx:xx:xx:xx>
	type 'wl wsec_test ?' for test_types

tkip_countermeasures
	Enable or disable TKIP countermeasures (TKIP-enabled AP only)
	0 - disable
	1 - enable

wsec_restrict
	Drop unencrypted packets if WSEC is enabled
	0 - disable
	1 - enable

eap	restrict traffic to 802.1X packets until 802.1X authorization succeeds
	0 - disable
	1 - enable

cur_etheraddr
	Get/set the current hw address

perm_etheraddr
	Get the permanent address from NVRAM

authorize
	restrict traffic to 802.1X packets until 802.1X authorization succeeds

deauthorize
	do not restrict traffic to 802.1X packets until 802.1X authorization succeeds

deauthenticate
	deauthenticate a STA from the AP with optional reason code (AP ONLY)

wsec	wireless security bit vector
	1 - WEP enabled
	2 - TKIP enabled
	4 - AES enabled
	8 - WSEC in software
	0x80 - FIPS enabled
	0x100 - WAPI enabled
	0x200 - MFP capable
	0x400 - MFP required
	0x800 - MFP use KDF  (SHA256)

auth	set/get 802.11 authentication type. 0 = OpenSystem, 1= SharedKey, 3=Open/Shared

wpa_auth
	Bitvector of WPA authorization modes:
	1	WPA-NONE
	2	WPA-802.1X/WPA-Professional
	4	WPA-PSK/WPA-Personal
	64	WPA2-802.1X/WPA2-Professional
	128	WPA2-PSK/WPA2-Personal
	0	disable WPA

wpa_cap	set/get 802.11i RSN capabilities

set_pmk	Set passphrase for PMK in driver-resident supplicant.

scan	Initiate a scan.
	Default to an active scan across all channels for any SSID.
	Optional arg: SSIDs, list of [up to 10] SSIDs to scan (comma or space separated).
	Options:
	-s S, --ssid=S		SSIDs to scan
	-t ST, --scan_type=ST	[active|passive|prohibit] scan type
	--bss_type=BT		[bss/infra|ibss/adhoc] bss type to scan
	-b MAC, --bssid=MAC	particular BSSID MAC address to scan, xx:xx:xx:xx:xx:xx
	-n N, --nprobes=N	number of probes per scanned channel
	-a N, --active=N	dwell time per channel for active scanning
	-p N, --passive=N	dwell time per channel for passive scanning
	-h N, --home=N		dwell time for the home channel between channel scans
	-c L, --channels=L	comma or space separated list of channels to scan

iscan_s	Initiate an incremental scan.
	Default to an active scan across all channels for any SSID.
	Optional arg: SSIDs, list of [up to 10] SSIDs to scan (comma or space separated).
	Options:
	-s S, --ssid=S		SSIDs to scan
	-t ST, --scan_type=ST	[active|passive|prohibit] scan type
	--bss_type=BT		[bss/infra|ibss/adhoc] bss type to scan
	-b MAC, --bssid=MAC	particular BSSID MAC address to scan, xx:xx:xx:xx:xx:xx
	-n N, --nprobes=N	number of probes per scanned channel
	-a N, --active=N	dwell time per channel for active scanning
	-p N, --passive=N	dwell time per channel for passive scanning
	-h N, --home=N		dwell time for the home channel between channel scans
	-c L, --channels=L	comma or space separated list of channels to scan

iscan_c	Continue an incremental scan.
	Default to an active scan across all channels for any SSID.
	Optional arg: SSIDs, list of [up to 10] SSIDs to scan (comma or space separated).
	Options:
	-s S, --ssid=S		SSIDs to scan
	-t ST, --scan_type=ST	[active|passive|prohibit] scan type
	--bss_type=BT		[bss/infra|ibss/adhoc] bss type to scan
	-b MAC, --bssid=MAC	particular BSSID MAC address to scan, xx:xx:xx:xx:xx:xx
	-n N, --nprobes=N	number of probes per scanned channel
	-a N, --active=N	dwell time per channel for active scanning
	-p N, --passive=N	dwell time per channel for passive scanning
	-h N, --home=N		dwell time for the home channel between channel scans
	-c L, --channels=L	comma or space separated list of channels to scan

scancache_clear
	clear the scan cache

escan	Start an escan.
	Default to an active scan across all channels for any SSID.
	Optional arg: SSIDs, list of [up to 10] SSIDs to scan (comma or space separated).
	Options:
	-s S, --ssid=S		SSIDs to scan
	-t ST, --scan_type=ST	[active|passive|prohibit] scan type
	--bss_type=BT		[bss/infra|ibss/adhoc] bss type to scan
	-b MAC, --bssid=MAC	particular BSSID MAC address to scan, xx:xx:xx:xx:xx:xx
	-n N, --nprobes=N	number of probes per scanned channel
	-a N, --active=N	dwell time per channel for active scanning
	-p N, --passive=N	dwell time per channel for passive scanning
	-h N, --home=N		dwell time for the home channel between channel scans
	-c L, --channels=L	comma or space separated list of channels to scan

escanabort
	Abort an escan.
	Default to an active scan across all channels for any SSID.
	Optional arg: SSIDs, list of [up to 10] SSIDs to scan (comma or space separated).
	Options:
	-s S, --ssid=S		SSIDs to scan
	-t ST, --scan_type=ST	[active|passive|prohibit] scan type
	--bss_type=BT		[bss/infra|ibss/adhoc] bss type to scan
	-b MAC, --bssid=MAC	particular BSSID MAC address to scan, xx:xx:xx:xx:xx:xx
	-n N, --nprobes=N	number of probes per scanned channel
	-a N, --active=N	dwell time per channel for active scanning
	-p N, --passive=N	dwell time per channel for passive scanning
	-h N, --home=N		dwell time for the home channel between channel scans
	-c L, --channels=L	comma or space separated list of channels to scan

ol_scanparams
	set offload Scan parameters
	Default to an active scan across all channels for any SSID.
	Optional arg: SSIDs, list of [up to 10] SSIDs to scan (comma or space separated).
	Options:
	-f F, --flag=<FLAG>	 Flags bits, enable/disable, active_mode/passive_mode
	-a T, --active=<T in ms>	 active scan time
	-p T, --passive=<T in ms>	 passive scan time
	-r T, --scirt=<T in ms>	 Scan Cycle Idle Rest Time
	-m N, --scirtm=N	 Scan Cycle Idle Rest Time Multiplier
	-R T, --scart=<T in ms>	 Scan Cycle Active Rest Time
	-M N, --scartm=N	 Scan Cycle Active Rest Time Multiplier
	-x T, --mrt=<time in ms>	 Maximum rest time
	-y N, --msc=N	 Maximum Scan Cycle
	-n N, --nprobes=N	number of probes per scanned channel
	-d N, --ssd=N	 Scan Cycle Delay
	-s S, --ssid=S		SSIDs to scan
	-c L, --channels=L	comma or space separated list of channels to scan

olssid	set offload Directed Scan SSID
	Default to an active scan across all channels for any SSID.
	Optional arg: SSIDs, list of [up to 10] SSIDs to scan (comma or space separated).
	Options:
	-s S, --ssid=S		SSIDs to scan
	-t ST, --scan_type=ST	[active|passive|prohibit] scan type
	--bss_type=BT		[bss/infra|ibss/adhoc] bss type to scan
	-b MAC, --bssid=MAC	particular BSSID MAC address to scan, xx:xx:xx:xx:xx:xx
	-n N, --nprobes=N	number of probes per scanned channel
	-a N, --active=N	dwell time per channel for active scanning
	-p N, --passive=N	dwell time per channel for passive scanning
	-h N, --home=N		dwell time for the home channel between channel scans
	-c L, --channels=L	comma or space separated list of channels to scan

ol_prefssid
	set offload scan preferred SSID
	Default to an active scan across all channels for any SSID.
	Optional arg: SSIDs, list of [up to 10] SSIDs to scan (comma or space separated).
	Options:
	-s S, --ssid=S		SSIDs to scan
	-t ST, --scan_type=ST	[active|passive|prohibit] scan type
	--bss_type=BT		[bss/infra|ibss/adhoc] bss type to scan
	-b MAC, --bssid=MAC	particular BSSID MAC address to scan, xx:xx:xx:xx:xx:xx
	-n N, --nprobes=N	number of probes per scanned channel
	-a N, --active=N	dwell time per channel for active scanning
	-p N, --passive=N	dwell time per channel for passive scanning
	-h N, --home=N		dwell time for the home channel between channel scans
	-c L, --channels=L	comma or space separated list of channels to scan

passive	Puts scan engine into passive mode

regulatory
	Get/Set regulatory domain mode (802.11d). Driver must be down.

spect	Get/Set 802.11h Spectrum Management mode.
	0 - Off
	1 - Loose interpretation of 11h spec - may join non-11h APs
	2 - Strict interpretation of 11h spec - may not join non-11h APs
	3 - Disable 11h and enable 11d
	4 - Loose interpretation of 11h+d spec - may join non-11h APs

scanabort
	Abort a scan.

scanresults
	Return results from last scan.

iscanresults
	Return results from last iscan. Specify a buflen (max 8188)
	to artificially limit the size of the results buffer.
	iscanresults [buflen]

assoc	Print information about current network association.
	(also known as "status")

status	Print information about current network association.
	(also known as "assoc")

disassoc
	Disassociate from the current BSS/IBSS.

chanlist
	Deprecated. Use channels.

channels
	Return valid channels for the current settings.

channels_in_country
	Return valid channels for the country specified.
	Arg 1 is the country abbreviation
	Arg 2 is the band(a or b)

txpwr_target_max
	Return current max tx target power settings.


curppr	Return current tx power per rate offset.

txinstpwr
	Return tx power based on instant TSSI

scansuppress
	Suppress all scans for testing.
	0 - allow scans
	1 - suppress scans

evm	Start an EVM test on the given channel, or stop EVM test.
	Arg 1 is channel number 1-14, or "off" or 0 to stop the test.
	Arg 2 is optional rate (1, 2, 5.5 or 11)

rateset	Returns or sets the supported and basic rateset, (b) indicates basic
	With no args, returns the rateset. Args are
	rateset "default" | "all" | <arbitrary rateset> [-m|-v <list of mcs masks>]
		default - driver defaults
		all - all rates are basic rates
		arbitrary rateset - list of rates
	List of rates are in Mbps and each rate is optionally followed
	by "(b)" or "b" for a Basic rate. Example: 1(b) 2b 5.5 11
	At least one rate must be Basic for a legal rateset.

	-m  sets HT rates (bitmasks, 00-ff). Least significant bit is MCS0.
	    example: 'rateset -m 0x3f 0x01' limits rates to MCS0-MCS5 and MCS8

	-v  sets VHT MCS values for each supported count of spatial streams.
	    example: 'rateset -v 3ff 1ff ff' limits vht rates to MCS 0-9 for 1 stream,
	                             MCS 0-8 for 2 streams, and MCS 0-7 for 3 streams.

txbf_rateset
	Get rateset consisting of OFDM, HT and VHT rates, and Broadcom-to-Broadcom
	group of OFDM, HT and VHT rates by issuing command with no arguments.
	OFDM rates printed are in Mbps, and each Basic rate in OFDM list is marked
	by (b) behind it.  Example: full list of OFDM rates:
		6(b) 9 12(b) 18 24(b) 36 48 54
	where 6, 12 and 24 are Basic rates.

	Set synopsis:
		wl txbf_rateset < [ofdm_rate_list] [options ...] >
	OFDM rate specification does not need to mark Basic rates because Basic
	rates are automatically recognized.
	Options are processed in order; thus redundant instances of an option will
	result in only the last instance taking effect for that option.
	Options:
	-m <MCS_bitmask> ...
		Set HT rates by bitmask bytes, each ranges from 00 through ff, where
		the least significant bit is MCS0.
		Example: '-m 3f 01' specifies HT rates MCS0 - MCS5 and MCS8.

	-v <VHT_bitmask> ...
		Set VHT rates for each supported count of spatial streams.
		Example: '-v 3ff 1ff ff' specifies VHT rates: MCS0 - MCS9 for 1 stream,
		MCS0 - MCS8 for 2 streams, and MCS0 - MCS7 for 3 streams.

	-b
		Set for Broadcom-to-Broadcom group of rates.  Otherwise without
		the -b option, the standard group of rates are set accordingly.


roam_trigger
	Get or Set the roam trigger RSSI threshold:
	Get: roam_trigger [a|b]
	Set: roam_trigger <integer> [a|b|all]
	integer -   0: default
	            1: optimize bandwidth
	            2: optimize distance
	    [-1, -99]: dBm trigger value

roam_delta
	Set the roam candidate qualification delta. roam_delta [integer [, a/b]]

roam_scan_period
	Set the roam candidate qualification delta.  (integer)

suprates
	Returns or sets the 11g override for the supported rateset
	With no args, returns the rateset. Args are a list of rates,
	or 0 or -1 to specify an empty rateset to clear the override.
	List of rates are in Mbps, example: 1 2 5.5 11

scan_channel_time
	Get/Set scan channel time

scan_unassoc_time
	Get/Set unassociated scan channel dwell time

scan_home_time
	Get/Set scan home channel dwell time

scan_passive_time
	Get/Set passive scan channel dwell time

scan_nprobes
	Get/Set scan parameter for number of probes to use per channel scanned

prb_resp_timeout
	Get/Set probe response timeout

channel_qa
	Get last channel quality measurment

channel_qa_start
	Start a channel quality measurment

country	Select Country Code for driver operational region
	For simple country setting: wl country <country>
	Where <country> is either a long name or country code from ISO 3166; for example "Germany" or "DE"

	For a specific built-in country definition: wl country <built-in> [<advertised-country>]
	Where <built-in> is a country country code followed by '/' and regulatory revision number.
	For example, "US/3".
	And where <advertised-country> is either a long name or country code from ISO 3166.
	If <advertised-country> is omitted, it will be the same as the built-in country code.

	Use 'wl country list [band(a or b)]' for the list of supported countries

country_ie_override
	To set/get country ie

autocountry_default
	Select Country Code for use with Auto Contry Discovery

join	Join a specified network SSID.
	Usage: join <ssid> [key <0-3>:xxxxx] [imode bss|ibss] [amode open|shared|openshared|wpa|wpapsk|wpa2|wpa2psk|wpanone|ftpsk] [options]
	Options:
	-b MAC, --bssid=MAC 	BSSID (xx:xx:xx:xx:xx:xx) to scan and join
	-c CL, --chanspecs=CL 	chanspecs (comma or space separated list)
	prescanned 	uses channel and bssid list from scanresults
	-p, -passive: force passive assoc scan (useful for P2P)

ssid	Set or get a configuration's SSID.
	wl ssid [-C num]|[--cfg=num] [<ssid>]
	If the configuration index 'num' is not given, configuraion #0 is assumed and
	setting will initiate an assoication attempt if in infrastructure mode,
	or join/creation of an IBSS if in IBSS mode,
	or creation of a BSS if in AP mode.

mac	Set or get the list of source MAC address matches.
	wl mac xx:xx:xx:xx:xx:xx [xx:xx:xx:xx:xx:xx ...]
	To Clear the list: wl mac none

macmode	Set the mode of the MAC list.
	0 - Disable MAC address matching.
	1 - Deny association to stations on the MAC list.
	2 - Allow association to stations on the MAC list.

wds	Set or get the list of WDS member MAC addresses.
	Set using a space separated list of MAC addresses.
	wl wds xx:xx:xx:xx:xx:xx [xx:xx:xx:xx:xx:xx ...]

lazywds	Set or get "lazy" WDS mode (dynamically grant WDS membership to anyone).

noise	Get noise (moving average) right after tx in dBm

fqacurcy
	Manufacturing test: set frequency accuracy mode.
	freqacuracy syntax is: fqacurcy <channel>
	Arg is channel number 1-14, or 0 to stop the test.

crsuprs	Manufacturing test: set carrier suppression mode.
	carriersuprs syntax is: crsuprs <channel>
	Arg is channel number 1-14, or 0 to stop the test.

longtrain
	Manufacturing test: set longtraining mode.
	longtrain syntax is: longtrain <channel>
	Arg is A band channel number or 0 to stop the test.

band	Returns or sets the current band
	auto - auto switch between available bands (default)
	a - force use of 802.11a band
	b - force use of 802.11b band

bands	Return the list of available 802.11 bands

phylist	Return the list of available phytypes

shortslot
	Get current 11g Short Slot Timing mode. (0=long, 1=short)

shortslot_override
	Get/Set 11g Short Slot Timing mode override. (-1=auto, 0=long, 1=short)

shortslot_restrict
	Get/Set AP Restriction on associations for 11g Short Slot Timing capable STAs.
	0 - Do not restrict association based on ShortSlot capability
	1 - Restrict association to STAs with ShortSlot capability

ignore_bcns
	AP only (G mode): Check for beacons without NONERP element(0=Examine beacons, 1=Ignore beacons)

pktcnt	Get the summary of good and bad packets.

upgrade	Upgrade the firmware on an embedded device

gmode	Set the 54g Mode (LegacyB|Auto||GOnly|BDeferred|Performance|LRS)

gmode_protection
	Get G protection mode. (0=disabled, 1=enabled)

gmode_protection_control
	Get/Set 11g protection mode control alg.(0=always off, 1=monitor local association, 2=monitor overlapping BSS)

gmode_protection_override
	Get/Set 11g protection mode override. (-1=auto, 0=disable, 1=enable)

protection_control
	Get/Set protection mode control alg.(0=always off, 1=monitor local association, 2=monitor overlapping BSS)

legacy_erp
	Get/Set 11g legacy ERP inclusion (0=disable, 1=enable)

scb_timeout
	AP only: inactivity timeout value for authenticated stas

assoclist
	AP only: Get the list of associated MAC addresses.

isup	Get driver operational state (0=down, 1=up)

rssi	Get the current RSSI val, for an AP you must specify the mac addr of the STA

rssi_event
	Set parameters associated with RSSI event notification
	usage: wl rssi_event <rate_limit> <rssi_levels>
	rate_limit: Number of events posted to application will be limited to 1 per this rate limit. Set to 0 to disable rate limit.
	rssi_levels: Variable number of RSSI levels (maximum 8)  in increasing order (e.g. -85 -70 -60). An event will be posted each time the RSSI of received beacons/packets crosses a level.

fasttimer
	Deprecated. Use fast_timer.

slowtimer
	Deprecated. Use slow_timer.

glacialtimer
	Deprecated. Use glacial_timer.

radar	Enable/Disable radar

radarargs
	Get/Set Radar parameters in
	order as version, npulses, ncontig, min_pw, max_pw, thresh0,
	thresh1, blank, fmdemodcfg, npulses_lp, min_pw_lp, max_pw_lp,
	min_fm_lp, max_span_lp, min_deltat, max_deltat,
	autocorr, st_level_time, t2_min, fra_pulse_err, npulses_fra,
	npulses_stg2, npulses_stg3, percal_mask, quant,
	min_burst_intv_lp, max_burst_intv_lp, nskip_rst_lp, max_pw_tol, feature_mask

radarargs40
	Get/Set Radar parameters for 40Mhz channel in
	order as version, npulses, ncontig, min_pw, max_pw, thresh0,
	thresh1, blank, fmdemodcfg, npulses_lp, min_pw_lp, max_pw_lp,
	min_fm_lp, max_span_lp, min_deltat, max_deltat,
	autocorr, st_level_time, t2_min, fra_pulse_err, npulses_fra,
	npulses_stg2, npulses_stg3, percal_mask, quant,
	min_burst_intv_lp, max_burst_intv_lp, nskip_rst_lp, max_pw_tol, feature_mask

radarthrs
	Set Radar threshold for both 20 & 40MHz & 80MHz BW:
	order as thresh0_20_lo, thresh1_20_lo, thresh0_40_lo, thresh1_40_lo
	thresh0_80_lo, thresh1_80_lo, thresh0_20_hi, thresh1_20_hi
	thresh0_40_hi, thresh1_40_hi, thresh0_80_hi, thresh1_80_hi


dfs_status
	Get dfs status

radar_status
	Get radar detection status

clear_radar_status
	Clear radar detection status

interference
	NON-ACPHY. Get/Set interference mitigation mode. Choices are:
	0 = none
	1 = non wlan
	2 = wlan manual
	3 = wlan automatic
	4 = wlan automatic with noise reduction

	ACPHY. Get/Set interference mitigation mode. Bit-Mask:
	0 = none
	1 = desnese based on glitches
	2 = limit pktgain based on hwaci (high pwr aci)
	3 = limit pktgain based on w2/nb (high pwr aci)
	So a value of 7 would enable all three


interference_override
	NON-ACPHY. Get/Set interference mitigation override. Choices are:
	0 = no interference mitigation
	1 = non wlan
	2 = wlan manual
	3 = wlan automatic
	4 = wlan automatic with noise reduction
	-1 = remove override, override disabled

	ACPHY. Get/Set interference mitigation mode. Bit-Mask:
	-1 = remove override, override disabled	0 = none
	1 = desnese based on glitches
	2 = limit pktgain based on hwaci (high pwr aci)
	3 = limit pktgain based on w2/nb (high pwr aci)
	So a value of 7 would enable all three


frameburst
	Disable/Enable frameburst mode

pwr_percent
	Get/Set power output percentage

toe	Enable/Disable tcpip offload feature

toe_ol	Get/Set tcpip offload components

toe_stats
	Display checksum offload statistics

toe_stats_clear
	Clear checksum offload statistics

arpoe	Enable/Disable arp agent offload feature

arp_ol	Get/Set arp offload components

arp_peerage
	Get/Set age of the arp entry in minutes

arp_table_clear
	Clear arp cache

arp_hostip
	Add a host-ip address or display them

arp_hostip_clear
	Clear all host-ip addresses

ns_hostip
	Add a ns-ip address or display then

ns_hostip_clear
	Clear all ns-ip addresses

arp_stats
	Display ARP offload statistics

arp_stats_clear
	Clear ARP offload statistics

wet	Get/Set wireless ethernet bridging mode

bi	Get/Set the beacon period (bi=beacon interval)

dtim	Get/Set DTIM

wds_remote_mac
	Get WDS link remote endpoint's MAC address

wds_wpa_role_old
	Get WDS link local endpoint's WPA role (old)

wds_wpa_role
	Get/Set WDS link local endpoint's WPA role

authe_sta_list
	Get authenticated sta mac address list

autho_sta_list
	Get authorized sta mac address list

measure_req
	Send an 802.11h measurement request.
	Usage: wl measure_req <type> <target MAC addr>
	Measurement types are: TPC, Basic, CCA, RPI
	Target MAC addr format is xx:xx:xx:xx:xx:xx

quiet	Send an 802.11h quiet command.
	Usage: wl quiet <TBTTs until start>, <duration (in TUs)>, <offset (in TUs)>

csa	Send an 802.11h channel switch anouncement with chanspec:
	<mode> <count> <channel>[a,b][n][u,l][frame type]
	mode (0 or 1)
	count (0-254)
	channel format:
	20MHz : [2g|5g]<channel>[/20]
	40MHz : [2g|5g]<channel>/40[u,l]
	80MHz :    [5g]<channel>/80
	optional band 2g or 5g, default to 2g if channel <= 14
	channel number (0-200)
	bandwidth, 20, 40, or 80, default 20
	primary sideband for 40MHz on 2g, l=lower, u=upper
	csa frame type(optional), default is broadcast if not specified, u=unicast

constraint
	Send an 802.11h Power Constraint IE
	Usage: wl constraint 1-255 db

rm_req	Request a radio measurement of type basic, cca, or rpi
	specify a series of measurement types each followed by options.
	example: wl rm_req cca -c 1 -d 50 cca -c 6 cca -c 11
	Options:
	-t n  numeric token id for measurement set or measurement
	-c n  channel
	-d n  duration in TUs (1024 us)
	-p    parallel flag, measurement starts at the same time as previous

	Each measurement specified uses the same channel and duration as the
	previous unless a new channel or duration is specified.

rm_rep	Get current radio measurement report

join_pref
	Set/Get join target preferences.

assoc_pref
	Set/Get association preference.
Usage: wl assoc_pref [auto|a|b|g]

wme	Set WME (Wireless Multimedia Extensions) mode (0=off, 1=on, -1=auto)

wme_ac	wl wme_ac ap|sta [be|bk|vi|vo [ecwmax|ecwmin|txop|aifsn|acm <value>] ...]

wme_apsd
	Set APSD (Automatic Power Save Delivery) mode on AP (0=off, 1=on)

wme_apsd_sta
	Set APSD parameters on STA. Driver must be down.
Usage: wl wme_apsd_sta <max_sp_len> <be> <bk> <vi> <vo>
   <max_sp_len>: number of frames per USP: 0 (all), 2, 4, or 6
   <xx>: value 0 to disable, 1 to enable U-APSD per AC

wme_dp	Set AC queue discard policy.
Usage: wl wme_dp <be> <bk> <vi> <vo>
   <xx>: value 0 for newest-first, 1 for oldest-first

wme_counters
	print WMM stats

wme_clear_counters
	clear WMM counters

wme_tx_params
	wl wme_tx_params [be|bk|vi|vo [short|sfb|long|lfb|max_rate <value>] ...]

wme_maxbw_params
	wl wme_maxbw_params [be|bk|vi|vo <value> ....]

lifetime
	Set Lifetime parameter (milliseconds) for each ac.
wl lifetime be|bk|vi|vo [<value>]

reinit	Reinitialize device

sta_info
	wl sta_info <xx:xx:xx:xx:xx:xx>

staprio	Set/Get sta priority
Usage: wl staprio <xx:xx:xx:xx:xx:xx> <prio>
<prio>: 0~3

pktq_stats
	Dumps packet queue log info for [C] common, [A] AMPDU, [N] NAR or [P] power save queues
A:, N: or P: are used to prefix a MAC address (a colon : separator is necessary),
or else C: is used alone. The '+' option after the colon gives more details.
Up to 4 parameters may be given, the common queue is default when no parameters
are supplied
Use '/<PREC>' as suffix to restrict to certain prec indices; multiple /<PREC>/<PREC>/...can be used
Also, '//' as a suffix to the MAC address or 'C://' will enable automatic logging of
all prec as they are seen.
Full automatic operation is also possible with the shorthand
'A:' (or 'A://'), 'P:' (or 'P://') etc which scans through all known addresses for
those parameters that take a MAC address.
wl pktq_stats [C:[+]]|[A:[+]|P:[+]|N:[+]<xx:xx:xx:xx:xx:xx>][/<PREC>[/<PREC>]][//]...

bs_data	Display per station band steering data
usage: bs_data [options]
  options are:
    -comma    Use commas to separate values rather than blanks.
    -tab      Use <TAB> to separate values rather than blanks.
    -raw      Display raw values as received from driver.
    -noidle   Do not display idle stations
    -noreset  Do not reset counters after reading

cap	driver capabilities

malloc_dump
	Deprecated. Folded under 'wl dump malloc

chan_info
	channel info

add_ie	Add a vendor proprietary IE to 802.11 management packets
Usage: wl add_ie <pktflag> length OUI hexdata
<pktflag>: Bit 0 - Beacons
           Bit 1 - Probe Rsp
           Bit 2 - Assoc/Reassoc Rsp
           Bit 3 - Auth Rsp
           Bit 4 - Probe Req
           Bit 5 - Assoc/Reassoc Req
Example: wl add_ie 3 10 00:90:4C 0101050c121a03
         to add this IE to beacons and probe responses

del_ie	Delete a vendor proprietary IE from 802.11 management packets
Usage: wl del_ie <pktflag> length OUI hexdata
<pktflag>: Bit 0 - Beacons
           Bit 1 - Probe Rsp
           Bit 2 - Assoc/Reassoc Rsp
           Bit 3 - Auth Rsp
           Bit 4 - Probe Req
           Bit 5 - Assoc/Reassoc Req
Example: wl del_ie 3 10 00:90:4C 0101050c121a03

list_ie	Dump the list of vendor proprietary IEs

rand	Get a 2-byte Random Number from the MAC's PRNG
Usage: wl rand

otpw	Write an srom image to on-chip otp
Usage: wl otpw file

nvotpw	Write nvram to on-chip otp
Usage: wl nvotpw file

otpraw	Read/Write raw data to on-chip otp
Usage: wl otpraw <offset> <bits> [<data>]

bcmerrorstr
	errorstring

freqtrack
	Set Frequency Tracking Mode (0=Auto, 1=On, 2=OFF)

eventing
	set/get 128-bit hex filter bitmask for MAC event reporting up to application layer

event_msgs
	set/get 128-bit hex filter bitmask for MAC event reporting via packet indications

counters
	Return driver counter values

delta_stats_interval
	set/get the delta statistics interval in seconds (0 to disable)

delta_stats
	get the delta statistics for the last interval

assoc_info
	Returns the assoc req and resp information [STA only]

beacon_info
	Returns the 802.11 management frame beacon information
Usage: wl beacon_info [-f file] [-r]
	-f Write beacon data to file
	-r Raw hex dump of beacon data

probe_resp_info
	Returns the 802.11 management frame probe response information
Usage: wl probe_resp_info [-f file] [-r]
	-f Write probe response data to file
	-r Raw hex dump of probe response data

autochannel
	auto channel selection:
	1 to issue a channel scanning;
	2 to set chanspec based on the channel scan result;
	without argument to only show the chanspec selected;
	ssid must set to null before this process, RF must be up

csscantimer
	auto channel scan timer in minutes (0 to disable)

closed	hides the network from active scans, 0 or 1.
	0 is open, 1 is hide

pmkid_info
	Returns the pmkid table

bss	set/get BSS enabled status: up/down

ap_bss	Create AP BSS default down:
Usage: wl ap_bss [create/destroy] [-m mac-addr]
	 create: creates ap bss in down state
	 destroy: disable and delete ap bss
	-m Mac-addr of new bss to create
	 auto-generate mac-addr if not provided


closednet
	set/get BSS closed network attribute

ap_isolate
	set/get AP isolation

eap_restrict
	set/get EAP restriction

diag	diag testindex(1-interrupt, 2-loopback, 3-memory, 4-led); precede by 'wl down' and follow by 'wl up'

reset_d11cnts
	reset 802.11 MIB counters

staname	get/set station name:
	Maximum name length is 15 bytes

apname	get AP name

otpdump	Dump raw otp

otpstat	Dump OTP status

nrate	"auto" to clear a rate override, or:
-r legacy rate (CCK, OFDM)
-m HT MCS index
-s stf mode (0=SISO,1=CDD,2=STBC,3=SDM)
-w Override MCS only to support STA's with/without STBC capability

mimo_txbw
	get/set mimo txbw (2=20Mhz(lower), 3=20Mhz upper, 4=40Mhz)

cac_addts
	add TSPEC, error if STA is not associated or WME is not enabled
	arg: TSPEC parameter input list

cac_delts
	delete TSPEC, error if STA is not associated or WME is not enabled
	arg: TSINFO for the target tspec

cac_delts_ea
	delete TSPEC, error if STA is not associated or WME is not enabled
	arg1: Desired TSINFO for the target tspec
	arg2: Desired MAC address

cac_tslist
	Get the list of TSINFO in driver
	eg. 'wl cac_tslist' get a list of TSINFO

cac_tslist_ea
	Get the list of TSINFO for given STA in driver
	eg. 'wl cac_tslist_ea ea' get a list of TSINFO

cac_tspec
	Get specific TSPEC with matching TSINFO
	eg. 'wl cac_tspec 0xaa 0xbb 0xcc' where 0xaa 0xbb & 0xcc are TSINFO octets

cac_tspec_ea
	Get specific TSPEC for given STA with matching TSINFO
	eg. 'wl cac_tspec 0xaa 0xbb 0xcc xx:xx:xx:xx:xx:xx'
	    where 0xaa 0xbb & 0xcc are TSINFO octets and xx is mac address

overlay	overlay virt_addr phy_addr size

phy_txpwrindex
	usage: (set) phy_txpwrindex core0_idx core1_idx core2_idx core3_idx       (get) phy_txpwrindex, return format: core0_idx core1_idx core2_idx core3_idxSet/Get txpwrindex

phy_test_tssi
	wl phy_test_tssi val

phy_test_tssi_offs
	wl phy_test_tssi_offs val

phy_rssiant
	wl phy_rssiant antindex(0-3)

phy_rssi_ant
	Get RSSI per antenna (only gives RSSI of current antenna for SISO PHY)

lpphy_papdepstbl
	print papd eps table; Usage: wl lpphy_papdepstbl

lcnphy_papdepstbl
	print papd eps table; Usage: wl lcnphy_papdepstbl

phy_test_idletssi
	get idletssi for the given core; wl phy_test_idletssi corenum

phy_setrptbl
	populate the reciprocity compensation table based on SROM cal content

	usage: wl phy_setrptbl

phy_forceimpbf
	force the beamformer into implicit TXBF mode and ready to construct steering matrix

	usage: wl phy_forceimpbf

phy_forcesteer
	force the beamformer to apply steering matrix when TXBF is turned on

	usage: wl phy_forcesteer 1/0

phy_force_gainlevel
	Force rxgain level
	 0 : force to init gain
	 1 : force to clip hi gain
	 2 : force to clip md gain
	 3 : force to clip lo gain
	 4 : force to adc clip gain
	 5 : force to nb clip gain
	 6 : force to wb clip gain
	 -1 : disable
	 usage: wl phy_force_gainlevel <int32 var>

phy_force_fdiqi
	Enable/disable FDIQI Cal/Comp
	 0 : disable
	 1 : enable
	 usage: wl phy_force_fdiqi <int32 var>

phy_btcoex_desense
	Enable/disable btcoex desense
	 0 : disable
	 1 : mode 1
	 usage: wl phy_btcoex_desense <int32 var>

rifs	set/get the rifs status; usage: wl rifs <1/0> (On/Off)

rifs_advert
	set/get the rifs mode advertisement status; usage: wl rifs_advert <-1/0> (Auto/Off)

phy_rxiqest
	Get phy RX IQ noise in dBm:
	-s # of samples (2^n)
	-a antenna select, 0,1 or 3
	-r resolution select, 0 (coarse) or 1 (fine)
	-f lpf hpc override select, 0 (hpc unchanged) or 1 (overridden to ltrn mode)
	-w dig lpf override select, 0 (lpf unchanged) or 1 (overridden to ltrn_lpf mode)	 or 2 (bypass)
	-g gain-correction select, 0 (disable) or 1 (enable)
	-e extra INITgain in dB on top of default. Valid values = {0, 3, 6, .., 21, 24}

phy_txiqcc
	usage: phy_txiqcc [a b]
Set/get the iqcc a, b values

phy_txlocc
	usage: phy_txlocc [di dq ei eq fi fq]
Set/get locc di dq ei eq fi fq values

phytable
	usage: wl phytable table_id offset width_of_table_element [table_element]
Set/get table element of a table with the given ID at the given offset
Note that table width supplied should be 8 or 16 or 32
table ID, table offset can not be negative

pavars	Set/get temp PA parameters
usage: wl down
       wl pavars pa2gw0a0=0x1 pa2gw1a0=0x2 pa2gw2a0=0x3 ...
       wl pavars
       wl up
  override the PA parameters after driver attach(srom read), before diver up
  These override values will be propogated to HW when driver goes up
  PA parameters in one band range (2g, 5gl, 5g, 5gh) must all present if
  one of them is specified in the command, otherwise it will be filled with 0

povars	Set/get temp power offset
usage: wl down
       wl povars cck2gpo=0x1 ofdm2gpo=0x2 mcs2gpo=0x3 ...
       wl povars
       wl up
  override the power offset after driver attach(srom read), before diver up
  These override values will be propogated to HW when driver goes up
  power offsets in one band range (2g, 5gl, 5g, 5gh) must all present if
  one of them is specified in the command, otherwise it will be filled with 0  cck(2g only), ofdm, and mcs(0-7) for NPHY are supported

rpcalvars
	Set/get temp RPCAL parameters
usage: wl down
       wl rpcalvars rpcal2g=0x1
       wl rpcalvars
       wl up
  override the RPCAL parameters after driver attach(srom read), before diver up
  These override values will be propogated to HW when driver goes up
  Only the RPCAL parameter specified in the command is updated, the rest is untouched


fem	Set temp fem2g/5g value
usage: wl fem (tssipos2g=0x1 extpagain2g=0x2 pdetrange2g=0x1 triso2g=0x1 antswctl2g=0)
	(tssipos5g=0x1 extpagain5g=0x2 pdetrange5g=0x1 triso5g=0x1 antswctl5g=0)

antgain	Set temp ag0/1 value
usage: wl antgain ag0=0x1 ag1=0x2

maxpower
	Set temp maxp2g(5g)a0(a1) value
usage: wl maxpower maxp2ga0=0x1 maxp2ga1=0x2 maxp5ga0=0xff maxp5ga1=0xff
       maxp5gla0=0x3 maxp5gla1=0x4 maxp5gha0=0x5 maxp5gha1=0x6

phy_antsel
	get/set antenna configuration
	set: -1(AUTO), 0xAB(fixed antenna selection)
		where A and B is the antenna numbers used for RF chain 1 and 0 respectively
	query: <utx>[AUTO] <urx>[AUTO] <dtx>[AUTO] <drx>[AUTO]
		where utx = TX unicast antenna configuration
			urx = RX unicast antenna configuration
			dtx = TX default (non-unicast) antenna configuration
			drx = RX default (non-unicast) antenna configuration

txcore	Usage: wl txcore -k <CCK core mask> -o <OFDM core mask> -s <1..4> -c <core bitmap>
	-k CCK core mask
	-o OFDM core mask
	-s # of space-time-streams
	-c active core (bitmask) to be used when transmitting frames

txcore_override
	Usage: wl txcore_override
	get the user override of txcore

txchain_pwr_offset
	Usage: wl txchain_pwr_offset [qdBm offsets]
	Get/Set the current offsets for each core in qdBm (quarter dBm)

sample_collect
	Optional parameters ACPHY/HTPHY/(NPHY with NREV >= 7) are:
	-f File name to dump the sample buffer (default "sample_collect.dat")
	-t Trigger condition (default now)
		 now, good_fcs, bad_fcs, bad_plcp, crs, crs_glitch, crs_deassert
	-b PreTrigger duration in us (default 10)
	-a PostTrigger duration in us (default 10)
	-m Sample collect mode (default 1)
		SC_MODE_0_sd_adc			0
		SC_MODE_1_sd_adc_5bits			1
		SC_MODE_2_cic0				2
		SC_MODE_3_cic1				3
		SC_MODE_4s_rx_farrow_1core		4
		SC_MODE_4m_rx_farrow			5
		SC_MODE_5_iq_comp			6
		SC_MODE_6_dc_filt			7
		SC_MODE_7_rx_filt			8
		SC_MODE_8_rssi				9
		SC_MODE_9_rssi_all			10
		SC_MODE_10_tx_farrow			11
		SC_MODE_11_gpio				12
		SC_MODE_12_gpio_trans			13
		SC_MODE_14_spect_ana			14
		SC_MODE_5s_iq_comp			15
		SC_MODE_6s_dc_filt			16
		SC_MODE_7s_rx_filt			17
		 HTPHY: 0=adc, 1..3=adc+rssi, 4=gpio
		 NPHY: 1=Dual-Core adc[9:2], 2=Core0 adc[9:0], 3=Core1 adc[9:0], gpio=gpio
	-g GPIO mux select (default 0)
		 use only for gpio mode
	-d Downsample enable (default 0)
		 use only for HTPHY
	-e BeDeaf enable (default 0)
	-i Timeout in units of 10us. (ACPHY is in 10ms unit) (default 1000)
Optional parameters (NPHY with NREV < 7) are:
	-f File name to dump the sample buffer (binary format, default "sample_collect.dat")
	-u Sample collect duration in us (default 60)
	-c Cores to do sample collect, only if BW=40MHz (default both)
Optional parameters LCN40PHY are:
	-f File name to dump the sample buffer (default "sample_collect.dat")
	-t Trigger condition (default now)
		 now
	-s Trigger State (default 0)
	-x Module_Sel1 (default 2)
	-y Module_Sel2 (default 6)
	-n Number of samples (Max 2048, default 2048)
For (NREV < 7), the NPHY buffer returned has the format:
	In 20MHz [(uint16)num_bytes, <I(core0), Q(core0), I(core1), Q(core1)>]
	In 40MHz [(uint16)num_bytes(core0), <I(core0), Q(core0)>,
		(uint16)num_bytes(core1), <I(core1), Q(core1)>]

txfifo_sz
	set/get the txfifo size; usage: wl txfifo_sz <fifonum> <size_in_bytes>

hs20_ie	set hotspot 2.0 indication IE
	usage: wl hs20_ie <length> <hexdata>


rate_histo
	Get rate hostrogram

pkteng_start
	start packet engine tx usage: wl pkteng_start <xx:xx:xx:xx:xx:xx> <tx|txwithack> [(async)|sync] [ipg] [len] [nframes] [src]
	start packet engine rx usage: wl pkteng_start <xx:xx:xx:xx:xx:xx> <rx|rxwithack> [(async)|sync] [rxframes] [rxtimeout]
	sync: synchronous mode
	ipg: inter packet gap in us
	len: packet length
	nframes: number of frames; 0 indicates continuous tx test
	src: source mac address
	rxframes: number of receive frames (sync mode only)
	rxtimeout: maximum timout in msec (sync mode only)

pkteng_stop
	stop packet engine; usage: wl pkteng_stop <tx|rx>

pkteng_stats
	packet engine stats; usage: wl pkteng_stats

wowl	Enable/disable WOWL events
  0   - Clear all events
Bit 0 - Wakeup on Magic Packet
Bit 1 - Wakeup on NetPattern (use 'wl wowl_pattern' to configure pattern)
Bit 2 - Wakeup on loss-of-link due to Disassociation/Deauth
Bit 3 - Wakeup on retrograde tsf
Bit 4 - Wakeup on loss of beacon (use 'wl wowl_bcn_loss' to configure time)

wowl_bcn_loss
	Set #of seconds of beacon loss for wakeup event

wowl_pattern
	usage: wowl_pattern [ [clr | [[ add | del ] offset mask value ]]]
No options -- lists existing pattern list
add -- Adds the pattern to the list
del -- Removes a pattern from the list
clr -- Clear current list
offset -- Starting offset for the pattern
mask -- Mask to be used for pattern. Bit i of mask => byte i of the pattern
value -- Value of the pattern

wowl_keepalive
	Send specified keep alive packet periodically in w mode.
	Usage: wl wowl_keepalive <index0-1> <period> <packet>
		index: 0 - 1.
		period: Re-transmission period in milli-seconds. 0 to disable packet transmits.
		packet: Hex packet contents to transmit. The packet contents should include the entire ethernet packet (ethernet header, IP header, UDP header, and UDP payload) specified in network byte order.

	e.g. Send keep alive packet every 30 seconds using id-1:
	wl wowl_keepalive 1 30000 0x0014a54b164f000f66f45b7e08004500001e000040004011c52a0a8830700a88302513c413c4000a00000a0d


wowl_wakeind
	usage: wowl_wakeind [clear]
Shows last system wakeup event indications from PCI and D11 cores
clear - Clear the indications

wowl_status
	usage: wowl_status [clear]
Shows last system wakeup setting

wowl_pkt
	Send a wakeup frame to wakup a sleeping STA in WAKE mode
Usage: wl wowl_pkt <len> <dst ea | bcast | ucast <STA ea>>[ magic [<STA ea>] | net <offset> <pattern> <reason code> ]
e.g. To send bcast magic frame -- wl wowl_pkt 102 bcast magic 00:90:4c:AA:BB:CC
     To send ucast magic frame -- wl wowl_pkt 102 ucast 00:90:4c:aa:bb:cc magic
     To send a frame with L2 unicast - wl wowl_pkt 102 00:90:4c:aa:bb:cc net 0 0x00904caabbcc 0x03
 NOTE: offset for netpattern frame starts from "Dest EA" of ethernet frame.So dest ea will be used only when offset is >= 6
     To send a eapol identity frame with L2 unicast - wl wowl_pkt 102 00:90:4c:aa:bb:cc eapid id-string

wowl_ext_magic
	Set 6-byte extended magic pattern
Usage: wl wowl_ext_magic 0x112233445566

wme_apsd_trigger
	Set Periodic APSD Trigger Frame Timer timeout in ms (0=off)

wme_autotrigger
	Enable/Disable sending of APSD Trigger frame when all ac are delivery enabled

reassoc	Initiate a (re)association request.
	Usage: wl reassoc <bssid> [options]
	Options:
	-c CL, --chanspecs=CL 	chanspecs (comma or space separated list)

send_nulldata
	Sed a null frame to the specified hw address

btc_params
	g/set BT Coex parameters

btc_flags
	g/set BT Coex flags

obss_scan_params
	set/get Overlapping BSS scan parameters
Usage: wl obss_scan a b c d e ...; where
	a-Passive Dwell, {5-1000TU}, default = 100
	b-Active Dwell, {10-1000TU}, default = 20
	c-Width Trigger Scan Interval, {10-900sec}, default = 300
	d-Passive Total per Channel, {200-10000TU}, default = 200
	e-Active Total per Channel, {20-1000TU}, default = 20
	f-Channel Transition Delay Factor, {5-100}, default = 5
	g-Activity Threshold, {0-100%}, default = 25

mkeep_alive
	Send specified "mkeep-alive" packet periodically.
	Usage: wl mkeep_alive <index0-3> <period> <packet>
		index: 0 - 3.
		period: Re-transmission period in milli-seconds. 0 to disable packet transmits.
		packet: Hex packet contents to transmit. The packet contents should include the entire ethernet packet (ethernet header, IP header, UDP header, and UDP payload) specified in network byte order. If no packet is specified, a nulldata frame will be sent instead.

	e.g. Send keep alive packet every 30 seconds using id-1:
	wl mkeep_alive 1 30000 0x0014a54b164f000f66f45b7e08004500001e000040004011c52a0a8830700a88302513c413c4000a00000a0d

keep_alive
	Send specified "keep-alive" packet periodically.
	Usage: wl keep_alive <period> <packet>
		period: Re-transmission period in milli-seconds. 0 to disable packet transmits.
		packet: Hex packet contents to transmit. The packet contents should include the entire ethernet packet (ethernet header, IP header, UDP header, and UDP payload) specified in network byte order.

	e.g. Send keep alive packet every 30 seconds:
	wl keep_alive 30000 0x0014a54b164f000f66f45b7e08004500001e000040004011c52a0a8830700a88302513c413c4000a00000a0d

wowl_pkt_info
	returns packet that woke  host


srchmem	g/set ucode srch engine memory

pkt_filter_add
	Install a packet filter.
	Usage: wl pkt_filter_add <id> <polarity> <type> <offset> <bitmask> <pattern>
	id:       Integer. User specified id.
	type:     0 (Pattern matching filter).
	offset:   Integer. Offset within received packets to start matching.
	polarity: Set to 1 to negate match result. 0 is default.
	bitmask:  Hex bitmask that indicates which bits of 'pattern' to match. Must be same
		size as 'pattern'. Bit 0 of bitmask corresponds to bit 0 of pattern, etc.
		If bit N of bitmask is 0, then do *not* match bit N of the pattern with
		the received payload. If bit N of bitmask is 1, then perform match.
	pattern:  Hex pattern to match.

pkt_filter_clear_stats
	Clear packet filter statistic counter values.
	Usage: wl pkt_filter_clear_stats <id>

pkt_filter_enable
	Enable/disable a packet filter.
	Usage: wl pkt_filter_enable <id> <0|1>

pkt_filter_list
	List installed packet filters.
	Usage: wl pkt_filter_list [val]
	val: 0 (disabled filters) 1 (enabled filters)

wl_tcpkeepalive_conn
	Set TCP Keep-Alive with connection data.
	Usage: wl tcp_keep_set [smac][dmac][sip][dip][sport][dport][seq][ack][wnd]


wl_tcpkeepalive_timers
	Set TCP Keep-Alive timers.
	Usage: wl tcp_keep_set [interval][retry interval][retry count]


pkt_filter_mode
	Set packet filter match action.
	Usage: wl pkt_filter_mode <value>
	value: 1 - Forward packet on match, discard on non-match (default).
	       0 - Discard packet on match, forward on non-match.

pkt_filter_delete
	Uninstall a packet filter.
	Usage: wl pkt_filter_delete <id>

pkt_filter_stats
	Retrieve packet filter statistic counter values.
	Usage: wl pkt_filter_stats <id>

trf_mgmt_config
	Sets/gets traffic management configuration.
	Usage: wl trf_mgmt_config [<enable>
	                          [<host IP address> <host IP subnet mask>
	                           <downlink kbps> <uplink kbps> [<flags>]]]
	enable: 0 - Disable traffic management
	        1 - Enables traffic management (host IP arguments required)
	Flag values are the following:
	0x0001 : Add DSCP values to tx packets
	0x0002 : Disable traffic shaping...just do priority classification

If no arguments are entered, the current traffic management configuration
is displayed.

e.g. Configure traffic management and specify local ip addr. and bandwidth data:

wl trf_mgmt_config 1 12.0.0.1 255.0.0.0 5000 650


trf_mgmt_filters_add
	Adds a traffic management filter.
	Usage: wl trf_mgmt_filter_add [dst_port src_port prot priority]
	dst_port    : Destination TCP or UDP port
	src_port    : Source TCP or UDP port (0 - wildcard for any source port)
	prot        : L4 protocol (6 - TCP, 17 - UDP)
	priority    : Priority value (see trf_mgmt_priority_values enum)

e.g. Add a tcp wildcard filter:

wl trf_mgmt_filters_add 80 0 6 2


trf_mgmt_filters_addex
	Adds a traffic management filter.
	Usage: wl trf_mgmt_filter_add flag [dst_port src_port prot priority]
	Usage: wl trf_mgmt_filter_add flag [dst_mac priority]
	Flag values are the following:
	0x0000 : filter on tcp/udp src/dst port
	0x0001 : filter on destination MAC address
	0x0010 : do not update the packet priority
	0x0020 : Tag packets as Favored
	dst_mac    : Destination MAC address
	dst_port    : Destination TCP or UDP port
	src_port    : Source TCP or UDP port (0 - wildcard for any source port)
	prot        : L4 protocol (6 - TCP, 17 - UDP)
	priority    : Priority value (see trf_mgmt_priority_values enum)

e.g. Add a tcp wildcard filter for all src/dst ports:

wl trf_mgmt_filters_addex 0 0 0 6 2

e.g. Add a dst mac address filter

wl trf_mgmt_filters_addex 0x31 aa:bb:cc:dd:ee:ff 2


trf_mgmt_filters_remove
	Removes a traffic management filter.
	Usage: wl trf_mgmt_filter_remove [dst_port src_port prot]
	dst_port    : Destination TCP or UDP port
	src_port    : Source TCP or UDP port (0 - wildcard for any source port)
	prot        : L4 protocol (6 - TCP, 17 - UDP)

e.g. Remove a tcp wildcard filter:

wl trf_mgmt_filters_remove 80 0 6


trf_mgmt_filters_removeex
	Removes a traffic management filter.
	Usage: wl trf_mgmt_filter_remove flag [dst_port src_port prot]
	Usage: wl trf_mgmt_filter_remove flag [dst_mac]
	Flag values are the following:
	0x0000 : filter on tcp/udp src/dst port
	0x0001 : filter on destination MAC address
	0x0010 : do not update the packet priority
	0x0020 : Tag packets as Favored
	dst_mac    : Destination MAC address
	dst_port    : Destination TCP or UDP port
	src_port    : Source TCP or UDP port (0 - wildcard for any source port)
	prot        : L4 protocol (6 - TCP, 17 - UDP)

e.g. Remove a tcp wildcard filter:

wl trf_mgmt_filters_removeex 0 80 0 6

wl trf_mgmt_filters_removeex 0x31 00:90:4c:52:a8:83


trf_mgmt_filters_list
	Lists all traffic management filters.
	Usage: wl trf_mgmt_filter_list


trf_mgmt_filters_clear
	Clears all traffic management filters.
	Usage: wl trf_mgmt_filters_clear


trf_mgmt_bandwidth
	Sets/gets traffic management bandwidth configuration.
	Usage: wl trf_mgmt_bandwidth
	          [downlink uplink min_tx_bk min_tx_be min_tx_vi
	                          [min_rx_b min_rx_be min_rx_vi]]
	downlink   : downlink bandwidth (kbps)
	uplink     : uplink bandwidth (kbps)
	min_tx_bk  : min. guaranteed tx bandwidth percentage for BK (kbps)
	min_tx_be  : min. guaranteed tx bandwidth percentage for BE (kbps)
	min_tx_vi  : min. guaranteed tx bandwidth percentage for VI (kbps)

(min_tx_bo + min_tx_be + min_tx_vi) must equal 100.
	min_rx_bk  : min. guaranteed rx bandwidth percentage for BK (kbps)
	min_rx_be  : min. guaranteed rx bandwidth percentage for BE (kbps)
	min_rx_vi  : min. guaranteed rx bandwidth percentage for VI (kbps)

(min_rx_bk + min_rx_be + min_rx_vi) must equal 100.
If no rx gandwidth arguments are entered, tx bandwidth is used for rx.
If no arguments are entered, the current bandwidth configuration is displayed.

trf_mgmt_flags
	Sets/gets traffic management operational flags.
	Usage: wl trf_mgmt_flags [flags]

	Flag values are the following:
	0x0001 : Add DSCP values to tx packets
	0x0002 : Disable traffic shaping...just do priority classification

If no arguments are entered, the current operational flags are displayed.

trf_mgmt_stats
	Gets traffic management statistics.
	Usage: wl trf_mgmt_stats [index]
	index : Queue index


trf_mgmt_stats_clear
	Clears traffic management statistics.
	Usage: wl trf_mgmt_stats_clear


trf_mgmt_shaping_info
	Gets traffic management shaping parameters.
	Usage: wl trf_mgmt_shaping_info [index]
	index : Queue index


seq_start
	Initiates command batching sequence. Subsequent IOCTLs will be queued until
seq_stop is received.

seq_stop
	Defines the end of command batching sequence. Queued IOCTLs will be executed.

seq_delay
	Driver should spin for the indicated amount of time.
It is only valid within the context of batched commands.

seq_error_index
	Used to retrieve the index (starting at 1) of the command that failed within a batch

clmload	Used to download CLM data onto the dongle

bmac_reboot
	Reboot BMAC

txmcsset
	get Transmit MCS rateset for 11N device

rxmcsset
	get Receive MCS rateset for 11N device

mimo_ss_stf
	get/set SS STF mode.
	Usage: wl mimo_ss_stf <value> <-b a | b>
	value: 0 - SISO; 1 - CDD
	-b(band): a - 5G; b - 2.4G

assertlog
	get external assert logs
	Usage: wl assertlog

assert_type
	set/get the asset_bypass flag; usage: wl assert_type <1/0> (On/Off)

ledbh	set/get led behavior
	Usage: wl ledbh [0-3] [0-15]

obss_coex_action
	send OBSS 20/40 Coexistence Mangement Action Frame
	Usage: wl obss_coex_action -i <1/0> -w <1/0> -c <channel list>
	 -i: 40MHz intolerate bit; -w: 20MHz width Req bit;
	 -c: channel list, 1 - 14
	 At least one option must be provided

chanim_state
	get channel interference state
	Usage: wl chanim_state channel
	Valid channels: 1 - 14
	returns: 0 - Acceptable; 1 - Severe

chanim_mode
	get/set channel interference measure (chanim) mode
	Usage: wl chanim_mode <value>
	value: 0 - disabled; 1 - detection only; 2 - detection and avoidance

ledbh	set/get led behavior
	Usage: wl ledbh [0-3] [0-15]

led_blink_sync
	set/get led_blink_sync
	Usage: wl led_blink_sync [0-3] [0/1]

cca_get_stats
	Usage: wl cca_stats [-c channel] [-s num seconds][-n]
	 -c channel: Optional. specify channel. 0 = All channels. Default = current channel
	 -n: no analysis of results
	 -s num_seconds: Optional. Default = 10, Max = 60
	 -i: list individual measurements in addition to the averages
	 -curband: Only recommend channels on current band

itfr_get_stats
	get interference source information

itfr_enab
	get/set STA interference detection mode(STA only)
	 0  - disable
	 1  - enable maual detection
	 2  - enable auto detection

itfr_detect
	issue an interference detection request

smfstats
	get/clear selected management frame (smf) stats	wl smfstats [-C num]|[--cfg=num] [auth]|[assoc]|[reassoc]|[clear]
	clear - to clear the stats

manfinfo
	show chip package info in OTP

rrm	enable or disable RRM feature
	Usage: wl rrm [0/1] to disable/enable RRM feature

rrm_bcn_req
	send 11k beacon measurement request
	Usage: wl rrm_bcn_req [bcn mode] [da] [duration] [random int] [channel] [ssid] [repetitions]

rrm_chload_req
	send 11k channel load measurement request
	Usage: wl rrm_chload_req [regulatory] [da] [duration] [random int] [channel] [repetitions]

rrm_noise_req
	send 11k noise measurement request
	Usage: wl rrm_noise_req [regulatory] [da] [duration] [random int] [channel] [repetitions]

rrm_frame_req
	send 11k frame measurement request
	Usage: wl rrm_frame_req [regulatory] [da] [duration] [random int] [channel] [ta] [repetitions]

rrm_stat_req
	send 11k stat measurement request
	Usage: wl rrm_stat_req [da] [random int] [duration] [peer] [group id] [repetitions]

rrm_stat_rpt
	Read 11k stat measurement report from STA
	Usage: wl rrm_stat_rpt [mac]

rrm_lm_req
	send 11k link measurement request
	Usage: wl rrm_lm_req [da]

rrm_nbr_req
	send 11k neighbor report measurement request
	Usage: wl rrm_nbr_req [ssid]

rrm_nbr_list
	get 11k neighbor report list
	Usage: wl rrm_nbr_list

rrm_nbr_del_nbr
	delete node from 11k neighbor report list
	Usage: wl rrm_nbr_del_nbr [bssid]

rrm_nbr_add_nbr
	add node to 11k neighbor report list
	Usage: wl rrm_nbr_add_nbr [bssid] [bssid info] [regulatory] [channel] [phytype]

wnm	set driver wnm feature mask
	type 'wl msglevel ?' for values

wnm_bsstq
	deprecated, please use wnm_bsstrans_query

tclas_add
	add tclas frame classifier type entry
	Usage: wl tclas_add <user priority> <type> <mask> <...>
	type 0 eth2:     <src mac> <dst mac> <ether type>
	type 1/4 ipv4:   <ver> <src> <dst> <s_port> <d_port> <dscp> <prot>
	type 2 802.1Q:   <vlan tag>
	type 3 filter:   <offset> <value> <mask>
	type 4 ipv6:     <ver> <src> <dst> <s_port> <d_port> <dscp> <nxt_hdr> <flw_lbl>
	type 5 802.1D/Q: <802.1Q PCP> <802.1Q CFI> <802.1Q VID>

tclas_del
	delete tclas frame classifier type entry
	Usage: wl tclas_del [<idx> [<len>]]

tclas_list
	list the added tclas frame classifier type entry
	Usage: wl tclas_list

wnm_tfs_set
	If <tfs_id> is set, add pending TCLASs (after tclas_add) to this filter set and create
or reinitialize it. If <send> is set, register all filter set on AP to enable TFS.

	Usage: wl wnm_tfs_set <send> [tfs_id action [tc_pro]]
		send: 0: store filter, 1: send all stored filters to AP
		tfs_id: ID to assign to the filter set (if TCLAS added)
		         or existing ID to append as new filter to the set , 0 for all filters
		action: TFS action bitfiled: bit 0 -> delete after match, bit 1 -> notify
		tc_pro: TCLAS processing element (if several TCLAS added)

wnm_tfs_status
	list all TFS filters and provide their internal and AP status
	Usage: wl wl_wnm_tfs_status

wnm_tfs_term
	Disable registered TFS filter on AP side and optionally discard them
	Usage: wl wnm_tfs_term <flags> [<tfs_id>]
		flags: 1: send immendiatly; 2: also delete filter internally
		tfs_id: filter to disable/delete, 0 for all filters

wnm_dms_set
	Optionally add pending DMS desc (after tclas_add) and optionally register all desc
on AP side to enable the service (with send=1)
	Usage: wl wnm_dms_set <send> [user_id [tc_pro]]
		send: 0: store descriptor, 1: send all stored descs/enable DMS on AP
		user_id: new ID to assign to the created desc (if TCLAS added)
		         or existing ID to enable on AP (if no TCLAS added), 0 for all desc
		tc_pro: TCLAS processing element (if several TCLAS added)

wnm_dms_status
	list all DMS descriptors and provide their internal and AP status
	Usage: wl wl_wnm_dms_status

wnm_dms_term
	Disable registered DMS desc on AP side and optionally discard them
	Usage: wl wnm_dms_term <del> [<user_id>]
		del: Discard desc after disabling the service on AP side
		user_id: desc to disable/delete, 0 for all desc

wnm_service_term
	Disable service. Check specific wnm_XXX_term for more info
	Usage: wl wnm_service_term <srv> <service realted params>
		srv: 1 for DMS, 2 for FMS, 3 for TFS

wnm_timbc_offset
	get/set TIM broadcast offset by -32768 period > offset(us) > 32768
CAUTION!! Due to resource limitation, one radio can have only one set of TIMBC offset
setting.  MBSS need to share the same setting
	Usage: wl wnm_timbc_offset <offset> [<tsf_present> [<fix_interval> [<rate_ovreride>]]]
		offset: in unit of us.  Transmit TIM frame in specific TBTT transmit time time
		tsf_present: can be omitted.  If set to 1, timestamp field will present in TIM frame.If omitted, default setup to 1
		fix_interval: can be omitted.  If set with non-zero value, override STA request interval in TIM Broadcast request.  If omitted, default setup to 0
		rate_override: can be omitted.  In unit of 500k, max setup to 108.  If set, overrideoverride high rate used to transmit TIM broadcast high rate frame

wnm_timbc_set
	Enable/disable TIM Broadcast. Station will send appropriate request if AP suport TIMBC
	Usage: wl wnm_timbc_set <interval> [<flags> [<min_rate> [<max_rate>]]]
		interval: Beacon interval requested for TIM frames, 0 to disable TIM BC
		flags: Bitfield with minimal requirements to keep the service enabled (check doc)
		min_rate: Minimal rate requirement, in Mbps, for TIM high or low rate frames
		max_rate: Maximal rate requirement

wnm_timbc_status
	Retrieve TIM Broadcast configuration set with current AP

wnm_maxidle
	setup WNM BSS Max Idle Period interval and option
	Usage: wl wnm_maxidle <Idle Period> <Option>
	Idle Period: in unit of 1000TU(1.024s)
	Option: protected keep alive required(0 ~ 1)

wnm_bsstrans_query
	send 11v BSS transition management query
	Usage: wl wnm_bsstrans_query [ssid]

wnm_bsstrans_req
	send BSS transition management request frame with BSS termination included bit set
	Usage: wl wnm_bsstrans_req <reqmode> <tbtt> <dur> [unicast]
	reqmode: request mode of BSS transition request
	tbtt: time of BSS to end of life, in unit of TBTT, max to 65535
	dur: time of BSS to keep off, in unit of minute, max to 65535
	unicast: [1|0] unicast or broadcast to notify STA in BSS.  Default in unicast.


pm_dur	Retrieve accumulated PM duration information (GET only)


mpc_dur	Retrieve accumulated MPC duration information in ms (GET) or clear accumulator (SET)
	Usage: wl mpc_dur <any-number-to-clear>

chanim_acs_record
	get the auto channel scan record.
	 Usage: wl acs_record

chanim_stats
	get chanim stats
	 Usage: wl chanim_stats

txdelay_params
	get chanim stats
	 Usage: wl txdelay_params ratio cnt period tune

intfer_params
	set/get intfer params
	Usage: wl intfer_params period (in sec) cnt(0~4) txfail_thresh tcptxfail_thresh
	period=0: disable Driver monitor txfail

dngl_wd	enable or disable dongle keep alive watchdog timer
	Usage: wl dngl_wd 0\1 (to turn off\on)

tsf	set/get tsf register
	Usage: wl tsf [<high> <low>]

tpc_mode
	Enable/disable AP TPC.
Usage: wl tpc_mode <mode>
	0 - disable, 1 - BSS power control, 2 - AP power control, 3 - Both (1) and (2)

tpc_period
	Set AP TPC periodicity in secs.
Usage: wl tpc_period <secs>

tpc_lm	Get current link margins.

mfp_config
	Config PMF capability
	usage: wl mfp 0/disable, 1/capable, 2/requred

mfp_sha256
	Config SHA256 capability
	usage: wl sha256 0/disable, 1/enable

mfp_sa_query
	Send a sa query req/resp to a peer
	usage: wl mfp_sa_query flag action id

mfp_disassoc
	send bogus disassoc
	Usage: wl mfp_disassoc

mfp_deauth
	send bogus deauth
	Usage: wl mfp_dedauth

mfp_assoc
	send assoc
	Usage: wl mfp_assoc

mfp_auth
	send auth
	Usage: wl mfp_auth

mfp_reassoc
	send reassoc
	Usage: wl mfp_reassoc

monitor_lq
	Start/Stop monitoring link quality metrics - RSSI and SNR
	Usage: wl monitor_lq <0: turn off / 1: turn on

monitor_lq_status
	Returns averaged link quality metrics - RSSI and SNR values

mac_rate_histo
	Usage: wl mac_rate_histo <mac address> <access category> <num_pkts>
	(MAC address e.g. 00:11:20:11:33:33)
	(Access Category(AC) - 0x10:for entire MAC or 0x4:for video AC for this MAC)
	(num_pkts (optional) - Number of packets to average - max 64 for AC 0x10, max 32 for AC 0x4)

rpmt	rpmt <pm1-to> <pm0-to>


spatial_policy
	set/get spatial_policy
	Usage: wl spatial_policy <-1: auto / 0: turn off / 1: turn on>
	       to control individual band/sub-band use
	       wl spatial_policy a b c d e
	       where a is 2.4G band setting
	       where b is 5G lower band setting
	       where c is 5G middle band setting
	       where d is 5G high band setting
	       where e is 5G upper band setting

ie	set/get IE
	Usage: For set: wl ie type length hexdata
	     For get: wl ie type

wnm_url	set/get wnm session information url
Usage for set: wl wnm_url length urlstring
Usage for get: wl wnm_url

ratetbl_ppr
	Usage: For get: wl ratetbl_ppr
	     For set: wl ratetbl_ppr <rate> <ppr>

wowl_wakeup_reason
	Returns pattern id and associated wakeup reason

mempool	Get memory pool statistics

lpc_params
	Set/Get Link Power Control params
	Usage: wl lpc_params <rate_stab_thresh>
		<pwr_stab_thresh> <lpc_exp_time>
		<pwrup_slow_step> <pwrup_fast_step> <pwrdn_slow_step>


mode_reqd
	Set/Get operational capabilities required for STA to associate to the BSS supported by the interface.
	Usage: wl [-i ifname] mode_reqd [value]
	       wl mode_reqd [-C bss_idx ] [value]
		     <ifname> is the name of the interface corresponding to the BSS.
			   If the <ifname> is not given, the primary BSS is assumed.
		     <bss_idx> is the the BSS configuration index.
			   If the <bss_idx> is not given, configuraion #0 is assumed
		     <value> is the numeric values in the range [0..3]
		     0 - no requirements on joining devices.
		     1 - devices must advertise ERP (11g) capabilities to be allowed to associate
			   to a 2.4 GHz BSS.
		     2 - devices must advertise HT (11n) capabilities to be allowed to associate
			   to a BSS.
		     3 - devices must advertise VHT (11ac) capabilities to be allowed to associate
			   to a BSS.
	The command returns an error if the BSS interface is up.
	This configuration can only be changed while the BSS interface is down.
	Note that support for HT implies support for ERP,
	and support for VHT implies support for HT.

nar_clear_dump
	Clear non-aggregated regulation counters

sar_limit
	Set/Get sar_limit
	usage: (set) sar_limit <2Gcore0 2Gcore1 2Gcore2 2Gcore3 5G[0]core0 5G[0]core1...>
	       (get) sar_limit, return sar limit table
	unit: all input/output values are absolute and in unit of qdbm


rmc_ackmac
	Set/Get ACK required multicast mac address
	usage: wl mcast_ackmac [multicast mac address]


rmc_txrate
	Set/Get a fixed transmit rate for the reliable multicast:
	valid values for 802.11ac are (6, 9, 12, 18, 24, 36, 48, 54)
	-1 (default) means automatically determine the best rate


rmc_status
	Display reliable multicast client status


patrim	Get PA trim option

pm2_sleep_ret_ext
	Get/Set Dynamic Fast Return To Sleep params

sta_monitor
	wl sta_monitor [enable|disable] | [<add/del> <xx:xx:xx:xx:xx:xx>]

monitor_promisc_level
	Set a bitmap of different MAC promiscuous level of monitor mode.

	Usage: wl monitor_promisc_level [<bitmap> | <+|-name>]
	bitmap values and corresponding name are the following:
	Args:
		bit:0:promisc: When set, address filter accepts all received frames.When cleared, the address filter accepts only those frames that match the BSSID or local MAC address
		bit:1:ctrl: When set, the RX filter accepts all received control frames that are accepted by the address filter. When cleared, the RX filter rejects all control frames other than PS poll frames.		bit:3:fcs: When set, the RX filter forwards received frames with FCS errors to the driver.When cleared, frames with FCS errors are discarded.

	Example: wl monitor_promisc_level +promisc
	Example: wl monitor_promisc_level 0x2
	Example: wl monitor_promisc_level 0

taf_sta	wl taf_sta <MAC> [rules_bitfield rule_user_val]
	MAC can be replaced by alias 'a', 'b', 'c'... corresponding to output of assoclist
	rules_bitfield is the combination of:
		1: user rule (depends on parameter)
		2: ssid rule (lowest index is higher)
		4: rate rule
		8: rssi rule
	rule_user_val: parameter for user rule

wds_type
	Indicate whether the interface to which this IOVAR is sent is of WDS or DWDS type.

	Usage: wl wds_type -i <ifname>
	ifname is the name of the interface to query the type.
	Return values:
		0:The interface type is neither WDS nor DWDS.
		1:The interface is WDS type.
		2:The interface is DWDS type.


obss_prot
	Get/set OBSS protection (-1=auto, 0=disable, 1=enable)


dump_obss
	Usage:
	 wl dump_obss [-d num msecs] to begin measurement
	 wl dump_obss to query for the measurement results
```
