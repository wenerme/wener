---
title: 泛型
---

# Golang 泛型

- 类型参数
  - `T any` - 任意类型
  - `T int | int8` - 其中之一
  - `T ~int` - 允许衍生类型 - 例如 `type Age int`
- 参考
  - [propose](https://go.googlesource.com/proposal/+/refs/heads/master/design/43651-type-parameters.md)
  - [Tutorial: Getting started with generics](https://go.dev/doc/tutorial/generics)

:::caution

- 目前不好使用 new(T), 增加一个类型进行限制
- method 不支持类型参数 - [No parameterized methods]
- type 参数不支持 assert - 可以考虑 `_,ok := any(v).(int)`

:::

:::info

- golang.org/x/exp/slices - [#45955](https://github.com/golang/go/issues/45955)
- lightweight anonymous function syntax - [#21498](https://github.com/golang/go/issues/21498)
- 使用 struct 字段作为一个类型 [#48522](https://github.com/golang/go/issues/48522)

:::

[no parameterized methods]: https://go.googlesource.com/proposal/+/refs/heads/master/design/43651-type-parameters.md#No-parameterized-methods

# FAQ

## new(T)

> 目前该方法无法使用 https://stackoverflow.com/questions/71440697

- 直接限定不方便传参数，因为 struct 不一定实现 interface, `*struct` 才实现 interface

```go title="正确做法"
type Setter[T any] interface {
	SetIndex(n int)
	*T
}
func setIndex[T any, PT Setter[T]](items []int) (o []PT) {
	for _, v := range items {
		m := PT(new(T))
		m.SetIndex(v)
		o = append(o, m)
	}
	return
}

// 限定 接口 直接写也可以
func setIndex[T any, PT interface {
  SetIndex(n int)
  *T
}](items []int) (o []PT) {
	for _, v := range items {
		m := PT(new(T))
		m.SetIndex(v)
		o = append(o, m)
	}
	return
}
```

```go title="错误做法"
func setIndex[M interface {
	SetIndex(n int)
}](items []int) (o []M) {
	for _, v := range items {
    // NPE
		m := *new(M)
		m.SetIndex(v)
		o = append(o, m)
	}
	return
}

type A struct {
	Index int
}

func (s *A) SetIndex(v int) {
	s.Index = v
}
func TestSetIndex(t *testing.T) {
  // 会出现 NPE
	fmt.Println(setIndex[*A]([]int{1, 2, 3, 4}))
}
```

## method must have no type parameters

- func 支持类型参数
- method 不支持类型参数
  - 只能使用 struct 上的类型参数
- [No parameterized methods]

```go
type A struct{}
// method 不支持 类型参数
func (v A)Map[T any](f func(A)T)T{
  return f(v)
}

// func 支持 类型参数
func Map[IN any, OUT any](s IN, f func(IN) OUT) (o OUT) {
	return f(s)
}
```

## cannot use generic type without instantiation

```go
type A[T any] struct {}
// 不可以
func(a A)Name(){}
// 可以
func(a A[T])Name(){}
```

## cannot use type assertion on type parameter value Xxx(variable of type T constrained by any)

```go
type A[T any] struct {
  Val T
}
func(a A[T])Name(){
  // 不可以 - 因为 T 是具体类型
  _,_=a.Val.(string)

  // 可以
  var v interface{} = a.Val
	_, _ = v.(string)

  // 可以
  _, _ = (interface{})(a.Val).(string)
}
```

- proposal: spec: generics: type switch on parametric types [#45380](https://github.com/golang/go/issues/45380)
