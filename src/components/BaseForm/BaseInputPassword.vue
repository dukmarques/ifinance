<script lang="ts" setup>
import Password from 'primevue/password';

withDefaults(defineProps<{
    label?: string;
    name: string;
    placeholder?: string;
    size?: 'small' | 'large';
    helpText?: string;
    disabled?: boolean;
    invalid?: boolean;
    errorMessage?: string;
}>(), {
    size: 'large',
    disabled: false,
});
</script>

<template>
    <FloatLabel variant="on" class="w-full mb-[22px]">
        <Password 
            toggleMask 
            :name="name" 
            :inputId="name" 
            :placeholder="placeholder" 
            :size="size" 
            :disabled="disabled"
            :feedback="false"
            :invalid="invalid"
            class="w-full"
            inputClass="w-full cursor-text" 
            :pt="{
                maskIcon: 'cursor-pointer',
                unmaskIcon: 'cursor-pointer'
            }"
        />

        <label class="z-50" v-if="label" :for="name">{{ label }}</label>
        
        <Message v-if="invalid" severity="error" size="small" variant="simple">{{ errorMessage }}</Message>
    </FloatLabel>
</template>