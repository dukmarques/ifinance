<template>
    <VContainer fluid>
        <MonthSelector @month-change="handleMonthChange"/>
        <Summary />

        <v-divider class="mt-7 mb-7 mx-auto" thickness="1" />

        <Revenues :date="currentMonth" />

        <FabSpeedDial />
    </VContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import MonthSelector from '@/components/Summary/MonthSelector.vue';
import Summary from '@/components/Summary/SummaryFinance.vue';
import FabSpeedDial from '@/components/form/FabSpeedDial.vue';
import Revenues from '@/components/Revenues/RevenuesList.vue';

const currentMonth = ref(new Date().toLocaleDateString('en', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
}));

function handleMonthChange(date: string) {
    // TODO: chamar função de busca do overview
    currentMonth.value = date;
    console.log('Selected month:', date);
}
</script>