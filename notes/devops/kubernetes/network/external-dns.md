# external-dns

- [kubernetes-sigs/external-dns](https://github.com/kubernetes-sigs/external-dns)

| service annotation                                 | demo                        |
| -------------------------------------------------- | --------------------------- |
| external-dns.alpha.kubernetes.io/hostname          | nginx.example.org.          |
| external-dns.alpha.kubernetes.io/ttl               | 10                          |
| external-dns.alpha.kubernetes.io/internal-hostname | nginx.internal.example.org. |

```yaml
apiVersion: externaldns.k8s.io/v1alpha1
kind: DNSEndpoint
metadata:
  name: ns-record
spec:
  endpoints:
    - dnsName: zone.example.com
      recordTTL: 300
      recordType: NS
      targets:
        - ns1.example.com
        - ns2.example.com
      labels:
      providerSpecific:
        - name:
          value:
```

## Helm

- https://github.com/kubernetes-sigs/external-dns/tree/master/charts
