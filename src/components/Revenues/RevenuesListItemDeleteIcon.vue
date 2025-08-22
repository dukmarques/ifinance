<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';
import type { Revenues } from '@/@types/Revenues';
import { useRevenuesStore } from '@/stores/revenues';
import ModificationsTypeDialog, { type ModificationsTypeItem } from '@/components/Common/ModificationsTypeDialog.vue';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from '@/composables/useToast';

const props = defineProps({
    revenue: {
        type: Object as () => Revenues,
        required: true,
    },
});

const { delete: deleteRevenue } = useRevenuesStore();

const modificationsDialogRef = useTemplateRef<InstanceType<typeof ModificationsTypeDialog>>('modificationsDialog');
const confirmDialog = useConfirm();
const { showSuccess, showError } = useToast();

const modificationsOptions = ref<Array<ModificationsTypeItem>>([
    {
        title: 'Apenas atual',
        severity: 'info',
        onClick: () => deleteRevenue(props.revenue.id, 'only_month'),
    },
    {
        title: 'Atual e próximos meses',
        severity: 'warn',
        onClick: () => deleteRevenue(props.revenue.id, 'current_month_and_followers'),
    },
    {
        title: 'Todos os meses',
        severity: 'danger',
        onClick: () => deleteRevenue(props.revenue.id, 'all_month'),
    },
]);

async function onDelete() {
    if (props.revenue.recurrent) {
        modificationsDialogRef.value!.show();
        return;
    }

    confirmDialog.require({
        message: 'Você tem certeza que deseja excluir esta receita?',
        header: `Excluir receita: ${props.revenue.title}`,
        acceptLabel: 'Excluir',
        rejectLabel: 'Cancelar',
        acceptClass: 'p-button-danger',
        acceptProps: {
            icon: 'pi pi-trash',
        },
        accept: () => deleteRevenue(props.revenue.id)
            .then(() => {
                showSuccess({ message: 'Sucesso!', description: 'Receita excluída com sucesso' });
            }).catch((err: any) => {
                showError({ message: 'Erro ao excluir receita', description: err.response?.data?.message });
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
        title="Apagar receita?"
        description="Essa receita é recorrente, você pode excluir apenas no mês atual, atual e próximas ou todos os registros."
        :options="modificationsOptions"
    />
</template>