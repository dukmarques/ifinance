<script lang="ts" setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import type { Revenues } from '@/@types/Revenues';
import { useRevenuesStore } from '@/stores/revenues';
import { formatCurrency } from '@/helpers/currencyFormat';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import RevenuesListItemDeleteIcon from './RevenuesListItemDeleteIcon.vue';

const { revenues, loading } = storeToRefs(useRevenuesStore());
const { update } = useRevenuesStore();

const expandedRows = ref({});

async function onEdit(revenue: Revenues) {
    // TODO: em receitas recorrentes com deprecated_date, exibir o input do deprecated_date,
    // para caso usuário deseje alterar até quando a receita será recorrente
    console.log('Editing revenue:', revenue);
}
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
        <Column field="title" header="Título" sortable></Column>

        <Column field="amount" header="Valor" sortable>
            <template #body="{ data }">
                <span>{{ formatCurrency(data.amount) }}</span>
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
                    <i 
                        class="pi pi-pencil cursor-pointer hover:text-blue-700 transition-all duration-200" 
                        @click="onEdit(data)"
                    ></i>
                    <RevenuesListItemDeleteIcon :revenue="data" />
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
                    <span>{{ data.description }}</span>
                </template>
            </Card>
        </template>
    </DataTable>

    <div v-else class="flex pt-4">
        <span class="text-center">Nenhum dado disponível</span>
    </div>
</template>