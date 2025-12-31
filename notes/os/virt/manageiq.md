---
title: ManageIQ
tags:
  - Virtualization
  - Management
  - CMP
  - Ruby
  - RoR
---

# ManageIQ {#manageiq}

- [ManageIQ](http://manageiq.org/)
  - Hybrid Cloud Management Platform.
  - Base of [Red Hat CloudForms](https://www.redhat.com/en/technologies/management/cloudforms).
  - Stack: Ruby on Rails, PostgreSQL.
  - Deployment: Appliance (CentOS based).
- [Providers database architecture](https://www.manageiq.org/docs/guides/architecture/providers_database_architecture)
- [Gemfile](https://github.com/ManageIQ/manageiq/blob/master/Gemfile)

## Components

- **Provider**: Connection to external systems (e.g., VMware vCenter, OpenStack, AWS, Kubernetes).
  - Infrastructure, Cloud, Network, Storage.
- **Region**: Top-level wrapper in a multi-region deployment.
- **Zone**: Grouping of appliances for scalability and network segmentation.
- **Appliance**: A ManageIQ server instance.
  - Roles: User Interface, Provider Inventory, Automate, SmartProxy, etc.

## Deployment & Setup

- Default Credentials: `admin:smartvm`

```bash
# Docker Deployment
# APP_ROOT /var/www/miq/vmdb/

# Run with persistence
docker run -d -e TZ=Asia/Shanghai \
  -p 8443:443 \
  -v $PWD/pgdata:/var/lib/pgsql/data \
  --name manageiq manageiq/manageiq
```

## Automate

- State Machine based automation.
- **Namespace**: Container for classes.
- **Class**: Template/Definition.
- **Instance**: Concrete object.
- **Method**: Ruby script.
- **Datastore**: Directory structure for automation code.

## Resources

- [ManageIQ Documentation](http://manageiq.org/documentation/)
- [ManageIQ GitHub](https://github.com/ManageIQ)
- [Redfish Specification](<https://en.wikipedia.org/wiki/Redfish_(specification)>)
- [Foreman](https://github.com/theforeman/foreman)

## Kubernetes (Development info)

```bash
kubectl create ns management-infra
kubectl create sa -n management-infra management-admin
kubectl create clusterrolebinding management-infra-cluster-viewer --clusterrole=cluster-viewer --user=system:serviceaccount:management-infra:management-admin
# Get Token
kubectl describe secret -n management-infra $(kubectl get secrets -n management-infra | grep management-admin | cut -f1 -d ' ') | grep -E '^token' | cut -f2 -d':' | tr -d '\t'
```
