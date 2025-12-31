---
title: Active Directory
tags:
  - Service
  - Auth
  - ActiveDirectory
  - LDAP
---

# Active Directory

- [Active Directory integration](https://wiki.archlinux.org/index.php/Active_Directory_integration)
- [ADAM (Active Directory Application Mode)](https://ldapwiki.com/wiki/ADAM) - Active Directory Lightweight Directory Service or AD LDS, formerly known as Active Directory Application Mode (ADAM), is a light-weight implementation of Microsoft Active Directory.
- [Active Directory Schema (AD Schema)](https://docs.microsoft.com/en-us/windows/win32/adschema/active-directory-schema)

## AD DS vs AD LDS

- [AD DS vs AD LDS – Domain Services vs. Lightweight Directory Services](https://activedirectoryfaq.com/2019/11/ad-ds-vs-ad-lds-domain-services-vs-lightweight-directory-services/)

Prior to Windows Server 2008, AD LDS was still called ADAM (Active Directory Application Mode) and was only considered as an extension and not as a server role.

As with AD DS, AD LDS instances are also based on Lightweight Directory Access Protocol (LDAP) and provide hierarchical database services. As with AD DS, AD LDS understands locations and replication.

- [dkoudela/active-directory-to-openldap](https://github.com/dkoudela/active-directory-to-openldap/tree/master/schema)
- [PwdLastSet](https://ldapwiki.com/wiki/PwdLastSet)

## MSAD User Account Mapper

This mapper is specific to Microsoft Active Directory (MSAD). It's able to tightly integrate the MSAD user account state into the Keycloak account state (account enabled, password is expired, and so on). It is using the `userAccountControl` and `pwdLastSet` LDAP attributes, which are both specific to MSAD and are not LDAP standard.

For example, if `pwdLastSet` is 0, the Keycloak user is required to update their password and there will be an `UPDATE_PASSWORD` required action added to the user. If `userAccountControl` is 514 (disabled account), the Keycloak user is disabled as well.
