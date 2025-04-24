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
import { computed, onMounted } from 'vue';
import { useMonthStore } from '@/stores/month';

const useMonth = useMonthStore();

const formattedMonthDisplay = computed(() => {
    const dateParts = useMonth.selectedDate.split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1;

    const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const monthName = monthNames[month];

    if (year !== new Date().getFullYear()) {
        const shortYear = year.toString().slice(-2);
        return `${monthName}/${shortYear}`;
    }

    return monthName;
});

function previousMonth() {
    useMonth.previousMonth();
}

function nextMonth() {
    useMonth.nextMonth();
}
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