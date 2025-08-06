<script lang="ts" setup>
import type { Category } from '@/@types/Category';
import DataView from 'primevue/dataview';
import type { PropType } from 'vue';
import Tag from 'primevue/tag';
import BaseButton from '@/components/BaseForm/BaseButton.vue';
import { useNavigationStore } from '@/stores/navigation';

defineProps({
    categories: {
        type: Array as PropType<Category[]>,
        required: true,
    },
});

const navigation = useNavigationStore();
</script>

<template>
    <DataView 
        :value="categories as Category[]"
        layout="grid"
        :pt="{
            content: {
                class: 'bg-transparent',
            },
        }"
    >
        <template #grid="slotProps">
            <div class="grid grid-cols-12 gap-4 p-2">
                <div 
                    v-for="(item, index) in slotProps.items as Category[]" 
                    :key="index" 
                    :class="[
                        'col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3',
                        !navigation.isDarkMode ? '!border !border-surface-400 !rounded-sm' : ''
                    ]"
                >
                    <div class="!p-6 relative flex justify-between gap-2 border rounded">
                        <div class="flex justify-center items-center gap-2">
                            <i class="pi pi-tag" />
                            <span class="text-lg text-center">{{ item.name }}</span>
                        </div>

                        <div class="flex flex-col justify-around gap-1">
                            <Tag class="text-sm !w-auto !text-[12px]" severity="success" :value="`Receitas: ${item.revenues_count}`"></Tag>
                            <Tag class="text-sm !w-auto !text-[12px]" severity="danger" :value="`Despesas: ${item.expenses_count}`"></Tag>
                            <Tag class="text-sm !w-auto !text-[12px]" severity="warn" :value="`Cartões: ${item.card_expenses_count}`"></Tag>
                        </div>

                        <div class="flex justify-center items-center absolute bottom-1 left-4">
                            <BaseButton 
                                label=""
                                severity="success"
                                size="small"
                                icon="pi pi-pencil"
                                @click="() => console.log('Edit', item)"
                            />

                            <BaseButton 
                                label=""
                                severity="danger"
                                size="small"
                                icon="pi pi-trash"
                                @click="() => console.log('Delete', item)"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </DataView>
</template>