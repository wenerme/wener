---
title: cmdk
---

# cmdk

- [pacocoursey/cmdk](https://github.com/pacocoursey/cmdk)
  - unstyled command menu React component.
  - cmdk -> Command K - ⌘K

```tsx
import { Command } from 'cmdk';

const CommandMenu = () => {
  return (
    <Command label='Command Menu'>
      <Command.Input />
      <Command.List>
        {loading && <Command.Loading>Fetching words…</Command.Loading>}
        <Command.Empty>No results found.</Command.Empty>

        <CommandItem value='-' className='hidden' />

        <Command.Group heading='Letters'>
          <Command.Item>a</Command.Item>
          <Command.Item>b</Command.Item>
          <Command.Separator />
          <Command.Item>c</Command.Item>
        </Command.Group>

        <Command.Item>Apple</Command.Item>
      </Command.List>
    </Command>
  );
};
```
