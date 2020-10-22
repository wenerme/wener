# SAML
* federated single sign on
* IDP XML <-> SP XML - 交换配置创建信任关系
* 可以通过 IdP 发起也可以通过 SP 发起
  * IdP 发起
    * 将内部授权用户交给外部服务
    * 例如 在统一授权登陆后便能访问其他服务
  * SP 发起
    * 例如 在访问具体服务时直接进行认证
* Chrome [SAML Tracker](https://chrome.google.com/webstore/detail/saml-tracer/mpdajninpobndbfcldcmbpnnbhibjmch) 扩展可用于调试
