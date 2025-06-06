import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('../src/mock/mockStreamApi', () => ({
  sendUserMessage: (_text: string, onFrame: (f: any) => void) => {
    const frames = [
      { channel: 'chat', delta: 'hello ' },
      { channel: 'chat', delta: 'world', isFinal: true },
      { channel: 'artifact', artifactId: 'test', op: 'replace', value: [1, 2, 3] }
    ];
    frames.forEach(f => onFrame(f));
  }
}));

import { useStreamHub, chatSegments, artifactData } from '../src/composables/useStreamHub';

describe('useStreamHub', () => {
  beforeEach(() => {
    const hub = useStreamHub();
    hub.resetAll();
  });

  it('updates chat and artifacts on streamed frames', () => {
    const hub = useStreamHub();
    hub.sendMessage('hi');
    expect(chatSegments.value).toEqual(['hi', 'hello world']);
    expect(artifactData['test']).toEqual([1, 2, 3]);
  });
});
