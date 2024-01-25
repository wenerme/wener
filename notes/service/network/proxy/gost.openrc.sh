#!/sbin/openrc-run
supervisor=supervise-daemon

name="Gost"
description="GO Simple Tunnel."

command=/usr/local/bin/gost
command_args="-C /etc/gost/${RC_SVCNAME}.yaml"

LOGFILE="${LOGFILE:-/var/log/${RC_SVCNAME}.log}"
output_log=${LOGFILE}
error_log=${LOGFILE}

depend() {
  use logger dns
  need net
}

checkconfig() {
  # warn this if not found
  if [ ! -f "/etc/gost/${RC_SVCNAME}.yaml" ] ; then
    eerror "No config ${RC_SVCNAME}.yaml"
    return 1
  fi
  return 0
}
