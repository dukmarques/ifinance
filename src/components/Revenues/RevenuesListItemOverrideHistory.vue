<script lang="ts" setup>
import type { Revenues } from '@/@types/Revenues';
import { ref, type PropType } from 'vue';

import Dialog from 'primevue/dialog';
import Fieldset from 'primevue/fieldset';
import { formatCurrency } from '@/helpers/currencyFormat';
import { formatDateToMMYY } from '@/helpers/dateFormat';

const props = defineProps({
    revenue: {
        type: Object as PropType<Revenues>,
        required: true,
    }
});

const visible = ref(false);

const toggleVisible = () => {
    visible.value = !visible.value;
};
</script>

<template>
    <i 
        class="pi pi-file-excel cursor-pointer hover:text-amber-600 transition-all duration-200"
        @click="toggleVisible"    
    ></i>

    <Dialog 
        v-model:visible="visible" 
        modal 
        header="Histórico da Receita"
        class="w-2xl"
    >
        <Fieldset legend="Receita original" :toggleable="true">
            <ul class="flex flex-col gap-2">
                <li class="flex justify-start items-center gap-1">
                    <strong>Nome:</strong>
                    <Tag severity="warn" :value="props.revenue.title" />
                </li>

                <li class="flex justify-start items-center gap-1">
                    <strong>Valor:</strong>
                    <Tag severity="warn" :value="formatCurrency(props.revenue.amount)" />
                </li>

                <li class="flex justify-start items-center gap-1">
                    <strong>Data de computação:</strong>
                    <Tag severity="warn" :value="formatDateToMMYY(props.revenue.receiving_date)" />
                </li>

                <li class="flex flex-col justify-start items-start gap-1">
                    <strong>Descrição:</strong>
                    <span class="w-full border-[1px] border-gray-700 !rounded !p-3 text-justify">{{ props.revenue.description }}</span>
                </li>
            </ul>
        </Fieldset>

        <Fieldset class="mt-1" legend="Dados sobrescritos no mês atual" :toggleable="true">
            <ul class="flex flex-col gap-2">
                <li v-if="props.revenue.override?.title" class="flex justify-start items-center gap-1">
                    <strong>Nome:</strong>
                    <Tag severity="info" :value="props.revenue.override?.title" />
                </li>

                <li v-if="props.revenue.override?.amount" class="flex justify-start items-center gap-1">
                    <strong>Valor:</strong>
                    <Tag severity="info" :value="formatCurrency(props.revenue.override?.amount)" />
                </li>

                <li class="flex justify-start items-center gap-1">
                    <strong>Data de computação:</strong>
                    <Tag severity="info" :value="formatDateToMMYY(props.revenue.override?.receiving_date!)" />
                </li>

                <li v-if="props.revenue.override?.description" class="flex flex-col justify-start items-start gap-1">
                    <strong>Descrição:</strong>
                    <span class="w-full border-[1px] border-gray-700 !rounded !p-3 text-justify">{{ props.revenue.override?.description }}</span>
                </li>
            </ul>
        </Fieldset>
    </Dialog>

</template>