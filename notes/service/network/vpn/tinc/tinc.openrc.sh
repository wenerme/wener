#!/sbin/openrc-run
supervisor=supervise-daemon

name="TincVPN Daemon"
description="tinc is a Virtual Private Network (VPN) daemon that uses tunnelling and encryption to create a secure private network between hosts on the Internet."
description_reload="Reload configuration without exiting"

# tinc.netname -> netname
NETNAME=${RC_SVCNAME##*.}
: ${TINC_DEBUG:=0}

command=/usr/sbin/tincd
command_args="-n $NETNAME -d $TINC_DEBUG $TINC_OPTS"
command_args_foreground="-D"

TINC_LOGFILE="${TINC_LOGFILE:-/var/log/${RC_SVCNAME}.log}"
TINC_ERRFILE="${TINC_ERRFILE:-${TINC_LOGFILE}}"
TINC_OUTFILE="${TINC_OUTFILE:-${TINC_LOGFILE}}"
supervise_daemon_args="--stderr \"${TINC_ERRFILE}\" --stdout \"${TINC_OUTFILE}\""

extra_started_commands="reload"
retry="${TINC_RETRY:-TERM/60/KILL/10}"

depend() {
  use logger dns
  need net
}

checkconfig() {
  # warn this if not found
  if [ ! -f "/etc/tinc/$NETNAME/tinc.conf" ]; then
    eerror "No VPN network configured"
    return 1
  fi
  return 0
}

reload() {
  ebegin "Reloading configuration"
  $supervisor $RC_SVCNAME --signal HUP
  eend $?
}
