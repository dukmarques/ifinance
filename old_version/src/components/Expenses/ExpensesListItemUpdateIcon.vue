<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';
import { useExpensesStore } from '@/stores/expenses';
import ModificationsTypeDialog, { type ModificationsTypeItem } from '@/components/Common/ModificationsTypeDialog.vue';
import { useToast } from '@/composables/useToast';
import ManageExpensesDialog from '@/components/Expenses/ManageExpensesDialog.vue';
import type { Expense } from '@/@types/Expenses';
import type { ActionEditType } from '@/@types/ActionsTypes';

const props = defineProps({
    expense: {
        type: Object as () => Expense,
        required: true,
    },
});

const { update } = useExpensesStore();
const { showSuccess, showError } = useToast();

const modificationsTypeDialogRef = useTemplateRef<InstanceType<typeof ModificationsTypeDialog>>('modificationsTypeDialog');
const updateExpenseDialogRef = useTemplateRef<InstanceType<typeof ManageExpensesDialog>>('updateExpenseDialog');
const loadingUpdate = ref(false);
const updateType = ref<ActionEditType | undefined>(undefined);

const modificationsOptions = ref<Array<ModificationsTypeItem>>([
    {
        title: 'Apenas atual',
        severity: 'info',
        onClick: () => handleUpdateTypeRecurrentExpense('only_month'),
    },
    {
        title: 'Atual e próximos meses',
        severity: 'warn',
        onClick: () => handleUpdateTypeRecurrentExpense('current_and_future'),
    },
    {
        title: 'Todos os meses',
        severity: 'danger',
        onClick: () => handleUpdateTypeRecurrentExpense('all'),
    },
]);

function openUpdateDialog() {
    if (props.expense.recurrent && !props.expense.override) {
        modificationsTypeDialogRef.value!.show();
        return;
    }

    if (props.expense.override) {
        updateType.value = 'only_month';
    }

    updateExpenseDialogRef.value?.show();
}

function handleUpdateTypeRecurrentExpense(type: ActionEditType) {
    updateType.value = type;
    updateExpenseDialogRef.value?.show();
}

async function handleUpdateSubmit(payload: Expense) {
    try {
        loadingUpdate.value = true;
        await update(payload, updateType.value!);
        showSuccess({
            message: 'Sucesso!',
            description: 'Despesa atualizada com sucesso.'
        })
    } catch (err) {
        const error = err as Error;
        showError({
            message: 'Ocorreu um erro!',
            description: error.message || 'Erro ao atualizar despesa.'
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
        title="Editar Despesa"
        description="Essa despesa é recorrente, a depender da opção selecionada algumas informações não poderão ser alteradas."
        :options="modificationsOptions"
    />

    <ManageExpensesDialog 
        ref="updateExpenseDialog" 
        :title="'Atualizar Despesa'" 
        :expense="expense" 
        :isUpdateAction="true"
        :updateType="updateType"
        :provider="handleUpdateSubmit"
        :loading="loadingUpdate"
    />
</template>