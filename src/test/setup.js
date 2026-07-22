import '@testing-library/jest-dom';

// Mock IntersectionObserver for framer-motion
class MockIntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.IntersectionObserver = MockIntersectionObserver;

// Mock scrollIntoView
Element.prototype.scrollIntoView = vi.fn();
