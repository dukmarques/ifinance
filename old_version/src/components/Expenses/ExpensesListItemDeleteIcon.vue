<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';
import type { Expense } from '@/@types/Expenses';
import { useExpensesStore } from '@/stores/expenses';
import ModificationsTypeDialog, { type ModificationsTypeItem } from '@/components/Common/ModificationsTypeDialog.vue';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from '@/composables/useToast';

const props = defineProps({
    expense: {
        type: Object as () => Expense,
        required: true,
    },
});

const { delete: deleteExpense } = useExpensesStore();

const modificationsDialogRef = useTemplateRef<InstanceType<typeof ModificationsTypeDialog>>('modificationsDialog');
const confirmDialog = useConfirm();
const { showSuccess, showError } = useToast();

const modificationsOptions = ref<Array<ModificationsTypeItem>>([
    {
        title: 'Apenas atual',
        severity: 'info',
        onClick: () => deleteExpense(props.expense.id, 'only_month'),
    },
    {
        title: 'Atual e próximos meses',
        severity: 'warn',
        onClick: () => deleteExpense(props.expense.id, 'current_and_future'),
    },
    {
        title: 'Todos os meses',
        severity: 'danger',
        onClick: () => deleteExpense(props.expense.id, 'all'),
    },
]);

async function onDelete() {
    if (props.expense.recurrent) {
        modificationsDialogRef.value!.show();
        return;
    }

    confirmDialog.require({
        message: 'Você tem certeza que deseja excluir esta receita?',
        header: `Excluir despesa: ${props.expense.title}`,
        acceptLabel: 'Excluir',
        rejectLabel: 'Cancelar',
        acceptClass: 'p-button-danger',
        acceptProps: {
            icon: 'pi pi-trash',
        },
        accept: () => deleteExpense(props.expense.id, 'all')
            .then(() => {
                showSuccess({ message: 'Sucesso!', description: 'Despesa excluída com sucesso' });
            }).catch((err: any) => {
                showError({ message: 'Erro ao excluir despesa', description: err.response?.data?.message });
            }),
    });
}

</script>

<template>
    <i 
        class="pi pi-trash cursor-pointer hover:text-red-700 transition-all duration-200" 
        @click="onDelete()"
    ></i>
    <ModificationsTypeDialog
        ref="modificationsDialog"
        title="Apagar despesa?"
        description="Essa despesa é recorrente, você pode excluir apenas no mês atual, atual e próximas ou todos os registros."
        :options="modificationsOptions"
    />
</template>