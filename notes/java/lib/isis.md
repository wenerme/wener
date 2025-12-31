---
title: Apache ISIS
---

# ISIS

- http://isis.apache.org
- [apache/isis](https://github.com/apache/isis)
  - Apache-2.0, Java, Domain-Driven Design
  - A framework for rapidly developing domain-driven apps in Java.

```bash
mvn archetype:generate \
  -D archetypeGroupId=org.apache.isis.archetype \
  -D archetypeArtifactId=helloworld-archetype \
  -D archetypeVersion=1.16.2 \
  -D groupId=com.mycompany \
  -D artifactId=myapp \
  -D version=1.0-SNAPSHOT \
  -B

mvn archetype:generate \
  -D archetypeGroupId=org.apache.isis.archetype \
  -D archetypeArtifactId=simpleapp-archetype \
  -D archetypeVersion=1.16.2 \
  -D groupId=com.mycompany \
  -D artifactId=mysimpleapp \
  -D version=1.0-SNAPSHOT \
  -B
```

http://mvnrepository.com/artifact/org.apache.isis.archetype

simpleapp-archetype
helloworld-archetype

http://mvnrepository.com/artifact/org.incode.platform.archetype
http://mvnrepository.com/artifact/org.incode.module

https://github.com/estatio/estatio
Estatio Open Source Estate Management built on Apache Isis
