#!/sbin/openrc-run
# vim: set ft=sh: ts=4:
# source: https://github.com/jirutka/qemu-openrc

VERSION='0.11.1'
VM_NAME="${RC_SVCNAME#qemu.}"

: ${user:=qemu}
: ${group:=qemu}
: ${pidfile:=/run/qemu/${VM_NAME}/qemu.pid}
: ${logfile:=/var/log/qemu/${VM_NAME}.log}
: ${start_wait=100} # milliseconds
: ${shutdown_timeout:=40}

: ${system_type:=x86_64}
: ${enable_kvm:=yes}
: ${cpu_model:=host}
: ${smp_cpus:=1}
: ${smp_cpus_max:=$smp_cpus}
: ${memory:=1G}
: ${memory_max:=$memory}
: ${memory_slots:=2}
: ${memory_hugepages:=no}
: ${rtc_base:=utc}
: ${vga:=std}
: ${vnc_listen:=0.0.0.0}
: ${hugepages_path:=/dev/hugepages}
: ${monitor_socket:=/run/qemu/${VM_NAME}/monitor.sock}
: ${extra_args:=}

name="VM $VM_NAME"
description="QEMU virtual machine \"$VM_NAME\""

extra_commands='forcestop version'
description_forcestop='Force stop the system'
description_version='Show version of this script'

extra_started_commands='reset resume suspend vmstatus'
description_reset='Reset the system'
description_resume='Resume suspended VM'
description_suspend='Suspend running VM'
description_vmstatus='Show status reported by QEMU'

command="/usr/bin/qemu-system-$system_type"
command_args="
	-name $VM_NAME,process=$VM_NAME
	-nodefaults
	-no-user-config
	-cpu $cpu_model
	-overcommit mem-lock=off
	-rtc base=$rtc_base
	-smp cpus=$smp_cpus,maxcpus=$smp_cpus_max
	-device virtio-balloon
	-vga $vga
	-device virtio-rng-pci
	-device virtio-scsi-pci,id=scsi
	-monitor unix:$monitor_socket,server,nowait"
command_background='yes'
command_user="$user"
command_group="$group"
output_log="$logfile"
error_log="$logfile"

start_stop_daemon_args="${start_wait:+--wait=$start_wait}"

required_files="$command"

depend() {
  need net
  after iptables ip6tables ebtables
}

start_pre() {
  if [ "$RC_SVCNAME" = 'qemu' ]; then
    eerror ''
    eerror 'You are not supposed to run this runscript directly. Instead, you should'
    eerror 'create a symlink for the VM you want to run as well as a copy of the'
    eerror 'configuration file and modify it appropriately, like so:'
    eerror ''
    eerror '    ln -s qemu /etc/init.d/qemu.example'
    eerror '    cp /etc/conf.d/qemu /etc/conf.d/qemu.example'
    return 1
  fi

  if yesno "$enable_kvm"; then
    command_args_push '-enable-kvm'
  fi
  if [ "$memory" = "$memory_max" ]; then
    memory_slots="0"
  fi
  command_args_push "-m size=$memory,slots=$memory_slots,maxmem=$memory_max"

  if yesno "$memory_hugepages"; then
    command_args_push "-mem-path $hugepages_path"
  fi
  if [ -n "$vnc_display" ]; then
    command_args_push "-display vnc=${vnc_listen}:${vnc_display}${vnc_password:+",password"}"
  fi
  command_args_push "$(net_args) $(disk_args) $(cdrom_args) $extra_args"

  if yesno "$EINFO_VERBOSE"; then
    einfo "Command: $command $(printf '%s ' $command_args)"
  fi

  local path
  for path in "$pidfile" "$monitor_socket" "$logfile"; do
    # checkpath doesn't create intermediate directories
    mkdir -p "$(dirname "$path")"
    checkpath -d -m 0750 -o $user:$group "$(dirname "$path")"
  done

  return 0
}

start_post() {
  ewaitfile 5 "$monitor_socket" || {
    eerror 'Monitor socket has not been created!'
    return 1
  }
  if [ -n "$vnc_password" ]; then
    qemush "set_password vnc $vnc_password" || eerror 'Failed to set VNC password!'
  fi
}

stop() {
  local count=0
  local retval=0

  ebegin "Stopping $name"

  if is_running && qemush 'system_powerdown'; then
    count="$shutdown_timeout"

    printf "   Waiting $count seconds for VM shutdown "
    while is_running && [ $count -gt 0 ]; do
      sleep 1
      printf '.'
      count=$((count - 1))
    done
    printf '\n'
  fi

  if [ $count -eq 0 ]; then
    ewarn 'Failed to shutdown VM gracefully using ACPI, stopping it with force'

    start-stop-daemon --stop \
      --quiet --retry 'SIGKILL/5' \
      --pidfile "$pidfile" --exec "$command"
    retval="$?"
  fi

  eend $retval
}

