import { describe, it, expect } from 'vitest';
import { artifactRegistry } from '../src/artifactRegistry';
import ProductCard from '../src/components/ProductCard.vue';
import FileDownload from '../src/components/FileDownload.vue';

describe('artifactRegistry', () => {
  it('maps prod_cards to ProductCard', () => {
    expect(artifactRegistry['prod_cards']).toBe(ProductCard);
  });

  it('maps file_list to FileDownload', () => {
    expect(artifactRegistry['file_list']).toBe(FileDownload);
  });
});
