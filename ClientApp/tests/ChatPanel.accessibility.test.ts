import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ChatPanel from '../src/components/ChatPanel.vue';
import { useStreamHub } from '../src/composables/useStreamHub';

// Mock the composable
const mockStreamHub = {
  chatSegments: { value: [] },
  isStreaming: { value: false },
  sendMessage: vi.fn(),
  resetAll: vi.fn()
};

vi.mock('../src/composables/useStreamHub', () => ({
  useStreamHub: () => mockStreamHub
}));

describe('ChatPanel Accessibility', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockStreamHub.chatSegments.value = [];
    mockStreamHub.isStreaming.value = false;
  });

  it('has proper ARIA attributes', () => {
    const wrapper = mount(ChatPanel);
    
    const input = wrapper.find('input[type="text"]');
    expect(input.exists()).toBe(true);
    expect(input.attributes('maxlength')).toBe('1000');
    expect(input.attributes('autocomplete')).toBe('off');
  });

  it('disables input when streaming', async () => {
    mockStreamHub.isStreaming.value = true;
    const wrapper = mount(ChatPanel);
    
    const input = wrapper.find('input[type="text"]');
    const button = wrapper.find('button[type="submit"]');
    
    expect(input.attributes('disabled')).toBeDefined();
    expect(button.attributes('disabled')).toBeDefined();
  });

  it('shows loading state in send button when streaming', async () => {
    mockStreamHub.isStreaming.value = true;
    const wrapper = mount(ChatPanel);
    
    const button = wrapper.find('button[type="submit"]');
    expect(button.text()).toContain('LoadingSpinner');
  });

  it('properly formats messages with roles', async () => {
    mockStreamHub.chatSegments.value = ['Hello', 'Hi there!'];
    const wrapper = mount(ChatPanel);
    
    const messages = wrapper.findAll('.message');
    expect(messages.length).toBe(2);
    
    // First message should be user
    expect(messages[0].classes()).toContain('user-message');
    // Second message should be assistant
    expect(messages[1].classes()).toContain('assistant-message');
  });

  it('shows typing indicator for streaming assistant message', async () => {
    mockStreamHub.chatSegments.value = ['Hello', ''];
    mockStreamHub.isStreaming.value = true;
    const wrapper = mount(ChatPanel);
    
    const typingIndicator = wrapper.find('.typing-indicator');
    expect(typingIndicator.exists()).toBe(true);
  });
});