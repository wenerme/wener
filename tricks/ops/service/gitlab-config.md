---
id: gitlab-config
title: GitLab配置
---

# Gitlab 配置
* 组建
  * gitaly - 提供 RPC 操作 Git 仓库的服务
* [gitlab.rb.template](https://gitlab.com/gitlab-org/omnibus-gitlab/blob/master/files/gitlab-config-template/gitlab.rb.template)
  * ruby 配置文件
  * 位于 `/etc/gitlab/gitlab.rb`
  * 修改后操作 `gitlab-ctl reconfigure` 可让服务器不重启的情况下从新配置
* [gitlab.yml](https://gitlab.com/gitlab-org/omnibus-gitlab/blob/master/doc/settings/gitlab.yml.md) - [gitlab.yml.example](https://gitlab.com/gitlab-org/gitlab/blob/master/config/gitlab.yml.example)
  * yaml 格式的配置文件
  * 会映射为 ruby 配置
  * 配置后会生成 `/var/opt/gitlab/gitlab-rails/etc/gitlab.yml`
* [配置](https://docs.gitlab.com/omnibus/settings/configuration.html)

```rb
# 可以引入外部配置文件
from_file "/home/admin/external_gitlab.rb"
```

## 基础配置
* 如果想要开启 Git over SSH - 那么只能是将域名解析指向 Gitlab
  * 或者单独转发单个端口
  * 做不到外部反向代理+SSH - 因为 SSH 没有域名概念 - 也不适合将整个外部的 22 都指向 Gitlab
* 注意
  * 配置了 external_url 后，如果为 https 则只监听 https - [#1891](https://gitlab.com/gitlab-org/omnibus-gitlab/issues/1891) - 同时监听 80 和 443

```rb
# 用于 SSH 的主机名
gitlab_rails['gitlab_ssh_host'] = 'ssh.host_example.com'
gitlab_rails['time_zone'] = 'UTC'
```

## 授权配置

### LDAP
* 由于 Git 需要密码 - 想要中心化管理密码只能使用 LDAP
* LDAP 可以禁止登陆 - 例如 只允许 OpenID 登陆
* [LDAP集成](https://docs.gitlab.com/ee/administration/auth/ldap.html) 
  * CE 版本只支持作为登陆
  * EE 支持同步账号和分组

### OpenID Connect

## Pages 配置
* 注意
  * 不能用 gitlab 的二级域名
  * 只能通过域名访问
  * 默认存储目录 `/var/opt/gitlab/gitlab-rails/shared/pages`
  * 如果使用自定义域名，则可能需要开启反向端口
* [Pages 管理](https://docs.gitlab.com/ee/administration/pages)

```rb
# 启用 Pages
gitlab_pages['enable'] = true

# 访问地址
# 例如项目 wener/app 则地址为 wener.pages.wener.me/app 可以测试访问
# curl -H 'Host: wener.pages.wener.me'  gitlab.wener.me/app
# 如果配置为 http 需要配置证书或者会自动从 let's encrypt 获取
pages_external_url 'http://pages.wener.me'

# 如果配置为 https 没有配置 cert 则会使用域名拼 
# 例如  "/etc/gitlab/ssl/example.io.crt"
# 如果想要 https 但是又没有证书，可以考虑配置为主域名证书，然后在外面反向代理的时候忽略验证
# 如果没有 cert 会一直失败 cannot load certificate "/etc/gitlab/ssl/pages.example.io.crt"
pages_nginx['redirect_http_to_https'] = true
pages_nginx['ssl_certificate'] = "/etc/gitlab/ssl/gitlab.example.com.crt"
pages_nginx['ssl_certificate_key'] = "/etc/gitlab/ssl/gitlab.example.com.key"


# 查看状态的路径
gitlab_pages['status_uri'] = "/@status"

# 避免 bind mount - 在 docker 里默认没有权限
# 会 mount 在 /var/opt/gitlab/gitlab-pages
gitlab_pages['inplace_chroot'] = true

# 存储路径
# 默认 /var/opt/gitlab/gitlab-rails/shared/pages
# gitlab_rails['pages_path'] = "/mnt/storage/pages"

# pages 监听的端口
# 默认是 localhost:8090
# 例如项目 wener/app 可以通过如下方式访问 - 注意协议是 HTTP 和配置的外部 URL 有关
# curl -H 'Host: wener.pages.wener.me'  localhost:8090/app
gitlab_pages['listen_proxy'] = "localhost:8090"
```

## gitlab.rb


```rb
### Email Settings
gitlab_rails['gitlab_email_enabled'] = true
gitlab_rails['gitlab_email_from'] = 'example@example.com'
gitlab_rails['gitlab_email_display_name'] = 'Example'
gitlab_rails['gitlab_email_reply_to'] = 'noreply@example.com'
gitlab_rails['gitlab_email_subject_suffix'] = ''

### GitLab user privileges
gitlab_rails['gitlab_default_can_create_group'] = true
# default true
gitlab_rails['gitlab_username_changing_enabled'] = false

# 反向代理地址
gitlab_rails['trusted_proxies'] = []

# 监控白名单
gitlab_rails['monitoring_whitelist'] = ['127.0.0.0/8', '::1/128']

#### Email account username
####! **With third party providers, this is usually the full email address.**
####! **With self-hosted email servers, this is usually the user part of the
####!   email address.**
gitlab_rails['incoming_email_email'] = "gitlab-incoming@gmail.com"
gitlab_rails['incoming_email_password'] = "[REDACTED]"

#### IMAP Settings
gitlab_rails['incoming_email_host'] = "imap.gmail.com"
gitlab_rails['incoming_email_port'] = 993
gitlab_rails['incoming_email_ssl'] = true
gitlab_rails['incoming_email_start_tls'] = false

#### Incoming Mailbox Settings
####! The mailbox where incoming mail will end up. Usually "inbox".
gitlab_rails['incoming_email_mailbox_name'] = "inbox"
####! The IDLE command timeout.
gitlab_rails['incoming_email_idle_timeout'] = 60


### Git LFS
gitlab_rails['lfs_object_store_connection'] = {
  'provider' => 'AWS',
  'region' => 'eu-west-1',
  'aws_access_key_id' => 'AWS_ACCESS_KEY_ID',
  'aws_secret_access_key' => 'AWS_SECRET_ACCESS_KEY',
  # # The below options configure an S3 compatible host instead of AWS
  # 'aws_signature_version' => 4, # For creation of signed URLs. Set to 2 if provider does not support v4.
  # 'endpoint' => 'https://s3.amazonaws.com', # default: nil - Useful for S3 compliant services such as DigitalOcean Spaces
  # 'host' => 's3.amazonaws.com',
  # 'path_style' => false # Use 'host/bucket_name/object' instead of 'bucket_name.host/object'
}


### GitLab uploads
###! Docs: https://docs.gitlab.com/ee/administration/uploads.html
gitlab_rails['uploads_object_store_connection'] = {
  'provider' => 'AWS',
  'region' => 'eu-west-1',
  'aws_access_key_id' => 'AWS_ACCESS_KEY_ID',
  'aws_secret_access_key' => 'AWS_SECRET_ACCESS_KEY',
  # # The below options configure an S3 compatible host instead of AWS
  # 'host' => 's3.amazonaws.com',
  # 'aws_signature_version' => 4, # For creation of signed URLs. Set to 2 if provider does not support v4.
  # 'endpoint' => 'https://s3.amazonaws.com', # default: nil - Useful for S3 compliant services such as DigitalOcean Spaces
  # 'path_style' => false # Use 'host/bucket_name/object' instead of 'bucket_name.host/object'
}

gitlab_rails['mattermost_host'] = "https://mattermost.example.com"



### LDAP Settings
###! Docs: https://docs.gitlab.com/omnibus/settings/ldap.html
###! **Be careful not to break the indentation in the ldap_servers block. It is
###!   in yaml format and the spaces must be retained. Using tabs will not work.**

# gitlab_rails['ldap_enabled'] = false

###! **remember to close this block with 'EOS' below**
# gitlab_rails['ldap_servers'] = YAML.load <<-'EOS'
#   main: # 'main' is the GitLab 'provider ID' of this LDAP server
#     label: 'LDAP'
#     host: '_your_ldap_server'
#     port: 389
#     uid: 'sAMAccountName'
#     bind_dn: '_the_full_dn_of_the_user_you_will_bind_with'
#     password: '_the_password_of_the_bind_user'
#     encryption: 'plain' # "start_tls" or "simple_tls" or "plain"
#     verify_certificates: true
#     smartcard_auth: false
#     active_directory: true
#     allow_username_or_email_login: false
#     lowercase_usernames: false
#     block_auto_created_users: false
#     base: ''
#     user_filter: ''
#     ## EE only
#     group_base: ''
#     admin_group: ''
#     sync_ssh_keys: false
#
#   secondary: # 'secondary' is the GitLab 'provider ID' of second LDAP server
#     label: 'LDAP'
#     host: '_your_ldap_server'
#     port: 389
#     uid: 'sAMAccountName'
#     bind_dn: '_the_full_dn_of_the_user_you_will_bind_with'
#     password: '_the_password_of_the_bind_user'
#     encryption: 'plain' # "start_tls" or "simple_tls" or "plain"
#     verify_certificates: true
#     smartcard_auth: false
#     active_directory: true
#     allow_username_or_email_login: false
#     lowercase_usernames: false
#     block_auto_created_users: false
#     base: ''
#     user_filter: ''
#     ## EE only
#     group_base: ''
#     admin_group: ''
#     sync_ssh_keys: false
# EOS

### Backup Settings
###! Docs: https://docs.gitlab.com/omnibus/settings/backups.html

# gitlab_rails['manage_backup_path'] = true
# gitlab_rails['backup_path'] = "/var/opt/gitlab/backups"

###! The duration in seconds to keep backups before they are allowed to be deleted
# gitlab_rails['backup_keep_time'] = 604800

# gitlab_rails['backup_upload_connection'] = {
#   'provider' => 'AWS',
#   'region' => 'eu-west-1',
#   'aws_access_key_id' => 'AKIAKIAKI',
#   'aws_secret_access_key' => 'secret123'
# }
# gitlab_rails['backup_upload_remote_directory'] = 'my.s3.bucket'
# gitlab_rails['backup_multipart_chunk_size'] = 104857600


### Extra customization
gitlab_rails['extra_google_analytics_id'] = '_your_tracking_id'
gitlab_rails['extra_piwik_url'] = '_your_piwik_url'
gitlab_rails['extra_piwik_site_id'] = '_your_piwik_site_id'

##! Docs: https://docs.gitlab.com/omnibus/settings/environment-variables.html
# gitlab_rails['env'] = {
#   'BUNDLE_GEMFILE' => "/opt/gitlab/embedded/service/gitlab-rails/Gemfile",
#   'PATH' => "/opt/gitlab/bin:/opt/gitlab/embedded/bin:/bin:/usr/bin"
# }


#### Change the initial default admin password and shared runner registration tokens.
####! **Only applicable on initial setup, changing these settings after database
####!   is created and seeded won't yield any change.**
# gitlab_rails['initial_root_password'] = "password"
# gitlab_rails['initial_shared_runners_registration_token'] = "token"


### GitLab database settings
###! Docs: https://docs.gitlab.com/omnibus/settings/database.html
###! **Only needed if you use an external database.**
gitlab_rails['db_adapter'] = "postgresql"
gitlab_rails['db_encoding'] = "unicode"
gitlab_rails['db_collation'] = nil
gitlab_rails['db_database'] = "gitlabhq_production"
gitlab_rails['db_pool'] = 10
gitlab_rails['db_username'] = "gitlab"
gitlab_rails['db_password'] = nil
gitlab_rails['db_host'] = nil
gitlab_rails['db_port'] = 5432
gitlab_rails['db_socket'] = nil
gitlab_rails['db_sslmode'] = nil
gitlab_rails['db_sslcompression'] = 0
gitlab_rails['db_sslrootcert'] = nil
gitlab_rails['db_prepared_statements'] = false
gitlab_rails['db_statements_limit'] = 1000


### GitLab Redis settings
###! Connect to your own Redis instance
###! Docs: https://docs.gitlab.com/omnibus/settings/redis.html

#### Redis TCP connection
gitlab_rails['redis_host'] = "127.0.0.1"
gitlab_rails['redis_port'] = 6379
gitlab_rails['redis_ssl'] = false
gitlab_rails['redis_password'] = nil
gitlab_rails['redis_database'] = 0
gitlab_rails['redis_enable_client'] = true

#### Redis local UNIX socket (will be disabled if TCP method is used)
gitlab_rails['redis_socket'] = "/var/opt/gitlab/redis/redis.socket"

### GitLab email server settings
###! Docs: https://docs.gitlab.com/omnibus/settings/smtp.html
###! **Use smtp instead of sendmail/postfix.**

gitlab_rails['smtp_enable'] = true
gitlab_rails['smtp_address'] = "smtp.server"
gitlab_rails['smtp_port'] = 465
gitlab_rails['smtp_user_name'] = "smtp user"
gitlab_rails['smtp_password'] = "smtp password"
gitlab_rails['smtp_domain'] = "example.com"
gitlab_rails['smtp_authentication'] = "login"
gitlab_rails['smtp_enable_starttls_auto'] = true
gitlab_rails['smtp_tls'] = false

###! **Can be: 'none', 'peer', 'client_once', 'fail_if_no_peer_cert'**
###! Docs: http://api.rubyonrails.org/classes/ActionMailer/Base.html
# gitlab_rails['smtp_openssl_verify_mode'] = 'none'

# gitlab_rails['smtp_ca_path'] = "/etc/ssl/certs"
# gitlab_rails['smtp_ca_file'] = "/etc/ssl/certs/ca-certificates.crt"

################################################################################
## Container Registry settings
##! Docs: https://docs.gitlab.com/ce/administration/container_registry.html
################################################################################

# registry_external_url 'https://registry.gitlab.example.com'

### Settings used by GitLab application
gitlab_rails['registry_enabled'] = true
gitlab_rails['registry_host'] = "registry.gitlab.example.com"
gitlab_rails['registry_port'] = "5005"
gitlab_rails['registry_path'] = "/var/opt/gitlab/gitlab-rails/shared/registry"

################################################################################
## Error Reporting and Logging with Sentry
################################################################################
# gitlab_rails['sentry_enabled'] = false
# gitlab_rails['sentry_dsn'] = 'https://<key>@sentry.io/<project>'
# gitlab_rails['sentry_clientside_dsn'] = 'https://<key>@sentry.io/<project>'
# gitlab_rails['sentry_environment'] = 'production'

################################################################################
## GitLab Workhorse
##! Docs: https://gitlab.com/gitlab-org/gitlab-workhorse/blob/master/README.md
################################################################################

# gitlab_workhorse['enable'] = true
# gitlab_workhorse['ha'] = false
# gitlab_workhorse['listen_network'] = "unix"
# gitlab_workhorse['listen_umask'] = 000
# gitlab_workhorse['listen_addr'] = "/var/opt/gitlab/gitlab-workhorse/socket"
# gitlab_workhorse['auth_backend'] = "http://localhost:8080"

################################################################
## GitLab PostgreSQL
################################################################

###! Changing any of these settings requires a restart of postgresql.
###! By default, reconfigure reloads postgresql if it is running. If you
###! change any of these settings, be sure to run `gitlab-ctl restart postgresql`
###! after reconfigure in order for the changes to take effect.
# postgresql['enable'] = true
# postgresql['listen_address'] = nil
# postgresql['port'] = 5432
# postgresql['data_dir'] = "/var/opt/gitlab/postgresql/data"

##! **recommend value is 1/4 of total RAM, up to 14GB.**
# postgresql['shared_buffers'] = "256MB"

### Advanced settings
# postgresql['ha'] = false
# postgresql['dir'] = "/var/opt/gitlab/postgresql"
# postgresql['log_directory'] = "/var/log/gitlab/postgresql"
# postgresql['username'] = "gitlab-psql"
# postgresql['group'] = "gitlab-psql"
##! `SQL_USER_PASSWORD_HASH` can be generated using the command `gitlab-ctl pg-password-md5 gitlab`
# postgresql['sql_user_password'] = 'SQL_USER_PASSWORD_HASH'
# postgresql['uid'] = nil
# postgresql['gid'] = nil
# postgresql['shell'] = "/bin/sh"
# postgresql['home'] = "/var/opt/gitlab/postgresql"
# postgresql['user_path'] = "/opt/gitlab/embedded/bin:/opt/gitlab/bin:$PATH"
# postgresql['sql_user'] = "gitlab"
# postgresql['max_connections'] = 200
# postgresql['md5_auth_cidr_addresses'] = []
# postgresql['trust_auth_cidr_addresses'] = []
# postgresql['wal_buffers'] = "-1"
# postgresql['autovacuum_max_workers'] = "3"
# postgresql['autovacuum_freeze_max_age'] = "200000000"
# postgresql['log_statement'] = nil
# postgresql['track_activity_query_size'] = "1024"
# postgresql['shared_preload_libraries'] = nil
# postgresql['dynamic_shared_memory_type'] = nil
# postgresql['hot_standby'] = "off"

### SSL settings
# See https://www.postgresql.org/docs/9.6/static/runtime-config-connection.html#GUC-SSL-CERT-FILE for more details
# postgresql['ssl'] = 'on'
# postgresql['ssl_ciphers'] = 'HIGH:MEDIUM:+3DES:!aNULL:!SSLv3:!TLSv1'
# postgresql['ssl_cert_file'] = 'server.crt'
# postgresql['ssl_key_file'] = 'server.key'
# postgresql['ssl_ca_file'] = '/opt/gitlab/embedded/ssl/certs/cacert.pem'
# postgresql['ssl_crl_file'] = nil

### Replication settings
###! Note, some replication settings do not require a full restart. They are documented below.
# postgresql['wal_level'] = "hot_standby"
# postgresql['max_wal_senders'] = 5
# postgresql['max_replication_slots'] = 0
# postgresql['max_locks_per_transaction'] = 128

# Backup/Archive settings
# postgresql['archive_mode'] = "off"

###! Changing any of these settings only requires a reload of postgresql. You do not need to
###! restart postgresql if you change any of these and run reconfigure.
# postgresql['work_mem'] = "16MB"
# postgresql['maintenance_work_mem'] = "16MB"
# postgresql['checkpoint_segments'] = 10
# postgresql['checkpoint_timeout'] = "5min"
# postgresql['checkpoint_completion_target'] = 0.9
# postgresql['effective_io_concurrency'] = 1
# postgresql['checkpoint_warning'] = "30s"
# postgresql['effective_cache_size'] = "1MB"
# postgresql['shmmax'] =  17179869184 # or 4294967295
# postgresql['shmall'] =  4194304 # or 1048575
# postgresql['autovacuum'] = "on"
# postgresql['log_autovacuum_min_duration'] = "-1"
# postgresql['autovacuum_naptime'] = "1min"
# postgresql['autovacuum_vacuum_threshold'] = "50"
# postgresql['autovacuum_analyze_threshold'] = "50"
# postgresql['autovacuum_vacuum_scale_factor'] = "0.02"
# postgresql['autovacuum_analyze_scale_factor'] = "0.01"
# postgresql['autovacuum_vacuum_cost_delay'] = "20ms"
# postgresql['autovacuum_vacuum_cost_limit'] = "-1"
# postgresql['statement_timeout'] = "60000"
# postgresql['idle_in_transaction_session_timeout'] = "60000"
# postgresql['log_line_prefix'] = "%a"
# postgresql['max_worker_processes'] = 8
# postgresql['max_parallel_workers_per_gather'] = 0
# postgresql['log_lock_waits'] = 1
# postgresql['deadlock_timeout'] = '5s'
# postgresql['track_io_timing'] = 0
# postgresql['default_statistics_target'] = 1000

### Available in PostgreSQL 9.6 and later
# postgresql['min_wal_size'] = 80MB
# postgresql['max_wal_size'] = 1GB

# Backup/Archive settings
# postgresql['archive_command'] = nil
# postgresql['archive_timeout'] = "0"

### Replication settings
# postgresql['sql_replication_user'] = "gitlab_replicator"
# postgresql['sql_replication_password'] = "md5 hash of postgresql password" # You can generate with `gitlab-ctl pg-password-md5 <dbuser>`
# postgresql['wal_keep_segments'] = 10
# postgresql['max_standby_archive_delay'] = "30s"
# postgresql['max_standby_streaming_delay'] = "30s"
# postgresql['synchronous_commit'] = on
# postgresql['synchronous_standby_names'] = ''
# postgresql['hot_standby_feedback'] = 'off'
# postgresql['random_page_cost'] = 2.0
# postgresql['log_temp_files'] = -1
# postgresql['log_checkpoints'] = 'off'
# To add custom entries to pg_hba.conf use the following
# postgresql['custom_pg_hba_entries'] = {
#   APPLICATION: [ # APPLICATION should identify what the settings are used for
#     {
#       type: example,
#       database: example,
#       user: example,
#       cidr: example,
#       method: example,
#       option: example
#     }
#   ]
# }
# See https://www.postgresql.org/docs/9.6/static/auth-pg-hba-conf.html for an explanation
# of the values


################################################################################
## GitLab Redis
##! **Can be disabled if you are using your own Redis instance.**
##! Docs: https://docs.gitlab.com/omnibus/settings/redis.html
################################################################################

# redis['enable'] = true
# redis['ha'] = false
# redis['hz'] = 10
# redis['dir'] = "/var/opt/gitlab/redis"
# redis['log_directory'] = "/var/log/gitlab/redis"
# redis['username'] = "gitlab-redis"
# redis['group'] = "gitlab-redis"
# redis['maxclients'] = "10000"
# redis['maxmemory'] = "0"
# redis['maxmemory_policy'] = "noeviction"
# redis['maxmemory_samples'] = "5"
# redis['tcp_backlog'] = 511
# redis['tcp_timeout'] = "60"
# redis['tcp_keepalive'] = "300"
# redis['uid'] = nil
# redis['gid'] = nil

### Disable or obfuscate unnecessary redis command names
### Uncomment and edit this block to add or remove entries.
### See https://docs.gitlab.com/omnibus/settings/redis.html#renamed-commands
### for detailed usage
###  
# redis['rename_commands'] = {
#   'KEYS': ''
#}
#

###! **To enable only Redis service in this machine, uncomment
###!   one of the lines below (choose master or slave instance types).**
###! Docs: https://docs.gitlab.com/omnibus/settings/redis.html
###!       https://docs.gitlab.com/ce/administration/high_availability/redis.html
# redis_master_role['enable'] = true
# redis_slave_role['enable'] = true

### Redis TCP support (will disable UNIX socket transport)
# redis['bind'] = '0.0.0.0' # or specify an IP to bind to a single one
# redis['port'] = 6379
# redis['password'] = 'redis-password-goes-here'

### Redis Sentinel support
###! **You need a master slave Redis replication to be able to do failover**
###! **Please read the documentation before enabling it to understand the
###!   caveats:**
###! Docs: https://docs.gitlab.com/ce/administration/high_availability/redis.html

### Replication support
#### Slave Redis instance
# redis['master'] = false # by default this is true

#### Slave and Sentinel shared configuration
####! **Both need to point to the master Redis instance to get replication and
####!   heartbeat monitoring**
# redis['master_name'] = 'gitlab-redis'
# redis['master_ip'] = nil
# redis['master_port'] = 6379

#### Support to run redis slaves in a Docker or NAT environment
####! Docs: https://redis.io/topics/replication#configuring-replication-in-docker-and-nat
# redis['announce_ip'] = nil
# redis['announce_port'] = nil

####! **Master password should have the same value defined in
####!   redis['password'] to enable the instance to transition to/from
####!   master/slave in a failover event.**
# redis['master_password'] = 'redis-password-goes-here'

####! Increase these values when your slaves can't catch up with master
# redis['client_output_buffer_limit_normal'] = '0 0 0'
# redis['client_output_buffer_limit_slave'] = '256mb 64mb 60'
# redis['client_output_buffer_limit_pubsub'] = '32mb 8mb 60'

#####! Redis snapshotting frequency
#####! Set to [] to disable
#####! Set to [''] to clear previously set values
# redis['save'] = [ '900 1', '300 10', '60 10000' ]

################################################################################
## GitLab Web server
##! Docs: https://docs.gitlab.com/omnibus/settings/nginx.html#using-a-non-bundled-web-server
################################################################################

##! When bundled nginx is disabled we need to add the external webserver user to
##! the GitLab webserver group.
# web_server['external_users'] = []
# web_server['username'] = 'gitlab-www'
# web_server['group'] = 'gitlab-www'
# web_server['uid'] = nil
# web_server['gid'] = nil
# web_server['shell'] = '/bin/false'
# web_server['home'] = '/var/opt/gitlab/nginx'

################################################################################
## GitLab NGINX
##! Docs: https://docs.gitlab.com/omnibus/settings/nginx.html
################################################################################

# nginx['enable'] = true
# nginx['client_max_body_size'] = '250m'
# nginx['redirect_http_to_https'] = false
# nginx['redirect_http_to_https_port'] = 80

##! Most root CA's are included by default
# nginx['ssl_client_certificate'] = "/etc/gitlab/ssl/ca.crt"

##! enable/disable 2-way SSL client authentication
# nginx['ssl_verify_client'] = "off"

##! if ssl_verify_client on, verification depth in the client certificates chain
# nginx['ssl_verify_depth'] = "1"

# nginx['ssl_certificate'] = "/etc/gitlab/ssl/#{node['fqdn']}.crt"
# nginx['ssl_certificate_key'] = "/etc/gitlab/ssl/#{node['fqdn']}.key"
# nginx['ssl_ciphers'] = "ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256"
# nginx['ssl_prefer_server_ciphers'] = "on"

##! **Recommended by: https://raymii.org/s/tutorials/Strong_SSL_Security_On_nginx.html
##!                   https://cipherli.st/**
# nginx['ssl_protocols'] = "TLSv1.2 TLSv1.3"

##! **Recommended in: https://nginx.org/en/docs/http/ngx_http_ssl_module.html**
# nginx['ssl_session_cache'] = "builtin:1000  shared:SSL:10m"

##! **Default according to https://nginx.org/en/docs/http/ngx_http_ssl_module.html**
# nginx['ssl_session_timeout'] = "5m"

# nginx['ssl_dhparam'] = nil # Path to dhparams.pem, eg. /etc/gitlab/ssl/dhparams.pem
# nginx['listen_addresses'] = ['*', '[::]']

##! **Defaults to forcing web browsers to always communicate using only HTTPS**
##! Docs: https://docs.gitlab.com/omnibus/settings/nginx.html#setting-http-strict-transport-security
# nginx['hsts_max_age'] = 31536000
# nginx['hsts_include_subdomains'] = false

##! Defaults to stripping path information when making cross-origin requests
# nginx['referrer_policy'] = 'strict-origin-when-cross-origin'

##! **Docs: http://nginx.org/en/docs/http/ngx_http_gzip_module.html**
# nginx['gzip_enabled'] = true

##! **Override only if you use a reverse proxy**
##! Docs: https://docs.gitlab.com/omnibus/settings/nginx.html#setting-the-nginx-listen-port
# nginx['listen_port'] = nil

##! **Override only if your reverse proxy internally communicates over HTTP**
##! Docs: https://docs.gitlab.com/omnibus/settings/nginx.html#supporting-proxied-ssl
# nginx['listen_https'] = nil

# nginx['custom_gitlab_server_config'] = "location ^~ /foo-namespace/bar-project/raw/ {\n deny all;\n}\n"
# nginx['custom_nginx_config'] = "include /etc/nginx/conf.d/example.conf;"
# nginx['proxy_read_timeout'] = 3600
# nginx['proxy_connect_timeout'] = 300
# nginx['proxy_set_headers'] = {
#  "Host" => "$http_host_with_default",
#  "X-Real-IP" => "$remote_addr",
#  "X-Forwarded-For" => "$proxy_add_x_forwarded_for",
#  "X-Forwarded-Proto" => "https",
#  "X-Forwarded-Ssl" => "on",
#  "Upgrade" => "$http_upgrade",
#  "Connection" => "$connection_upgrade"
# }
# nginx['proxy_cache_path'] = 'proxy_cache keys_zone=gitlab:10m max_size=1g levels=1:2'
# nginx['proxy_cache'] = 'gitlab'
# nginx['http2_enabled'] = true
# nginx['real_ip_trusted_addresses'] = []
# nginx['real_ip_header'] = nil
# nginx['real_ip_recursive'] = nil
# nginx['custom_error_pages'] = {
#   '404' => {
#     'title' => 'Example title',
#     'header' => 'Example header',
#     'message' => 'Example message'
#   }
# }

### Advanced settings
# nginx['dir'] = "/var/opt/gitlab/nginx"
# nginx['log_directory'] = "/var/log/gitlab/nginx"
# nginx['worker_processes'] = 4
# nginx['worker_connections'] = 10240
# nginx['log_format'] = '$remote_addr - $remote_user [$time_local] "$request" $status $body_bytes_sent "$http_referer" "$http_user_agent"'
# nginx['sendfile'] = 'on'
# nginx['tcp_nopush'] = 'on'
# nginx['tcp_nodelay'] = 'on'
# nginx['gzip'] = "on"
# nginx['gzip_http_version'] = "1.0"
# nginx['gzip_comp_level'] = "2"
# nginx['gzip_proxied'] = "any"
# nginx['gzip_types'] = [ "text/plain", "text/css", "application/x-javascript", "text/xml", "application/xml", "application/xml+rss", "text/javascript", "application/json" ]
# nginx['keepalive_timeout'] = 65
# nginx['cache_max_size'] = '5000m'
# nginx['server_names_hash_bucket_size'] = 64
##! These paths have proxy_request_buffering disabled
# nginx['request_buffering_off_path_regex'] = "\.git/git-receive-pack$|\.git/info/refs?service=git-receive-pack$|\.git/gitlab-lfs/objects|\.git/info/lfs/objects/batch$"

### Nginx status
# nginx['status'] = {
#  "enable" => true,
#  "listen_addresses" => ["127.0.0.1"],
#  "fqdn" => "dev.example.com",
#  "port" => 9999,
#  "vts_enable" => true,
#  "options" => {
#    "stub_status" => "on", # Turn on stats
#    "server_tokens" => "off", # Don't show the version of NGINX
#    "access_log" => "off", # Disable logs for stats
#    "allow" => "127.0.0.1", # Only allow access from localhost
#    "deny" => "all" # Deny access to anyone else
#  }
# }

################################################################################
## GitLab Logging
##! Docs: https://docs.gitlab.com/omnibus/settings/logs.html
################################################################################

# logging['svlogd_size'] = 200 * 1024 * 1024 # rotate after 200 MB of log data
# logging['svlogd_num'] = 30 # keep 30 rotated log files
# logging['svlogd_timeout'] = 24 * 60 * 60 # rotate after 24 hours
# logging['svlogd_filter'] = "gzip" # compress logs with gzip
# logging['svlogd_udp'] = nil # transmit log messages via UDP
# logging['svlogd_prefix'] = nil # custom prefix for log messages
# logging['logrotate_frequency'] = "daily" # rotate logs daily
# logging['logrotate_maxsize'] = nil # rotate logs when they grow bigger than size bytes even before the specified time interval (daily, weekly, monthly, or yearly)
# logging['logrotate_size'] = nil # do not rotate by size by default
# logging['logrotate_rotate'] = 30 # keep 30 rotated logs
# logging['logrotate_compress'] = "compress" # see 'man logrotate'
# logging['logrotate_method'] = "copytruncate" # see 'man logrotate'
# logging['logrotate_postrotate'] = nil # no postrotate command by default
# logging['logrotate_dateformat'] = nil # use date extensions for rotated files rather than numbers e.g. a value of "-%Y-%m-%d" would give rotated files like production.log-2016-03-09.gz

### UDP log forwarding
##! Docs: http://docs.gitlab.com/omnibus/settings/logs.html#udp-log-forwarding

##! remote host to ship log messages to via UDP
# logging['udp_log_shipping_host'] = nil

##! override the hostname used when logs are shipped via UDP,
##  by default the system hostname will be used.
# logging['udp_log_shipping_hostname'] = nil

##! remote port to ship log messages to via UDP
# logging['udp_log_shipping_port'] = 514

################################################################################
## Logrotate
##! Docs: https://docs.gitlab.com/omnibus/settings/logs.html#logrotate
##! You can disable built in logrotate feature.
################################################################################
# logrotate['enable'] = true

################################################################################
## Users and groups accounts
##! Disable management of users and groups accounts.
##! **Set only if creating accounts manually**
##! Docs: https://docs.gitlab.com/omnibus/settings/configuration.html#disable-user-and-group-account-management
################################################################################

# manage_accounts['enable'] = false

################################################################################
## Storage directories
##! Disable managing storage directories
##! Docs: https://docs.gitlab.com/omnibus/settings/configuration.html#disable-storage-directories-management
################################################################################

##! **Set only if the select directories are created manually**
# manage_storage_directories['enable'] = false
# manage_storage_directories['manage_etc'] = false

################################################################################
## Runtime directory
##! Docs: https://docs.gitlab.com//omnibus/settings/configuration.html#configuring-runtime-directory
################################################################################

# runtime_dir '/run'

################################################################################
## Git
##! Advanced setting for configuring git system settings for omnibus-gitlab
##! internal git
################################################################################

##! For multiple options under one header use array of comma separated values,
##! eg.:
##! { "receive" => ["fsckObjects = true"], "alias" => ["st = status", "co = checkout"] }

# omnibus_gitconfig['system'] = {
#  "pack" => ["threads = 1"],
#  "receive" => ["fsckObjects = true", "advertisePushOptions = true"],
#  "repack" => ["writeBitmaps = true"],
#  "transfer" => ["hideRefs=^refs/tmp/", "hideRefs=^refs/keep-around/", "hideRefs=^refs/remotes/"],
# }

################################################################################
## GitLab Pages
##! Docs: https://docs.gitlab.com/ce/pages/administration.html
################################################################################

##! Define to enable GitLab Pages
# pages_external_url "http://pages.example.com/"
# gitlab_pages['enable'] = false

##! Configure to expose GitLab Pages on external IP address, serving the HTTP
# gitlab_pages['external_http'] = []

##! Configure to expose GitLab Pages on external IP address, serving the HTTPS
# gitlab_pages['external_https'] = []

##! Configure to use the default list of cipher suites
# gitlab_pages['insecure_ciphers'] = false

##! Configure to enable health check endpoint on GitLab Pages
# gitlab_pages['status_uri'] = "/@status"

##! Tune the maximum number of concurrent connections GitLab Pages will handle.
##! This should be in the range 1 - 10000, defaulting to 5000.
# gitlab_pages['max_connections'] = 5000

##! Configure to use JSON structured logging in GitLab Pages
# gitlab_pages['log_format'] = "json"

##! Configure verbose logging for GitLab Pages
# gitlab_pages['log_verbose'] = false

##! Error Reporting and Logging with Sentry
# gitlab_pages['sentry_enabled'] = false
# gitlab_pages['sentry_dsn'] = 'https://<key>@sentry.io/<project>'
# gitlab_pages['sentry_environment'] = 'production'

##! Listen for requests forwarded by reverse proxy
# gitlab_pages['listen_proxy'] = "localhost:8090"

##! Configure GitLab Pages to use an HTTP Proxy
# gitlab_pages['http_proxy'] = "http://example:8080"

# gitlab_pages['redirect_http'] = true
# gitlab_pages['use_http2'] = true
# gitlab_pages['dir'] = "/var/opt/gitlab/gitlab-pages"
# gitlab_pages['log_directory'] = "/var/log/gitlab/gitlab-pages"

# gitlab_pages['artifacts_server'] = true
# gitlab_pages['artifacts_server_url'] = nil # Defaults to external_url + '/api/v4'
# gitlab_pages['artifacts_server_timeout'] = 10

##! Environments that do not support bind-mounting should set this parameter to
##! true. This is incompatible with the artifacts server
# gitlab_pages['inplace_chroot'] = false

##! Prometheus metrics for Pages docs: https://gitlab.com/gitlab-org/gitlab-pages/#enable-prometheus-metrics
# gitlab_pages['metrics_address'] = ":9235"

##! Specifies the minimum SSL/TLS version ("ssl3", "tls1.0", "tls1.1" or "tls1.2")
# gitlab_pages['tls_min_version'] = "ssl3"

##! Specifies the maximum SSL/TLS version ("ssl3", "tls1.0", "tls1.1" or "tls1.2")
# gitlab_pages['tls_max_version'] = "tls1.2"

##! Configure the pages admin API
# gitlab_pages['admin_secret_token'] = 'custom secret'
# gitlab_pages['admin_https_listener'] = '0.0.0.0:5678'
# gitlab_pages['admin_https_cert'] = '/etc/gitlab/pages-admin.crt'
# gitlab_pages['admin_https_key'] = '/etc/gitlab/pages-admin.key'

##! Client side configuration for gitlab-pages admin API, in case pages runs on a different host
# gitlab_rails['pages_admin_address'] = 'pages.gitlab.example.com:5678'
# gitlab_rails['pages_admin_certificate'] = '/etc/gitlab/pages-admin.crt'

##! Pages access control
# gitlab_pages['access_control'] = false
# gitlab_pages['gitlab_id'] = nil # Automatically generated if not present
# gitlab_pages['gitlab_secret'] = nil # Generated if not present
# gitlab_pages['auth_redirect_uri'] = nil # Defaults to projects subdomain of pages_external_url and + '/auth'
# gitlab_pages['gitlab_server'] = nil # Defaults to external_url
# gitlab_pages['auth_secret'] = nil # Generated if not present

##! Define custom gitlab-pages HTTP headers for the whole instance
# gitlab_pages['headers'] = []

################################################################################
## GitLab Pages NGINX
################################################################################

# All the settings defined in the "GitLab Nginx" section are also available in
# this "GitLab Pages NGINX" section, using the key `pages_nginx`.  However,
# those settings should be explicitly set. That is, settings given as
# `nginx['some_setting']` WILL NOT be automatically replicated as
# `pages_nginx['some_setting']` and should be set separately.

# Below you can find settings that are exclusive to "GitLab Pages NGINX"
# pages_nginx['enable'] = false

# gitlab_rails['pages_path'] = "/var/opt/gitlab/gitlab-rails/shared/pages"

################################################################################
## GitLab CI
##! Docs: https://docs.gitlab.com/ce/ci/quick_start/README.html
################################################################################

# gitlab_ci['gitlab_ci_all_broken_builds'] = true
# gitlab_ci['gitlab_ci_add_pusher'] = true
# gitlab_ci['builds_directory'] = '/var/opt/gitlab/gitlab-ci/builds'


```