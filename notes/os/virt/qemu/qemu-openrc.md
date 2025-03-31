---
title: OpenRC
---

# Qemu OpenRC

- [jirutka/qemu-openrc](https://github.com/jirutka/qemu-openrc)
- https://pkgs.alpinelinux.org/contents?name=qemu-openrc&arch=x86_64

```bash
# VM_NAME=example
ln -s qemu /etc/init.d/qemu.example
cp /etc/conf.d/qemu /etc/conf.d/qemu.example

# 4c4g
# vnc 5910
cat << EOF > /etc/conf.d/qemu.example
smp_cpus="4"
memory="4G"
vnc_display=10
vnc_password="$(uuidgen)"

disk0_file="/data/vm/rms.vhdx"
disk0_format="vhdx"
EOF
```

## conf

```sh
user="qemu"
group="qemu"
pidfile="/run/qemu/${VM_NAME}/qemu.pid"
logfile="/var/log/qemu/${VM_NAME}.log"

# Number of milliseconds to wait after starting to check if the VM is still
# running (used only with start-stop-daemon). Set to empty string to disable.
#start_wait=100

# How many seconds to wait after sending "system_shutdown" before force
# stopping the VM.
#shutdown_timeout=40

# qemu-system-${system_type}
system_type="x86_64"
enable_kvm="yes"

# Select CPU model. Value "host" is allowed only for KVM.
# Run `qemu-system-$system_type -cpu help` for list of options.
cpu_model="host"
# n CPUs.
smp_cpus="1"

# Maximum number of hotpluggable CPUs, i.e. how many CPUs may be added to the
# VM after startup from the monitor console.
#smp_cpus_max="$smp_cpus"

# Amount of RAM to allocate for the VM on startup. Use suffix "M" or "G" for
# megabytes or gigabytes respectively.
memory="1G"

# Maximum amount of RAM the VM can reach, i.e. how much memory may be allocated
# for the VM after startup from the monitor console. Use suffix "M" or "G" for
# megabytes or gigabytes respectively.
#memory_max="$memory"

# Number of memory slots for additional hotpluggable memory. If it's 0, then
# memory hotplug won't be enabled and the VM startup RAM will never increase.
# If $memory == $memory_max, then this is forced to 0.
#memory_slots=2

# Whether to use hugetlbfs mounted on $hugepages_path for the VM RAM.
#memory_hugepages="no"

# Mount point of the hugetlbfs.
#hugepages_path="/dev/hugepages"

# Start the RTC at the current UTC, or local time? Use "utc", or "localtime".
# Note: "localtime" is required for correct date in Windows.
#rtc_base="utc"

# Select type of VGA card to emulate. Valid values for type are: cirrus, std,
# vmware, qxl, tcx, cg3, and none. See option -vga in man qemu for more
# information.
#vga="std"

#vnc_listen="0.0.0.0"
# TCP port is 5900+$vnc_display.
#vnc_display=
#vnc_password=

# Path of the QEMU monitor socket for this VM.
monitor_socket="/run/qemu/${VM_NAME}/monitor.sock"

##
# Network interfaces
#
# You can specify up to 10 NICs using variables netX and netX_OPTION. For list
# of available options open man qemu and find -netdev.
#
# MAC address of the NIC is automatically generated from the VM name and
# sequence number of the NIC, so it's always the same for particular VM and NIC
# and it should be unique as well. You can override the MAC address with
# variable netX_mac.
#
# The default driver for NICs is virtio-net-pci (requires virtio-net driver
# to be installed in the VM). You can override it with variable netX_device.
#
# Example:
#   net0="bridge"
#   net0_br="br0"
#   net0_mac="52:54:12:34:56:78"
#   net0_device="e1000"
#
net0="bridge"

##
# Hard-drives
#
# You can specify up to 10 drives using variables diskX_OPTION. For list of
# available options open man qemu and find -drive.
#
# These drives will use driver scsi-disk connected to virtio-scsi-pci (requires
# virtio-scsi drivers to be installed in the VM).
#
# Example:
#   disk0_file="/dev/mapper/${VM_NAME}-disk0"
#   disk0_format="raw"
#   disk0_cache="none"
#
#   disk1_file="/var/lib/qemu/${VM_NAME}/disk0.qcow2"
#   disk1_format="qcow2"
#

##
# CD-ROMs
#
# You can specify up to 10 cdrom drives using variables cdromX_file.
#
# These drives will use driver ide-cd connected to an emulated IDE controller
# (no virtio). This is slow, but doesn't require any special drivers in the VM.
#
# Example:
#   cdrom0_file="/var/lib/qemu/virtio-win.iso"
#

# Any additional arguments to be passed to qemu-system-x86_64 command.
#extra_args=""

# Specify service dependencies. You can use the same directives as in the
# depend() function, but as variables prefixed by "rc_" (e.g. rc_need, rc_use).
#rc_need=""
```
