import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { useIsomorphicLayoutEffect } from "../src/useIsomorphicLayoutEffect";

describe("useIsomorphicLayoutEffect", () => {
  it("invokes the effect after render but before paint", () => {
    const effectSpy = vi.fn();

    renderHook(() => {
      useIsomorphicLayoutEffect(effectSpy);
    });

    expect(effectSpy).toHaveBeenCalled();
  });

  it("runs cleanup on unmount", () => {
    const cleanupSpy = vi.fn();

    const { unmount } = renderHook(() => {
      useIsomorphicLayoutEffect(() => {
        return cleanupSpy;
      });
    });

    expect(cleanupSpy).not.toHaveBeenCalled();
    unmount();
    expect(cleanupSpy).toHaveBeenCalled();
  });

  it("responds to updates", () => {
    const spy = vi.fn();
    const { rerender } = renderHook(
      ({ val }) => {
        useIsomorphicLayoutEffect(() => {
          spy(val);
        }, [val]);
      },
      {
        initialProps: { val: 1 },
      }
    );

    expect(spy).toHaveBeenCalledWith(1);
    rerender({ val: 2 });
    expect(spy).toHaveBeenCalledWith(2);
  });
});
