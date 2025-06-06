import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ThemeToggle from '../src/components/ThemeToggle.vue';

describe('ThemeToggle', () => {
  it('emits toggle event on click', async () => {
    const wrapper = mount(ThemeToggle, { props: { isDark: false } });
    await wrapper.trigger('click');
    expect(wrapper.emitted('toggle')).toBeTruthy();
  });
});
