<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { Form, type FormSubmitEvent } from '@primevue/forms';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import * as z from 'zod';
import { useCategoriesStore } from '@/stores/categories';
import type { Expense } from '@/@types/Expenses';
import type { ActionEditType } from '@/@types/ActionsTypes';

import Dialog from 'primevue/dialog';
import Divider from 'primevue/divider';
import BaseInputText from '@/components/BaseForm/BaseInputText.vue';
import BaseInputCurrency from '@/components/BaseForm/BaseInputCurrency.vue';
import BaseInputDatePicker from '@/components/BaseForm/BaseInputDatePicker.vue';
import BaseButton from '@/components/BaseForm/BaseButton.vue';
import BaseToggleSwitch from '@/components/BaseForm/BaseToggleSwitch.vue';
import BaseTextArea from '@/components/BaseForm/BaseTextArea.vue';
import BaseInputSelect from '@/components/BaseForm/BaseInputSelect.vue';
import ExpenseAssigneeSelect from './Common/ExpenseAssigneeSelect.vue';

type ExpenseForm = Omit<Expense, 'user_id'> & { assignee_id: number};

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
        recurrent: false,
        amount: 0,
        is_owner: true,
        paid: false,
        payment_month: '',
        description: '',
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

const { getFormattedCategories, loading: loadingCategories } = storeToRefs(useCategoriesStore());
const { fetchCategories } = useCategoriesStore();
const categoriesSelect = ref<{ name: string; value: string }[]>([]);

const getResolverSchema = () => {
    const zodSchema = {
        title: z.string().min(1, 'O título é obrigatório').max(100),
        recurrent: z.boolean(),
        amount: z.string(),
        is_owner: z.boolean(),
        assignee_id: z.number().optional(),
        paid: z.boolean(),
        payment_month: z.union([
            z.date(),
            z.string().refine((val) => !isNaN(Date.parse(val)), {
                message: 'Data inválida'
            })
        ]),
        description: z.string().max(300).optional(),
        card_id: z.uuid().optional(),
        category_id: z.uuid().optional(),
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
        recurrent: props.expense.recurrent,
        amount: override?.amount ? `${override?.amount}` : `${props.expense.amount}`,
        is_owner: props.expense.is_owner,
        assignee_id: props.expense.assignee?.id,
        paid: props.expense.paid,
        payment_month: props.expense.payment_month,
        description: override?.description ? override.description : props.expense.description,
        category_id: props.expense.category_id,
    };
});

async function submit(event: FormSubmitEvent) {
    console.log(event);

    const { valid, values, reset } = event as FormSubmitEvent<typeof initialValues.value>;

    const payload = { 
        ...values, 
        amount: values?.amount ? Number(values.amount.replace(/[.,]/g, '')) : 0, 
    } as ExpenseForm;

    if (props.expense.id) {
        payload.id = props.expense.id;
    }

    if (valid) {
        await props.provider(payload);
        reset();
        visible.value = false;
    }
}

watch(visible, async (newVisible) => {
    if (newVisible) {
        await fetchCategories();
        categoriesSelect.value = getFormattedCategories.value;
    }
})
</script>

<template>
    <Dialog
        v-model:visible="visible"
        modal
        :header="title"
        class="w-2xl"
    >
        <Form 
            v-slot="$form" 
            :initialValues="initialValues"
            :resolver="resolver"
            @submit="submit"
        >
            <span v-if="description" class="text-surface-500 dark:text-surface-400 block mb-4">{{ description }}</span>
            
            <div class="flex items-center mb-4 mt-1 gap-2">
                <BaseInputText  
                    label="Nome da despesa"
                    name="title"
                    :invalid="$form.title?.invalid"
                    :errorMessage="$form.title?.error?.message"
                    :disabled="loading"
                    showPrefixIcon
                />

                <BaseInputCurrency 
                    label="Valor"
                    name="amount"
                    :invalid="$form.amount?.invalid"
                    :errorMessage="$form.amount?.error?.message"
                    :disabled="loading"
                    showPrefixIcon
                />
            </div>

            <div class="flex items-center mb-4 mt-1 gap-2"> 
                <BaseInputDatePicker 
                    label="Mês de pagamento"
                    name="payment_month"
                    view="month"
                    dateFormat="mm/yy"
                    :invalid="$form.payment_month?.invalid"
                    :errorMessage="$form.payment_month?.error?.message"
                    :disabled="loading"
                />

                <BaseInputSelect 
                    label="Categoria"
                    name="category_id"
                    :items="categoriesSelect"
                    :invalid="$form.category_id?.invalid"
                    :errorMessage="$form.category_id?.error?.message"
                    :disabled="loadingCategories || loading"
                    showPrefixIcon
                />
            </div>

            <div class="flex items-center mb-4 mt-1 pr-1">
                <BaseTextArea 
                    label="Descrição"
                    name="description"
                    maxlength="300"
                    autoresize
                    :invalid="$form.description?.invalid"
                    :errorMessage="$form.description?.error?.message"
                    :disabled="loading"
                />
            </div>

            <div class="flex justify-between items-center mb-4 mt-1 gap-2">
                <BaseToggleSwitch 
                    label="Despesa recorrente"
                    name="recurrent"
                    :invalid="$form.recurrent?.invalid"
                    :errorMessage="$form.recurrent?.error?.message"
                    :disabled="loading"
                />

                <BaseToggleSwitch 
                    label="Despesa paga"
                    name="paid"
                    :invalid="$form.paid?.invalid"
                    :errorMessage="$form.paid?.error?.message"
                    :disabled="loading"
                />
            </div>

            <Divider />

            <div class="flex justify-between items-center mb-4 mt-1 gap-2">
                <BaseToggleSwitch 
                    label="Minha despesa"
                    name="is_owner"
                    :invalid="$form.is_owner?.invalid"
                    :errorMessage="$form.is_owner?.error?.message"
                    :disabled="loading"
                />

                <ExpenseAssigneeSelect 
                    v-if="!$form.is_owner?.value"
                    label="Proprietário da despesa"
                    name="assignee_id"
                    :invalid="$form.assignee_id?.invalid"
                    :errorMessage="$form.assignee_id?.error?.message"
                    :disabled="loading"
                />
            </div>

            <Divider />

            <div class="flex justify-between">
                <BaseButton 
                    type="button" 
                    label="Cancelar" 
                    severity="danger" 
                    size="small"
                    @click="close"
                    variant="text"
                />

                <BaseButton 
                    type="submit" 
                    label="Salvar" 
                    :loading="loading"
                    size="small"
                    variant="text"
                />
            </div>
        </Form>
    </Dialog>
</template>