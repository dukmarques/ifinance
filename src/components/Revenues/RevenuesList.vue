<template>
    <ExpasionPanels
        title="Entradas"
        icon="fa solid fa-arrow-trend-up"
        :headers="headers"
        :items="useRevenues.revenues"
        :loading="useRevenues.loading"
        @edit="onEdit"
        @remove="onRemove"
    />

    <ManageRevenuesDialog
        v-model="openDialog"
        :loading="loading"
        title="Editar entrada"
        @close="openDialog = false"
        :provider="update"
    />

    <ConfirmDialog
        v-model="openConfirmDialog"
        title="Excluir entrada"
        text="Tem certeza que deseja excluir esta entrada?"
        @confirm="handleDelete"
        :loading="loadingConfirmDialog"
    />
</template>

<script lang="ts" setup>
import { defineProps, watch, toRef, ref } from 'vue';
import { useRevenuesStore } from '@/stores/revenues';
import ExpasionPanels from '../Dashboard/ExpasionPanels.vue';
import type { DataTableHeader } from '@/components/Dashboard/DataTable.vue';
import ManageRevenuesDialog from '@/components/Revenues/ManageRevenuesDialog.vue';
import type { Revenues } from '@/@types/Revenues';
import ConfirmDialog from '@/components/form/ConfirmDialog.vue';

const props = defineProps({
    date: {
        type: [
            String, Date
        ],
        required: true,
        default: () => new Date(),
    },
});

const selectedDate = toRef(props, 'date');

const headers = [
    { title: "Título", key: "title" },
    { title: "Valor", key: "amount" },
    { title: "Data de Recebimento", key: "receiving_date" },
    { title: "Fixa", key: "recurrent" },
    { title: 'Ações', key: 'actions', align: 'end', sortable: false },
] as DataTableHeader[];

const useRevenues = useRevenuesStore();

watch(
    () => selectedDate.value,
    (newDate) => {
        useRevenues.fetchRevenues(newDate);
    },
);

const loading = ref(false);
const openDialog = ref(false);
const revenueItem = ref<Revenues>();

const openConfirmDialog = ref(false);
const loadingConfirmDialog = ref(false);

async function update(revenue: Revenues) {
    loading.value = true;
    try {
        await useRevenues.update(revenue);
        useRevenues.fetchRevenues(selectedDate.value);
        openDialog.value = false;
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
}

async function onEdit(id: string) {
    const revenue = useRevenues.revenues.find((item) => item.id === id);
    if (revenue) {
        openDialog.value = true;
        revenueItem.value = revenue;
    }
}

async function onRemove(id: string) {
    const revenue = useRevenues.revenues.find((item) => item.id === id);
    if (revenue) {
        openConfirmDialog.value = true;
        revenueItem.value = revenue;
    }
}

async function handleDelete() {
    loadingConfirmDialog.value = true;
    try {
        await useRevenues.delete(revenueItem.value?.id!);
        useRevenues.fetchRevenues(selectedDate.value);
        openConfirmDialog.value = false;
    } catch (error) {
        console.error(error);
    } finally {
        loadingConfirmDialog.value = false;
    }
}

</script>