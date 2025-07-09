<template>
  <div class="date-range-picker">
    <div class="date-picker-trigger" @click="toggleCalendar">
      <div class="date-display">
        <span class="date-label">期間:</span>
        <span class="date-range">
          {{ formatDate(currentStartDate) }} 〜 {{ formatDate(currentEndDate) }}
        </span>
      </div>
      <div class="dropdown-icon">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M4 6l4 4 4-4H4z"/>
        </svg>
      </div>
    </div>

    <div v-if="showCalendar" class="calendar-dropdown" ref="calendarDropdown">
      <div class="calendar-header">
        <button @click="previousMonth" class="nav-button">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M10 4l-4 4 4 4V4z"/>
          </svg>
        </button>
        <h3 class="month-year">{{ currentMonthYear }}</h3>
        <button @click="nextMonth" class="nav-button">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M6 4l4 4-4 4V4z"/>
          </svg>
        </button>
      </div>

      <div class="calendar-grid">
        <div class="day-header" v-for="day in dayHeaders" :key="day">{{ day }}</div>
        <div 
          v-for="date in calendarDates" 
          :key="date.key"
          :class="['calendar-date', {
            'other-month': !date.isCurrentMonth,
            'selected': isSelected(date.date),
            'in-range': isInRange(date.date),
            'start-date': isStartDate(date.date),
            'end-date': isEndDate(date.date),
            'available': isAvailable(date.date)
          }]"
          @click="selectDate(date.date)"
        >
          {{ date.day }}
        </div>
      </div>

      <div class="calendar-footer">
        <button @click="cancelSelection" class="cancel-button">キャンセル</button>
        <button @click="applySelection" class="apply-button">設定</button>
      </div>
    </div>

    <!-- Overlay -->
    <div v-if="showCalendar" class="calendar-overlay" @click="hideCalendar"></div>
  </div>
</template>

<script>
import { getAvailableDateRange } from '../../data/financialData.js'

