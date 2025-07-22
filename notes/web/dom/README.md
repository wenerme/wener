---
title: DOM
---

# DOM

- Document Object Model
- 参考
  - https://dom.spec.whatwg.org/
  - [Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)

```
               | |                                   / \
---------------| |-----------------   ---------------| |-----------------
| element1     | |                |   | element1     | |                |
|   -----------| |-----------     |   |   -----------| |-----------     |
|   |element2  \ /          |     |   |   |element2  | |          |     |
|   -------------------------     |   |   -------------------------     |
|        Event CAPTURING          |   |        Event BUBBLING           |
-----------------------------------   -----------------------------------
```

```js
e.preventDefault();
e.stopPropagation();
e.nativeEvent.stopImmediatePropagation(); // React

// CAPTURING event
button.addEventListener('click', handleClick, true);

// BUBBLING events
button.addEventListener('click', handleClick, false);
button.addEventListener('click', handleClick);
```

- e.defaultPrevented
- https://reactjs.org/docs/events.html

## img

- loading
  - eager
  - lazy
- crossorigin
  - anonymous
  - use-credentials
