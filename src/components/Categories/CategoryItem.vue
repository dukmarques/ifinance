<template>
    <v-list v-if="!loading" class="mb-2" elevation="5" width="97%">
        <v-list-item :title="category.name" :subtitle="totalExpenses">
            <template v-slot:append>
                <div class="actions mr-5">
                    <v-btn 
                        icon="fas fa-pen" 
                        variant="plain"
                        @click.stop="toggleUpdateDialog()"
                        size="small"
                        color="primary"
                        class="mr-2"
                    ></v-btn>
    
                    <v-btn 
                        icon="fas fa-trash-alt" 
                        density="compact" 
                        variant="plain"
                        @click.stop="toggleShowConfirmDialog()"
                        size="small"
                        color="red"
                    ></v-btn>
                </div>
            </template>
        </v-list-item>
    </v-list>

    <v-skeleton-loader
        v-else
        type="list-item-two-line"
        class="mb-2"
        width="97%"
    ></v-skeleton-loader>

    <ManageCategoryDialog
        v-model="updateDialog"
        title="Editar categoria"
        :category="category"
        :loading="updateLoadingDialog"
        :provider="update"
        @close="toggleUpdateDialog()"
    />

    <ConfirmDialog
        v-model="showConfirmDialog"
        title="Excluir categoria"
        message="Tem certeza que deseja excluir essa categoria?"
        @confirm="remove"
        :loading="loadingRemoveDialog"
    />
</template>

<script setup lang="ts">
import { ref, defineProps, computed } from 'vue';
import { useCategoriesStore } from '@/stores/categories';
import type { Category } from '@/types/Category';
import ManageCategoryDialog from '@/components/Categories/ManageCategoryDialog.vue';
import ConfirmDialog from '@/components/form/ConfirmDialog.vue';

const { updateCategory, deleteCategory } = useCategoriesStore();

const props = defineProps({
    loading: {
        type: Boolean,
        default: false,
    },
    category: {
        type: Object as () => Category,
        required: true,
    },
});
const totalExpenses = computed(() => {
    const total = props.category.card_expenses_count + props.category.expenses_count;
    return `${total} despesa${total > 1 ? 's' : ''}`;
});

const updateDialog = ref(false);
const updateLoadingDialog = ref(false);

function toggleUpdateDialog() {
    updateDialog.value = !updateDialog.value;
}

async function update(category: Category) {
    updateLoadingDialog.value = true;

    try {
        await updateCategory(category);
        updateDialog.value = false;
    } finally {
        updateLoadingDialog.value = false;
        toggleUpdateDialog();
    }
}

const showConfirmDialog = ref(false);
const loadingRemoveDialog = ref(false);

function toggleShowConfirmDialog() {
    showConfirmDialog.value = !showConfirmDialog.value;
}

async function remove() {
    loadingRemoveDialog.value = true;
    try {
        await deleteCategory(props.category.id);
    } finally {
        loadingRemoveDialog.value = false;
        toggleShowConfirmDialog();
    }
}
</script>