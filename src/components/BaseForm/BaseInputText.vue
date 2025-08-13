<script lang="ts" setup>
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';

export interface BaseInputTextProps {
    label?: string;
    name: string;
    type?: 'text' | 'email';
    placeholder?: string;
    size?: 'small' | 'large';
    disabled?: boolean;
    invalid?: boolean;
    errorMessage?: string;
    showPrefixIcon?: boolean;
    prefix?: string;
}

withDefaults(defineProps<BaseInputTextProps>(), {
    type: 'text',
    size: 'large',
    disabled: false,
    showPrefixIcon: false,
    prefix: 'Aa'
});
</script>

<template>
    <InputGroup>
        <InputGroupAddon v-if="showPrefixIcon">{{ prefix }}</InputGroupAddon>
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
    
            <label v-if="label" :for="name">{{ label }}</label>
    
        </FloatLabel>
    </InputGroup>
    <Message severity="error" size="small" variant="simple">{{ errorMessage }}</Message>
</template>