import { useInsertionEffect, useRef } from "react";

// Adapted from:
// https://github.com/molefrog/wouter/blob/v3.7.0/packages/wouter/src/react-deps.js#L55
// Userland polyfill while we wait for the forthcoming
// https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md
// Note: "A high-fidelity polyfill for useEvent is not possible because
// there is no lifecycle or Hook in React that we can use to switch
// .current at the right timing."
// So we will have to make do with this "close enough" approach for now.
export const useEvent = (fn) => {
  const { current: ref } = useRef([
    fn,
    function (this: unknown, ...args) {
      return ref[0].apply(this, args);
    },
  ]);
  // Per Dan Abramov: useInsertionEffect executes marginally closer to the
  // correct timing for ref synchronization than useLayoutEffect on React 18.
  // See: https://github.com/facebook/react/pull/25881#issuecomment-1356244360
  useInsertionEffect(() => {
    ref[0] = fn;
  });
  return ref[1];
};
