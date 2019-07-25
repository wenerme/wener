# Firmware

## Tips
* [linux/kernel/firmware](https://git.kernel.org/pub/scm/linux/kernel/git/firmware/linux-firmware.git)
* Alpine [linux-firmware](https://pkgs.alpinelinux.org/package/edge/main/x86_64/linux-firmware)

```bash
# 系统工具
apk add sysfsutils

systool
# Class
systool -c scsi_host -v -d host0
# 模块信息
systool -m video -v
```


/lib/firmware/
dmesg | grep firmware

lshw -C network

How does Linux Kernel know where to look for driver firmware?
https://stackoverflow.com/a/953404/1870054

https://wireless.wiki.kernel.org/en/users/Drivers/iwlwifi
Prints some simple information about ucode firmwares such as those used by Intel Wifi cards
https://gist.github.com/bramp/1285857

modinfo iwlwifi | grep '^firmware:'

modinfo iwlwifi | grep '^firmware:' | sed -r 's/(\s|\t)+/ /' | cut -f 2 -d ' '

for m in $(lsmod | tail -n +2 | cut -f 1 -d ' ' | sort); do
  echo "# $m"
  modinfo $m | grep '^firmware:' | sed -r 's/(\s|\t)+/ /' | cut -f 2 -d ' '; 
done


https://wiki.ubuntu.com/Kernel/Firmware

## systool supported
```
Supported sysfs buses:
	acpi
	clockevents
	clocksource
	container
	cpu
	event_source
	gpio
	hdaudio
	hid
	i2c
	mei
	mipi-dsi
	nd
	pci_express
	pci
	platform
	pnp
	scsi
	serio
	spi
	usb
	workqueue
	xen
	xen-backend
Supported sysfs classes:
	ata_device
	ata_link
	ata_port
	backlight
	bdi
	block
	bluetooth
	bsg
	devfreq
	devfreq-event
	dma
	dmi
	drm_dp_aux_dev
	drm
	firmware
	gpio
	graphics
	hidraw
	hwmon
	i2c-adapter
	ieee80211
	input
	iommu
	leds
	mei
	mem
	misc
	nd
	net
	pci_bus
	phy
	power_supply
	pps
	ptp
	pwm
	rfkill
	rtc
	scsi_device
	scsi_disk
	scsi_host
	sound
	spi_master
	thermal
	tpm
	tty
	vc
	vtconsole
	watchdog
Supported sysfs devices:
	LNXSYSTM:00
	breakpoint
	cpu
	intel_bts
	intel_pt
	msr
	pci0000:00
	platform
	pnp0
	software
	system
	virtual
Supported sysfs modules:
	8250
	ablk_helper
	acpiphp
	acpi
	aes_x86_64
	aesni_intel
	af_packet_diag
	af_packet
	agpgart
	ahci
	battery
	binfmt_misc
	bitblit
	block
	bluetooth
	br_netfilter
	brd
	bridge
	btbcm
	btintel
	btqca
	button
	cfg80211
	coretemp
	cpuidle
	crc16
	crc32_pclmul
	crc32c_generic
	crc32c_intel
	crct10dif_pclmul
	cryptd
	cryptomgr
	dccp_diag
	dccp
	devres
	dns_resolver
	drm_kms_helper
	drm
	e1000e
	ebtable_filter
	ebtables
	ec_sys
	ehci_hcd
	evdev
	ext4
	fb_sys_fops
	fbcon_ccw
	fbcon_cw
	fbcon_rotate
	fbcon_ud
	fb
	fbcon
	firmware_class
	fjes
	font
	gf128mul
	ghash_clmulni_intel
	glue_helper
	hci_uart
	hid_generic
	hid
	hwmon
	i2c_algo_bit
	i2c_core
	i2c_hid
	i2c_i801
	i2c_smbus
	i8042
	i915
	iTCO_vendor_support
	iTCO_wdt
	inet_diag
	input_leds
	intel_gtt
	intel_idle
	intel_lpss
	intel_lpss_acpi
	ip6_tables
	ip6table_filter
	ip_tables
	ipt_MASQUERADE
	ipt_REJECT
	iptable_filter
	iptable_mangle
	iptable_nat
	ipv6
	irqbypass
	jbd2
	kernel
	keyboard
	kvm_intel
	kvm
	libahci
	libata
	libcrc32c
	llc
	loop
	lrw
	mbcache
	md_mod
	mei
	mei_me
	mfd_core
	module
	netpoll
	nf_conntrack_ftp
	nf_conntrack_ipv4
	nf_conntrack_irc
	nf_conntrack
	nf_conntrack_netlink
	nf_defrag_ipv4
	nf_nat_ipv4
	nf_nat_masquerade_ipv4
	nf_nat
	nf_reject_ipv4
	nfnetlink_log
	nfnetlink
	nfnetlink_queue
	overlay
	pci_hotplug
	pcie_aspm
	pciehp
	pcspkr
	pinctrl_intel
	pinctrl_sunrisepoint
	pps_core
	printk
	processor
	psmouse
	pstore
	ptp
	rcupdate
	rcutree
	rfkill
	scsi_mod
	sctp_diag
	sctp
	sd_mod
	serio_raw
	shpchp
	snd_hda_codec
	snd_hda_codec_generic
	snd_hda_codec_hdmi
	snd_hda_codec_realtek
	snd_hda_core
	snd_hda_intel
	snd_hwdep
	snd_pcm
	snd_timer
	snd
	softcursor
	soundcore
	spurious
	stp
	syscopyarea
	sysfillrect
	sysimgblt
	sysrq
	tcp_cubic
	tcp_diag
	tileblit
	tpm_tis
	tpm_tis_core
	tpm
	tun
	uas
	udp_diag
	unix_diag
	usb_storage
	usbcore
	usbhid
	veth
	video
	vt
	workqueue
	x_tables
	xen_blkfront
	xen_netfront
	xfrm_algo
	xfrm_user
	xhci_hcd
	xhci_pci
	xt_CHECKSUM
	xt_addrtype
	xt_conntrack
	xt_tcpudp
	xz_dec
```
