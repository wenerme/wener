#!/sbin/openrc-run
supervisor=supervise-daemon

name="Clash"
description="A rule-based tunnel in Go."
description_reload="Reload configuration without exiting"

command=/usr/local/bin/clash
command_args="-d /var/lib/clash/ -f /etc/clash/config.yaml"

CLASH_LOGFILE="${CLASH_LOGFILE:-/var/log/${RC_SVCNAME}.log}"
output_log=${CLASH_LOGFILE}
error_log=${CLASH_LOGFILE}

depend() {
  use logger dns
  need net
}

checkconfig() {
  # warn this if not found
  if [ ! -f "/etc/clash/config.yaml" ] ; then
    eerror "No clash config.yaml"
    return 1
  fi
  return 0
}

reload() {
  ebegin "Reloading configuration"
  #$supervisor $RC_SVCNAME --signal HUP
  curl -X PUT -H "Authorization: Bearer clash-dashboard-gh-pages" -sf 127.0.0.1:9090/configs --json "{}"
  eend $?
}
