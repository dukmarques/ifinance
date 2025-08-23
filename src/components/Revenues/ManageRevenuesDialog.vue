<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { Form, type FormSubmitEvent } from '@primevue/forms';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import * as z from 'zod';
import type { RevenueModificationTypes, Revenues } from '@/@types/Revenues';
import { useCategoriesStore } from '@/stores/categories';

import Dialog from 'primevue/dialog';
import Divider from 'primevue/divider';
import BaseInputText from '@/components/BaseForm/BaseInputText.vue';
import BaseInputCurrency from '@/components/BaseForm/BaseInputCurrency.vue';
import BaseInputDatePicker from '@/components/BaseForm/BaseInputDatePicker.vue';
import BaseButton from '@/components/BaseForm/BaseButton.vue';
import BaseToggleSwitch from '@/components/BaseForm/BaseToggleSwitch.vue';
import BaseTextArea from '@/components/BaseForm/BaseTextArea.vue';
import BaseInputSelect from '@/components/BaseForm/BaseInputSelect.vue';

type RevenueForm = Omit<Revenues, 'user_id'>;

type ManageRevenuesDialogProps = {
    title?: string;
    description?: string;
    revenue?: RevenueForm;
    provider: Function;
    loading?: boolean;
    isUpdateAction?: boolean;
    updateType?: RevenueModificationTypes;
};

const props = withDefaults(defineProps<ManageRevenuesDialogProps>(), {
    title: 'Adicionar Receita',
    revenue: () => ({
        id: '',
        title: '',
        amount: 0,
        receiving_date: '',
        recurrent: false,
        description: '',
    } as RevenueForm),
    loading: false,
    isUpdateAction: false,
});

const visible = ref(false);

function show() {
    visible.value = true;
}

function close() {
    visible.value = false;
}

defineExpose({ visible, show });

const updateTypeAction = computed(() => {
    if (!props.revenue.recurrent) {
        return 'simple';
    }

    return props.updateType;
});

const { getFormattedCategories, loading: loadingCategories } = storeToRefs(useCategoriesStore());
const { fetchCategories } = useCategoriesStore();
const categoriesSelect = ref<{ name: string; value: string }[]>([]);

const getResolverSchema = () => {
    const zodSchema = {
        title: z.string().min(1, 'O título é obrigatório'),
        amount: z.string(),
        description: z.string().max(300, 'A descrição deve ter no máximo 300 caracteres'),
    } as any;

    const isNew = !props.isUpdateAction;
    const isSimple = updateTypeAction.value === 'simple';
    const isAllMonth = updateTypeAction.value === 'all_month';

    if (isNew) {
        zodSchema.recurrent = z.boolean();
    }

    if (isNew || isSimple) {
        zodSchema.receiving_date = z.union([
            z.date(),
            z.string().refine((val) => !isNaN(Date.parse(val)), {
                message: 'Data inválida'
            })
        ]);
    }

    if (!isNew || isSimple || isAllMonth) {
        zodSchema.category_id = z.string().optional().nullable();
    }
    
    return zodSchema;
};

const resolver = ref(
    zodResolver(
        z.object(getResolverSchema())
    )
);

const initialValues = computed(() => {
    const override = props.revenue.override;

    return { 
        title: override?.title ? override?.title : props.revenue.title,
        amount: override?.amount ? `${override?.amount}` : `${props.revenue.amount}`,
        description: override?.description ? override?.description : props.revenue.description,
        receiving_date: props.revenue.receiving_date,
        recurrent: props.revenue.recurrent,
        category_id: props.revenue.category_id,
    };
});

async function submit(event: FormSubmitEvent) {
    const { valid, values, reset } = event as FormSubmitEvent<typeof initialValues.value>;

    const payload = { 
        ...values, 
        amount: values?.amount ? Number(values.amount.replace(/[.,]/g, '')) : 0, 
    } as RevenueForm;

    if (props.revenue.id) {
        payload.id = props.revenue.id;
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
});
</script>

<template>
    <Dialog
        v-model:visible="visible"
        modal
        :header="title"
        class="w-xl"
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
                    label="Nome da receita"
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
                    v-if="updateTypeAction === 'simple'"
                    label="Mês de computação"
                    name="receiving_date"
                    view="month"
                    dateFormat="mm/yy"
                    :invalid="$form.receiving_date?.invalid"
                    :errorMessage="$form.receiving_date?.error?.message"
                    :disabled="loading"
                />

                <BaseInputSelect 
                    v-if="!isUpdateAction || updateTypeAction === 'simple' || updateTypeAction === 'all_month'"
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

            <div class="flex items-center mb-4 mt-1 gap-2">
                <BaseToggleSwitch 
                    v-if="!isUpdateAction"
                    label="Receita recorrente"
                    name="recurrent"
                    :invalid="$form.recurrent?.invalid"
                    :errorMessage="$form.recurrent?.error?.message"
                    :disabled="loading"
                />
                <div v-else class="flex justify-start items-start gap-2">
                    <i class="pi pi-info-circle mt-1"></i>
                    <span v-if="props.updateType === 'only_month'">
                        Esta é uma receita recorrente com sobrescrita apenas para este mês, as alterações não afetarão os demais meses.
                    </span>
                    <span v-else>Esta é uma receita recorrente</span>
                </div>
            </div>

            <Divider />

            <div class="flex justify-between">
                <BaseButton 
                    type="button" 
                    label="Cancelar" 
                    severity="danger" 
                    size="small"
                    @click="close"
                />

                <BaseButton 
                    type="submit" 
                    label="Salvar" 
                    :loading="loading"
                    size="small"
                />
            </div>
        </Form>
    </Dialog>
</template>