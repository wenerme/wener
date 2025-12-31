---
title: Ansible Vault
tags:
  - DevOps
  - Ansible
  - Vault
---

# Ansible Vault

- [building5/ansible-vault-tools](https://github.com/building5/ansible-vault-tools)
- [dellis23/ansible-toolkit](https://github.com/dellis23/ansible-toolkit)
- [Can i commit secrets to public repo](https://www.reddit.com/r/ansible/comments/5etuxl/can_i_commit_secrets_to_public_repo_using/)
- [Managing clusters in the cloud with Ansible Vault](https://medium.com/@b23llc/a-pattern-for-managing-clusters-in-the-cloud-with-ansible-vault-aa678ef3f8ca#.e48fsiv9k)
- [Vault User Guide](https://docs.ansible.com/ansible/latest/user_guide/vault.html)
- [Check on commit vault files are encrypted](https://selivan.github.io/2017/04/08/ansible-check-on-commit-vault-files-are-encrypted.html)
- [terraform-provider-ansiblevault](https://github.com/MeilleursAgents/terraform-provider-ansiblevault)

```bash
date | md5 > keys/vault-key.txt && chmod 600 keys/vault-key.txt
```

- [Default Vault Password File](https://docs.ansible.com/ansible/latest/reference_appendices/config.html#default-vault-password-file)

```bash
# 加速
pip install cryptography
```
