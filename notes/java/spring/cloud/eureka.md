# FAQ

## EMERGENCY! EUREKA MAY BE INCORRECTLY CLAIMING INSTANCES ARE UP WHEN THEY'RE NOT. RENEWALS ARE LESSER THAN THRESHOLD AND HENCE THE INSTANCES ARE NOT BEING EXPIRED JUST TO BE SAFE.

```ini
eureka.renewalPercentThreshold=0.85
# or
eureka.server.enableSelfPreservation=false
```

- https://www.baeldung.com/eureka-self-preservation-renewal
