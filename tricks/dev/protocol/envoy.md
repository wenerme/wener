# Envovy

## Tips
* [EnvovyProxy](https://www.envoyproxy.io/)
* [envoyproxy/envoy](https://github.com/envoyproxy/envoy)

## gRPC
* [gRPC Bridge](https://www.envoyproxy.io/envoy/install/sandboxes/grpc_bridge.html)



## envoy --help

```
USAGE:

   envoy  [--max-obj-name-len <uint64_t>] [--max-stats <uint64_t>] [--mode
          <string>] [--parent-shutdown-time-s <uint32_t>] [--drain-time-s
          <uint32_t>] [--file-flush-interval-msec <uint32_t>]
          [--service-zone <string>] [--service-node <string>]
          [--service-cluster <string>] [--hot-restart-version]
          [--restart-epoch <uint32_t>] [--log-path <string>] [-l <string>]
          [--local-address-ip-version <string>] [--admin-address-path
          <string>] [-c <string>] [--concurrency <uint32_t>] [--base-id
          <uint32_t>] [--] [--version] [-h]


Where:

   --max-obj-name-len <uint64_t>
     Maximum name length for a field in the config (applies to listener
     name, route config name and the cluster name)

   --max-stats <uint64_t>
     Maximum number of stats guages and counters that can be allocated in
     shared memory.

   --mode <string>
     One of 'serve' (default; validate configs and then serve traffic
     normally) or 'validate' (validate configs and exit).

   --parent-shutdown-time-s <uint32_t>
     Hot restart parent shutdown time in seconds

   --drain-time-s <uint32_t>
     Hot restart drain time in seconds

   --file-flush-interval-msec <uint32_t>
     Interval for log flushing in msec

   --service-zone <string>
     Zone name

   --service-node <string>
     Node name

   --service-cluster <string>
     Cluster name

   --hot-restart-version
     hot restart compatability version

   --restart-epoch <uint32_t>
     hot restart epoch #

   --log-path <string>
     Path to logfile

   -l <string>,  --log-level <string>
     Log levels:
     [trace][debug][info][warning][error][critical][off]

     Default is [warning]

     [trace] and [debug] are only available on debug builds

   --local-address-ip-version <string>
     The local IP address version (v4 or v6).

   --admin-address-path <string>
     Admin address path

   -c <string>,  --config-path <string>
     Path to configuration file

   --concurrency <uint32_t>
     # of worker threads to run

   --base-id <uint32_t>
     base ID so that multiple envoys can run on the same host if needed

   --,  --ignore_rest
     Ignores the rest of the labeled arguments following this flag.

   --version
     Displays version information and exits.

   -h,  --help
     Displays usage information and exits.

```