stop_post() {
  [ -S "$monitor_socket" ] && rm -f "$monitor_socket"
  [ -f "$pidfile" ] && rm -f "$pidfile"
  return 0
}

forcestop() {
  ebegin "Force stopping $name"

  start-stop-daemon --stop \
    --quiet --retry 'SIGKILL/3' \
    --pidfile "$pidfile" --exec "$command"
  local retval="$?"

  if [ $retval -eq 0 ]; then
    if service_started "$RC_SVCNAME"; then
      mark_service_stopped "$RC_SVCNAME"
    fi
    stop_post
  fi

  eend $retval
}

reset() {
  ebegin "Resetting $name"

  qemush 'system_reset'
  eend $?
}

resume() {
  ebegin "Resuming suspended $name"

  qemush 'cont'
  eend $?
}

suspend() {
  ebegin "Suspending $name"

  qemush 'stop'
  eend $?
}

vmstatus() {
  qemush_show 'info status' | tr -d '\r' | xargs einfo
}

version() {
  echo "qemu-openrc $VERSION"
}

#-------------------------------- Helpers -------------------------------

is_running() {
  [ -e "$pidfile" ] && kill -0 "$(cat "$pidfile")" 2> /dev/null
}

command_args_push() {
  command_args="$command_args $@"
}

disk_args() {
  local idx opts

  for idx in $(seq 0 9); do
    # comma-separated key=value pairs; contains trailing comma if not empty
    opts=$(set | sed -En "s/^disk${idx}_(.*)/\1/p" | tr $'\n' ',')

    if [ -n "$opts" ]; then
      echo "-drive id=hd${idx},${opts}media=disk,if=none"
      echo "-device scsi-hd,drive=hd${idx},scsi-id=${idx}"
    fi
  done
}

cdrom_args() {
  local idx file

  for idx in $(seq 0 9); do
    file=$(getval "cdrom${idx}_file")

    if [ -n "$file" ]; then
      echo "-drive id=cdr${idx},media=cdrom,if=none,file='$file',readonly,cache=none"
      echo "-device ide-cd,drive=cdr${idx}"
    fi
  done
}

net_args() {
  local idx net_id net_type opts mac dev

  for idx in $(seq 0 9); do
    net_id="net${idx}"
    net_type=$(getval "$net_id")

    if [ "$net_type" = 'bridge' ]; then
      check_bridge "$(getval ${net_id}_br br0)"
    fi

    if [ -n "$net_type" ]; then
      # comma-separated key=value pairs; contains trailing comma if not empty
      opts=$(set | sed -En "s/^net${idx}_(.*)/\1/p" \
        | grep -Ev '^(mac|device)=.*$' \
        | tr $'\n' ',')
      mac=$(getval ${net_id}_mac "$(gen_macaddr ${VM_NAME}#${idx})")
      dev=$(getval ${net_id}_device virtio-net-pci)

      echo "-netdev ${net_type},${opts}id=hostnet${idx}"
      echo "-device ${dev},id=${net_id},netdev=hostnet${idx},mac=${mac}"
    fi
  done
}

check_bridge() {
  local name="$1"

  if [ ! -e "/sys/class/net/$name" ]; then
    ewarn "WARNING: Bridge $name does not exist"
    return 1
  fi

  if [ "$user" != 'root' ] \
    && ! grep -q "^allow\s*$name\W*" /etc/qemu/bridge.conf 2> /dev/null; then
    ewarn "WARNING: Bridge $name must be allowed in /etc/qemu/bridge.conf"
    return 1
  fi
}

qemush() {
  local IFS=$'\n'
  printf "%b\n" "$*" | socat - "UNIX-CONNECT:${monitor_socket}" 1> /dev/null
}

qemush_show() {
  local IFS=$'\n'
  printf "%b\n" "$*" | socat - "UNIX-CONNECT:${monitor_socket}" | tail -n +3 | head -n -1
}

gen_macaddr() {
  printf "$1" | md5sum | sed -E 's/^(..)(..)(..)(..).*$/52:54:\1:\2:\3:\4/'
}

getval() {
  local var_name="$1"
  local default="${2:-}"

  eval "printf '%s\n' \"\${$var_name:-$default}\""
}
