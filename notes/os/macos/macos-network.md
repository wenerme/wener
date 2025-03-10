---
title: macOS Network
tags:
  - Network
---

# macOS Network

```bash
sudo networksetup -listallnetworkservices        # 列出所有网络服务
sudo networksetup -listnetworkserviceorder       # 优先级
sudo networksetup -getdnsservers Wi-Fi           # 获取 DNS
sudo networksetup -setdnsservers Wi-Fi 127.0.0.1 # 设置 DNS

scutil --dns # 查看 DNS 配置

# flush dns cache
sudo killall -HUP mDNSResponder
sudo dscacheutil -flushcache

netstat -rn
# route [-dnqtv] command [[modifiers] args]
route -n get default # 获取默认路由

# ip ro get 1.1.1.1
route -n get 1.1.1.1
```

| command      | desc                                 |
| ------------ | ------------------------------------ |
| ifconfig     | 显示和配置网络接口                   |
| networksetup | 网络配置                             |
| netstat      | 显示路由表、网络连接、接口统计等信息 |
| route        | 路由表管理                           |
| pf           | 防火墙, Packet filter                |
| ~~ipfw~~     | IP Firewall                          |
| tcpdump      | 包分析工具                           |
| dtrace       | 跟踪工具                             |
| systat       | 实时统计工具                         |
| scutil       | System configuration                 |
| lsof         | List open files/ports                |

- ipfw -> pf
  - macOS 10.7+

## ifconfig

```
ifconfig [-L] [-m] [-r] INTERFACE [create] [ADDRESS_FAMILY] [ADDRESS [DEST_ADDRESS]] [PARAMETERS]
ifconfig INTERFACE destroy
ifconfig -a [-L] [-d] [-m] [-r] [-u] [-v] [ADDRESS_FAMILY]
ifconfig -l [-d] [-u] [ADDRESS_FAMILY]
ifconfig [-L] [-d] [-m] [-r] [-u] [-v] [-C]
ifconfig INTERFACE vlan VLAN-TAG vlandev IFACE
ifconfig INTERFACE -vlandev IFACE
ifconfig INTERFACE bonddev IFACE
ifconfig INTERFACE -bonddev IFACE
ifconfig INTERFACE bondmode lacp | static
ifconfig -X PATTERN [PARAMETERS]
```

- ADDRESS_FAMILY
  - inet, inet6, link
  - ether, lladdr -> link

# netstat

```bash
netstat -nr # 路由表
```

# route

路由表管理工具

- routed(8) - 系统路由表管理守护进程

```
route [-dnqtv] command [[modifiers] args]
```

| flag | for                     |
| ---- | ----------------------- |
| -d   | debug-only, dry-run     |
| -n   | number, 不 resolve name |
| -t   | test-only               |
| -v   | verbose                 |
| -q   | quiet                   |

