import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock sendUserMessage to immediately invoke callback with provided frames
const frames: any[] = [];
vi.mock('../src/mock/mockStreamApi', () => ({
  sendUserMessage: (_: string, onFrame: (f: any) => void) => {
    frames.forEach(f => onFrame(f));
  }
}));

import { useStreamHub, chatSegments, artifactData } from '../src/composables/useStreamHub';

describe('useStreamHub extra operations', () => {
  beforeEach(() => {
    frames.length = 0;
    const hub = useStreamHub();
    hub.resetAll();
  });

  it('appends artifact data when op is append', () => {
    frames.push(
      { channel: 'artifact', artifactId: 'list', op: 'replace', value: [1] },
      { channel: 'artifact', artifactId: 'list', op: 'append', value: [2, 3] }
    );
    const hub = useStreamHub();
    hub.sendMessage('test');
    expect(artifactData['list']).toEqual([1, 2, 3]);
  });

  it('removes artifact data when op is remove', () => {
    frames.push(
      { channel: 'artifact', artifactId: 'temp', op: 'replace', value: [1] },
      { channel: 'artifact', artifactId: 'temp', op: 'remove' }
    );
    const hub = useStreamHub();
    hub.sendMessage('test');
    expect(artifactData.hasOwnProperty('temp')).toBe(false);
  });

  it('resetAll clears chat and artifacts', () => {
    frames.push(
      { channel: 'chat', delta: 'foo', isFinal: true },
      { channel: 'artifact', artifactId: 'a', op: 'replace', value: [1] }
    );
    const hub = useStreamHub();
    hub.sendMessage('hi');
    expect(chatSegments.value.length).toBeGreaterThan(0);
    expect(Object.keys(artifactData).length).toBe(1);
    hub.resetAll();
    expect(chatSegments.value).toEqual([]);
    expect(Object.keys(artifactData).length).toBe(0);
  });
});
