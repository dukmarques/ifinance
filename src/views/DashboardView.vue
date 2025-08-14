<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import FabSpeedDial from '@/components/form/FabSpeedDial.vue';
import Revenues from '@/components/Revenues/RevenuesList.vue';
import { useRoute } from 'vue-router';
import Container from '@/components/Common/Container.vue';
import MonthSelector from '@/components/Summary/MonthSelector.vue';
import SummaryFinance from '@/components/Summary/SummaryFinance.vue';
import BaseFabSpeedDial from '@/components/BaseForm/BaseFabSpeedDial.vue';
import type { MenuItem } from 'primevue/menuitem';

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

// Remove soon
const route = useRoute();
const isOld = ref(false);

watch(() => route.query, (newQuery) => {
    isOld.value = newQuery.old === 'true';
}, { immediate: true, deep: true });

onMounted(() => {
    isOld.value = route.query.old === 'true';
});

const items = ref<MenuItem[]>([
    {
        label: 'Adicionar entrada',
        icon: 'pi pi-arrow-up-right',
        command: () => console.log('Adicionar entrada'),
    },
    {
        label: 'Adicionar saída',
        icon: 'pi pi-arrow-down-right',
        command: () => console.log('Adicionar saída'),
    },
    {
        label: 'Adicionar saída de cartão',
        icon: 'pi pi-credit-card',
        command: () => console.log('Adicionar saída de cartão'),
    },
])
// Remove soon
</script>

<template>
    <Container v-if="!isOld" fluid>
        <MonthSelector @month-change="handleMonthChange"/>
        <SummaryFinance />
        <Divider class="mt-10 mb-10" />

        <BaseFabSpeedDial
            :items="items"
            direction="up-left"
            type="quarter-circle"
            :radius="70"
            class="!fixed bottom-5 right-3"
        />
    </Container>
    
    <VContainer v-else fluid>
        <MonthSelector @month-change="handleMonthChange"/>
        <SummaryFinance />

        <v-divider class="mt-7 mb-7 mx-auto" thickness="1" />

        <Revenues :date="currentMonth" />

        <FabSpeedDial />
    </VContainer>
</template>