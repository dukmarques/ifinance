<script lang="ts" setup>
import { toRef, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRevenuesStore } from '@/stores/revenues';
import { formatCurrency } from '@/helpers/currencyFormat';

import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import RevenuesListItems from '@/components/Revenues/RevenuesListItems.vue';

const props = defineProps({
    date: {
        type: [
            String, Date
        ],
        required: true,
        default: () => new Date(),
    },
});

const { getTotalRevenuesAmount } = storeToRefs(useRevenuesStore());
const { fetchRevenues } = useRevenuesStore();

const selectedDate = toRef(props, 'date');
watch(
    () => selectedDate.value,
    (newDate) => {
        fetchRevenues(newDate);
    },
);
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
                <RevenuesListItems />
            </AccordionContent>
        </AccordionPanel>
    </Accordion>
</template>