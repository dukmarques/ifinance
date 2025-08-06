<script setup lang="ts">
import { ref, type PropType } from 'vue';
import type { Category } from '@/@types/Category';

import Dialog from 'primevue/dialog';
import { Form, type FormSubmitEvent } from '@primevue/forms';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import * as z from 'zod';
import BaseInputText from '@/components/BaseForm/BaseInputText.vue';
import BaseButton from '@/components/BaseForm/BaseButton.vue';

const props = defineProps({
    title: {
        type: String,
        default: 'Adicionar categoria',
    },
    description: {
        type: String,
    },
    category: {
        type: Object as PropType<Category>,
        default: () => ({ 
            name: ''
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
        name: z.string().min(1, 'O nome da categoria é obrigatório'),
    })
));

const initialValues = ref({ 
    name: props.category.name,
});

const visible = ref(false);

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

defineExpose({ visible });
</script>

<template>
    <Dialog
        v-model:visible="visible"
        modal
        header="Adicionar categoria" 
        class="bg-secondary border border-primary w-lg"
    >
        <Form 
            v-slot="$form" 
            :initialValues="initialValues"
            :resolver="resolver"
            @submit="submit"
        >
            <span v-if="description" class="text-surface-500 dark:text-surface-400 block mb-4">{{ description }}</span>
            <div class="flex items-center mb-4 mt-1">
                <BaseInputText 
                    label="Nome da categoria"
                    name="name"
                    :invalid="$form.name?.invalid"
                    :errorMessage="$form.name?.error?.message"
                    :disabled="loading"
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