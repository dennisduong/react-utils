import { useEffect, useLayoutEffect } from "react";

import { canUseDOM } from "./canUseDOM";

// Copied from:
// https://github.com/molefrog/wouter/blob/v3.7.0/packages/wouter/src/react-deps.js#L40
export const useIsomorphicLayoutEffect = canUseDOM
  ? useLayoutEffect
  : useEffect;
