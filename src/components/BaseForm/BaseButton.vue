<script lang="ts" setup>
import Button from 'primevue/button';

interface ButtonProps {
    loading?: boolean;
    disabled?: boolean;
    title?: string;
    type?: 'submit' | 'button';
    icon?: string;
    iconPos?: 'top' | 'left' | 'right' | 'bottom';
    severity?: 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' | 'contrast';
    variant?: 'outlined' | 'text' | 'link';
    size?: 'small' | 'large' | undefined;
    fluid?: boolean;
}

withDefaults(defineProps<ButtonProps>(), {
    loading: false,
    disabled: false,
    title: 'Salvar',
    type: 'submit',
    icon: '',
    iconPos: 'right',
    fluid: false,
    variant: 'outlined',
    size: 'large',
});
</script>

<template>
    <Button 
        :label="title" 
        :type="type" 
        :icon="icon" 
        :iconPos="iconPos" 
        :loading="loading"
        :disabled="disabled"
        :severity="severity"
        :variant="variant"
        :size="size"
        :fluid="fluid"
        class="border-none"
    />
</template>