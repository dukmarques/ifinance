<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';
import type { RevenueModificationTypes, Revenues } from '@/@types/Revenues';
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
const updateRevenueDialogRef = useTemplateRef<InstanceType<typeof ManageRevenuesDialog>>('updateRevenueDialog');
const loadingUpdate = ref(false);
const updateType = ref<RevenueModificationTypes | undefined>(undefined);

const modificationsOptions = ref<Array<ModificationsTypeItem>>([
    {
        title: 'Apenas atual',
        severity: 'info',
        onClick: () => handleUpdateTypeRecurrentRevenue('only_month'),
    },
    {
        title: 'Atual e próximos meses',
        severity: 'warn',
        onClick: () => handleUpdateTypeRecurrentRevenue('current_month_and_followers'),
    },
    {
        title: 'Todos os meses',
        severity: 'danger',
        onClick: () => handleUpdateTypeRecurrentRevenue('all_month'),
    },
]);

function openUpdateDialog() {
    if (props.revenue.recurrent && !props.revenue.override) {
        modificationsTypeDialogRef.value!.show();
        return;
    }

    if (props.revenue.override) {
        updateType.value = 'only_month';
    }

    updateRevenueDialogRef.value?.show();
}

function handleUpdateTypeRecurrentRevenue(type: RevenueModificationTypes) {
    updateType.value = type;
    updateRevenueDialogRef.value?.show();
}

async function handleUpdateSubmit(payload: Revenues) {
    try {
        loadingUpdate.value = true;
        await update(payload, updateType.value || 'all_month');
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
        @click="openUpdateDialog"
    ></i>

    <ModificationsTypeDialog
        ref="modificationsTypeDialog"
        title="Editar receita"
        description="Essa receita é recorrente, a depender da opção selecionada algumas informações não poderão ser alteradas."
        :options="modificationsOptions"
    />

    <ManageRevenuesDialog 
        ref="updateRevenueDialog"
        :revenue="props.revenue"
        :loading="loadingUpdate"
        :provider="handleUpdateSubmit"
        isUpdateAction
        :updateType="updateType"
    />
</template>