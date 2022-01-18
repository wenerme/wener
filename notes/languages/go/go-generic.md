---
title: 泛型
---

# Golang 泛型

- https://go.googlesource.com/proposal/+/refs/heads/master/design/43651-type-parameters.md
- 类型参数
  - `T any` - 任意类型
  - `T int | int8` - 其中之一
  - `T ~int` - 允许衍生类型 - 例如 `type Age int`

:::caution

- 目前不好使用 new(T)

:::

# FAQ

## new(T)

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
