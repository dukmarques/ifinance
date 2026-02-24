<script lang="ts" setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRevenuesStore } from '@/stores/revenues';
import { formatCurrency } from '@/helpers/currencyFormat';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import RevenuesListItemUpdateIcon from '@/components/Revenues/RevenuesListItemUpdateIcon.vue';
import RevenuesListItemDeleteIcon from '@/components/Revenues/RevenuesListItemDeleteIcon.vue';
import RevenuesListItemOverrideHistory from '@/components/Revenues/RevenuesListItemOverrideHistory.vue';

const { revenues, loading } = storeToRefs(useRevenuesStore());
const expandedRows = ref({});
</script>

<template>
    <DataTable 
        v-if="revenues.length > 0"
        v-model:expandedRows="expandedRows"
        :value="revenues" 
        dataKey="id"
        size="large"
        removableSort
        :loading="loading"
    >
        <Column expander style="width: 5rem" />

        <Column field="title" header="Título" sortable>
            <template #body="{ data }">
                <span>{{ data.override?.title ? data.override?.title : data.title }}</span>
            </template>
        </Column>

        <Column field="amount" header="Valor" sortable>
            <template #body="{ data }">
                <span>{{ data.override?.amount ? formatCurrency(data.override?.amount) : formatCurrency(data.amount) }}</span>
            </template>
        </Column>

        <Column field="recurrent" header="Receita fixa" sortable>
            <template #body="{ data }">
                <span>{{ data.recurrent ? 'Sim' : 'Não' }}</span>
            </template>
        </Column>

        <Column field="category" header="Categoria" sortable>
            <template #body="{ data }">
                <Tag v-if="data.category" :value="data.category?.name" severity="info" />
            </template>
        </Column>

        <Column header="Ações">
            <template #body="{ data }">
                <div class="flex gap-5">
                    <RevenuesListItemUpdateIcon :revenue="data" />
                    <RevenuesListItemDeleteIcon :revenue="data" />
                    <RevenuesListItemOverrideHistory v-if="data.override" :revenue="data" />
                </div>
            </template>
        </Column>

        <template #expansion="{ data }">
            <Card 
                class="!bg-surface-800"
                :pt="{
                    root: { class: 'rounded' },
                    body: { class: '!p-3' },
                }"
            >
                <template #content>
                    <span>{{ data.override?.description ? data.override?.description : data.description }}</span>
                </template>
            </Card>
        </template>
    </DataTable>

    <div v-else class="flex pt-4">
        <span class="text-center">Nenhum dado disponível</span>
    </div>
</template>