<script lang="ts" setup>
import { ref } from 'vue';
import Dialog from 'primevue/dialog';
import BaseButton from '@/components/BaseForm/BaseButton.vue';

export type ModificationsTypeItem = {
    title: string;
    severity: 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' | 'contrast';
    onClick: Function;
}

type ModificationsTypeDialogProps = {
    title?: string;
    description?: string;
    options: Array<ModificationsTypeItem>;
};

withDefaults(defineProps<ModificationsTypeDialogProps>(), {});

const visible = ref(false);

function show() {
    visible.value = true;
}

function close() {
    visible.value = false;
}

defineExpose({ show });
</script>

<template>
    <Dialog 
        v-model:visible="visible" 
        modal 
        :header="title" 
        :draggable="false"
        class="max-w-md"
    >
        <div class="flex flex-col justify-end gap-2">
            <span 
                v-if="description" 
                class="text-surface-500 dark:text-surface-400 block mb-4"
            >
                {{ description }}
            </span>

            <BaseButton 
                v-for="option in options" 
                :key="option.title" 
                :title="option.title"
                :severity="option.severity"
                type="button"
                size="small"
                fluid
                @click="option.onClick(); close()"
            />
        </div>
    </Dialog>
</template>
