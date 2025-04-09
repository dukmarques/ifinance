<template>
    <v-container
        fluid
        class="ml-5"
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
        v-model="createDialog"
        :loading="loadingCreateDialog"
        :provider="create"
        @close="toggleCreateDialog()"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useCategoriesStore } from '@/stores/categories';
import type { Category } from '@/@types/Category';

import HeaderViews from '@/components/Header/HeaderViews.vue';
import ManageCategoryDialog from '@/components/Categories/ManageCategoryDialog.vue';
import CategoryItem from '@/components/Categories/CategoryItem.vue';

const { categories, loading } = storeToRefs(useCategoriesStore());
const { fetchCategories, createCategory } = useCategoriesStore();

const createDialog = ref(false);
const loadingCreateDialog = ref(false);

const toggleCreateDialog = () => {
    createDialog.value = !createDialog.value;
}

fetchCategories();

async function create(category: Category) {
    loadingCreateDialog.value = true;

    try {
        await createCategory(category);
        createDialog.value = false;
    } finally {
        loadingCreateDialog.value = false;
    }
}


</script>
