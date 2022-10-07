---
sidebar_title: Internal
---

# Git Internal

| str    | object type   | number |
| ------ | ------------- | ------ |
| commit | OBJ_COMMIT    | 1      |
| tree   | OBJ_TREE      | 2      |
| blob   | OBJ_BLOB      | 3      |
| tag    | OBJ_TAG       | 4      |
|        | OBJ_OFS_DELTA | 6      |
|        | OBJ_REF_DELTA | 7      |

- [Git Internals](https://git-scm.com/book/en/v2/Git-Internals-Plumbing-and-Porcelain)
  - [Git Objects](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects)

```bash
echo -n hello | git hash-object --stdin
# blob <size>\0
printf 'blob 5\0hello' | sha1sum
CONTENTS=hello sh -c 'printf "blob ${#CONTENTS}\0$CONTENTS"' | sha1sum

echo -n hello > /tmp/hello
file=/tmp/hello
(
  stat --printf="blob %s\0" "$file"
  cat "$file"
) | sha1sum
```

- .git
  - HEAD
  - config
  - description
  - hooks/
  - info/
  - objects/
    - info/
    - pack/ - [Git pack format](https://git-scm.com/docs/gitformat-pack)
      - pack-.{pack,idx}
      - pack-.rev
      - `pack-*.mtimes`
      - multi-pack-index
  - refs/

```bash
#
git init /tmp/git
cd /tmp/git
echo -n hello | git hash-object -w --stdin
find .git/objects -type f
file .git/objects/b6/fc4c620b67d95f953a5c1c1230aaab5db5a1b0 # zlib compressed data
git cat-file -p b6fc4c620b67d95f953a5c1c1230aaab5db5a1b0
git cat-file -t b6fc4c620b67d95f953a5c1c1230aaab5db5a1b0 # blob

echo -n hello > hello.txt
git add hello.txt
git commit -m 'hello.txt'

git cat-file -p master^{tree} # hello.txt
find .git/objects -type f
git cat-file -t 04df07b08ca746b3167d0f1d1514e2f39a52c16c # tree
git cat-file -p 04df07b08ca746b3167d0f1d1514e2f39a52c16c
# 100644 blob b6fc4c620b67d95f953a5c1c1230aaab5db5a1b0    hello.txt
git cat-file -t d7ca319a50ed5fb97583cc0ef251d19b503caa6d # commit
git cat-file -p d7ca319a50ed5fb97583cc0ef251d19b503caa6d
# author wener <email> 1665103472 +0800
# committer wener <email> 1665103472 +0800
# gpgsig
#
# hello.txt

git write-tree
git update-index --cacheinfo 100644 $(git hash-object hello.txt) hello.txt

echo new > new.txt
git update-index --add new.txt
git write-tree

git cat-file -p $(git write-tree)

git read-tree --prefix=bak $(git write-tree)

echo 'commit' | git commit-tree $(git write-tree)
git cat-file -p dc1eb3

echo 'Second commit' | git commit-tree $(git write-tree) -p dc1eb3
git cat-file -p 8989b5
git log --stat 8989b5
```

## sha256

```conf
[core]
	repositoryFormatVersion = 1
[extensions]
	objectFormat = sha256
	compatObjectFormat = sha1
```

- https://git-scm.com/docs/hash-function-transition/
