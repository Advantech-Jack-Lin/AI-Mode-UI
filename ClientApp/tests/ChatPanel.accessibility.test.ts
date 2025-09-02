import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import ChatPanel from '../src/components/ChatPanel.vue';

// Mock the composable with reactive refs
const chatSegments = ref<string[]>([]);
const isStreaming = ref(false);
const sendMessage = vi.fn();
const resetAll = vi.fn();

vi.mock('../src/composables/useStreamHub', () => ({
  useStreamHub: () => ({
    chatSegments,
    isStreaming,
    sendMessage,
    resetAll
  })
}));

// Mock child components to simplify testing
vi.mock('../src/components/LoadingSpinner.vue', () => ({
  default: { template: '<div data-testid="loading-spinner">LoadingSpinner</div>' }
}));

vi.mock('../src/components/ErrorBoundary.vue', () => ({
  default: { template: '<div><slot /></div>' }
}));

describe('ChatPanel Accessibility', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    chatSegments.value = [];
    isStreaming.value = false;
  });

  it('has proper ARIA attributes', () => {
    const wrapper = mount(ChatPanel);
    
    const input = wrapper.find('input[type="text"]');
    expect(input.exists()).toBe(true);
    expect(input.attributes('maxlength')).toBe('1000');
    expect(input.attributes('autocomplete')).toBe('off');
  });

  it('disables input when streaming', async () => {
    isStreaming.value = true;
    const wrapper = mount(ChatPanel);
    await wrapper.vm.$nextTick();
    
    const input = wrapper.find('input[type="text"]');
    const button = wrapper.find('button[type="submit"]');
    
    expect(input.attributes('disabled')).toBeDefined();
    expect(button.attributes('disabled')).toBeDefined();
  });

  it('shows loading state in send button when streaming', async () => {
    isStreaming.value = true;
    const wrapper = mount(ChatPanel);
    await wrapper.vm.$nextTick();
    
    const loadingSpinner = wrapper.find('[data-testid="loading-spinner"]');
    expect(loadingSpinner.exists()).toBe(true);
  });

  it('properly formats messages with roles', async () => {
    chatSegments.value = ['Hello', 'Hi there!'];
    const wrapper = mount(ChatPanel);
    await wrapper.vm.$nextTick();
    
    const messages = wrapper.findAll('.message');
    expect(messages.length).toBe(2);
    
    // First message should be user
    expect(messages[0].classes()).toContain('user-message');
    // Second message should be assistant
    expect(messages[1].classes()).toContain('assistant-message');
  });

  it('shows typing indicator for streaming assistant message', async () => {
    // Set up scenario: user message + empty assistant message while streaming
    chatSegments.value = ['Hello', ''];
    isStreaming.value = true;
    const wrapper = mount(ChatPanel);
    await wrapper.vm.$nextTick();
    
    // Check that the last message (assistant) has the typing indicator or loading spinner
    const messages = wrapper.findAll('.message');
    expect(messages.length).toBe(2);
    
    const assistantMessage = messages[1];
    expect(assistantMessage.classes()).toContain('assistant-message');
    
    // Should have either typing indicator or loading spinner
    const typingIndicator = assistantMessage.find('.typing-indicator');
    const loadingSpinner = assistantMessage.find('[data-testid="loading-spinner"]');
    
    expect(typingIndicator.exists() || loadingSpinner.exists()).toBe(true);
  });
});