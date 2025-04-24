<template>
    <div id="container" class="d-flex flex-column align-center justify-center mb-3">
        <div class="month-selector d-flex align-center justify-center gap-4">
            <v-btn icon variant="plain" :ripple="false" @click="previousMonth">
                <v-icon icon="fa-solid fa-angle-left"></v-icon>
            </v-btn>
    
            <div class="current-month text-h6 text-center"> 
                {{ formattedMonthDisplay }} 
            </div>
    
            <v-btn icon variant="plain" :ripple="false" @click="nextMonth">
                <v-icon icon="fa-solid fa-angle-right"></v-icon>
            </v-btn>
        </div>
        <v-divider thickness="1" length="100"/>
    </div>
</template>

<script lang="ts" setup name="MonthSelector">
import {ref, computed, defineEmits, onMounted } from 'vue';

const emit = defineEmits<{
  (e: 'month-change', date: string): void
}>();

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const selectedDate = ref(`${currentYear}-${currentMonth}`);

const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const formattedMonthDisplay = computed(() => {
    const dateParts = selectedDate.value.split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1;
  
    const monthName = monthNames[month];
  
    if (year !== currentYear) {
        const shortYear = year.toString().slice(-2);
        return `${monthName}/${shortYear}`;
    }
  
    return monthName;
});

function emitMonthChange() {
    emit('month-change', selectedDate.value);
}
    
function previousMonth() {
    const dateParts = selectedDate.value.split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1;
  
    const date = new Date(year, month, 1);
  
    date.setMonth(date.getMonth() - 1);
  
    const newYear = date.getFullYear();
    const newMonth = (date.getMonth() + 1).toString().padStart(2, '0');
  
    selectedDate.value = `${newYear}-${newMonth}`;
    emitMonthChange();
}
    
function nextMonth() {
    const dateParts = selectedDate.value.split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1;
  
    const date = new Date(year, month, 1);
  
    date.setMonth(date.getMonth() + 1);
  
    const newYear = date.getFullYear();
    const newMonth = (date.getMonth() + 1).toString().padStart(2, '0');
  
    selectedDate.value = `${newYear}-${newMonth}`;
    emitMonthChange();
}

onMounted(() => {
    emitMonthChange();
});
</script>

<style scoped lang="scss">
    #container {
        .month-selector {
            gap: 30px;
        }

        .current-month {
            margin: 0;
            padding: 12px 0;
        }
    }
</style>