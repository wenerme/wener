---
title: Sentry
---

# Sentry

- [getsentry/sentry](https://github.com/getsentry/sentry)
  - BSL, Python
  - cross-platform application error reporting

## Go

```go
func TestSentry(t *testing.T) {
	err := sentry.Init(sentry.ClientOptions{
		Dsn:   "",
		Debug: true,
	})
	if err != nil {
		log.Fatalf("sentry.Init: %s", err)
	}
	defer sentry.Flush(5 * time.Second)

	sentry.CaptureMessage("sentry init")
	sentry.CaptureException(errors.New("test error"))

  // HTTP 拦截
	sh := sentryhttp.New(sentryhttp.Options{})
	http.HandleFunc("/err", sh.HandleFunc(func(writer http.ResponseWriter, request *http.Request) {
		panic("error")
	}))
}
```
