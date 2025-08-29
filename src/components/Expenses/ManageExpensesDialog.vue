<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { Form, type FormSubmitEvent } from '@primevue/forms';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import * as z from 'zod';
import { useCategoriesStore } from '@/stores/categories';
import { useCardsStore } from '@/stores/cards';
import type { Expense } from '@/@types/Expenses';
import type { ActionEditType } from '@/@types/ActionsTypes';

import Dialog from 'primevue/dialog';
import Divider from 'primevue/divider';

type ManageExpensesDialogProps = {
    title?: string;
    description?: string;
    expense?: Expense;
    provider: Function;
    loading?: boolean;
    isUpdateAction?: boolean;
    updateType?: ActionEditType;
};

const props = withDefaults(defineProps<ManageExpensesDialogProps>(), {
    title: 'Adicionar Despesa',
    expense: () => ({
        id: '',
        title: '',
        type: 'simple',
        amount: 0,
        is_owner: true,
        paid: false,
        payment_month: '',
        description: '',
        card_id: '',
        category_id: '',
    } as Expense),
});

const visible = ref(false);

function show() {
    visible.value = true;
}

function close() {
    visible.value = false;
}

defineExpose({ visible, show });

const getResolverSchema = () => {
    const zodSchema = {
        id: z.string().uuid(),
        title: z.string().min(2).max(100),
        type: z.enum([
            'simple', 'recurring'
        ]),
        amount: z.number().min(0),
        is_owner: z.boolean(),
        paid: z.boolean(),
        payment_month: z.string().min(7).max(7),
        description: z.string().max(500),
        card_id: z.string().uuid(),
        category_id: z.string().uuid(),
    };

    return zodSchema;
};

const resolver = ref(
    zodResolver(
        z.object(getResolverSchema())
    )
);

const initialValues = computed(() => {
    const override = props.expense.override;

    return {
        title: override?.title ? override.title : props.expense.title,
        type: props.expense.type,
        amount: props.expense.amount,
        is_owner: props.expense.is_owner,
        paid: props.expense.paid,
        payment_month: props.expense.payment_month,
        description: props.expense.description,
        card_id: props.expense.card_id,
        category_id: props.expense.category_id,
    };
});
</script>

<template>

</template>