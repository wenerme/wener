---
title: LDAP Schema
---

# LDAP Schema

- [Combined Active Directory Schema Classes and Attributes for Windows Server](https://www.microsoft.com/en-us/download/details.aspx?id=23782)
  - ldf 格式
  - 用于参考，包含可多 AD DS 操作属性
- [Active Directory to OpenLdap](https://github.com/dkoudela/active-directory-to-openldap)
  - 将 Active Directory 转为 OpenLdap

| schema  | for                                                                |
| ------- | ------------------------------------------------------------------ |
| rfc1274 | COSINE, X.500                                                      |
| rfc2256 | X.500 User Schema for use with LDAPv3                              |
| rfc2798 | inetOrgPerson                                                      |
| rfc3712 | ~~Printer Services~~                                               |
| rfc4403 | UDDIv3                                                             |
| rfc4519 | User Applications                                                  |
| rfc4523 | X.509                                                              |
| rfc4524 | COSINE/X.500                                                       |
| rfc4530 | entryUUID                                                          |
| rfc5020 | entryDN                                                            |
| rfc5803 | SCRAM - Storing Salted Challenge Response Authentication Mechanism |
| rfc7612 | Printer Services                                                   |
| rfc8284 | XMPP in White Pages                                                |

[rfc1274]: https://www.rfc-editor.org/rfc/rfc1274
[rfc2256]: https://www.rfc-editor.org/rfc/rfc2256

| name | stand for           | 含义                       |
| ---- | ------------------- | -------------------------- |
| dn   | distinguished name  | 专有名称                   |
| cn   | Common Name         | 通用名、全名               |
| dc   | Domain Component    | wener.me -> dc=wener,dc=me |
| ou   | Organizational Unit | 组织单位                   |
| sn   | surname             | 姓                         |
| c    | country             | 国家                       |
| o    | Organization        | 组织                       |

- inetOrgPerson
  - 常用的组织用户类

cn
person, organizationalPerson, user

uid
inetOrgPerson, organizationalPerson

```ldif
# 陈小明
dn: uid=chenxiaoming,ou=users,dc=incos
objectClass: inetOrgPerson
objectClass: organizationalPerson
objectClass: person
objectClass: top
cn: 陈小明
sn: 陈
uid: chenxiaoming
```

## SSH

- sshPublicKey
- https://serverfault.com/a/653793/190601
- [AndriiGrytsenko/openssh-ldap-publickey](https://github.com/AndriiGrytsenko/openssh-ldap-publickey)
- https://eng.ucmerced.edu/soe/computing/services/ssh-based-service/ldap-ssh-access

```ldif title="openssh-lpk.ldif"
dn: cn=openssh-lpk,cn=schema,cn=config
objectClass: olcSchemaConfig
cn: openssh-lpk
olcAttributeTypes: ( 1.3.6.1.4.1.24552.500.1.1.1.13 NAME 'sshPublicKey'
    DESC 'MANDATORY: OpenSSH Public key'
    EQUALITY octetStringMatch
    SYNTAX 1.3.6.1.4.1.1466.115.121.1.40 )
olcObjectClasses: ( 1.3.6.1.4.1.24552.500.1.1.2.0 NAME 'ldapPublicKey' SUP top AUXILIARY
    DESC 'MANDATORY: OpenSSH LPK objectclass'
    MAY ( sshPublicKey $ uid )
    )
```

## RFC2719 inetOrgPerson

| Attribute Types      | stand for | e.g.                                             |
| -------------------- | --------- | ------------------------------------------------ |
| carLicense           |
| departmentNumber     |
| displayName          |
| employeeNumber       |
| employeeType         |           | Contractor,Employee,Intern,Temp,External,Unknown |
| jpegPhoto            |           | binary                                           |
| preferredLanguage    |
| userSMIMECertificate |
| userPKCS12           |

| Attribute            | Meaning                       |
| -------------------- | ----------------------------- |
| uid                  | userid                        |
| initials             | 首字母                        |
| sn                   | 姓                            |
| givenName            | 名                            |
| cn                   | 名字、全名                    |
| displayName          | 昵称、显示名称                |
| mail                 |
| telephoneNumber      |
| mobile               |
| roomNumber           |
| carLicense           |
| title                | 职位                          |
| employeeNumber       | 工号                          |
| employeeType         | 员工类型，例如 正式员工，兼职 |
| o                    | 公司名称                      |
| ou                   | 部门名称                      |
| departmentNumber     | 部门编号                      |
| jpegPhoto            | 头像、二进制数据              |
| photo                | 头像地址                      |
| manager              | 主管                          |
| audio                |
| businessCategory     |
| homePhone            |
| homePostalAddress    |
| initials             |
| labeledURI           |
| pager                |
| secretary            |
| userCertificate      |
| x500uniqueIdentifier |
| preferredLanguage    |
| userSMIMECertificate |
| userPKCS12           |

- https://www.rfc-editor.org/rfc/rfc2798.html

## RFC4519 User Applications

- Schema for User Applications

| Attribute Types            | stand for              | e.g.                    |
| -------------------------- | ---------------------- | ----------------------- |
| businessCategory           |
| c                          | countryName            | EN,US ISO3166           |
| cn                         | commonName             | 例如 person 的 fullname |
| dc                         | domainComponent        |
| description                |
| destinationIndicator       | country or city        |
| distinguishedName          | dn                     | 继承属性                |
| dnQualifier                |
| enhancedSearchGuide        |
| facsimileTelephoneNumber   |
| generationQualifier        |
| givenName                  | first name             |
| houseIdentifier            |
| initials                   |
| internationalISDNNumber    |                        | 电话号吗                |
| l                          | localityName           | X.500                   |
| member                     |
| name                       |                        | 继承属性                |
| o                          | organizationName       | X.500                   |
| ou                         | organizationalUnitName | X.500                   |
| owner                      |
| physicalDeliveryOfficeName |
| postalAddress              |
| postalCode                 |
| postOfficeBox              |
| preferredDeliveryMethod    |
| registeredAddress          |
| roleOccupant               |
| searchGuide                |
| seeAlso                    |
| serialNumber               |
| sn                         | surname                | X.500                   |
| st                         | stateOrProvinceName    | X.500                   |
| street                     | streetAddress          | X.500                   |
| telephoneNumber            |
| teletexTerminalIdentifier  |
| telexNumber                |
| title                      |                        | 职称                    |
| uid                        | userid                 |
| uniqueMember               |
| userPassword               |

- Object Classes
  - applicationProcess
  - country
  - dcObject
  - device
  - groupOfNames
  - groupOfUniqueNames
  - locality
  - organization
  - organizationalPerson
  - organizationalRole
  - organizationalUnit
  - person
  - residentialPerson
  - uidObject
- [RFC4519](https://www.rfc-editor.org/rfc/rfc4519)

## RFC1274 The COSINE and Internet X.500 Schema

- https://www.rfc-editor.org/rfc/rfc1274

## RFC4524 COSINE

- Attribute Types
  - associatedDomain
  - associatedName
  - buildingName
  - co - Friendly Country Name
  - documentAuthor
  - documentIdentifier
  - documentLocation
  - documentPublisher
  - documentTitle
  - documentVersion
  - drink
  - homePhone
  - homePostalAddress
  - host
  - info
  - mail
  - manager
  - mobile
  - organizationalStatus
  - pager
  - personalTitle
  - roomNumber
  - secretary
  - uniqueIdentifier
  - userClass
- Object Classes
  - account
  - document
  - documentSeries
  - domain
  - domainRelatedObject
  - friendlyCountry
  - rFC822LocalPart
  - room
  - simpleSecurityObject
- COSINE - Cooperation for Open Systems Interconnection Networking in Europe
  - [rfc4524](https://www.rfc-editor.org/rfc/rfc4524)
