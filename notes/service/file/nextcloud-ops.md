---
title: Nextcloud Operations
tags:
  - Service
  - Nextcloud
  - Ops
  - CLI
  - Backup
---

# Nextcloud Operations

## App Installation (Manual)

- [Nextcloud App Store](https://apps.nextcloud.com/)
- [nextcloud/appstore](https://github.com/nextcloud/appstore)
- [Documentation](https://nextcloudappstore.readthedocs.io/en/latest/)

```bash
# Example: Announcement Center
curl -LOC- https://github.com/nextcloud/announcementcenter/releases/download/v3.8.1/announcementcenter-3.8.1.tar.gz
# Upload to server's apps directory
scp announcementcenter-3.8.1.tar.gz admin@server:/data/nextcloud/apps

# App location: /var/www/nextcloud/apps
```

## `occ` Command

- [OCC Command Documentation](https://docs.nextcloud.com/server/latest/admin_manual/configuration_server/occ_command.html)

### System Configuration

```bash
# Check status
./occ status

# Trusted Domains
./occ config:system:get trusted_domains
./occ config:system:set trusted_domains 1 --value=192.168.1.1

# Offline Mode (Has Internet Connection)
./occ config:system:set has_internet_connection --value=false --type=boolean

# Default Language
./occ config:system:set default_language --value=zh_CN
./occ config:system:set default_locale --value=zh
# Typo fix in original content: default_localenguage -> default_locale

# Proxy
./occ config:system:set proxy --value=socks5://192.168.36.8:8888
```

### Config Export/Import

```bash
# List config (Hide sensitive)
./occ config:list --private
# List system config
./occ config:list system --output=plain

# Import config via JSON
cat << JSON | ./occ config:import
{
  "system":{
    "default_language" :"zh_CN",
    "default_locale": "zh"
  }
}
JSON
```

### SAML / SSO Configuration

```bash
KC_HOST=http://192.168.36.8:8080
KC_REALM=incos

cat << JSON | ./occ config:import
{
    "apps": {
        "user_saml": {
            "sp-privateKey": "",
            "sp-x509cert": "",
            "idp-x509cert": "",
            "sp-name-id-format": "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified",
            "general-uid_mapping": "REMOTE_USER",
            "general-idp0_display_name": "SSO",
            "idp-singleSignOnService.url": "$KC_HOST/auth/realms/$KC_REALM/protocol/saml",
            "idp-entityId": "$KC_HOST/auth/realms/$KC_REALM",
            "idp-singleLogoutService.url": "$KC_HOST/auth/realms/$KC_REALM/protocol/saml",
            "security-authnRequestsSigned": "1",
            "security-logoutRequestSigned": "1",
            "security-logoutResponseSigned": "1",
            "security-wantMessagesSigned": "1",
            "security-wantAssertionsSigned": "1",
            "providerIds": "1",
            "general-require_provisioned_account": "0",
            "general-allow_multiple_user_back_ends": "0",
            "general-use_saml_auth_for_desktop": "1"
        }
    }
}
JSON

# Scan files for user
docker exec -u www-data nextcloud php occ files:scan --all
```

## `occ` Help Reference

```text
Nextcloud 19.0.0

Usage: command [options] [arguments]

Available commands:
  check               check dependencies
  status              show status
  upgrade             run upgrade routines

  app:enable          enable an app
  app:install         install an app
  app:list            List all available apps
  app:remove          remove an app
  app:update          update an app

  config:list         List all configs
  config:system:get   Get a system config value
  config:system:set   Set a system config value

  db:convert-type     Convert database type

  encryption:status   Lists encryption status

  files:scan          rescan filesystem

  ldap:show-config    shows LDAP configuration

  log:tail            Tail logfile

  maintenance:mode    set maintenance mode
  maintenance:repair  repair installation

  user:add            adds a user
  user:resetpassword  Resets password
  user:list           list users
```
