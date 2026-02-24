<script lang="ts" setup>
import InputNumber from 'primevue/inputnumber';

export interface BaseInputNumberProps {
    name: string;
    label?: string;
    showButtons?: boolean;
    buttonLayout?: "horizontal" | "vertical" | "stacked";
    increment?: number;
    min?: number;
    max?: number;
    disabled?: boolean;
    invalid?: boolean;
    errorMessage?: string;
    size?: "small" | "large";
}

withDefaults(defineProps<BaseInputNumberProps>(), {
    showButtons: false,
    buttonLayout: 'horizontal',
    increment: 1,
    min: 0,
    max: 100,
    disabled: false,
    size: "large",
});
</script>

<template>
    <FloatLabel variant="on">
        <InputNumber 
            :inputId="`input-number-${name}`" 
            :name="name"
            :showButtons="showButtons"
            :buttonLayout="buttonLayout"
            :step="increment"
            :min="min"
            :max="max"
            :disabled="disabled"
            :size="size"
            fluid
        >
            <template #incrementicon>
                <span class="pi pi-plus" />
            </template>
            <template #decrementicon>
                <span class="pi pi-minus" />
            </template>
        </InputNumber>

        <label v-if="label" :for="name">{{ label }}</label>

        <Message severity="error" size="small" variant="simple">{{ errorMessage }}</Message>
    </FloatLabel>
</template>