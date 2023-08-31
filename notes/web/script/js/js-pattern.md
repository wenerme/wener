---
tags:
  - Pattern
---

# Pattern

## Mixin

```js
class User {
  constructor(name) {
    this.name = name;
  }
}

Object.assign(User.prototype, {
  hi() {
    console.log(`Hi, I am ${this.name}`);
  },
});

// 继承
let sayMixin = {
  say(phrase) {
    alert(phrase);
  },
};

let sayHiMixin = {
  __proto__: sayMixin, // (or we could use Object.setPrototypeOf to set the prototype here)

  sayHi() {
    // call parent method
    super.say(`Hello ${this.name}`); // (*)
  },
  sayBye() {
    super.say(`Bye ${this.name}`); // (*)
  },
};

class User {
  constructor(name) {
    this.name = name;
  }
}
```
