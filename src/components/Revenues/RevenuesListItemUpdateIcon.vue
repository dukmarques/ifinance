<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';
import type { RevenueModificationScope, Revenues } from '@/@types/Revenues';
import { useRevenuesStore } from '@/stores/revenues';
import ModificationsTypeDialog, { type ModificationsTypeItem } from '@/components/Common/ModificationsTypeDialog.vue';
import { useToast } from '@/composables/useToast';
import ManageRevenuesDialog from './ManageRevenuesDialog.vue';

const props = defineProps({
    revenue: {
        type: Object as () => Revenues,
        required: true,
    },
});

const { update } = useRevenuesStore();
const { showSuccess, showError } = useToast();

const modificationsTypeDialogRef = useTemplateRef<InstanceType<typeof ModificationsTypeDialog>>('modificationsTypeDialog');
const createRevenueDialogRef = useTemplateRef<InstanceType<typeof ManageRevenuesDialog>>('createRevenueDialog');    
const loadingUpdate = ref(false);
const updateScope = ref<RevenueModificationScope | undefined>(undefined);

const modificationsOptions = ref<Array<ModificationsTypeItem>>([
    {
        title: 'Apenas atual',
        severity: 'info',
        onClick: () => handleUpdateRevenue('only_month'),
    },
    {
        title: 'Atual e próximos meses',
        severity: 'warn',
        onClick: () => handleUpdateRevenue('current_month_and_followers'),
    },
    {
        title: 'Todos os meses',
        severity: 'danger',
        onClick: () => handleUpdateRevenue('all_month'),
    },
]);

function openDialog() {
    if (props.revenue.recurrent) {
        modificationsTypeDialogRef.value!.show();
        return;
    }

    createRevenueDialogRef.value?.show();
}

function handleUpdateRevenue(updateType: RevenueModificationScope) {
    updateScope.value = updateType;
    createRevenueDialogRef.value?.show();
}

async function handleSubmit(payload: Revenues) {
    try {
        loadingUpdate.value = true;
        await update(payload, updateScope.value || 'all_month');
        showSuccess({
            message: 'Sucesso!',
            description: 'A receita foi atualizada com sucesso.'
        })
    } catch (err) {
        const error = err as Error;
        showError({
            message: 'Erro!',
            description: error.message || 'Ocorreu um erro ao atualizar a receita.'
        })
    } finally {
        loadingUpdate.value = false;
    }
}
</script>

<template>
    <i 
        class="pi pi-pencil cursor-pointer hover:text-blue-700 transition-all duration-200" 
        @click="openDialog"
    ></i>

    <ModificationsTypeDialog
        ref="modificationsTypeDialog"
        title="Editar receita"
        description="Essa receita é recorrente, a depender da opção selecionada algumas informações não poderão ser alteradas."
        :options="modificationsOptions"
    />

    <ManageRevenuesDialog 
        ref="createRevenueDialog"
        :revenue="props.revenue"
        :loading="loadingUpdate"
        :provider="handleSubmit"
        :updateScope="updateScope"
    />
</template>