<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';
import type { MenuItem } from 'primevue/menuitem';
import type { Revenues } from '@/@types/Revenues';
import { useRevenuesStore } from '@/stores/revenues';
import { useToast } from '@/composables/useToast';
import BaseFabSpeedDial from '../BaseForm/BaseFabSpeedDial.vue';
import ManageRevenuesDialog from '@/components/Revenues/ManageRevenuesDialog.vue';
import ManageExpensesDialog from '../Expenses/ManageExpensesDialog.vue';
import { useExpensesStore } from '@/stores/expenses';
import type { Expense } from '@/@types/Expenses';

const { showSuccess, showError } = useToast();

const createRevenueDialogRef = useTemplateRef<InstanceType<typeof ManageRevenuesDialog>>('createRevenueDialog');
const loadingCreateRevenue = ref(false);
const revenueStore = useRevenuesStore();

async function handleCreateRevenue(revenue: Revenues) {
    try {
        loadingCreateRevenue.value = true;
        await revenueStore.create(revenue);
        showSuccess({
            message: 'Sucesso!',
            description: 'Receita adicionada com sucesso.'
        })
    } catch (err) {
        const error = err as Error;
        showError({
            message: 'Ocorreu um erro!',
            description: error.message || 'Erro ao adicionar receita.'
        })
    } finally {
        loadingCreateRevenue.value = false;
    }
}

const createExpenseDialogRef = useTemplateRef<InstanceType<typeof ManageExpensesDialog>>('createExpenseDialog');
const loadingCreateExpense = ref(false);
const expenseStore = useExpensesStore();

async function handleCreateExpense(expense: Expense) {
    try {
        loadingCreateExpense.value = true;
        await expenseStore.create(expense);
        showSuccess({
            message: 'Sucesso!',
            description: 'Despesa adicionada com sucesso.'
        })
    } catch (err) {
        const error = err as Error;
        showError({
            message: 'Ocorreu um erro!',
            description: error.message || 'Erro ao adicionar despesa.'
        })
    } finally {
        loadingCreateExpense.value = false;
    }
}

const items = ref<MenuItem[]>([
    {
        label: 'Adicionar entrada',
        icon: 'pi pi-arrow-up',
        command: () => createRevenueDialogRef.value!.visible = true,
    },
    {
        label: 'Adicionar despesa',
        icon: 'pi pi-arrow-down-right',
        command: () => createExpenseDialogRef.value!.visible = true,
    },
    {
        label: 'Adicionar saída de cartão',
        icon: 'pi pi-credit-card',
        command: () => console.log('Adicionar saída de cartão'),
    },
]);
</script>

<template>
    <BaseFabSpeedDial
        :items="items"
        direction="up-left"
        type="quarter-circle"
        :radius="70"
        class="!fixed bottom-5 right-3"
    />

    <ManageRevenuesDialog 
        ref="createRevenueDialog"
        :loading="loadingCreateRevenue"
        :provider="handleCreateRevenue"
    />

    <ManageExpensesDialog 
        ref="createExpenseDialog"
        :loading="loadingCreateExpense"
        :provider="handleCreateExpense"
    />
</template>