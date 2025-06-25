import ProductCard from './components/ProductCard.vue';
import FileDownload from './components/FileDownload.vue';

import TableComponent from './components/TableComponent.vue';
import MediaGallery from './components/MediaGallery.vue';


export const artifactRegistry: Record<string, any> = {
  prod_cards: ProductCard,
  file_list: FileDownload,
  table_data: TableComponent,
  media_gallery: MediaGallery,

  // Add more artifact types here
};
