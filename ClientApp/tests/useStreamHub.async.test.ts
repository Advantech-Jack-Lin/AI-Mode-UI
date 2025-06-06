import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.useFakeTimers();

vi.mock('../src/mock/mockStreamApi', () => ({
  sendUserMessage: (_: string, onFrame: (f: any) => void) => {
    setTimeout(() => onFrame({ channel: 'chat', delta: 'hello ' }), 50);
    setTimeout(() => onFrame({ channel: 'chat', delta: 'world', isFinal: true }), 100);
  }
}));

import { useStreamHub, chatSegments } from '../src/composables/useStreamHub';

describe('useStreamHub async streaming', () => {
  beforeEach(() => {
    const hub = useStreamHub();
    hub.resetAll();
  });

  it('streams frames in order with timers', () => {
    const hub = useStreamHub();
    hub.sendMessage('hi');
    // At time 0, only user message and empty assistant exist
    expect(chatSegments.value).toEqual(['hi', '']);
    vi.advanceTimersByTime(50);
    expect(chatSegments.value).toEqual(['hi', 'hello ']);
    vi.advanceTimersByTime(50);
    expect(chatSegments.value).toEqual(['hi', 'hello world']);
  });
});
