<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import { storeToRefs } from 'pinia';
import { useCategoriesStore } from '@/stores/categories';
import type { Category } from '@/@types/Category';

import Container from '@/components/Common/Container.vue';
import HeaderViews from '@/components/Header/HeaderViews.vue';
import ManageCategoryDialog from '@/components/Categories/ManageCategoryDialog.vue';
import CategoryItem from '@/components/Categories/CategoryItem.vue';
import CategoryList from '@/components/Categories/CategoryList.vue';
import { useToast } from '@/composables/useToast';

const { categories, loading } = storeToRefs(useCategoriesStore());
const { fetchCategories, createCategory } = useCategoriesStore();
const { showSuccess, showError } = useToast();

const loadingCreateDialog = ref(false);
const createDialogRef = useTemplateRef('createDialog')

const toggleCreateDialog = () => {
    createDialogRef.value!.visible = true;
}

fetchCategories();

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

// Remove soon
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const isOld = ref(false);

watch(() => route.query, (newQuery) => {
    isOld.value = newQuery.old === 'true';
}, { immediate: true, deep: true });

onMounted(() => {
    isOld.value = route.query.old === 'true';
});
// Remove soon

</script>


<template>
    <Container v-if="!isOld" fluid>
        <HeaderViews 
            title="Categorias"
            subtitle="Aqui estão todas as suas categorias"
            hasFabButton
            fabButtonTitle="Adicionar categoria"
            :fabButtonClick="toggleCreateDialog"
        />

        <CategoryList :categories="categories" />
    </Container>

    <v-container
        fluid
        class="ml-5"
        style="border: 1px solid red;"
        v-else
    >
        <v-row>
            <HeaderViews
                title="Categorias"
                subtitle="Aqui estão todas as suas categorias"
                hasFabButton
                fabButtonTitle="Adicionar categoria"
                :fabButtonClick="toggleCreateDialog"
            />
        </v-row>

        <v-row>
            <v-col cols="12">
                <CategoryItem 
                    v-for="category in categories"
                    :key="category.id"
                    :category="category"
                    :loading="loading"
                />
            </v-col>
        </v-row>
    </v-container>

    <ManageCategoryDialog
        ref="createDialog"
        :loading="loadingCreateDialog"
        :provider="create"
    />

</template>
