<template>
    <VContainer fluid>
        <Summary />

        <v-divider thickness="1" class="mt-7 mb-7"/>

        <ExpasionPanels />
        <ExpasionPanels />
        <ExpasionPanels />

        <FabSpeedDial />
    </VContainer>
</template>

<script setup lang="ts">
import ExpasionPanels from '@/components/Dashboard/ExpasionPanels.vue';
import Summary from '@/components/Summary/SummaryFinance.vue';
import FabSpeedDial from '@/components/form/FabSpeedDial.vue';
</script>