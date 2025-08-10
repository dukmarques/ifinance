<script lang="ts" setup>
import InputNumber from 'primevue/inputnumber';

export interface BaseInputCurrencyProps {
    name: string;
    label?: string;
    size?: "small" | "large";
    disabled?: boolean;
    invalid?: boolean;
    errorMessage?: string;
}

withDefaults(defineProps<BaseInputCurrencyProps>(), {
    size: "large",
    disabled: false,
});
</script>

<template>
    <FloatLabel variant="on">
        <InputNumber 
            :inputId="`input-currency-${name}`" 
            :name="name"
            mode="currency" 
            currency="BRL" 
            locale="pt-BR" 
            fluid 
            :size="size"
            :disabled="disabled"
        />

        <label v-if="label" :for="name">{{ label }}</label>

        <Message severity="error" size="small" variant="simple">{{ errorMessage }}</Message>
    </FloatLabel>
</template>