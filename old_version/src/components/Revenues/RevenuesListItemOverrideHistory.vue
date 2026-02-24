<script lang="ts" setup>
import type { Revenues } from '@/@types/Revenues';
import { ref, type PropType } from 'vue';

import Dialog from 'primevue/dialog';
import Fieldset from 'primevue/fieldset';
import { formatCurrency } from '@/helpers/currencyFormat';

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
        <Fieldset legend="Histórico da receita">
            <ul class="flex flex-col gap-2">
                <li class="flex flex-col justify-start items-center gap-2">
                    <strong>Nome:</strong>
                    <div class="flex justify-start items-center gap-2">
                        <Tag severity="warn" :value="props.revenue.title" />
                        <i v-if="props.revenue.override?.title" class="pi pi-arrow-right"></i>
                        <Tag v-if="props.revenue.override?.title" severity="info" :value="props.revenue.override?.title" />
                    </div>
                </li>

                <Divider class="!my-0" />

                <li class="flex flex-col justify-start items-center gap-2">
                    <strong>Valor:</strong>
                    <div class="flex justify-start items-center gap-2">
                        <Tag severity="warn" :value="formatCurrency(props.revenue.amount)" />
                        <i v-if="props.revenue.override?.amount" class="pi pi-arrow-right"></i>
                        <Tag v-if="props.revenue.override?.amount" severity="info" :value="formatCurrency(props.revenue.override?.amount!)" />
                    </div>
                </li>

                <Divider class="!my-0" />

                <li class="flex flex-col justify-start items-center gap-2">
                    <strong>Descrição:</strong>
                    <div class="h-72 flex justify-start items-center gap-2">
                        <span class="w-full h-full border-[1px] border-gray-700 !rounded !p-3 text-justify">{{ props.revenue.description }}</span>
                        <i v-if="props.revenue.override?.description" class="pi pi-arrow-right"></i>
                        <span v-if="props.revenue.override?.description" class="w-full h-full border-[1px] border-gray-700 !rounded !p-3 text-justify">{{ props.revenue.override?.description }}</span>
                    </div>
                </li>
            </ul>
        </Fieldset>
    </Dialog>

</template>