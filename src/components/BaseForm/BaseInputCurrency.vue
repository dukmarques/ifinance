<script lang="ts" setup>
import { reactive } from 'vue';
import { vMaska } from 'maska/vue';
import type { MaskInputOptions } from "maska"

import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Message from 'primevue/message';

interface InputCurrencyProps {
    name: string;
    label?: string;
    disabled?: boolean;
    invalid?: boolean;
    errorMessage?: string;
    size?: "small" | "large";
}

withDefaults(defineProps<InputCurrencyProps>(), {
    disabled: false,
    size: "large",
});

const options = reactive<MaskInputOptions>({
    mask: '###.###.###,##',
    reversed: true,
})
</script>

<template>
    <InputGroup>
        <InputGroupAddon>R$</InputGroupAddon>
        <FloatLabel class="w-full !h-12" variant="on">
            <InputText
                :name="name"
                v-maska="options"
                type="text"
                size="large"
                fluid 
            />
            
            <label v-if="label" :for="name">{{ label }}</label>

            <Message v-if="invalid && errorMessage" severity="error" size="small" variant="simple">{{ errorMessage }}</Message>
        </FloatLabel>
    </InputGroup>

</template>