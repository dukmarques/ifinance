<script lang="ts" setup>
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Select from 'primevue/select';
import Message from 'primevue/message';
import { onMounted, ref, useTemplateRef } from 'vue';
import { useExpenseAssigneeStore } from '@/stores/expenseAssignee';
import { storeToRefs } from 'pinia';
import ManageExpenseAssigneeDialog from '../ExpenseAssignees/ManageExpenseAssigneeDialog.vue';
import type { ExpenseAssignee } from '@/@types/ExpensesAssignee';
import { useToast } from '@/composables/useToast';

type ExpenseAssigneeSelectProps = {
    label?: string;
    name: string;
    size?: 'small' | 'large';
    disabled?: boolean;
    invalid?: boolean;
    errorMessage?: string;
    showPrefixIcon?: boolean;
    prefixIcon?: string;
    showClear?: boolean;
};

withDefaults(defineProps<ExpenseAssigneeSelectProps>(), {
    size: 'large',
    disabled: false,
    showPrefixIcon: false,
    prefixIcon: 'pi-paperclip',
    showClear: true,
});

const { showSuccess, showError } = useToast();
const { getFormattedAssignees: items } = storeToRefs(useExpenseAssigneeStore());
const { fetchAssignees, createAssignee } = useExpenseAssigneeStore();

const createAssigneeDialogRef = useTemplateRef<InstanceType<typeof ManageExpenseAssigneeDialog>>('createAssigneeDialog');
const loadingCreateAssignee = ref(false);
const toggleCreateAssigneeDialog = () => {
    createAssigneeDialogRef.value?.show();
};

async function handleCreateAssignee(assignee: ExpenseAssignee) {
    try {
        loadingCreateAssignee.value = true;
        await createAssignee(assignee);
        showSuccess({
            message: 'Sucesso!',
            description: 'Proprietário adicionado com sucesso.'
        })
    } catch (err) {
        const error = err as Error;
        showError({
            message: 'Ocorreu um erro!',
            description: error.message || 'Erro ao adicionar proprietário.'
        })
    } finally {
        loadingCreateAssignee.value = false;
    }
}

onMounted(async () => {
    await fetchAssignees();
});
</script>

<template>
    <InputGroup>
        <InputGroupAddon v-if="showPrefixIcon">
            <i :class="['pi', prefixIcon]" />
        </InputGroupAddon>

        <FloatLabel variant="on">
            <Select 
                :id="name"
                :name="name"
                :options="items" 
                optionLabel="name"
                optionValue="value" 
                :size="size"
                :disabled="disabled"
                :invalid="invalid"
                :showClear="showClear"
                :filter="items.length > 10"
                emptyMessage="Nenhum responsável encontrado"
                fluid
            >
                <template #footer>
                    <div class="p-3">
                        <Button 
                            type="button"
                            label="Adicionar novo" 
                            fluid 
                            severity="secondary" 
                            variant="text" 
                            size="small" 
                            icon="pi pi-plus" 
                            @click="toggleCreateAssigneeDialog"
                        />
                    </div>
                </template>
            </Select>
    
            <label v-if="label" :for="name">{{ label }}</label>
    
        </FloatLabel>
    </InputGroup>
    <Message severity="error" size="small" variant="simple">{{ errorMessage }}</Message>

    <ManageExpenseAssigneeDialog 
        ref="createAssigneeDialog"
        :loading="loadingCreateAssignee"
        :provider="handleCreateAssignee"
    />
</template>