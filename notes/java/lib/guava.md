---
title: Guava
---

# Gauva

- [google/guava](https://github.com/google/guava)

# Performance

## TypeToken

- 对性能有一定影响, 谨慎使用

```
Benchmark                       Mode  Cnt     Score     Error  Units
BenchTypeToken.generic          avgt   10     4.001 ±   0.197  ns/op
BenchTypeToken.typeTokenString  avgt   10   973.403 ±  13.519  ns/op
BenchTypeToken.typeTokenTwo     avgt   10  3289.355 ± 134.182  ns/op
BenchTypeToken.typeTokenVoid    avgt   10  1019.551 ±  43.565  ns/op
```

```java
@State(Scope.Thread)
@OutputTimeUnit(TimeUnit.NANOSECONDS)
@Warmup(iterations = 4)
@Measurement(iterations = 10)
@BenchmarkMode(Mode.AverageTime)
public class BenchTypeToken {
  public static void main(String[] args) throws RunnerException {
    Options options =
        new OptionsBuilder()
            .include(BenchTypeToken.class.getSimpleName())
            .threads(1)
            .forks(1)
            .shouldFailOnError(true)
            .shouldDoGC(true)
            .jvmArgs("-server")
            .measurementTime(TimeValue.seconds(2))
            .build();
    new Runner(options).run();
  }

  @Benchmark
  public void typeTokenString(Blackhole bh) {
    bh.consume(new ATyped());
  }

  @Benchmark
  public void typeTokenVoid(Blackhole bh) {
    bh.consume(new ATyped());
  }

  @Benchmark
  public void typeTokenTwo(Blackhole bh) {
    bh.consume(new ATyped2());
  }

  @Benchmark
  public void generic(Blackhole bh) {
    bh.consume(new AGen());
  }

  static class ATyped extends TypedImpl<Void> {}

  static class ATypedS extends TypedImpl<String> {}

  static class ATyped2 extends TypedImpl2<Void, Void> {}

  static class AGen extends GenImpl<Void> {}

  @Getter
  @Setter
  static class TypedImpl<IN> {

    private final TypeToken<IN> in = new TypeToken<IN>(getClass()) {};
  }

  @Getter
  @Setter
  static class TypedImpl2<IN, OUT> {

    private final TypeToken<IN> in = new TypeToken<IN>(getClass()) {};
    private final TypeToken<OUT> out = new TypeToken<OUT>(getClass()) {};
  }

  @Getter
  @Setter
  static class GenImpl<IN> {}
}
```

## Immutable

- 比正常的性能稍微好一点点

```
Benchmark                     Mode  Cnt     Score     Error  Units
BenchImmutable.immutableList  avgt   10  4288.096 ±  97.184  ns/op
BenchImmutable.immutableMap   avgt   10  7922.092 ± 368.066  ns/op
BenchImmutable.list           avgt   10  4739.961 ± 131.327  ns/op
BenchImmutable.map            avgt   10  8779.917 ± 498.843  ns/op
```

```java
@State(Scope.Thread)
@OutputTimeUnit(TimeUnit.NANOSECONDS)
@Warmup(iterations = 4)
@Measurement(iterations = 10)
@BenchmarkMode(Mode.AverageTime)
public class BenchImmutable {
  public static void main(String[] args) throws RunnerException {
    Options options =
        new OptionsBuilder()
            .include(BenchImmutable.class.getSimpleName())
            .threads(1)
            .forks(1)
            .shouldFailOnError(true)
            .shouldDoGC(true)
            .jvmArgs("-server")
            .measurementTime(TimeValue.seconds(8))
            .build();
    new Runner(options).run();
  }

  @Benchmark
  public void list(Blackhole bh) {
    ArrayList<Integer> list = Lists.newArrayList();
    for (int i = 0; i < 100; i++) {
      list.add(i);
    }
    for (int i = 0; i < 1000; i++) {
      bh.consume(list.get(i % 100));
    }
  }

  @Benchmark
  public void immutableList(Blackhole bh) {
    Builder<Integer> builder = ImmutableList.builder();
    for (int i = 0; i < 100; i++) {
      builder.add(i);
    }
    ImmutableList<Integer> list = builder.build();
    for (int i = 0; i < 1000; i++) {
      bh.consume(list.get(i % 100));
    }
  }

  @Benchmark
  public void map(Blackhole bh) {
    HashMap<Integer, Integer> map = Maps.newHashMap();

    for (int i = 0; i < 100; i++) {
      map.put(i, i);
    }
    for (int i = 0; i < 1000; i++) {
      bh.consume(map.get(i % 100));
    }
  }

  @Benchmark
  public void immutableMap(Blackhole bh) {
    ImmutableMap.Builder<Integer, Integer> builder = ImmutableMap.builder();

    for (int i = 0; i < 100; i++) {
      builder.put(i, i);
    }
    ImmutableMap<Integer, Integer> map = builder.build();
    for (int i = 0; i < 1000; i++) {
      bh.consume(map.get(i % 100));
    }
  }
}
```
