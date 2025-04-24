<template>
    <div id="container" class="d-flex flex-column align-center justify-center mb-3">
        <div class="month-selector d-flex align-center justify-center gap-4">
            <v-btn icon variant="plain" :ripple="false" @click="() => changeMonth(-1)">
                <v-icon icon="fa-solid fa-angle-left"></v-icon>
            </v-btn>

            <div class="current-month text-h6 text-center"> 
                {{ formattedMonthDisplay }} 
            </div>

            <v-btn icon variant="plain" :ripple="false" @click="() => changeMonth(1)">
                <v-icon icon="fa-solid fa-angle-right"></v-icon>
            </v-btn>
        </div>
        <v-divider thickness="1" length="100" />
    </div>
</template>

<script lang="ts" setup name="MonthSelector">
import { ref, computed, defineEmits, onMounted } from 'vue';

const emit = defineEmits<{ (e: 'month-change', date: string): void }>();

const currentDate = new Date();
const selectedDate = ref(formatDate(currentDate));

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

onMounted(() => emit('month-change', selectedDate.value));
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