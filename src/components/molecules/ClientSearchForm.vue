<template>
  <div class="client-search-form">
    <h3 class="search-title">クライアント検索</h3>
    <div class="search-container">
      <Input
        v-model="searchQuery"
        placeholder="クライアント名、ID..."
        size="medium"
        @update:modelValue="handleSearch"
      />
      <Button
        variant="primary"
        size="medium"
        @click="handleSearch"
      >
        検索
      </Button>
    </div>
  </div>
</template>

<script>
import Input from '../atoms/Input.vue'
import Button from '../atoms/Button.vue'

export default {
  name: 'ClientSearchForm',
  components: {
    Input,
    Button
  },
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.searchQuery)
    }
  },
  emits: ['search']
}
</script>

<style scoped>
.client-search-form {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.search-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 16px 0;
}

.search-container {
  display: flex;
  gap: 12px;
  align-items: center;
}

.search-container .input-wrapper {
  flex: 1;
}

/* Responsive */
@media (max-width: 768px) {
  .search-container {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-container .btn {
    width: 100%;
  }
}
</style> 