<script lang="ts" setup>
import { ref, toRef, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRevenuesStore } from '@/stores/revenues';
import { formatCurrency } from '@/helpers/currencyFormat';
import type { Revenues } from '@/@types/Revenues';

import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const props = defineProps({
    date: {
        type: [
            String, Date
        ],
        required: true,
        default: () => new Date(),
    },
});

const selectedDate = toRef(props, 'date');
watch(
    () => selectedDate.value,
    (newDate) => {
        useRevenues.fetchRevenues(newDate);
    },
);

const { revenues, loading, getTotalRevenuesAmount } = storeToRefs(useRevenuesStore());
const useRevenues = useRevenuesStore();

const expandedRows = ref({});

async function onEdit(revenue: Revenues) {
    console.log('Editing revenue:', revenue);
}

async function onDelete(revenue: Revenues) {
    console.log('Deleting revenue:', revenue);
}
</script>

<template>
    <Accordion>
        <AccordionPanel
            value="0" 
            :pt="{ root: { style: { borderBottom: 'none' } } }"
            class="!bg-surface-800 !rounded-lg"
        >
            <AccordionHeader class="!bg-surface-800">
                <div class="w-full flex justify-between items-center mr-5">
                    <div>
                        <i class="pi pi-arrow-up"></i>
                        Entradas
                    </div>
                    <span>Total: {{ formatCurrency(getTotalRevenuesAmount) }}</span>
                </div>
            </AccordionHeader>

            <AccordionContent 
                class="rounded-sm "
                :pt="{
                    content: { 
                        class: '!border-[1px] !border-surface-800 !border-t-0 !rounded-lg',
                    }
                }"
            >
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
                                <i 
                                    class="pi pi-trash cursor-pointer hover:text-red-700 transition-all duration-200" 
                                    @click="onDelete(data)"
                                ></i>
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
            </AccordionContent>
        </AccordionPanel>
    </Accordion>
</template>