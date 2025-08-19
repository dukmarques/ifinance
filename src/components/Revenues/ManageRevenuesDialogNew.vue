<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Form, type FormSubmitEvent } from '@primevue/forms';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import * as z from 'zod';
import type { Revenues } from '@/@types/Revenues';
import Dialog from 'primevue/dialog';
import BaseInputText from '@/components/BaseForm/BaseInputText.vue';
import BaseInputCurrency from '@/components/BaseForm/BaseInputCurrency.vue';
import BaseInputDatePicker from '@/components/BaseForm/BaseInputDatePicker.vue';
import BaseButton from '@/components/BaseForm/BaseButton.vue';
import BaseToggleSwitch from '@/components/BaseForm/BaseToggleSwitch.vue';
import BaseTextArea from '@/components/BaseForm/BaseTextArea.vue';
import BaseInputSelect from '@/components/BaseForm/BaseInputSelect.vue';
import Divider from 'primevue/divider';
import { useCategoriesStore } from '@/stores/categories';
import { storeToRefs } from 'pinia';

type RevenueForm = Omit<Revenues, 'id' | 'user_id' | 'revenues_overrides'>;

type ManageRevenuesDialogProps = {
    title?: string;
    description?: string;
    revenue?: RevenueForm;
    provider: Function;
    loading?: boolean;
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
});

const visible = ref(false);
defineExpose({ visible });
function close() {
    visible.value = false;
}

const { categories, loading: loadingCategories } = storeToRefs(useCategoriesStore());
const { fetchCategories } = useCategoriesStore();
const categoriesSelect = ref<{ name: string; value: string }[]>([]);

const resolver = ref(zodResolver(
    z.object({
        title: z.string().min(1, 'O título é obrigatório'),
        amount: z.string(),
        receiving_date: z.date(),
        recurrent: z.boolean(),
        description: z.string().max(500, 'A descrição deve ter no máximo 500 caracteres'),
        category_id: z.string().optional(),
    })
));

const initialValues = ref({ 
    title: props.revenue.title,
    amount: `${props.revenue.amount}`,
    receiving_date: props.revenue.receiving_date,
    recurrent: props.revenue.recurrent,
    description: props.revenue.description,
    category_id: props.revenue.category_id,
});

async function submit(event: FormSubmitEvent) {
    const { valid, values, reset } = event as FormSubmitEvent<typeof initialValues.value>;

    const payload = { 
        ...values, 
        amount: values?.amount ? Number(values.amount.replace(/[.,]/g, '')) : 0, 
    };

    if (valid) {
        await props.provider(payload);
        reset();
        visible.value = false;
    }
}

onMounted(async () => {
    await fetchCategories();

    categoriesSelect.value = categories.value.map(category => ({
        name: category.name,
        value: category.id
    }));
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
                    label="Mês de computação"
                    name="receiving_date"
                    view="month"
                    dateFormat="mm/yy"
                    :invalid="$form.receiving_date?.invalid"
                    :errorMessage="$form.receiving_date?.error?.message"
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

            <div class="flex items-center mb-4 mt-1 gap-2">
                <BaseToggleSwitch 
                    label="Receita recorrente"
                    name="recurrent"
                    :invalid="$form.recurrent?.invalid"
                    :errorMessage="$form.recurrent?.error?.message"
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