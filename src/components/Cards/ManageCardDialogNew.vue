<script lang="ts" setup>
import type { Card } from '@/@types/Card';
import { Form, type FormSubmitEvent } from '@primevue/forms';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import * as z from 'zod';
import Dialog from 'primevue/dialog';
import { ref, type PropType } from 'vue';
import BaseButton from '@/components/BaseForm/BaseButton.vue';
import BaseInputText from '@/components/BaseForm/BaseInputText.vue';

const props = defineProps({
    title: {
        type: String,
        default: 'Adicionar Cartão',
    },
    description: {
        type: String,
    },
    card: {
        type: Object as PropType<Card>,
        default: () => ({
            id: '',
            name: '',
            closing_day: 1,
            due_day: 1,
            limit: 0,
            background_color: '',
            card_flag: 'defaultCard',
        }),
    },
    provider: {
        type: Function,
        required: true,
    },
    loading: {
        type: Boolean,
        default: false,
    },
});

const resolver = ref(zodResolver(
    z.object({
        name: z.string().min(1, 'O nome do cartão é obrigatório'),
        closing_day: z.number().min(1, 'O dia de fechamento deve ser maior que 0').max(31, 'O dia de fechamento deve ser menor ou igual a 31'),
        due_day: z.number().min(1, 'O dia de vencimento deve ser maior que 0').max(31, 'O dia de vencimento deve ser menor ou igual a 31'),
        limit: z.number().min(0, 'O limite do cartão não pode ser negativo'),
        background_color: z.string().optional(),
        card_flag: z.string().optional(),
    })
));

const initialValues = ref({
    name: props.card.name,
    closing_day: props.card.closing_day,
    due_day: props.card.due_day,
    limit: props.card.limit,
    background_color: props.card.background_color,
    card_flag: props.card.card_flag,
});

const visible = ref(false);
defineExpose({ visible });

async function submit(event: FormSubmitEvent) {
    const { valid, values, reset } = event as FormSubmitEvent<typeof initialValues.value>;
    
    if (valid) {
        await props.provider(values);
        reset();
        visible.value = false;
    }
}

function close() {
    visible.value = false;
}
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
            <div class="flex items-center mb-4 mt-1">
                <BaseInputText 
                    label="Nome do Cartão"
                    name="name"
                    :invalid="$form.name?.invalid"
                    :errorMessage="$form.name?.error?.message"
                    :disabled="props.loading"
                />
            </div>

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