#!/sbin/openrc-run
supervisor=supervise-daemon

name="Glider"
description="A forward proxy with multiple protocolso."

command=/usr/local/bin/glider
command_args="-config /etc/glider/${RC_SVCNAME}.conf"

LOGFILE="${LOGFILE:-/var/log/${RC_SVCNAME}.log}"
output_log=${LOGFILE}
error_log=${LOGFILE}

depend() {
  use logger dns
  need net
}

checkconfig() {
  # warn this if not found
  if [ ! -f "/etc/glider/${RC_SVCNAME}.conf" ] ; then
    eerror "No config ${RC_SVCNAME}.conf"
    return 1
  fi
  return 0
}
