# Tomcat

## Tips

账号配置位于 `$TOMCAT_HOME/conf/tomcat-users.xml`,默认没有任何账号,可添加一下账号以加入管理界面

```xml
<!-- 测试时可将所有权限都给 admin/admin -->
<role rolename="manager-script"/>
<role rolename="manager-gui"/>
<role rolename="manager-jmx"/>
<role rolename="manager-status"/>
<role rolename="admin-gui"/>
<role rolename="admin-script"/>
<user username="admin" password="admin" roles="manager-gui,manager-script,manager-jmx,manager-status,admin-gui,admin-script"/>
```

* manager-gui - allows access to the HTML GUI and the status pages
* manager-script - allows access to the text interface and the status pages
* manager-jmx - allows access to the JMX proxy and the status pages
* manager-status - allows access to the status pages only
* manager 在 Tomcat 7 后该角色被移除
* admin-gui - allows access to the HTML GUI
* admin-script - allows access to the text interface
