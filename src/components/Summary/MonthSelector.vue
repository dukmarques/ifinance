<script lang="ts" setup name="MonthSelector">
import { ref, computed, defineEmits, onMounted } from 'vue';
import Button from 'primevue/button';
import DatePicker from 'primevue/datepicker';

const emit = defineEmits<{ (e: 'month-change', date: string): void }>();

const currentDate = new Date();
const selectedDate = ref(formatDate(currentDate));
const calendarVisible = ref(false);
const calendarDate = ref(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));

const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const formattedMonthDisplay = computed(() => formatMonthDisplay(selectedDate.value));

function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}`;
}

function formatMonthDisplay(date: string): string {
    const [
        year, month
    ] = date.split('-').map(Number);
    const monthName = monthNames[month - 1];
    return year !== currentDate.getFullYear() ? `${monthName}/${year.toString().slice(-2)}` : monthName;
}

function changeMonth(offset: number): void {
    const [
        year, month
    ] = selectedDate.value.split('-').map(Number);
    const newDate = new Date(year, month - 1 + offset, 1);
    selectedDate.value = formatDate(newDate);
    emit('month-change', selectedDate.value);
}

function toggleCalendar() {
    calendarVisible.value = !calendarVisible.value;
}

function handleDateSelect(event: any) {
    if (event) {
        const newDate = new Date(event);
        selectedDate.value = formatDate(newDate);
        emit('month-change', selectedDate.value);
        calendarVisible.value = false;
    }
}

onMounted(() => emit('month-change', selectedDate.value));
</script>

<template>
    <div class="flex flex-col items-center justify-center mb-3 mt-3">
        <div class="flex items-center justify-center gap-10 mb-3">
            <Button 
                icon="pi pi-chevron-left" 
                text 
                rounded 
                aria-label="Mês anterior"
                @click="() => changeMonth(-1)"
            />

            <div class="relative">
                <div 
                    class="text-xl py-3 cursor-pointer hover:text-primary-500 transition-colors" 
                    @click="toggleCalendar"
                > 
                    {{ formattedMonthDisplay }} 
                </div>
                
                <DatePicker 
                    v-model="calendarDate" 
                    view="month" 
                    dateFormat="mm/yy"
                    :showIcon="false"
                    :manualInput="false"
                    :inline="calendarVisible"
                    @date-select="handleDateSelect"
                    class="absolute top-full left-1/2 transform -translate-x-1/2 min-w-60 z-50"
                    v-show="calendarVisible"
                    :pt="{
                        header: 'p-[.5rem]'
                    }"
                />
            </div>

            <Button 
                icon="pi pi-chevron-right" 
                text 
                rounded 
                aria-label="Próximo mês"
                @click="() => changeMonth(1)"
            />

            
        </div>
    </div>
</template>
