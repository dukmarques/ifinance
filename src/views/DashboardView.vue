<template>
    <VContainer>
        <v-row>
            <HeaderViews 
                title="Overview" 
                subtitle="Resumo dos seus gastos"
            />
        </v-row>

        <Summary />
    </VContainer>
</template>

<script setup lang="ts">
import HeaderViews from '@/components/Header/HeaderViews.vue';
import Summary from '@/components/Summary/SummaryFinance.vue';
</script>