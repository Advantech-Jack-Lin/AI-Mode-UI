import ProductCard from './components/ProductCard.vue';
import FileDownload from './components/FileDownload.vue';

export const artifactRegistry: Record<string, any> = {
  prod_cards: ProductCard,
  file_list: FileDownload,
  // Add more artifact types here
};
