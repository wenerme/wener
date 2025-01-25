---
title: bitwarden
---

# bitwarden

- bitwarden
  - 密码管理器
- [bitwarden/clients](https://github.com/bitwarden/clients)
  - GPL-3.0, TypeScript
  - 只支持一个账号
  - web, browser extension, desktop, cli
  - cli - NodeJS
- [bitwarden/directory-connector](https://github.com/bitwarden/directory-connector)
  - bitwarden <-> AD, LDAP, Azure, G Suite, Okta
- [bitwarden/server](https://github.com/bitwarden/server)
  - AGPLv3.0, Bitwarden License v1.0, C#
- [bitwarden/mobile](https://github.com/bitwarden/mobile)
  - GPLv3, C#
  - Xamarin Android, Xamarin iOS, Xamarin Forms
- passkey

## cli

```bash
npm install -g @bitwarden/cli

# for Self-hosted
bw config server https://vault.bitwarden.com
bw login

bw status

# items, folders, collections, org-collections, org-members, organizations
bw list organizations --pretty

# local web API
# https://bitwarden.com/help/vault-management-api/
# --disable-origin-protection
bw serve --port 8087

bw list items | jq '.[] | select(.name=="my-secret")'

ITEM_ID=$(bw list items | jq '.[] | select(.name=="my-secret") | .id' | tr -d '"')
bw get item $ITEM_ID --pretty
bw get item $ITEM_ID | jq '.notes="TEST"' | bw encode | bw edit item $ITEM_ID
bw get item $ITEM_ID | jq --argfile content ./notes.txt '.notes = $content' | bw encode | bw edit item $ITEM_ID

```

| Environment Variable     | Description                 |
| ------------------------ | --------------------------- |
| BITWARDENCLI_APPDATA_DIR |                             |
| BITWARDENCLI_DEBUG       | debug                       |
| BW_CLIENTID              | client_id                   |
| BW_CLIENTSECRET          |                             |
| BW_SESSION               | for unlock                  |
| BW_PASSWORD              | --passwordenv               |
| NODE_EXTRA_CA_CERTS      | for self-signed certificate |

- object
  - item
  - username
  - password
  - uri
  - totp
  - exposed
  - attachment
  - folder
  - collection
  - organization
  - org-collection
  - template
  - fingerprint
- https://bitwarden.com/help/cli/
- https://github.com/bitwarden/clients/releases

```sh
# backupVaults.sh
echo "Logging into vault"
export CODE="$(bash /backups/_internal/decode.sh "$(< /backups/_internal/encoded-credentials.txt)")" # I use a custom openssl scripts to decode my encoded vault password
export BW_SESSION=$(bw unlock --passwordenv CODE --raw $1)
unset CODE

echo "Removing leftover exports"
rm bitwarden_org_export*.json
rm bitwarden_org_export*.enc

echo "Backing up org: Primary"
bw export --organizationid 93601111-af11-4fd4-8307-06dc2a11a9cf --format json
bash /backups/_internal/encryptFile.sh bitwarden_org_export*.json $MY_SECRET # custom openssl script to encode the unencrypted json with MY_SECRET
rm bitwarden_org_export*.json
mv bitwarden_org_export*.enc /backups/primary

# repeat for all orgs...

echo "Clearing session token"
unset BW_SESSION
echo "Done"
```
