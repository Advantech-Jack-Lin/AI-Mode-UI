import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MediaGallery from '../src/components/MediaGallery.vue';

describe('MediaGallery', () => {
  it('renders video element when type is video', () => {
    const wrapper = mount(MediaGallery, {
      props: { data: [{ type: 'video', url: 'video.mp4' }] }
    });
    expect(wrapper.find('video').exists()).toBe(true);
  });
});
