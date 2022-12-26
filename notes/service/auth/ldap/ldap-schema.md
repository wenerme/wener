---
title: LDAP Schema
---

# LDAP Schema

| schema    | for                                                                |
| --------- | ------------------------------------------------------------------ |
| [rfc1274] | COSINE, X.500                                                      |
| [rfc2256] | X.500 User Schema for use with LDAPv3                              |
| rfc2798   | inetOrgPerson                                                      |
| rfc3712   | ~~Printer Services~~                                               |
| rfc4403   | UDDIv3                                                             |
| rfc4519   | User Applications                                                  |
| rfc4523   | X.509                                                              |
| rfc4524   | COSINE/X.500                                                       |
| rfc4530   | entryUUID                                                          |
| rfc5020   | entryDN                                                            |
| rfc5803   | SCRAM - Storing Salted Challenge Response Authentication Mechanism |
| rfc7612   | Printer Services                                                   |
| rfc8284   | XMPP in White Pages                                                |

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

- Schema 分类
  - 对象类
  - 属性类型
  - 语法
  - 匹配规则
- 用户 - 常用 inetOrgPerson, organizationalPerson
  - inetOrgPerson
    - SUP organizationalPerson
    - MUST: cn, objectClass, sn
  - organizationalPerson
  - account
    - MUST: uid
    - MAY: description, seeAlso, l, o, ou, host
  - person
    - MUST: sn, cn
    - MAY: userPassword, telephoneNumber, seeAlso, description
- UserID
  - uid
  - sAMAccountName - Active directory
  - cn - AD RDN
- UUID
  - entryUUID
  - objectGUID - Active directory
  - entryDN/uid - 如果不支持 UUID
- 分组
  - groupOfUniqueNames
  - member
- ServiceAccount
  - account,simpleSecurityObject,top
  - applicationProcess
- top - RFC 2256
- simpleSecurityObject - RFC 1274
  - MUST: userPassword
- schema
  - NAME
  - DESC
  - SUP
  - ABSTRACT
  - MUST
  - MAY
  - X-ORIGIN
  - AUXILIARY
  - STRUCTURAL
- `::` base64
- value 不能包含前后空白

```ldif
# 陈小明
dn: uid=chenxiaoming,ou=users,dc=wener,dc=me
objectClass: inetOrgPerson
objectClass: organizationalPerson
objectClass: person
objectClass: top
cn: 陈小明
sn: 陈
uid: chenxiaoming
```

---

