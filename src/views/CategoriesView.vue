<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import { useCategoriesStore } from '@/stores/categories';
import type { Category } from '@/@types/Category';

import Container from '@/components/Common/Container.vue';
import HeaderViews from '@/components/Header/HeaderViews.vue';
import ManageCategoryDialog from '@/components/Categories/ManageCategoryDialog.vue';
import CategoryList from '@/components/Categories/CategoryList.vue';
import { useToast } from '@/composables/useToast';

const { createCategory } = useCategoriesStore();
const { showSuccess, showError } = useToast();

const loadingCreateDialog = ref(false);
const createDialogRef = useTemplateRef<InstanceType<typeof ManageCategoryDialog>>('createDialog');

const toggleCreateDialog = () => {
    createDialogRef.value!.visible = true;
}

async function create(category: Category) {
    loadingCreateDialog.value = true;

    try {
        await createCategory(category);
        showSuccess({
            message: 'Sucesso!',
            description: 'Categoria criada com sucesso.',
        })
    } catch (err: any) {
        showError({
            message: 'Erro ao criar categoria.',
            description: err.response?.data?.message || 'Ocorreu um erro inesperado.',
        });
    } finally {
        loadingCreateDialog.value = false;
    }
}
</script>

<template>
    <Container fluid>
        <HeaderViews 
            title="Categorias"
            subtitle="Gerencie suas categorias"
            hasFabButton
            fabButtonTitle="Adicionar categoria"
            :fabButtonClick="toggleCreateDialog"
        />

        <CategoryList />
    </Container>

    <ManageCategoryDialog
        ref="createDialog"
        :loading="loadingCreateDialog"
        :provider="create"
    />
</template>
