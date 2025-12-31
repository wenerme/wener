---
title: LDAP Query Examples
tags:
  - Service
  - Auth
  - LDAP
---

# LDAP Query Examples

- [LDAP Query Examples](https://ldapwiki.com/wiki/LDAP%20Query%20Examples)
- [LDAP_MATCHING_RULE_IN_CHAIN](https://ldapwiki.com/wiki/LDAP_MATCHING_RULE_IN_CHAIN)

## Group Check

```ldap
(&
    (|
        (objectclass=groupOfNames)
    )
)
```

## Recursive Group Membership (Active Directory)

```ldap
# LDAP_MATCHING_RULE_IN_CHAIN
(memberof:1.2.840.113556.1.4.1941:=cn=Nextcloud Users Group,ou=Groups,...)
```
