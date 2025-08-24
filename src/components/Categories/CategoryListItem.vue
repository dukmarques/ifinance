<script lang="ts" setup>
import type { Category } from '@/@types/Category';
import { useTemplateRef, type PropType } from 'vue';
import ManageCategoryDialog from '@/components/Categories/ManageCategoryDialog.vue';
import { useCategoriesStore } from '@/stores/categories';
import { useToast } from '@/composables/useToast';

import { useConfirm } from "primevue/useconfirm";

const props = defineProps({
    category: {
        type: Object as PropType<Category>,
        required: true,
    },
    loading: {
        type: Boolean,
        default: false,
    },
});

const { showSuccess, showError } = useToast();
const confirmDialog = useConfirm();
const updateDialogRef = useTemplateRef<InstanceType<typeof ManageCategoryDialog>>('updateDialog');
const { updateCategory, deleteCategory } = useCategoriesStore();

const toggleUpdateDialog = () => updateDialogRef.value!.visible = true;

async function update(name: Object) {
    try {
        const payload = { ...props.category, ...name };
        await updateCategory(payload);
        showSuccess({
            message: 'Sucesso!',
            description: 'Categoria atualizada com sucesso.',
        });
    } catch (err: any) {
        showError({
            message: 'Erro ao atualizar categoria.',
            description: err.response?.data?.message || 'Ocorreu um erro inesperado.',
        });
    }
}

const confirmDelete = () => {
    confirmDialog.require({
        message: 'Você tem certeza que deseja remover esta categoria?',
        header: 'Confirmação',
        rejectProps: {
            label: 'Cancelar',
            severity: 'secondary',
        },
        acceptProps: {
            label: 'Remover',
            severity: 'danger',
            icon: 'pi pi-trash',
        },
        accept: () => deleteCategory(props.category.id).then(() => {
            showSuccess({
                message: 'Sucesso!',
                description: 'Categoria removida com sucesso.',
            });
        }).catch((err: any) => {
            showError({
                message: 'Erro ao remover categoria.',
                description: err.response?.data?.message || 'Ocorreu um erro inesperado.',
            });
        }),
    })
}
</script>

<template>
    <div class="!p-3 relative flex flex-col justify-between items-start gap-2 border rounded border-surface-700">
        <div class="flex justify-center items-center gap-2">
            <i class="pi pi-tag" />
            <span class="text-lg text-center">{{ category.name }}</span>
        </div>

        <div class="w-full flex justify-between gap-1">
            <Tag class="text-sm !w-auto !text-[12px]" severity="success" :value="`Receitas: ${category.revenues_count}`"></Tag>
            <Tag class="text-sm !w-auto !text-[12px]" severity="danger" :value="`Despesas: ${category.expenses_count}`"></Tag>
            <Tag class="text-sm !w-auto !text-[12px]" severity="warn" :value="`Cartões: ${category.card_expenses_count}`"></Tag>
        </div>

        <div class="flex justify-center items-center gap-1 absolute top-1 right-1">
            <BaseButton 
                label=""
                severity="success"
                size="small"
                icon="pi pi-pencil"
                @click="toggleUpdateDialog"
                variant="text"
            />

            <BaseButton 
                label=""
                severity="danger"
                size="small"
                icon="pi pi-trash"
                @click="confirmDelete"
                variant="text"
            />
        </div>
    </div>

    <ManageCategoryDialog
        ref="updateDialog"
        title="Editar categoria"
        :category="category"
        :loading="loading"
        :provider="update"
    />
</template>