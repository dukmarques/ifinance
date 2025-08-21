<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';
import type { MenuItem } from 'primevue/menuitem';
import type { Revenues } from '@/@types/Revenues';
import { useRevenuesStore } from '@/stores/revenues';
import { useToast } from '@/composables/useToast';
import BaseFabSpeedDial from '../BaseForm/BaseFabSpeedDial.vue';
import ManageRevenuesDialog from '@/components/Revenues/ManageRevenuesDialog.vue';

const createRevenueDialogRef = useTemplateRef<InstanceType<typeof ManageRevenuesDialog>>('createRevenueDialog');

const items = ref<MenuItem[]>([
    {
        label: 'Adicionar entrada',
        icon: 'pi pi-arrow-up',
        command: () => createRevenueDialogRef.value!.visible = true,
    },
    {
        label: 'Adicionar saída',
        icon: 'pi pi-arrow-down-right',
        command: () => console.log('Adicionar saída'),
    },
    {
        label: 'Adicionar saída de cartão',
        icon: 'pi pi-credit-card',
        command: () => console.log('Adicionar saída de cartão'),
    },
]);

const { showSuccess, showError } = useToast();
const loadingCreateRevenue = ref(false);
const revenueStore = useRevenuesStore();

async function handleCreateRevenue(revenue: Revenues) {
    try {
        loadingCreateRevenue.value = true;
        await revenueStore.create(revenue);
        showSuccess({
            message: 'Sucesso!',
            description: 'Receita adicionada com sucesso.'
        })
    } catch (err) {
        const error = err as Error;
        showError({
            message: 'Ocorreu um erro!',
            description: error.message || 'Erro ao adicionar receita.'
        })
    } finally {
        loadingCreateRevenue.value = false;
    }
}
</script>

<template>
    <BaseFabSpeedDial
        :items="items"
        direction="up-left"
        type="quarter-circle"
        :radius="70"
        class="!fixed bottom-5 right-3"
    />

    <ManageRevenuesDialog 
        ref="createRevenueDialog"
        :loading="loadingCreateRevenue"
        :provider="handleCreateRevenue"
    />
</template>