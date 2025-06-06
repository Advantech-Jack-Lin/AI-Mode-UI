import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ChatPanel from '../src/components/ChatPanel.vue';

const hubMock = {
  chatSegments: { value: [] },
  sendMessage: vi.fn(),
  resetAll: vi.fn()
};

vi.mock('../src/composables/useStreamHub', () => ({
  useStreamHub: () => hubMock
}));

import { useStreamHub } from '../src/composables/useStreamHub';

describe('ChatPanel', () => {
  beforeEach(() => {
    hubMock.sendMessage.mockClear();
    hubMock.resetAll.mockClear();
  });
  it('sends message and clears input', async () => {
    const hub = useStreamHub();
    const wrapper = mount(ChatPanel);
    const input = wrapper.find('input');
    await input.setValue('hello');
    await wrapper.find('form').trigger('submit.prevent');
    expect(hub.sendMessage).toHaveBeenCalledWith('hello');
    expect((input.element as HTMLInputElement).value).toBe('');
  });

  it('does not send empty message', async () => {
    const hub = useStreamHub();
    const wrapper = mount(ChatPanel);
    await wrapper.find('form').trigger('submit.prevent');
    expect(hub.sendMessage).not.toHaveBeenCalled();
  });

  it('new chat resets state and input', async () => {
    const hub = useStreamHub();
    const wrapper = mount(ChatPanel);
    const input = wrapper.find('input');
    await input.setValue('hello');
    await wrapper.find('.new-chat-btn').trigger('click');
    expect(hub.resetAll).toHaveBeenCalled();
    expect((input.element as HTMLInputElement).value).toBe('');
  });
});
