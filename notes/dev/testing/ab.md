---
title: ab
---

# ab

```bash
apk add apache2-utils

ab -S -q -n 100000 -c 3000 https://example.com:443/
```

```
-n requests     Number of requests to perform
-c concurrency  Number of multiple requests to make at a time
-t timelimit    Seconds to max. to spend on benchmarking
                This implies -n 50000
-s timeout      Seconds to max. wait for each response
                Default is 30 seconds
-b windowsize   Size of TCP send/receive buffer, in bytes
-B address      Address to bind to when making outgoing connections
-p postfile     File containing data to POST. Remember also to set -T
-u putfile      File containing data to PUT. Remember also to set -T
-T content-type Content-type header to use for POST/PUT data, eg.
                'application/x-www-form-urlencoded'
                Default is 'text/plain'
-v verbosity    How much troubleshooting info to print
-w              Print out results in HTML tables
-i              Use HEAD instead of GET
-x attributes   String to insert as table attributes
-y attributes   String to insert as tr attributes
-z attributes   String to insert as td or th attributes
-C attribute    Add cookie, eg. 'Apache=1234'. (repeatable)
-H attribute    Add Arbitrary header line, eg. 'Accept-Encoding: gzip'
                Inserted after all normal header lines. (repeatable)
-A attribute    Add Basic WWW Authentication, the attributes
                are a colon separated username and password.
-P attribute    Add Basic Proxy Authentication, the attributes
                are a colon separated username and password.
-X proxy:port   Proxyserver and port number to use
-V              Print version number and exit
-k              Use HTTP KeepAlive feature
-d              Do not show percentiles served table.
-S              Do not show confidence estimators and warnings.
-q              Do not show progress when doing more than 150 requests
-l              Accept variable document length (use this for dynamic pages)
-g filename     Output collected data to gnuplot format file.
-e filename     Output CSV file with percentages served
-r              Don't exit on socket receive errors.
-m method       Method name
-h              Display usage information (this message)
-I              Disable TLS Server Name Indication (SNI) extension
-Z ciphersuite  Specify SSL/TLS cipher suite (See openssl ciphers)
-f protocol     Specify SSL/TLS protocol
                (SSL2, TLS1, TLS1.1, TLS1.2, TLS1.3 or ALL)
-E certfile     Specify optional client certificate chain and private key
```
