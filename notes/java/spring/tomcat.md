# Tomcat

## Tips

账号配置位于 `$TOMCAT_HOME/conf/tomcat-users.xml`,默认没有任何账号,可添加以下账号以加入管理界面

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

```bash
docker run -it --rm -p 8080:8080 --name tomcat tomcat
# 将配置拷贝一份到本地
docker cp tomcat:/usr/local/tomcat/conf .
#
```

## FAQ
### 设置了角色和用户后依然 403
8.5 后需要在 localhost 下包含 manager.xml

__例如__

```xml
<Context privileged="true" antiResourceLocking="false" docBase="${catalina.home}/webapps/manager">
    <Valve className="org.apache.catalina.valves.RemoteAddrValve" allow="^.*$" />
</Context>
```

## Release
