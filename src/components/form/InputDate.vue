<template>
    <InputText
        v-model="text"
        v-maska="options"
        :label="label"
        :rules="rules"
        :placeholder="placeholder"
    />
</template>

<script setup lang="ts">
import InputText from '@/components/form/InputText.vue';
import { reactive, toRef } from 'vue';
import { vMaska } from 'maska/vue';
import type { MaskInputOptions } from "maska"

type MaskaDetail = {
    masked: string;
    unmasked: string;
    completed: boolean;
}

const props = defineProps({
    modelValue: [
        String, Number
    ],
    label: {
        type: String,
        default: 'Valor',
    },
    placeholder: {
        type: String,
        default: '01/01',
    },
});

const text = toRef(props.modelValue);

const emit = defineEmits(["update:modelValue"]);

const action = (value: string|number) => {
    emit('update:modelValue', value);
}

const options = reactive<MaskInputOptions>({
    mask: '##/##',
    onMaska: (detail: MaskaDetail) => {
        action(detail.unmasked.replace('/', '-'));
    },
})

const rules = [
    (v: string) => !!v || 'Campo obrigatório',
    (v: string) => {
        const regex =  /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])$/;
        return regex.test(v) || 'Data inválida';
    }
];
</script>