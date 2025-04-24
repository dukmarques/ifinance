<template>
    <div id="container" class="d-flex flex-column align-center justify-center mb-3">
        <div class="month-selector d-flex align-center justify-center gap-4">
            <v-btn icon variant="plain" :ripple="false" @click="previousMonth">
                <v-icon icon="fa-solid fa-angle-left"></v-icon>
            </v-btn>
    
            <div class="current-month text-h6 text-center"> 
                {{ useMonth.formattedMonthDisplay }} 
            </div>
    
            <v-btn icon variant="plain" :ripple="false" @click="nextMonth">
                <v-icon icon="fa-solid fa-angle-right"></v-icon>
            </v-btn>
        </div>
        <v-divider thickness="1" length="100"/>
    </div>
</template>

<script lang="ts" setup name="MonthSelector">
import { useMonthStore } from '@/stores/month';

const useMonth = useMonthStore();

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