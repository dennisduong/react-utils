// Copied from:
// https://github.com/facebook/react/blob/main/packages/shared/ExecutionEnvironment.js
export const canUseDOM = !!(
  typeof window !== "undefined" &&
  typeof window.document !== "undefined" &&
  typeof window.document.createElement !== "undefined"
);
