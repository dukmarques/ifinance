<script lang="ts" setup>
import { computed, ref } from 'vue';
import { Form, type FormSubmitEvent } from '@primevue/forms';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import * as z from 'zod';
import type { ExpenseAssignee } from '@/@types/ExpensesAssignee';

import Dialog from 'primevue/dialog';
import BaseInputText from '@/components/BaseForm/BaseInputText.vue';
import BaseTextArea from '@/components/BaseForm/BaseTextArea.vue';
import BaseButton from '@/components/BaseForm/BaseButton.vue';

type ManageExpenseAssigneeDialogProps = {
    title?: string;
    description?: string;
    assignee?: ExpenseAssignee;
    provider: Function;
    loading?: boolean;
};

const props = withDefaults(defineProps<ManageExpenseAssigneeDialogProps>(), {
    title: 'Adicionar Responsável',
    assignee: () => ({
        id: '',
        name: '',
        description: undefined,
    } as ExpenseAssignee),
});

const visible = ref(false);

function show() {
    visible.value = true;
}

function close() {
    visible.value = false;
}

defineExpose({ show });

const resolver = ref(
    zodResolver(
        z.object({
            name: z.string()
                .min(2, 'O nome deve ter no mínimo 2 caracteres')
                .max(50, 'O nome deve ter no máximo 50 caracteres'),
            description: z.string()
                .max(300, 'A descrição deve ter no máximo 300 caracteres')
                .nullable()
                .optional(),
        })
    )
);

const initialValues = computed(() => ({
    name: props.assignee?.name,
    description: props.assignee?.description,
}));

async function submit(event: FormSubmitEvent) {
    const { valid, values, reset } = event as FormSubmitEvent<typeof initialValues.value>;

    const payload = { ...values } as ExpenseAssignee;

    if (props.assignee.id) {
        payload.id = props.assignee.id;
    }

    if (valid) {
        await props.provider(payload);
        reset();
        close();
    }
}

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
                    label="Nome da despesa"
                    name="name"
                    :invalid="$form.name?.invalid"
                    :errorMessage="$form.name?.error?.message"
                    :disabled="loading"
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