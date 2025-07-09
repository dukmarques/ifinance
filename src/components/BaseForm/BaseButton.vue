<template>
    <Button 
        :label="props.title" 
        :type="props.type" 
        :icon="props.icon" 
        :iconPos="props.iconPos" 
        :loading="props.loading"
        :disabled="props.disabled"
        raised
        :severity="props.severity"
        :variant="props.variant"
        :size="props.size"
        :fluid="props.fluid"
    />
</template>

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

const props = withDefaults(defineProps<ButtonProps>(), {
    loading: false,
    disabled: false,
    title: 'Salvar',
    type: 'submit',
    icon: '',
    iconPos: 'right',
    fluid: false,
})
</script>