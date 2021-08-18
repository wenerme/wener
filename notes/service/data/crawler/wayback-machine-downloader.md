---
title: wayback-machine-downloader
---

## wayback-machine-downloader

```bash
# 国内需要开启代理
docker run --rm -it \
  -v $PWD/websites:/websites \
  -e http_proxy=http://192.168.1.1:8080 \
  -e https_proxy=http://192.168.1.1:8080 \
  hartator/wayback-machine-downloader http://example.com
```

```
--only "/\.(gif|jpg|jpeg)$/i"
--only "/[^/]+/album$/i"
-c 4
# 下载 list 为 JSON
--list
```

```
-d, --directory PATH             Directory to save the downloaded files into
                                 Default is ./websites/ plus the domain name
-s, --all-timestamps             Download all snapshots/timestamps for a given website
-f, --from TIMESTAMP             Only files on or after timestamp supplied (ie. 20060716231334)
-t, --to TIMESTAMP               Only files on or before timestamp supplied (ie. 20100916231334)
-e, --exact-url                  Download only the url provied and not the full site
-o, --only ONLY_FILTER           Restrict downloading to urls that match this filter
                                 (use // notation for the filter to be treated as a regex)
-x, --exclude EXCLUDE_FILTER     Skip downloading of urls that match this filter
                                 (use // notation for the filter to be treated as a regex)
-a, --all                        Expand downloading to error files (40x and 50x) and redirections (30x)
-c, --concurrency NUMBER         Number of multiple files to download at a time
                                 Default is one file at a time (ie. 20)
-p, --maximum-snapshot NUMBER    Maximum snapshot pages to consider (Default is 100)
                                 Count an average of 150,000 snapshots per page
-l, --list                       Only list file urls in a JSON format with the archived timestamps, won't download anything
```
