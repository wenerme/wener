# IPFS

## Tips

* [ipfs](https://github.com/ipfs)
* [ipfs.pics](https://github.com/ipfspics/ipfspics-server)
  * Distributed image hosting
* [ipfstube](https://github.com/download13/ipfstube)

```bash
docker run -it --rm --name ipfs_host -v $PWD/export:/export -v $PWD/data:/data/ipfs -p 8080:8080 -p 4001:4001 -p 5001:5001 ipfs/go-ipfs:latest


hash=`echo "I <3 IPFS @$(date +'%Y-%m-%d %H:%M:%S')" | ipfs add -q`
curl "https://ipfs.io/ipfs/$hash"


```
