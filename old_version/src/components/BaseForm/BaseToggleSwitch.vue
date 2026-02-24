<script lang="ts" setup>
import ToggleSwitch from 'primevue/toggleswitch';
import Message from 'primevue/message';

export interface BaseInputToggleSwitchProps {
    label?: string;
    name: string;
    disabled?: boolean;
    invalid?: boolean;
    errorMessage?: string;
}

withDefaults(defineProps<BaseInputToggleSwitchProps>(), {
    disabled: false,
    invalid: false,
});
</script>

<template>
    <div class="w-full flex gap-2">
        <ToggleSwitch 
            :name="name"
            :disabled="disabled"
            :invalid="invalid"
        />
        <label v-if="label" :for="name">{{ label }}</label>
        <Message 
            severity="error" 
            size="small" 
            variant="simple"
        >
            {{ errorMessage }}
        </Message>
    </div>
</template>