---
title: Kerberos & LDAP
tags:
  - Service
  - Auth
  - Kerberos
  - LDAP
---

# Kerberos & LDAP (X.500)

## Kerberos

- [Kerberos - ArchWiki](https://wiki.archlinux.org/index.php/Kerberos)
- [Getting Started with Kerberos](https://web.mit.edu/kerberos/kfw-4.1/kfw-4.1/kfw-4.1-help/html/getting_started.htm)
- [Managing Kerberos Tickets](https://directory.apache.org/apacheds/kerberos-ug/1.1.8-tickets.html)
- [Curl Kerberos Info](https://stackoverflow.com/a/38664954/1870054)

### Packages

- **Server**: [krb5-server](https://pkgs.alpinelinux.org/contents?file=&path=&name=krb5-server&branch=edge&repo=main&arch=x86_64)
- **Client**: [krb5](https://pkgs.alpinelinux.org/contents?branch=edge&name=krb5&arch=x86_64&repo=main)

### Configuration

`krb5.conf`:

```ini
[libdefaults]
default_realm = EXAMPLE.COM

[realms]
EXAMPLE.COM = {
  admin_server = kerberos.example.com
  # Support DNS SRV
  kdc = kerberos.example.com
  # Not compatible with krb4 but more secure
  default_principal_flags = +preauth
}
```

```bash
# Initialize principal
kinit wener

# Initialize with keytab
kinit -V -k -t /etc/krb5.keytab HTTP/vmproxy.mydomain.com@MYDOMAIN.COM
```

- [Using DNS for Kerberos](http://web.mit.edu/kerberos/krb5-1.6/krb5-1.6.1/doc/krb5-admin.html#Using%20DNS)
- `KRB5_CONFIG`, `keytab`
- `ktpass -princ host/hostA.subdomain.com@SUBDOMAIN.COM -mapuser host-hostA -pass xxxxxx -crypto RC4-HMAC -out krb5.keytab`

### Concepts

The Kerberos server of Apache Directory implements RFC 1510 and RFC 4120, the Kerberos V5 Network Authentication Service. The purpose of Kerberos is to verify the identities of principals (users or services) on an unprotected network.

While generally thought of as a single-sign-on technology, Kerberos's true strength is in authenticating users without ever sending their passwords over the network. Kerberos is designed for use in open (untrusted) networks and, therefore, operates under the assumption that packets traveling along the network can be read, modified, and inserted at will.

Kerberos is named after the three-headed dog that guards the gates to Hades. The three heads are the client, the Kerberos server, and the network service being accessed.

**Principals**:

- Users (e.g., `john@APACHE.ORG`)
- Services (e.g., `ldap/www.apache.org@APACHE.ORG`)
- Hosts (e.g., `host/www.apache.org/apache.org@APACHE.ORG`)

### macOS Issues

- [macOS krb5 Client Preferences](http://web.mit.edu/macdev/KfM/Common/Documentation/preferences-osx.html)
- [Unable to reach any KDC in realm](https://apple.stackexchange.com/questions/63122/kinit-krb5-get-init-creds-unable-to-reach-any-kdc-in-realm-local)

On macOS, the default client does not fall back to TCP. In your `krb.conf`, prefix your `kdc` value with `tcp/` to force TCP:

```ini
kdc = tcp/realm.example.com:88
```

## LDAP

- [Basic LDAP Concepts](https://www.ldap.com/basic-ldap-concepts)
- [Ten Minute LDAP Tutorial](http://archive.oreilly.com/pub/a/perl/excerpts/system-admin-with-perl/ten-minute-ldap-utorial.html)
- [Active Directory LDAP Attributes](https://www.manageengine.com/products/ad-manager/help/csv-import-management/active-directory-ldap-attributes.html)
- [User Attributes Table](http://www.kouti.com/tables/userattributes.htm)
- [LDAP Data Interchange Format (LDIF)](https://en.wikipedia.org/wiki/LDAP_Data_Interchange_Format)
- [RFC 2253 - UTF-8 String Representation of Distinguished Names](https://www.ietf.org/rfc/rfc2253.txt)

### LDAP Attribute Types

| String | X.500 AttributeType    |
| ------ | ---------------------- |
| CN     | commonName             |
| L      | localityName           |
| ST     | stateOrProvinceName    |
| O      | organizationName       |
| OU     | organizationalUnitName |
| C      | countryName            |
| STREET | streetAddress          |
| DC     | domainComponent        |
| UID    | userid                 |

```bash
ldapmodify -h localhost -p 10389 -D "uid=admin,ou=system" -w secret -a -f marmoser-partition.ldif
```

### KDC Tracing

```bash
KRB5_TRACE=/dev/stdout kpasswd
```

## Troubleshooting

### Pre-authentication required

```
[21:39:17] ERROR [org.apache.directory.server.KERBEROS_LOG] - No timestamp found
[21:39:17] WARN [org.apache.directory.server.kerberos.protocol.KerberosProtocolHandler] - Additional pre-authentication required (25)
```

[DIRKRB-99](https://issues.apache.org/jira/browse/DIRKRB-99)

### AES256 Support

AES256 is not included by default in standard J2SE installation. You have to install JCE.

### weak encryption

If ApacheDS uses weak encryption:

1. Enable `allow_weak_crypto = true` in `libdefaults`.
2. Or modify `ads-krbEncryptionTypes` in ApacheDS configuration.

### Server not found

```
Server not found in Kerberos database while getting initial credentials
```

Check if the principal exists.

### Example LDIF

```ldif
dn: uid=keycloak,ou=services,dc=security,dc=example,dc=com
objectClass: top
objectClass: organizationalUnit
objectClass: krb5KDCEntry
objectClass: uidObject
objectClass: krb5Principal
krb5KeyVersionNumber: 0
krb5PrincipalName: HTTP/keycloak@EXAMPLE.COM
uid: kpasswd
userPassword:: randomkey
ou: Keycloak
```

## Advanced krb5.conf

```ini
[logging]
# default = FILE:/var/log/krb5libs.log
# kdc = FILE:/var/log/krb5kdc.log
# admin_server = FILE:/var/log/kadmind.log

[libdefaults]
 dns_lookup_realm = false
 ticket_lifetime = 24h
 renew_lifetime = 7d
 forwardable = true
 rdns = false
default_realm = EXAMPLE.COM
allow_weak_crypto = true

[realms]
EXAMPLE.COM = {
  kdc = 192.168.36.8:60088
  kpasswd_server = 192.168.36.8:60464
}

[domain_realm]
 .example.com = EXAMPLE.COM
 example.com = EXAMPLE.COM
```
