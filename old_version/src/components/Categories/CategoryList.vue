<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useCategoriesStore } from '@/stores/categories';
import DataView from 'primevue/dataview';
import CategoryListItem from '@/components/Categories/CategoryListItem.vue';
import type { Category } from '@/@types/Category';
import CategoryListItemSkeleton from '@/components/Categories/CategoryListItemSkeleton.vue';

const { categories, loading } = storeToRefs(useCategoriesStore());
const { fetchCategories } = useCategoriesStore();

fetchCategories();
</script>

<template>
    <DataView 
        :value="categories as Category[]"
        layout="grid"
        :pt="{
            content: {
                class: 'bg-transparent',
            },
        }"
    >
        <template #grid="slotProps">
            <div class="grid grid-cols-12 gap-4 p-2">
                <div 
                    v-for="(item, index) in slotProps.items as Category[]" 
                    :key="index" 
                    class="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
                >
                    <CategoryListItemSkeleton 
                        v-if="loading"
                    />

                    <CategoryListItem
                        v-else
                        :category="item"
                        :loading="loading"
                    />
                </div>
            </div>
        </template>
    </DataView>
</template>