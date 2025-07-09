<template>
  <div class="month-range-picker">
    <div class="picker-container">
      <div class="picker-group">
        <label class="picker-label">年度選択</label>
        <select 
          v-model="internalSelectedYear" 
          @change="handleYearChange"
          class="year-select"
        >
          <option v-for="option in yearOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { getYearRangeOptions, getAvailableYears } from '../../data/financialData.js'

export default {
  name: 'MonthRangePicker',
  props: {
    selectedYear: {
      type: Number,
      default: 2025
    }
  },
  data() {
    const availableYears = getAvailableYears()
    const defaultYear = availableYears.includes(2025) ? 2025 : availableYears[availableYears.length - 1]
    
    return {
      internalSelectedYear: this.selectedYear || defaultYear,
      yearOptions: getYearRangeOptions(),
      defaultYear: defaultYear,
      persistedYear: null
    }
  },
  computed: {
    currentSelectedYear() {
      // Priority: props > persisted > default
      return this.selectedYear || this.persistedYear || this.defaultYear
    }
  },
  watch: {
    selectedYear(newVal) {
      if (newVal) {
        this.internalSelectedYear = newVal
      }
    }
  },
  mounted() {
    // Load persisted year first
    this.loadPersistedYear()
    
    // Set internal year based on priority
    this.internalSelectedYear = this.currentSelectedYear
    
    console.log('MonthRangePicker mounted with year:', {
      props: this.selectedYear,
      persisted: this.persistedYear,
      current: this.currentSelectedYear
    })
    
    // Auto-emit persisted year if it exists and differs from default
    this.$nextTick(() => {
      if (this.persistedYear && this.persistedYear !== this.defaultYear) {
        console.log('Auto-emitting persisted year on mount:', this.persistedYear)
        this.$emit('yearChanged', {
          year: this.persistedYear
        })
      } else {
        // Emit initial values
        this.emitChange()
      }
    })
  },
  methods: {
    loadPersistedYear() {
      try {
        const persistedYearStr = localStorage.getItem('monthRangePicker_selectedYear')
        if (persistedYearStr) {
          this.persistedYear = parseInt(persistedYearStr, 10)
          console.log('Loaded persisted year:', this.persistedYear)
        }
      } catch (error) {
        console.warn('Error loading persisted year:', error)
        this.clearPersistedYear()
      }
    },
    savePersistedYear(year) {
      try {
        localStorage.setItem('monthRangePicker_selectedYear', year.toString())
        this.persistedYear = year
        console.log('Saved persisted year:', year)
      } catch (error) {
        console.warn('Error saving persisted year:', error)
      }
    },
    clearPersistedYear() {
      localStorage.removeItem('monthRangePicker_selectedYear')
      this.persistedYear = null
      console.log('Cleared persisted year')
    },
    handleYearChange() {
      // Save to localStorage for persistence
      this.savePersistedYear(this.internalSelectedYear)
      this.emitChange()
    },
    emitChange() {
      this.$emit('yearChanged', {
        year: this.internalSelectedYear
      })
      
      console.log('Emitted year change:', this.internalSelectedYear)
    },
    // Public method to clear filter
    clearFilter() {
      this.clearPersistedYear()
      this.internalSelectedYear = this.defaultYear
      
      this.$emit('yearChanged', {
        year: this.defaultYear
      })
      
      console.log('MonthRangePicker filter cleared, reset to default year:', this.defaultYear)
    }
  }
}
</script>

<style scoped>
.month-range-picker {
  display: flex;
  align-items: center;
  gap: 12px;
}

.picker-container {
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

.picker-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.picker-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  white-space: nowrap;
}

.year-select {
  padding: 6px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  background: white;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 200px;
}

.year-select:hover {
  border-color: #9ca3af;
}

.year-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgb(59 130 246 / 0.1);
}

/* Responsive */
@media (max-width: 768px) {
  .picker-container {
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    width: 100%;
    box-sizing: border-box;
  }
  
  .picker-group {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  
  .year-select {
    width: 100%;
    min-width: auto;
  }
}

@media (max-width: 480px) {
  .month-range-picker {
    width: 100%;
  }
  
  .picker-container {
    padding: 8px;
  }
}
</style> 