- [Combined Active Directory Schema Classes and Attributes for Windows Server](https://www.microsoft.com/en-us/download/details.aspx?id=23782)
  - ldf 格式
  - 用于参考，包含可多 AD DS 操作属性
- [Active Directory to OpenLdap](https://github.com/dkoudela/active-directory-to-openldap)
  - 将 Active Directory 转为 OpenLdap
- https://www.openldap.org/doc/admin26/schema.html
- https://docs.oracle.com/cd/E19693-01/819-0986/6n3chgmj5/index.html
- https://docs.microsoft.com/en-us/windows/win32/adschema/active-directory-schema
- https://docs.oracle.com/javase/jndi/tutorial/ldap/schema/
- https://www.ibm.com/docs/en/sdse
- https://ldapwiki.com/wiki/LDAPSyntaxes

## Internal

| attr                  | example                                  |
| --------------------- | ---------------------------------------- |
| createTimestamp       | 20220823142347Z                          |
| creatorsName          | cn=admin,dc=wener,dc=me                  |
| entryCSN              | 20220823142347.481919Z#000000#000#000000 |
| entryDN               | cn=user,ou=groups,dc=wener,dc=me         |
| entryUUID             | 55ef9487-c39f-4697-8314-68d1752bfe02     |
| hasSubordinates       | FALSE                                    |
| modifiersName         | cn=admin,dc=wener,dc=me                  |
| modifyTimestamp       | 20220823142347Z                          |
| structuralObjectClass | posixGroup                               |
| subschemaSubentry     | cn=Subschema                             |

## Linux

- posixAccount
  - inetOrgPerson
  - organizationalPerson
  - person
- posixGroup
- sambaAccount
- 参考
  - https://docs.microsoft.com/en-us/windows/win32/adschema/c-posixaccount
  - https://tldp.org/HOWTO/archived/LDAP-Implementation-HOWTO/schemas.html
  - https://ldapwiki.com/wiki/PosixAccount

| group attr | -   |
| ---------- | --- |
| gidNumber  |
| cn         |

| user attr         | -   |
| ----------------- | --- |
| uidNumber         |
| gidNumber         |
| cn                |
| uid               |
| gecos             |
| homeDirectory     |
| loginShell        |
| unixHomeDirectory |
| unixUserPassword  |

| attr             | -   |
| ---------------- | --- |
| shadowWarning    |
| shadowInactive   |
| shadowMin        |
| shadowMax        |
| shadowExpire     |
| shadowLastChange |

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

## RFC1274 The COSINE and Internet X.500 Schema

- https://www.rfc-editor.org/rfc/rfc1274

## RFC2256 X.500 User Schema for use with LDAPv3

| Attribute Types             | stand for                   | e.g. |
| --------------------------- | --------------------------- | ---- |
| objectClass                 |
| aliasedObjectName           |
| knowledgeInformation        |
| cn                          |
| sn                          |
| serialNumber                |
| c                           |
| l                           |
| street                      |
| o                           |
| ou                          |
| title                       |
| description                 |
| searchGuide                 |
| businessCategory            |
| postalAddress               |
| postalCode                  |
| postOfficeBox               |
| physicalDeliveryOfficeName  |
| telephoneNumber             |
| telexNumber                 |
| teletexTerminalIdentifier   |
| facsimileTelephoneNumber    |
| x121Address                 |
| internationaliSDNNumber     |
| registeredAddress           |
| destinationIndicator        |
| preferredDeliveryMethod     |
| presentationAddress         |
| supportedApplicationContext |
| member                      |
| owner                       |
| roleOccupant                |
| seeAlso                     |
| userPassword                |
| userCertificate             |
| cACertificate               |
| authorityRevocationList     |
| certificateRevocationList   |
| crossCertificatePair        |
| name                        |
| givenName                   |
| initials                    |
| generationQualifier         |
| x500UniqueIdentifier        |
| dnQualifier                 |
| enhancedSearchGuide         |
| distinguishedName           |
| uniqueMember                |
| houseIdentifier             |
| supportedAlgorithms         |
| deltaRevocationList         |
| dmdName                     | directory management domain |

| Object Classes            | MUST                     |
| ------------------------- | ------------------------ |
| top                       |
| alias                     | aliasedObjectName        |
| country                   |
| locality                  |
| organization              |
| organizationalUnit        |
| person                    | sn, cn                   |
| organizationalPerson      |
| organizationalRole        | cn                       |
| groupOfNames              | member,cn                |
| residentialPerson         |
| applicationProcess        |
| applicationEntity         | presentationAddress , cn |
| dSA                       | cn                       |
| strongAuthenticationUser  |
| certificationAuthority    |
| groupOfUniqueNames        |
| userSecurityInformation   |
| certificationAuthority-V2 |
| cRLDistributionPoint      |
| dmd                       |

- octetStringMatch

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

## RFC4524 COSINE LDAP/X.500 Schema

## RFC4519 User Applications

- organization
  - MUST o
- organizationalPerson
  - SUP person
- organizationalRole - 代表工作和职位
  - MUST cn
- organizationalUnit - 代表部门
  - MUST ou
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

| Object Classes       | MUST |
| -------------------- | ---- |
| applicationProcess   |
| country              |
| dcObject             |
| device               |
| groupOfNames         |
| groupOfUniqueNames   |
| locality             |
| organization         |
| organizationalPerson |
| organizationalRole   |
| organizationalUnit   |
| person               |
| residentialPerson    |
| uidObject            |

- [RFC4519](https://www.rfc-editor.org/rfc/rfc4519)

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
