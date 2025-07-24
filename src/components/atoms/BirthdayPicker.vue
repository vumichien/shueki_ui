<template>
  <div class="birthday-picker">
    <div class="birthday-selects">
      <Select
        v-model="selectedYear"
        :options="yearOptions"
        placeholder=""
        class="year-select"
        @update:modelValue="updateBirthday"
      />
      <span class="separator">年</span>
      
      <Select
        v-model="selectedMonth"
        :options="monthOptions"
        placeholder=""
        class="month-select"
        @update:modelValue="updateBirthday"
      />
      <span class="separator">月</span>
      
      <Select
        v-model="selectedDay"
        :options="dayOptions"
        placeholder=""
        class="day-select"
        @update:modelValue="updateBirthday"
      />
      <span class="separator">日</span>
    </div>
  </div>
</template>

<script>
import Select from './Select.vue'

export default {
  name: 'BirthdayPicker',
  components: {
    Select
  },
  props: {
    modelValue: {
      type: [String, null],
      default: null
    },
    startYear: {
      type: Number,
      default: 1950
    },
    endYear: {
      type: Number,
      default: () => new Date().getFullYear()
    }
  },
  data() {
    return {
      selectedYear: '',
      selectedMonth: '',
      selectedDay: ''
    }
  },
  computed: {
    yearOptions() {
      const options = []
      for (let year = this.endYear; year >= this.startYear; year--) {
        options.push({
          value: year.toString(),
          label: year.toString()
        })
      }
      return options
    },
    monthOptions() {
      return [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '7', label: '7' },
        { value: '8', label: '8' },
        { value: '9', label: '9' },
        { value: '10', label: '10' },
        { value: '11', label: '11' },
        { value: '12', label: '12' }
      ]
    },
    dayOptions() {
      if (!this.selectedYear || !this.selectedMonth) {
        // Default to 31 days if year/month not selected
        const options = []
        for (let day = 1; day <= 31; day++) {
          options.push({
            value: day.toString(),
            label: day.toString()
          })
        }
        return options
      }
      
      // Calculate actual days in the selected month/year
      const year = parseInt(this.selectedYear)
      const month = parseInt(this.selectedMonth)
      const daysInMonth = new Date(year, month, 0).getDate()
      
      const options = []
      for (let day = 1; day <= daysInMonth; day++) {
        options.push({
          value: day.toString(),
          label: day.toString()
        })
      }
      return options
    }
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.parseBirthday(newValue)
        }
      }
    },
    selectedYear() {
      // Reset day if it's invalid for the new year/month combination
      this.validateDay()
    },
    selectedMonth() {
      // Reset day if it's invalid for the new year/month combination
      this.validateDay()
    }
  },
  methods: {
    parseBirthday(birthdayString) {
      // If null or empty, reset all fields
      if (!birthdayString) {
        this.selectedYear = ''
        this.selectedMonth = ''
        this.selectedDay = ''
        return
      }
      
      // Parse format like "2025年06月01日" or "2025-06-01"
      let year, month, day
      
      if (birthdayString.includes('年')) {
        // Japanese format: "2025年06月01日"
        const matches = birthdayString.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/)
        if (matches) {
          year = matches[1]
          month = parseInt(matches[2]).toString()
          day = parseInt(matches[3]).toString()
        }
      } else if (birthdayString.includes('-')) {
        // ISO format: "2025-06-01"
        const parts = birthdayString.split('-')
        if (parts.length === 3) {
          year = parts[0]
          month = parseInt(parts[1]).toString()
          day = parseInt(parts[2]).toString()
        }
      }
      
      if (year && month && day) {
        this.selectedYear = year
        this.selectedMonth = month
        this.selectedDay = day
      } else {
        this.selectedYear = ''
        this.selectedMonth = ''
        this.selectedDay = ''
      }
    },
    validateDay() {
      if (this.selectedDay && this.selectedYear && this.selectedMonth) {
        const maxDays = this.dayOptions.length
        const currentDay = parseInt(this.selectedDay)
        
        if (currentDay > maxDays) {
          this.selectedDay = maxDays.toString()
          this.updateBirthday()
        }
      }
    },
    updateBirthday() {
      if (this.selectedYear && this.selectedMonth && this.selectedDay) {
        // Format as Japanese style: "2025年06月01日"
        const year = this.selectedYear
        const month = this.selectedMonth.padStart(2, '0')
        const day = this.selectedDay.padStart(2, '0')
        const formatted = `${year}年${month}月${day}日`
        
        this.$emit('update:modelValue', formatted)
      } else {
        // If any field is empty, emit null
        this.$emit('update:modelValue', null)
      }
    }
  },
  emits: ['update:modelValue']
}
</script>

<style scoped>
.birthday-picker {
  width: 100%;
}

.birthday-selects {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.year-select {
  min-width: 80px;
  flex: 1;
}

.month-select {
  min-width: 60px;
  flex: 0.8;
}

.day-select {
  min-width: 60px;
  flex: 0.8;
}

.separator {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
  white-space: nowrap;
}

/* Responsive */
@media (max-width: 768px) {
  .birthday-selects {
    gap: 6px;
  }
  
  .year-select {
    min-width: 70px;
  }
  
  .month-select,
  .day-select {
    min-width: 50px;
  }
  
  .separator {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .birthday-selects {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  
  .year-select,
  .month-select,
  .day-select {
    min-width: auto;
    flex: none;
  }
  
  .separator {
    display: none;
  }
}
</style> 