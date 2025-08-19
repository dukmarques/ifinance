<script lang="ts" setup>
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Select from 'primevue/select';
import Message from 'primevue/message';
import FloatLabel from 'primevue/floatlabel';

export interface BaseInputBaseInputSelectProps {
    label?: string;
    name: string;
    items: Array<{ name: string; value: string }>;
    size?: 'small' | 'large';
    disabled?: boolean;
    invalid?: boolean;
    errorMessage?: string;
    showPrefixIcon?: boolean;
    prefixIcon?: string;
}

withDefaults(defineProps<BaseInputBaseInputSelectProps>(), {
    size: 'large',
    disabled: false,
    showPrefixIcon: false,
    prefixIcon: 'pi-tag',
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
                filter 
                fluid
            />
    
            <label v-if="label" :for="name">{{ label }}</label>
    
        </FloatLabel>
    </InputGroup>
    <Message severity="error" size="small" variant="simple">{{ errorMessage }}</Message>
</template>