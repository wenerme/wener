---
title: Nextcloud Management
tags:
  - Service
  - Nextcloud
  - Ops
  - Admin
---

# Nextcloud Management

## User & Shell Access

```bash
# If docker -u is not possible, install sudo via standard shell interaction
apt update && apt install nano sudo
sudo -u www-data bash
```

## Configuration Hints

### Database Config

```php
"dbtype" => "mysql",
"dbname" => "nextcloud",
"dbuser" => "username",
"dbpassword" => "password",
"dbhost" => "localhost",
```

### Run OCC Command

```bash
docker exec -it -u www-data nextcloud php occ
```

- Run as user:
  - `su - root -c "command"`
  - `sudo -u www-data`

## Apps Management

| App              | Description              |
| :--------------- | :----------------------- |
| `user_ldap`      | LDAP Integration         |
| `circles`        | Social sharing           |
| `contacts`       | Contacts management      |
| `calendar`       | Calendar                 |
| `spreed`         | Nextcloud Talk           |
| `files_external` | External storage support |
| `notes`          | Markdown notes           |

### Essential Apps Installation

```bash
sudo -u www-data bash

# Disable unwanted default apps
php occ app:disable firstrunwizard federation nextcloud_announcements support survey_client updatenotification

# Enable Audit
php occ app:enable admin_audit

# Install useful apps
php occ app:install checksum
php occ app:install extract
php occ app:install files_accesscontrol
php occ app:install files_automatedtagging
php occ app:install groupfolders
php occ app:install metadata
php occ app:install files_mindmap
php occ app:install files_markdown
php occ app:install notes
php occ app:install external
php occ app:install group_everyone
php occ app:install flowupload
php occ app:install occweb
php occ app:install announcementcenter
php occ app:install piwik # Analytics
php occ app:install audioplayer
php occ app:install files_readmemd
php occ app:install files_texteditor
php occ app:install files_external

# Auth
# php occ app:install user_saml
```

### Other Apps

- `appointments`: Booking/Appointments
- `ldapcontacts`: LDAP Contacts support (Write support via separate app)
- `weather`: Weather widget
- `activity`: Activity log
- `appvncsafe`: VNC
- `dashboardcharts`: Charts
- `forms`: Surveys/Forms

## Collabora Online (Office)

- WOPI Host: Nextcloud
- WOPI Client: Collabora Online Server
