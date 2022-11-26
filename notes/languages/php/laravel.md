---
title: laravel
---

# laravel

:::caution

- production
  - APP_DEBUG=false

:::

## string primary key

```php
class UserVerification extends Model
{
    protected $primaryKey = 'your_key_name';
    public $incrementing = false;
    protected $keyType = 'string';
}
```
