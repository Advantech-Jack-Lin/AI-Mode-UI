import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FileDownload from '../src/components/FileDownload.vue';

describe('FileDownload', () => {
  it('renders file links with download attribute', () => {
    const wrapper = mount(FileDownload, {
      props: {
        data: [{ name: 'a.pdf', url: 'https://example.com/a.pdf' }]
      }
    });
    const link = wrapper.find('a');
    expect(link.attributes('download')).toBeDefined();
    expect(link.text()).toContain('a.pdf');
  });
});
