#!/bin/sh
# from https://www.msys2.org/wiki/Setting-up-SSHd/

set -e

UNPRIV_USER=sshd # DO NOT CHANGE; this username is hardcoded in the openssh code
UNPRIV_NAME="Privilege separation user for sshd"

EMPTY_DIR=/var/empty

if ! /mingw64/bin/editrights -h > /dev/null; then
  echo "ERROR: Missing 'editrights'. Try: pacman -S mingw-w64-x86_64-editrights."
  exit 1
fi

if ! cygrunsrv -v > /dev/null; then
  echo "ERROR: Missing 'cygrunsrv'. Try: pacman -S cygrunsrv."
  exit 1
fi

if ! ssh-keygen -A; then
  echo "ERROR: Missing 'ssh-keygen'. Try: pacman -S openssh."
  exit 1
fi

#
# The unprivileged sshd user (for privilege separation)
#
add="$(if ! net user "${UNPRIV_USER}" > /dev/null; then echo "//add"; fi)"
if ! net user "${UNPRIV_USER}" ${add} //fullname:"${UNPRIV_NAME}" \
  //homedir:"$(cygpath -w ${EMPTY_DIR})" //active:no; then
  echo "ERROR: Unable to create Windows user ${UNPRIV_USER}"
  exit 1
fi

#
# Add or update /etc/passwd entries
#
if test -f /etc/passwd; then
  sed -i -e '/^'"${UNPRIV_USER}"':/d' /etc/passwd
  SED='/^'"${UNPRIV_USER}"':/s?^\(\([^:]*:\)\{5\}\).*?\1'"${EMPTY_DIR}"':/bin/false?p'
  mkpasswd -l -u "${UNPRIV_USER}" | sed -e 's/^[^:]*+//' | sed -ne "${SED}" \
    >> /etc/passwd
  mkgroup.exe -l > /etc/group
fi

#
# Finally, register service with cygrunsrv and start it
#
cygrunsrv -R msys2_sshd || true
cygrunsrv -I msys2_sshd -d "MSYS2 sshd" -p /usr/bin/sshd.exe -a "-D -e" -y tcpip

# The SSH service should start automatically when Windows is rebooted. You can
# manually restart the service by running `net stop msys2_sshd` + `net start msys2_sshd`
if ! net start msys2_sshd; then
  echo "ERROR: Unable to start msys2_sshd service"
  exit 1
fi
