import { describe, it, expect } from 'vitest';
import { artifactRegistry } from '../src/artifactRegistry';
import ProductCard from '../src/components/ProductCard.vue';

describe('artifactRegistry', () => {
  it('maps prod_cards to ProductCard', () => {
    expect(artifactRegistry['prod_cards']).toBe(ProductCard);
  });
});
