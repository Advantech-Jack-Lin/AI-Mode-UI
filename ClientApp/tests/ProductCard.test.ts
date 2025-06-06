import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ProductCard from '../src/components/ProductCard.vue';

describe('ProductCard', () => {
  it('uses placeholder image on error', async () => {
    const wrapper = mount(ProductCard, {
      props: { data: [{ id: 1, name: 'a', price: 1, rating: 5, stock: 'In Stock', image: '' }] }
    });
    const img = wrapper.find('img');
    await img.trigger('error');
    expect((img.element as HTMLImageElement).src).toContain('https://placehold.co/320x200?text=Product');
  });
});
