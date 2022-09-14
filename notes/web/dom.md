---
title: DOM
---

# DOM

- Document Object Model
- https://dom.spec.whatwg.org/
- https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model

   // e.preventDefault();
                // e.stopPropagation();
                // e.nativeEvent.stopImmediatePropagation();

               | |                                   / \
---------------| |-----------------   ---------------| |-----------------
| element1     | |                |   | element1     | |                |
|   -----------| |-----------     |   |   -----------| |-----------     |
|   |element2  \ /          |     |   |   |element2  | |          |     |
|   -------------------------     |   |   -------------------------     |
|        Event CAPTURING          |   |        Event BUBBLING           |
-----------------------------------   -----------------------------------

// CAPTURING event
button.addEventListener('click', handleClick, true)

// BUBBLING events
button.addEventListener('click', handleClick, false)
button.addEventListener('click', handleClick)


e.defaultPrevented
https://reactjs.org/docs/events.html
