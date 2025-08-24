<script setup lang="ts">
import { ref } from 'vue';
import Fieldset from 'primevue/fieldset';
import Container from '@/components/Common/Container.vue';
import MonthSelector from '@/components/Summary/MonthSelector.vue';
import SummaryFinance from '@/components/Summary/SummaryFinance.vue';
import DashFabSpeedDial from '@/components/Dashboard/DashFabSpeedDial.vue';
import RevenuesList from '@/components/Revenues/RevenuesList.vue';
import ExpensesList from '@/components/Expenses/ExpensesList.vue';

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

<template>
    <Container fluid class="mr-3">
        <MonthSelector @month-change="handleMonthChange"/>
        <SummaryFinance />
        <Divider class="!mt-10" />
        <DashFabSpeedDial />

        <Fieldset legend="Entradas" :toggleable="true" class="pb-1">
            <RevenuesList :date="currentMonth" />
        </Fieldset>

        <Fieldset legend="Saídas" :toggleable="true" class="pb-1">
            <ExpensesList :date="currentMonth" />
        </Fieldset>
    </Container>
</template>