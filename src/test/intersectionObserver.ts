import { act } from "@testing-library/react";

export class IntersectionObserverStub implements IntersectionObserver {
  static readonly instances = new Set<IntersectionObserverStub>();

  readonly root = null;
  readonly rootMargin = "0px";
  readonly scrollMargin = "0px";
  readonly thresholds = [0];
  readonly targets = new Set<Element>();

  constructor(readonly callback: IntersectionObserverCallback) {
    IntersectionObserverStub.instances.add(this);
  }

  observe(target: Element) {
    this.targets.add(target);
  }

  unobserve(target: Element) {
    this.targets.delete(target);
  }

  disconnect() {
    this.targets.clear();
    IntersectionObserverStub.instances.delete(this);
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

export function triggerIntersection(target: Element, isIntersecting: boolean) {
  const rect = target.getBoundingClientRect();
  const entry: IntersectionObserverEntry = {
    target,
    isIntersecting,
    intersectionRatio: isIntersecting ? 1 : 0,
    boundingClientRect: rect,
    intersectionRect: rect,
    rootBounds: null,
    time: performance.now(),
  };

  act(() => {
    for (const observer of IntersectionObserverStub.instances) {
      if (observer.targets.has(target)) observer.callback([entry], observer);
    }
  });
}
