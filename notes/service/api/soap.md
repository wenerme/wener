---
title: SOAP
---

# SOAP

- SOAP - Simple Object Access Protocol - 简单对象访问协议
  - by W3C
  - 基于 XML
  - 消息结构
    - Envelope - 消息包裹
    - Header - 消息头
    - Body - 消息体
    - Fault - 错误信息部分
  - 最常使用 HTTP 或 HTTPS 作为传输协议，但也支持 SMTP、JMS 等
  - 支持 WS-Security
- WSDL - Web Services Description Language - Web 服务描述语言
  - 描述了 Web 服务的接口、方法、输入/输出参数
  - `<definitions>`
    - `<types>` - 定义数据类型
      - XML Schema（XSD）
    - `<message>` - 定义消息
      - `<part>` - 定义消息部分
    - `<portType>` - 定义接口
    - `<binding>` - 定义绑定
    - `<service>` - 定义服务
  - 操作模式
    - 单向
    - 请求-响应
    - 通知
    - 请求-多响应
- UDDI - Universal Description, Discovery, and Integration - 通用描述、发现和集成
  - 用于注册和查找 Web 服务
  - 三个部分
    - White Pages - 服务地址、联系人
    - Yellow Pages - 服务类型、分类
    - Green Pages - 服务详细信息
- WSDL 生成
  - Java wsimport
  - Python zeep
- 参考
  - http://www.dneonline.com/calculator.asmx?wsdl

---

- types
  - element
    - complexType ~= object/class
      - sequence
        - element
          - .name
          - .type
          - .minOccurs
          - .maxOccurs
