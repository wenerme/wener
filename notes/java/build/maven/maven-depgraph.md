---
title: depgraph-maven-plugin
---

# depgraph-maven-plugin

- [ferstl/depgraph-maven-plugin](https://github.com/ferstl/depgraph-maven-plugin)

```bash
mvn dependency:tree

mvn com.github.ferstl:depgraph-maven-plugin:graph
mvn com.github.ferstl:depgraph-maven-plugin:graph -DshowVersions -DshowGroupIds -DshowDuplicates -DshowConflicts

# aggregate-by-groupid
mvn com.github.ferstl:depgraph-maven-plugin:aggregate -DshowVersions -DshowGroupIds -DshowDuplicates -DshowConflicts
```

| prop        | for                               |
| ----------- | --------------------------------- |
| graphFormat | dot,puml,gml,txt,json             |
| includes    |
| excludes    | `org.springframework:spring-web*` |
