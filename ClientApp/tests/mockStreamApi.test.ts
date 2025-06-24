import { describe, it, expect, vi } from 'vitest';
import { sendUserMessage } from '../src/mock/mockStreamApi';

vi.useFakeTimers();

describe('mockStreamApi keyword scenarios', () => {
  it('returns product artifacts when question mentions product', () => {
    const frames: any[] = [];
    sendUserMessage('show me product details', f => frames.push(f));
    vi.runAllTimers();
    expect(frames.some(f => f.artifactId === 'prod_cards')).toBe(true);
    expect(frames.some(f => f.artifactId === 'file_list')).toBe(false);
  });

  it('returns file artifacts when question mentions file', () => {
    const frames: any[] = [];
    sendUserMessage('please send the file', f => frames.push(f));
    vi.runAllTimers();
    expect(frames.some(f => f.artifactId === 'file_list')).toBe(true);
    expect(frames.some(f => f.artifactId === 'prod_cards')).toBe(false);
  });
});
