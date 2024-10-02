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
            <v-col
                v-for="category in categories"
                :key="category.id"
                cols="12"
            >
                {{ category }}
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useCategoriesStore } from '@/stores/categories';
import type { Category } from '@/types/Category';

import HeaderViews from '@/components/Header/HeaderViews.vue';

const { categories, loading } = storeToRefs(useCategoriesStore());
const { fetchCategories, createCategory } = useCategoriesStore();

const createDialog = ref(false);
const loadingDialog = ref(false);

const toggleCreateDialog = () => {
    createDialog.value = !createDialog.value;
}

fetchCategories();

async function create(category: Category) {
    loadingDialog.value = true;

    try {
        await createCategory(category);
        createDialog.value = false;
    } finally {
        loadingDialog.value = false;
    }
}
</script>
