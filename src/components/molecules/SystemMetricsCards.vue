<template>
  <div class="system-metrics-cards">
    <div class="metrics-grid">
      <div class="metric-card error-card">
        <div class="metric-content">
          <div class="metric-icon">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <div class="metric-info">
            <h3 class="metric-label">実行エラー</h3>
            <p class="metric-value error-value">{{ errorCount }}件</p>
          </div>
        </div>
      </div>
      
      <div class="metric-card success-card">
        <div class="metric-content">
          <div class="metric-icon">
            <i class="fas fa-check-circle"></i>
          </div>
          <div class="metric-info">
            <h3 class="metric-label">実行成功</h3>
            <p class="metric-value success-value">{{ successCount }}件</p>
          </div>
        </div>
      </div>
      
      <div class="metric-card store-card">
        <div class="metric-content">
          <div class="metric-icon">
            <i class="fas fa-store"></i>
          </div>
          <div class="metric-info">
            <h3 class="metric-label">店舗数</h3>
            <p class="metric-value store-value">{{ storeCount }}件</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SystemMetricsCards',
  props: {
    errorCount: {
      type: Number,
      default: 0
    },
    successCount: {
      type: Number,
      default: 30
    },
    storeCount: {
      type: Number,
      default: 8
    }
  }
}
</script>

<style scoped>
.system-metrics-cards {
  margin-bottom: 30px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.metric-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.metric-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.metric-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.metric-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.error-card .metric-icon {
  background: #fef2f2;
  color: #dc2626;
}

.success-card .metric-icon {
  background: #f0fdf4;
  color: #16a34a;
}

.store-card .metric-icon {
  background: #eff6ff;
  color: #2563eb;
}

.metric-info {
  flex: 1;
}

.metric-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  margin: 0 0 4px 0;
}

.metric-value {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  line-height: 1;
}

.error-value {
  color: #dc2626;
}

.success-value {
  color: #16a34a;
}

.store-value {
  color: #2563eb;
}

/* Responsive */
@media (max-width: 768px) {
  .metrics-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .metric-card {
    padding: 20px;
  }
  
  .metric-value {
    font-size: 1.75rem;
  }
}

@media (max-width: 480px) {
  .metric-card {
    padding: 16px;
  }
  
  .metric-content {
    gap: 12px;
  }
  
  .metric-icon {
    width: 40px;
    height: 40px;
    font-size: 1.25rem;
  }
  
  .metric-value {
    font-size: 1.5rem;
  }
}
</style> 