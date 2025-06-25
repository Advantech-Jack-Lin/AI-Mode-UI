import { describe, it, expect } from 'vitest';
import { artifactRegistry } from '../src/artifactRegistry';
import ProductCard from '../src/components/ProductCard.vue';
import FileDownload from '../src/components/FileDownload.vue';
import TableComponent from '../src/components/TableComponent.vue';
import MediaGallery from '../src/components/MediaGallery.vue';


describe('artifactRegistry', () => {
  it('maps prod_cards to ProductCard', () => {
    expect(artifactRegistry['prod_cards']).toBe(ProductCard);
  });

  it('maps file_list to FileDownload', () => {
    expect(artifactRegistry['file_list']).toBe(FileDownload);
  });


  it('maps table_data to TableComponent', () => {
    expect(artifactRegistry['table_data']).toBe(TableComponent);
  });

  it('maps media_gallery to MediaGallery', () => {
    expect(artifactRegistry['media_gallery']).toBe(MediaGallery);
  });
});
