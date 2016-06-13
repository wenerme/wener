# stream2es

```
Usage: stream2es [CMD] [OPTS]

Available commands: wiki, twitter, stdin, es

Common opts:
   --authinfo   Stored stream credentials (default: "/Users/wener/.authinfo.stream2es")
--clobber       Use elasticsearch 'index' operation, clobbering existing documents, no-clobber uses 'create' which will skip/error existing documents (default: false)
-h --help       Display help (default: false)
--http-insecure Don't verify peer cert (default: false)
   --http-keystore /path/to/keystore (default: null)
   --http-keystore-pass Keystore password (default: null)
   --http-trust-store /path/to/keystore (default: null)
   --http-trust-store-pass Truststore password (default: null)
--indexing      Whether to actually send data to ES (default: true)
   --log        Log level (trace debug info warn error fatal report) (default: "info")
   --mappings   Index mappings (default: null)
-d --max-docs   Number of docs to index (default: -1)
--offset        Add __s2e_offset__ field TO EACH DOCUMENT with the sequence offset of the stream (default: false)
-q --queue-size Size of the internal bulk queue (default: 40)
--replace       Delete index before streaming (default: false)
   --settings   Index settings (default: null)
-s --skip       Skip this many docs before indexing (default: 0)
   --stream-buffer Buffer up to this many pages (default: 50)
   --stream-timeout Wait seconds for data on the stream (default: -1)
   --target     ES location (default: "http://localhost:9200")
   --tee        Save json request payloads as files in path (default: null)
   --tee-bulk   Save bulk request payloads as files in path (default: null)
--tee-errors    Create error-{id} files (default: true)
-v --version    Print version (default: false)
-w --workers    Number of indexing threads (default: 2)

ElasticsearchStream opts:
-b --bulk-bytes Bulk size in bytes (default: 1048576)
   --query      Query to _scan from source (default: "{"query":{"match_all":{}}}")
-q --queue-size Size of the internal bulk queue (default: 1000)
   --scroll-size Source scroll size (default: 500)
   --scroll-time Source scroll context TTL (default: "60s")
   --source     Source ES url (default: null)
--source-http-insecure Don't verify peer cert (default: false)
   --source-http-keystore /path/to/keystore (default: null)
   --source-http-keystore-pass Keystore password (default: null)
   --source-http-trust-store /path/to/keystore (default: null)
   --source-http-trust-store-pass Truststore password (default: null)
   --target     Target ES url (default: null)

GeneratorStream opts:
-b --bulk-bytes Bulk size in bytes (default: 102400)
   --dictionary Dictionary location (default: "/usr/share/dict/words")
   --fields     Field template (str, string, dbl, double, int, integer) (default: "f1:str:1")
-q --queue-size Size of the internal bulk queue (default: 40)
   --stream-buffer Buffer up to this many docs (default: 100000)
   --target     ES index (default: "http://localhost:9200/foo/t")

StdinStream opts:
-b --bulk-bytes Bulk size in bytes (default: 102400)
-q --queue-size Size of the internal bulk queue (default: 40)
   --stream-buffer Buffer up to this many docs (default: 100)
   --target     Target ES http://host:port/index/type (default: "http://localhost:9200/foo/t")

TwitterStream opts:
--authorize     Create oauth credentials (default: false)
-b --bulk-bytes Bulk size in bytes (default: 102400)
   --key        Twitter app consumer key, only for --authorize (default: null)
-q --queue-size Size of the internal bulk queue (default: 1000)
   --secret     Twitter app consumer secret, only for --authorize (default: null)
   --stream-buffer Buffer up to this many tweets (default: 1000)
   --target     Target ES http://host:port/index/type (default: "http://localhost:9200/twitter/status")
   --track      %%-separated list of strings to filter the stream (default: null)

WikiStream opts:
-b --bulk-bytes Bulk size in bytes (default: 3145728)
-q --queue-size Size of the internal bulk queue (default: 40)
   --source     Wiki dump location (default: "https://dumps.wikimedia.org/enwiki/latest/enwiki-latest-pages-articles.xml.bz2")
   --stream-buffer Buffer up to this many pages (default: 50)
   --target     Target ES http://host:port/index (we handle types here) (default: "http://localhost:9200/wiki")
```
