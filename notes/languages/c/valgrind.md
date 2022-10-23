---
title: valgrind
---

# valgrind

```bash
brew install valgrind

valgrind --leak-check=yes myprog arg1 arg2
valgrind --leak-check=full --show-leak-kinds=all --verbose --track-origins=yes myprog
```

- https://valgrind.org/docs/manual/manual-core-adv.html#manual-core-adv.clientreq

```c
int run_within_valgrind (void) {
  char *p = getenv ("LD_PRELOAD");
  if (p == NULL)
    return 0;
  return (strstr (p, "/valgrind/") != NULL || strstr (p, "/vgpreload") != NULL);
}
```

# FAQ

## Uninitialised value was created by a stack allocation

## Conditional jump or move depends on uninitialised value(s)

## Invalid read of size, Invalid write of size
