# Patch

## Tips
* [7 Patch Command Examples to Apply Diff Patch Files in Linux](https://www.thegeekstuff.com/2014/12/patch-command-examples)

```bash
diff -u hello.c hello_new.c > hello.patch

# patch -p[num] < patchfile
# patch [options] originalfile patchfile 
```
