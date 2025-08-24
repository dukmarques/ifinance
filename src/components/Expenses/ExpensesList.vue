<script lang="ts" setup>
import { formatCurrency } from '@/helpers/currencyFormat';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import { toRef, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useExpensesStore } from '@/stores/expenses';

const props = defineProps({
    date: {
        type: [
            String, Date
        ],
        required: true,
        default: () => new Date(),
    },
});

const { getTotalExpensesAmount } = storeToRefs(useExpensesStore());
const { fetchExpenses } = useExpensesStore();

const selectedDate = toRef(props, 'date');
watch(
    () => selectedDate.value,
    (newDate) => {
        fetchExpenses(newDate);
    },
);
</script>

<template>
    <Accordion>
        <AccordionPanel
            value="0" 
            :pt="{ root: { style: { borderBottom: 'none' } } }"
            class="!bg-surface-800 !rounded-lg mt-5"
        >
            <AccordionHeader class="!bg-surface-800">
                <div class="w-full flex justify-between items-center mr-5">
                    <div>
                        <i class="pi pi-arrow-down"></i>
                        Despesas
                    </div>
                    <span>Total: - {{ formatCurrency(getTotalExpensesAmount) }}</span>
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
                
            </AccordionContent>
        </AccordionPanel>
    </Accordion>
</template>