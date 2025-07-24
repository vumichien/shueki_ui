<template>
  <div class="date-picker">
    <div class="date-picker-trigger" @click="toggleCalendar">
      <div class="date-display">
        <span class="date-label">{{ label }}</span>
        <span class="selected-date">
          {{ formatDate(displayDate) }}
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
export default {
  name: 'DatePicker',
  props: {
    value: {
      type: [Date, null],
      default: null
    },
    modelValue: {
      type: [Date, null],
      default: null
    },
    label: {
      type: String,
      default: '実施日'
    },
    minDate: {
      type: Date,
      default: () => new Date(2020, 0, 1)
    },
    maxDate: {
      type: Date,
      default: () => new Date(2030, 11, 31)
    },
    availableDates: {
      type: Array,
      default: () => []
    }
  },
  emits: ['input', 'change', 'update:modelValue'],
  data() {
    return {
      showCalendar: false,
      currentDate: new Date(),
      tempSelectedDate: null,
      dayHeaders: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    }
  },
  computed: {
    selectedDate() {
      return this.modelValue || this.value
    },
    displayDate() {
      // Show tempSelectedDate if calendar is open, otherwise show selectedDate
      if (this.showCalendar && this.tempSelectedDate) {
        return this.tempSelectedDate
      }
      // If no selectedDate but we have available dates, show the first one
      if (!this.selectedDate && this.availableDates.length > 0) {
        return this.availableDates[0]
      }
      return this.selectedDate
    },
    currentMonthYear() {
      const options = { year: 'numeric', month: 'long' }
      return this.currentDate.toLocaleDateString('ja-JP', options)
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
    this.currentDate = this.selectedDate ? new Date(this.selectedDate) : new Date()
    this.tempSelectedDate = this.selectedDate ? new Date(this.selectedDate) : null
    
    // Add window resize listener
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    toggleCalendar() {
      this.showCalendar = !this.showCalendar
      if (this.showCalendar) {
        // Set tempSelectedDate to current selected date or first available date
        if (this.selectedDate) {
          this.tempSelectedDate = new Date(this.selectedDate)
          this.currentDate = new Date(this.selectedDate)
        } else if (this.availableDates.length > 0) {
          // If no date is selected, use the first available date
          this.tempSelectedDate = new Date(this.availableDates[0])
          this.currentDate = new Date(this.availableDates[0])
        } else {
          this.tempSelectedDate = null
          this.currentDate = new Date()
        }
        
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
      this.tempSelectedDate = new Date(date)
    },
    isSelected(date) {
      return this.tempSelectedDate && this.isSameDay(date, this.tempSelectedDate)
    },
    isAvailable(date) {
      // Check if date is within min/max range
      if (date < this.minDate || date > this.maxDate) {
        return false
      }
      
      // If availableDates is provided, check if date is in the list
      if (this.availableDates.length > 0) {
        return this.availableDates.some(availableDate => {
          const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
          const availableDateNormalized = new Date(availableDate.getFullYear(), availableDate.getMonth(), availableDate.getDate())
          return targetDate.getTime() === availableDateNormalized.getTime()
        })
      }
      
      return true
    },
    isSameDay(date1, date2) {
      return date1.toDateString() === date2.toDateString()
    },
    formatDate(date) {
      if (!date) return '日付を選択'
      try {
        return `${date.getFullYear()}年${(date.getMonth() + 1)}月${date.getDate()}日`
      } catch (error) {
        return '日付を選択'
      }
    },
    cancelSelection() {
      // Reset tempSelectedDate to original selectedDate
      this.tempSelectedDate = this.selectedDate ? new Date(this.selectedDate) : null
      this.hideCalendar()
    },
    applySelection() {
      if (this.tempSelectedDate) {
        this.$emit('input', this.tempSelectedDate)
        this.$emit('update:modelValue', this.tempSelectedDate)
        this.$emit('change', this.tempSelectedDate)
      }
      this.hideCalendar()
    }
  },
  watch: {
    value(newDate) {
      if (newDate) {
        this.currentDate = new Date(newDate)
        this.tempSelectedDate = new Date(newDate)
      } else {
        this.tempSelectedDate = null
      }
    },
    modelValue(newDate) {
      if (newDate) {
        this.currentDate = new Date(newDate)
        this.tempSelectedDate = new Date(newDate)
      } else {
        this.tempSelectedDate = null
      }
    }
  }
}
</script>

<style scoped>
.date-picker {
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
  min-width: 200px;
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

.selected-date {
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
    min-width: 150px;
    width: 100%;
  }
  
  .calendar-dropdown {
    min-width: 280px;
    width: 320px;
  }
}

@media (max-width: 480px) {
  .date-picker-trigger {
    min-width: 120px;
    padding: 8px 12px;
  }
  
  .date-label {
    font-size: 0.75rem;
  }
  
  .selected-date {
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
</style> 