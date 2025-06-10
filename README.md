# @dutils/react-utils

🛠️ A lightweight, zero-dependency collection of ergonomic React utilities built for modern apps.

This package starts with a few core utilities and will grow incrementally over time as new needs arise. All utilities are React 18+ compatible and written in TypeScript.

---

## ✨ Included Utilities

- **`useIsomorphicLayoutEffect`**  
  A drop-in replacement for `useLayoutEffect` that avoids SSR warnings by falling back to `useEffect` during server-side rendering.

- **`useEvent`**  
  A stable callback hook that always references the latest function — useful for event handlers, timeouts, and effects.  
  Inspired by the upcoming [React RFC for `useEvent`](https://github.com/reactjs/rfcs/pull/220) and [Dan Abramov’s commentary](https://github.com/facebook/react/pull/25881#issuecomment-1356244360) on the use of `useInsertionEffect` to optimize ref timing.

- **`canUseDOM`**  
  Simple utility that detects whether your code is running in a browser environment.

---

## 📦 Installation

```bash
npm install @dutils/react-utils
# or
yarn add @dutils/react-utils
```

## 🧱 Philosophy

This library isn’t trying to be a massive grab-bag of helpers. Instead, it focuses on adding small, well-tested, and reusable building blocks that solve real problems encountered in everyday React development.

Utilities will be added as they’re needed, not just for the sake of it.

## License

MIT