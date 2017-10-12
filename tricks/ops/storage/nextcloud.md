# NextCloud

## Tips
* [Primary Storage](https://docs.nextcloud.com/server/11/admin_manual/configuration_files/primary_storage.html)
  * 可以使用 S3 或 Swift 作为主要存储
  * [lib/Files/ObjectStore](https://github.com/nextcloud/server/tree/master/lib/private/Files/ObjectStore)
* [User Authentication with LDAP](https://docs.nextcloud.com/server/11/admin_manual/configuration_user/user_auth_ldap.html)
  * The LDAP app is not compatible with the User backend using remote HTTP servers app. You cannot use both of them at the same time.
