# VPN

* Ubuntu wiki [VPN](https://wiki.ubuntu.com/VPN)
* [IPSEC VPN on Ubuntu 16.04 with StrongSwan](https://raymii.org/s/tutorials/IPSEC_vpn_with_Ubuntu_16.04.html)


## StrongSwan
* https://www.strongswan.org/
* [IKEv2Examples](https://wiki.strongswan.org/projects/strongswan/wiki/IKEv2Examples)

linux上用strongswan搭建ikev2协议vpn.md
https://gist.github.com/losisli/11081793


sudo cp caCert.pem /etc/ipsec.d/cacerts/
sudo cp serverCert.pem /etc/ipsec.d/certs/
sudo cp serverKey.pem /etc/ipsec.d/private/



ipsec pki --pub --in serverKey.pem | ipsec pki --issue --cacert caCert.pem --cakey caKey.pem --dn "C=CN, O=strongSwan, CN=192.168.34.42" --san="192.168.34.42" --flag serverAuth --flag ikeIntermediate --outform pem > serverCert.pem



config setup
    strictcrlpolicy=no
    uniqueids=no #允许多设备同时在线
conn windowsphone
    keyexchange=ikev2
    ike=aes256-sha1-modp1024!
    esp=aes256-sha1!
    dpdaction=clear
    dpddelay=300s
    rekey=no
    left=%defaultroute
    leftsubnet=0.0.0.0/0
    leftauth=pubkey
    leftcert=serverCert.pem
    leftid="C=CN, O=strongSwan, CN=192.168.34.42" #C=国家，CN=自己vps的公网ip
    right=%any
    rightsourceip=10.11.1.0/24 #为客户端分配的虚拟地址池
    rightauth=eap-mschapv2
    rightsendcert=never
    eap_identity=%any
    auto=add

sudo iptables -A INPUT -p udp --dport 500 -j ACCEPT
sudo iptables -A INPUT -p udp --dport 4500 -j ACCEPT
echo 1 > /proc/sys/net/ipv4/ip_forward
echo 1 | sudo tee /proc/sys/net/ipv4/ip_forward
sudo iptables -t nat -A POSTROUTING -s 10.11.1.0/24 -o eth0 -j MASQUERADE  #地址与上面地址池对应
sudo iptables -A FORWARD -s 10.11.1.0/24 -j ACCEPT     #同上
 #为避免VPS重启后NAT功能失效，可以把如上5行命令添加到 /etc/rc.local 文件中，添加在exit那一行之前即可。
