#!/sbin/openrc-run
supervisor=supervise-daemon

name="Mieru Proxy Server"
description="Mieru is a secure, hard to classify, hard to probe proxy server"
description_reload="Reload configuration without exiting"

# mita.instance -> instance
INSTANCE=${RC_SVCNAME##*.}
if [ "$INSTANCE" = "mita" ]; then
  INSTANCE="default"
fi

: ${MITA_USER:=mita}
: ${MITA_GROUP:=mita}
: ${MITA_CONFIG_DIR:=/etc/mita}
: ${MITA_CONFIG_JSON_FILE:=${MITA_CONFIG_DIR}/${INSTANCE}.server.json}
: ${MITA_LOGFILE:=/var/log/${RC_SVCNAME}.log}
: ${MITA_ERRFILE:=${MITA_LOGFILE}}

export MITA_CONFIG_JSON_FILE

command=/usr/local/bin/mita
command_args="run"
command_user="${MITA_USER}:${MITA_GROUP}"

supervise_daemon_args="--stderr \"${MITA_ERRFILE}\" --stdout \"${MITA_LOGFILE}\""

extra_started_commands="reload"
retry="${MITA_RETRY:-TERM/60/KILL/10}"

depend() {
  use logger dns
  need net
  after firewall
}

checkconfig() {
  if [ ! -f "${MITA_CONFIG_JSON_FILE}" ]; then
    eerror "Configuration file not found: ${MITA_CONFIG_JSON_FILE}"
    return 1
  fi
  return 0
}

start_pre() {
  checkconfig || return 1
  checkpath --directory --owner ${MITA_USER}:${MITA_GROUP} --mode 0755 /var/run/mita
  checkpath --file --owner ${MITA_USER}:${MITA_GROUP} --mode 0644 "${MITA_LOGFILE}"
}

reload() {
  ebegin "Reloading configuration"
  $supervisor $RC_SVCNAME --signal HUP
  eend $?
}
