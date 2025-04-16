<template>
    <VContainer fluid>
        <MonthSelector @month-change="handleMonthChange"/>
        <Summary />

        <v-divider class="mt-7 mb-7 mx-auto" thickness="1" />

        <ExpasionPanels />
        <ExpasionPanels />
        <ExpasionPanels />

        <FabSpeedDial />
    </VContainer>
</template>

<script setup lang="ts">
import ExpasionPanels from '@/components/Dashboard/ExpasionPanels.vue';
import MonthSelector from '@/components/Summary/MonthSelector.vue';
import Summary from '@/components/Summary/SummaryFinance.vue';
import FabSpeedDial from '@/components/form/FabSpeedDial.vue';

import { ref } from 'vue';

const currentMonth = ref('');

function handleMonthChange(date: string) {
    currentMonth.value = date;
    console.log('Selected month:', date);
}
</script>