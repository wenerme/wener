---
tags:
  - Wener
---

# Workspace

```bash
# Should add to Base Workspace
apk add shadow
chsh -s /bin/bash admin
ln -sf /bin/bash /bin/sh

cat << EOF >> /etc/ssh/sshd_config
Match User admin
  AllowTcpForwarding yes
  GatewayPorts yes
  AllowAgentForwarding yes
EOF
service sshd reload

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
export NVM_NODEJS_ORG_MIRROR=https://unofficial-builds.nodejs.org/download/release
nvm install --lts
nvm use --lts

npm install -g pnpm@latest

npm install -g @anthropic-ai/claude-code
npx -y ccusage
```

```
~/.bashrc
~/.bash_profile
~/.shellrc.d
~/.ssh

~/.claude/commands
~/.claude/setting.json
```