export default {
  name: 'DateRangePicker',
  props: {
    startDate: {
      type: [Date, null],
      default: null
    },
    endDate: {
      type: [Date, null],
      default: null
    }
  },
  emits: ['dateRangeChanged'],
  data() {
    return {
      showCalendar: false,
      currentDate: new Date(),
      tempStartDate: null,
      tempEndDate: null,
      selectingEndDate: false,
      dayHeaders: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      availableRange: { minDate: null, maxDate: null },
      persistedStartDate: null,
      persistedEndDate: null
    }
  },
  computed: {
    currentStartDate() {
      // Priority: props > localStorage > default
      return this.startDate || this.persistedStartDate || this.defaultStartDate
    },
    currentEndDate() {
      // Priority: props > localStorage > default
      return this.endDate || this.persistedEndDate || this.defaultEndDate
    },
    defaultStartDate() {
      return this.availableRange.minDate || new Date()
    },
    defaultEndDate() {
      return this.availableRange.maxDate || new Date()
    },
    currentMonthYear() {
      const options = { year: 'numeric', month: 'long' }
      return this.currentDate.toLocaleDateString('en-US', options)
    },
    calendarDates() {
      const year = this.currentDate.getFullYear()
      const month = this.currentDate.getMonth()
      
      const firstDay = new Date(year, month, 1)
      const lastDay = new Date(year, month + 1, 0)
      const startCalendar = new Date(firstDay)
      startCalendar.setDate(firstDay.getDate() - firstDay.getDay())
      
      const dates = []
      const currentCalendarDate = new Date(startCalendar)
      
      for (let i = 0; i < 42; i++) {
        dates.push({
          date: new Date(currentCalendarDate),
          day: currentCalendarDate.getDate(),
          isCurrentMonth: currentCalendarDate.getMonth() === month,
          key: currentCalendarDate.toISOString().split('T')[0]
        })
        currentCalendarDate.setDate(currentCalendarDate.getDate() + 1)
      }
      
      return dates
    }
  },
  mounted() {
    this.loadPersistedDates()
    this.initializeDateRange()
    
    // Add window resize listener
    window.addEventListener('resize', this.handleResize)
    
    console.log('DateRangePicker mounted with dates:', {
      start: this.currentStartDate,
      end: this.currentEndDate,
      persisted: { start: this.persistedStartDate, end: this.persistedEndDate }
    })
    
    // Auto-emit persisted date range if it exists and differs from default
    this.$nextTick(() => {
      if (this.persistedStartDate && this.persistedEndDate) {
        const isDefaultRange = this.isSameDay(this.persistedStartDate, this.defaultStartDate) && 
                               this.isSameDay(this.persistedEndDate, this.defaultEndDate)
        
        if (!isDefaultRange) {
          console.log('Auto-emitting persisted date range on mount')
          this.$emit('dateRangeChanged', {
            startDate: this.persistedStartDate,
            endDate: this.persistedEndDate
          })
        }
      }
    })
  },
  beforeUnmount() {
    // Remove window resize listener
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    loadPersistedDates() {
      try {
        const startDateStr = localStorage.getItem('dateRangePicker_startDate')
        const endDateStr = localStorage.getItem('dateRangePicker_endDate')
        
        if (startDateStr) {
          this.persistedStartDate = new Date(startDateStr)
          console.log('Loaded persisted start date:', this.persistedStartDate)
        }
        
        if (endDateStr) {
          this.persistedEndDate = new Date(endDateStr)
          console.log('Loaded persisted end date:', this.persistedEndDate)
        }
      } catch (error) {
        console.warn('Error loading persisted dates:', error)
        this.clearPersistedDates()
      }
    },
    savePersistedDates(startDate, endDate) {
      try {
        if (startDate) {
          localStorage.setItem('dateRangePicker_startDate', startDate.toISOString())
          this.persistedStartDate = new Date(startDate)
        }
        
        if (endDate) {
          localStorage.setItem('dateRangePicker_endDate', endDate.toISOString())
          this.persistedEndDate = new Date(endDate)
        }
        
        console.log('Saved persisted dates:', { start: startDate, end: endDate })
      } catch (error) {
        console.warn('Error saving persisted dates:', error)
      }
    },
    clearPersistedDates() {
      localStorage.removeItem('dateRangePicker_startDate')
      localStorage.removeItem('dateRangePicker_endDate')
      this.persistedStartDate = null
      this.persistedEndDate = null
      console.log('Cleared persisted dates')
    },
    initializeDateRange() {
      this.availableRange = getAvailableDateRange()
      this.currentDate = new Date(this.currentStartDate)
      this.tempStartDate = new Date(this.currentStartDate)
      this.tempEndDate = new Date(this.currentEndDate)
    },
    toggleCalendar() {
      this.showCalendar = !this.showCalendar
      if (this.showCalendar) {
        this.tempStartDate = new Date(this.currentStartDate)
        this.tempEndDate = new Date(this.currentEndDate)
        this.selectingEndDate = false
        
        // Adjust position after DOM update
        this.$nextTick(() => {
          this.adjustCalendarPosition()
        })
      }
    },
    adjustCalendarPosition() {
      if (!this.$refs.calendarDropdown) return
      
      const dropdown = this.$refs.calendarDropdown
      const trigger = this.$el.querySelector('.date-picker-trigger')
      const triggerRect = trigger.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      
      // Reset positioning
      dropdown.style.left = ''
      dropdown.style.right = ''
      dropdown.style.top = ''
      dropdown.style.bottom = ''
      dropdown.style.transform = ''
      
      // Calculate initial position
      let top = triggerRect.bottom + 4
      let left = triggerRect.left
      
      // Get dropdown dimensions
      dropdown.style.visibility = 'hidden'
      dropdown.style.display = 'block'
      const dropdownRect = dropdown.getBoundingClientRect()
      dropdown.style.visibility = ''
      dropdown.style.display = ''
      
      // Adjust horizontal position
      if (left + dropdownRect.width > viewportWidth - 20) {
        left = viewportWidth - dropdownRect.width - 20
      }
      if (left < 20) {
        left = 20
      }
      
      // Adjust vertical position
      if (top + dropdownRect.height > viewportHeight - 20) {
        top = triggerRect.top - dropdownRect.height - 4
      }
      if (top < 20) {
        top = 20
      }
      
      // Apply positioning
      dropdown.style.left = left + 'px'
      dropdown.style.top = top + 'px'
    },
    handleResize() {
      if (this.showCalendar) {
        this.$nextTick(() => {
          this.adjustCalendarPosition()
        })
      }
    },
    hideCalendar() {
      this.showCalendar = false
    },
    previousMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1)
    },
    nextMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1)
    },
    selectDate(date) {
      if (!this.isAvailable(date)) return
      
      if (!this.selectingEndDate) {
        this.tempStartDate = new Date(date)
        this.tempEndDate = null
        this.selectingEndDate = true
      } else {
        if (date >= this.tempStartDate) {
          this.tempEndDate = new Date(date)
        } else {
          this.tempStartDate = new Date(date)
          this.tempEndDate = null
        }
      }
    },
    isSelected(date) {
      return this.isStartDate(date) || this.isEndDate(date)
    },
    isStartDate(date) {
      return this.tempStartDate && this.isSameDay(date, this.tempStartDate)
    },
    isEndDate(date) {
      return this.tempEndDate && this.isSameDay(date, this.tempEndDate)
    },
    isInRange(date) {
      if (!this.tempStartDate || !this.tempEndDate) return false
      return date > this.tempStartDate && date < this.tempEndDate
    },
    isAvailable(date) {
      return date >= this.availableRange.minDate && date <= this.availableRange.maxDate
    },
    isSameDay(date1, date2) {
      return date1.toDateString() === date2.toDateString()
    },
    formatDate(date) {
      if (!date) return ''
      try {
        return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`
      } catch (error) {
        return ''
      }
    },
    cancelSelection() {
      this.hideCalendar()
    },
    applySelection() {
      if (this.tempStartDate && this.tempEndDate) {
        // Save to localStorage for persistence
        this.savePersistedDates(this.tempStartDate, this.tempEndDate)
        
        // Emit the change event
        this.$emit('dateRangeChanged', {
          startDate: this.tempStartDate,
          endDate: this.tempEndDate
        })
        
        console.log('Applied date selection:', {
          start: this.tempStartDate,
          end: this.tempEndDate
        })
      }
      this.hideCalendar()
    },
    // Public method to clear filter (can be called from parent)
    clearFilter() {
      this.clearPersistedDates()
      this.initializeDateRange()
      
      this.$emit('dateRangeChanged', {
        startDate: this.defaultStartDate,
        endDate: this.defaultEndDate
      })
      
      console.log('Filter cleared, reset to default dates')
    }
  },
  watch: {
    startDate: {
      handler(newDate) {
        if (newDate && newDate !== this.persistedStartDate) {
          this.initializeDateRange()
        }
      },
      immediate: false
    },
    endDate: {
      handler(newDate) {
        if (newDate && newDate !== this.persistedEndDate) {
          this.initializeDateRange()
        }
      },
      immediate: false
    }
  }
}
</script>

<style scoped>
.date-range-picker {
  position: relative;
  display: inline-block;
}

.date-picker-trigger {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 250px;
}

.date-picker-trigger:hover {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.date-display {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
}

.date-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.date-range {
  font-size: 0.875rem;
  color: #1f2937;
  font-weight: 500;
}

.dropdown-icon {
  color: #6b7280;
  transition: transform 0.2s ease;
}

.calendar-dropdown {
  position: fixed;
  background: #2d2d2d;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  color: white;
  min-width: 320px;
  max-width: 400px;
  width: max-content;
}

.calendar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #404040;
}

.nav-button {
  background: none;
  border: none;
  color: white;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.nav-button:hover {
  background: #404040;
}

.month-year {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  padding: 16px;
}

.day-header {
  text-align: center;
  padding: 8px 4px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #9ca3af;
}

.calendar-date {
  text-align: center;
  padding: 8px 4px;
  font-size: 0.875rem;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
  position: relative;
}

.calendar-date:hover {
  background: #404040;
}

.calendar-date.other-month {
  color: #6b7280;
}

.calendar-date.available {
  color: white;
}

.calendar-date.available:hover {
  background: #4b5563;
}

.calendar-date.selected {
  background: #3b82f6;
  color: white;
}

.calendar-date.in-range {
  background: #3b82f640;
  color: white;
}

.calendar-date.start-date,
.calendar-date.end-date {
  background: #3b82f6;
  color: white;
}

.calendar-date:not(.available) {
  color: #4b5563;
  cursor: not-allowed;
}

.calendar-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px;
  border-top: 1px solid #404040;
}

.cancel-button,
.apply-button {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cancel-button {
  background: transparent;
  border: 1px solid #6b7280;
  color: #9ca3af;
}

.cancel-button:hover {
  background: #374151;
  color: white;
}

.apply-button {
  background: #3b82f6;
  border: 1px solid #3b82f6;
  color: white;
}

.apply-button:hover {
  background: #2563eb;
}

/* Responsive */
@media (max-width: 768px) {
  .date-picker-trigger {
    min-width: 180px;
    width: 100%;
  }
  
  .calendar-dropdown {
    min-width: 280px;
    width: 320px;
  }
}

@media (max-width: 480px) {
  .date-picker-trigger {
    min-width: 150px;
    padding: 8px 12px;
  }
  
  .date-label {
    font-size: 0.75rem;
  }
  
  .date-range {
    font-size: 0.75rem;
  }
  
  .calendar-dropdown {
    min-width: 280px;
    width: 300px;
  }
  
  .calendar-grid {
    padding: 12px;
  }
  
  .calendar-date {
    padding: 6px 2px;
    font-size: 0.75rem;
  }
}

@media (max-width: 360px) {
  .calendar-dropdown {
    width: 280px;
  }
  
  .calendar-grid {
    padding: 8px;
  }
  
  .calendar-date {
    padding: 4px 2px;
    font-size: 0.7rem;
  }
  
  .day-header {
    font-size: 0.7rem;
    padding: 6px 2px;
  }
}
</style> 