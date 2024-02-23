#!/sbin/openrc-run
supervisor=supervise-daemon

name="Mihomo"
description="A rule-based tunnel in Go."
description_reload="Reload configuration without exiting"

command=/usr/local/bin/mihomo
command_args="-d /var/lib/mihomo/ -f /etc/mihomo/config.yaml"

MIHOMO_LOGFILE="${MIHOMO_LOGFILE:-/var/log/${RC_SVCNAME}.log}"
output_log=${MIHOMO_LOGFILE}
error_log=${MIHOMO_LOGFILE}

depend() {
  use logger dns
  need net
}

checkconfig() {
  # warn this if not found
  if [ ! -f "/etc/mihomo/config.yaml" ] ; then
    eerror "No mihomo config.yaml"
    return 1
  fi
  return 0
}

reload() {
  ebegin "Reloading configuration"
  #$supervisor $RC_SVCNAME --signal HUP
  # fixme yq
  curl -X PUT -H "Authorization: Bearer mihomo-dashboard-gh-pages" -sf 127.0.0.1:9090/configs --json "{}"
  eend $?
}
