import { MotionGlobalConfig } from "framer-motion";
import { vi } from "vitest";

import { IntersectionObserverStub } from "./src/test/intersectionObserver";

MotionGlobalConfig.skipAnimations = true;

globalThis.IntersectionObserver = IntersectionObserverStub;

Element.prototype.scrollIntoView = vi.fn();

window.matchMedia = vi.fn((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(() => false),
}));
