<template>
  <div class="product-showcase">
    <div class="product-card" v-for="product in data" :key="product.id">
      <div class="product-image-wrapper">
        <img :src="product.image || 'https://picsum.photos/320/200'" class="product-image" :alt="product.name" @error="event => event.target.src = 'https://placehold.co/320x200?text=Product'" />
        <div class="product-badge" v-if="product.stock !== 'In Stock'">
          {{ product.stock }}
        </div>
      </div>
      <div class="product-info">
        <div class="product-header">
          <h6 class="product-name">{{ product.name }}</h6>
          <div class="product-rating">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#ffc107">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span class="rating-value">{{ product.rating }}</span>
          </div>
        </div>
        <div class="product-price">${{ product.price }}</div>
        <div class="product-actions">
          <button class="btn-secondary">View Details</button>
          <button class="btn-primary" :disabled="product.stock !== 'In Stock'">
            {{ product.stock === 'In Stock' ? 'Add to Cart' : 'Out of Stock' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ data: any[] }>();
</script>

<style scoped>
.product-showcase {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 8px;
  max-width: 80vw;
}

.product-card {
  flex: 0 1 320px;
  min-width: 280px;
  max-width: 340px;
  background: var(--app-card-bg);
  border: 1px solid var(--app-border);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: var(--app-primary);
}

.product-image-wrapper {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: var(--app-hover);
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #dc3545;
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.product-info {
  padding: 20px;
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.product-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--app-text);
  margin: 0;
  line-height: 1.4;
  flex: 1;
  margin-right: 12px;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: var(--app-text);
  font-weight: 500;
}

.rating-value {
  color: var(--app-secondary);
}

.product-price {
  font-size: 20px;
  font-weight: 700;
  color: var(--app-primary);
  margin-bottom: 16px;
}

.product-actions {
  display: flex;
  gap: 8px;
}

.btn-secondary, .btn-primary {
  flex: 1;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary {
  background: transparent;
  color: var(--app-secondary);
  border: 1px solid var(--app-border);
}

.btn-secondary:hover {
  background: var(--app-hover);
  color: var(--app-text);
}

.btn-primary {
  background: var(--app-primary);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: var(--app-primary);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(88, 166, 255, 0.3);
}

.btn-primary:disabled {
  background: var(--app-muted);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
</style>
