<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue';
import InputText from 'primevue/inputtext';

export interface BaseInputTextProps {
    label?: string;
    name: string;
    type?: 'text' | 'email';
    placeholder?: string;
    size?: 'small' | 'large';
    disabled?: boolean;
    invalid?: boolean;
    errorMessage?: string;
}

withDefaults(defineProps<BaseInputTextProps>(), {
    type: 'text',
    size: 'large',
    disabled: false,
});
</script>

<template>
    <FloatLabel variant="on">
        <InputText 
            :id="name" 
            :name="name" 
            :placeholder="placeholder"
            :type="type"
            :size="size" 
            :disabled="disabled"
            fluid
        />

        <label v-if="label" :for="name" class="bg-secondary">{{ label }}</label>

        <Message severity="error" size="small" variant="simple">{{ errorMessage }}</Message>
    </FloatLabel>
</template>