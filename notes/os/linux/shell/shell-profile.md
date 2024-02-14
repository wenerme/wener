---
title: profile
---

# profile

- login
  - /etc/profile
  - Bourne compatible shells - ~/.profile, `/etc/profile.d/*`
  - bash - ~/.bash_profile
  - zsh - /etc/zprofile, ~/.zprofile for zsh
  - csh - /etc/csh.login, ~/.login
- non-login
  - /etc/bashrc
  - ~/.bashrc
- interactive
  - /etc/profile
  - ~/.profile
  - /etc/bashrc
  - /etc/bash.bashrc
- non-interactive
  - /etc/bashrc
  - /etc/bash.bashrc

```bash
# non-interactive login shell
echo $- | bash -lx

# interactive login shell
tty -s
```

- bash
  - login
    - `--noprofile`
    - /etc/profile
    - ~/.bash_profile
      - `if [ -f ~/.bashrc ]; then . ~/.bashrc; fi`
    - ~/.bash_login
    - ~/.profile
    - ~/.bash_logout
  - non-login
    - `--norc`, `--rcfile`
    - ~/.bashrc
  - non-interactive
    - BASH_ENV
      - `if [ -n "$BASH_ENV" ]; then . "$BASH_ENV"; fi`
  - sh
    - /etc/profile
    - ~/.profile
    - `ENV`
- https://www.gnu.org/software/bash/manual/html_node/Bash-Startup-Files.html

**macOS**

```bash title="/etc/profile"
if [ -x /usr/libexec/path_helper ]; then
  eval $(/usr/libexec/path_helper -s)
fi

if [ "${BASH-no}" != "no" ]; then
  [ -r /etc/bashrc ] && . /etc/bashrc
fi
```

```bash
# System-wide .bashrc file for interactive bash(1) shells.
if [ -z "$PS1" ]; then
   return
fi

PS1='\h:\W \u\$ '
# Make bash check its window size after a process completes
shopt -s checkwinsize

[ -r "/etc/bashrc_$TERM_PROGRAM" ] && . "/etc/bashrc_$TERM_PROGRAM"
```

- TERM_PROGRAM
  - iTerm.app
  - Apple_Terminal

## non-interactive

```bash
[[ $- != *i* ]]

[ -z "$PS1" ]
```
