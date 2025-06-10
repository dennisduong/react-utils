import { renderHook } from "@testing-library/react";
import {
  createContext,
  createElement,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { describe, it, expect, vi } from "vitest";

import { useEvent } from "../src/useEvent";

describe("useEvent (React 18+)", () => {
  it("returns a stable function reference", () => {
    const handler = vi.fn();
    const { result, rerender } = renderHook(({ fn }) => useEvent(fn), {
      initialProps: { fn: handler },
    });

    const firstFn = result.current;
    rerender({ fn: vi.fn() });
    const secondFn = result.current;

    expect(firstFn).toBe(secondFn);
  });

  it("calls the latest version of the function", () => {
    const spy1 = vi.fn();
    const spy2 = vi.fn();

    const { result, rerender } = renderHook(({ fn }) => useEvent(fn), {
      initialProps: { fn: spy1 },
    });

    result.current("foo");
    expect(spy1).toHaveBeenCalledWith("foo");

    rerender({ fn: spy2 });
    result.current("bar");
    expect(spy2).toHaveBeenCalledWith("bar");
    expect(spy1).not.toHaveBeenCalledWith("bar");
  });

  it("preserves arguments and return values", () => {
    const handler = vi.fn((...args: unknown[]) => args.join(","));
    const { result } = renderHook(() => useEvent(handler));
    const returnValue = result.current("a", "b");
    expect(returnValue).toBe("a,b");
    expect(handler).toHaveBeenCalledWith("a", "b");
  });

  it("preserves `this` context when called as a method", () => {
    const handler = vi.fn(function (this: unknown) {
      return this;
    });
    const { result } = renderHook(() => useEvent(handler));

    const thisArg = { fn: result.current };
    const returned = thisArg.fn();
    expect(handler.mock.instances[0]).toBe(thisArg);
    expect(returned).toBe(thisArg);
  });

  it("can be safely called in useLayoutEffect", () => {
    const { result } = renderHook(() => {
      const [val, setVal] = useState(0);
      const cb = useEvent(() => 42);
      useLayoutEffect(() => {
        setVal(cb());
      }, []);
      return val;
    });

    expect(result.current).toBe(42);
  });

  it("can be used via context in a nested useLayoutEffect", () => {
    const Ctx = createContext<{ cb: () => number }>(null!);

    const wrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
      const cb = useEvent(() => 99);
      return createElement(Ctx.Provider, { value: { cb } }, children);
    };

    const { result } = renderHook(
      () => {
        const { cb } = useContext(Ctx);
        const [val, setVal] = useState<number | null>(null);
        useLayoutEffect(() => {
          setVal(cb());
        }, []);
        return val;
      },
      { wrapper }
    );

    expect(result.current).toBe(99);
  });
});