```
     add         Add a route.
     flush       Remove all routes.
     delete      Delete a specific route.
     change      Change aspects of a route (such as its gateway).
     get         Lookup and display the route for a destination.
     monitor     Continuously report any changes to the routing information
                 base, routing lookup misses, or suspected network partition-
                 ings.

     The monitor command has the syntax:

           route [-n] monitor

     The flush command has the syntax:

           route [-n] flush [family]

     If the flush command is specified, route will ``flush'' the routing
     tables of all gateway entries.  When the address family may is specified
     by any of the -osi, -xns, -atalk, -inet6, or -inet modifiers, only routes
     having destinations with addresses in the delineated family will be
     deleted.

     The other commands have the following syntax:

           route [-n] command [-net | -host] [-ifscope boundif] destination
           gateway [netmask]

     where destination is the destination host or network, gateway is the
     next-hop intermediary via which packets should be routed.  Routes to a
     particular host may be distinguished from those to a network by inter-
     preting the Internet address specified as the destination argument.  The
     optional modifiers -net and -host force the destination to be interpreted
     as a network or a host, respectively.  Otherwise, if the destination has
     a ``local address part'' of INADDR_ANY (0.0.0.0), or if the destination
     is the symbolic name of a network, then the route is assumed to be to a
     network; otherwise, it is presumed to be a route to a host.  Optionally,
     the destination could also be specified in the net/bits format.

     For example, 128.32 is interpreted as -host 128.0.0.32; 128.32.130 is
     interpreted as -host 128.32.0.130; -net 128.32 is interpreted as
     128.32.0.0; -net 128.32.130 is interpreted as 128.32.130.0; and
     192.168.64/20 is interpreted as -net 192.168.64 -netmask 255.255.240.0.

     A destination of default is a synonym for -net 0.0.0.0, which is the
     default route.

     If the destination is directly reachable via an interface requiring no
     intermediary system to act as a gateway, the -interface modifier should
     be specified; the gateway given is the address of this host on the common
     network, indicating the interface to be used for transmission.  Alter-
     nately, if the interface is point to point the name of the interface
     itself may be given, in which case the route remains valid even if the
     local or remote addresses change.

     For AF_INET and AF_INET6, the -ifscope modifier specifies the additional
     property of the route related to the interface scope derived from inter-
     face boundif.  Such property allows for the presence of multiple route
     entries with the same destination, where each route is associated with a
     unique interface.  This modifier is required in order to manipulate route
     entries marked with the RTF_IFSCOPE flag.

     The optional modifier -link specify that all subsequent addresses are
     specified as link-level addresses, and the names must be numeric specifi-
     cations rather than symbolic names.

     The optional -netmask modifier is intended to achieve the effect of an
     OSI ESIS redirect with the netmask option, or to manually add subnet
     routes with netmasks different from that of the implied network interface
     (as would otherwise be communicated using the OSPF or ISIS routing proto-
     cols).  One specifies an additional ensuing address parameter (to be
     interpreted as a network mask).  The implicit network mask generated in
     the AF_INET case can be overridden by making sure this option follows the
     destination parameter.

     For AF_INET6, the -prefixlen qualifier is available instead of the -mask
     qualifier because non-continuous masks are not allowed in IPv6.  For
     example, -prefixlen 32 specifies network mask of
     ffff:ffff:0000:0000:0000:0000:0000:0000 to be used.  The default value of
     prefixlen is 64 to get along with the aggregatable address.  But 0 is
     assumed if default is specified.  Note that the qualifier works only for
     AF_INET6 address family.

     Routes have associated flags which influence operation of the protocols
     when sending to destinations matched by the routes.  These flags may be
     set (or sometimes cleared) by indicating the following corresponding mod-
     ifiers:

     -cloning   RTF_CLONING    - generates a new route on use
     -xresolve  RTF_XRESOLVE   - emit mesg on use (for external lookup)
     -iface    ~RTF_GATEWAY    - destination is directly reachable
     -static    RTF_STATIC     - manually added route
     -nostatic ~RTF_STATIC     - pretend route added by kernel or daemon
     -reject    RTF_REJECT     - emit an ICMP unreachable when matched
     -blackhole RTF_BLACKHOLE  - silently discard pkts (during updates)
     -proto1    RTF_PROTO1     - set protocol specific routing flag #1
     -proto2    RTF_PROTO2     - set protocol specific routing flag #2
     -llinfo    RTF_LLINFO     - validly translates proto addr to link addr

     The optional modifiers -rtt, -rttvar, -sendpipe, -recvpipe, -mtu,
     -hopcount, -expire, and -ssthresh provide initial values to quantities
     maintained in the routing entry by transport level protocols, such as TCP
     or TP4.  These may be individually locked by preceding each such modifier
     to be locked by the -lock meta-modifier, or one can specify that all
     ensuing metrics may be locked by the -lockrest meta-modifier.

     In a change or add command where the destination and gateway are not suf-
     ficient to specify the route (as in the ISO case where several interfaces
     may have the same address), the -ifp or -ifa modifiers may be used to
     determine the interface or interface address.

     The optional -proxy modifier specifies that the RTF_LLINFO routing table
     entry is the ``published (proxy-only)'' ARP entry, as reported by arp(8).

     All symbolic names specified for a destination or gateway are looked up
     first as a host name using gethostbyname(3).  If this lookup fails,
     getnetbyname(3) is then used to interpret the name as that of a network.

     Route uses a routing socket and the new message types RTM_ADD,
     RTM_DELETE, RTM_GET, and RTM_CHANGE.  As such, only the super-user may
     modify the routing tables.

DIAGNOSTICS
     add [host | network ] %s: gateway %s flags %x  The specified route is
     being added to the tables.  The values printed are from the routing table
     entry supplied in the ioctl(2) call.  If the gateway address used was not
     the primary address of the gateway (the first one returned by
     gethostbyname(3)), the gateway address is printed numerically as well as
     symbolically.

     delete [ host | network ] %s: gateway %s flags %x  As above, but when
     deleting an entry.

     %s %s done  When the flush command is specified, each routing table entry
     deleted is indicated with a message of this form.

     Network is unreachable  An attempt to add a route failed because the
     gateway listed was not on a directly-connected network.  The next-hop
     gateway must be given.

     not in table  A delete operation was attempted for an entry which wasn't
     present in the tables.

     routing table overflow  An add operation was attempted, but the system
     was low on resources and was unable to allocate memory to create the new
     entry.

     gateway uses the same route  A change operation resulted in a route whose
     gateway uses the same route as the one being changed.  The next-hop gate-
     way should be reachable through a different route.

     The route utility exits 0 on success, and >0 if an error occurs.

SEE ALSO
     netintro(4), route(4), arp(8), routed(8)

HISTORY
     The route command appeared in 4.2BSD.

BUGS
     The first paragraph may have slightly exaggerated routed(8)'s abilities.

4.4BSD                           June 8, 2001                           4.4BSD
```
