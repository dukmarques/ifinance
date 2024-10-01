<template>
    <InputText
        prefix="R$"
        v-model="text"
        v-maska="options"
        :label="label"
        :rules="withRules ? rules : []"
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
    withRules: {
        type: Boolean,
        default: true,
    },
});

const text = toRef(props.modelValue);

const emit = defineEmits(["update:modelValue"]);

const action = (value: string|number) => {
    emit('update:modelValue', value);
}

const options = reactive<MaskInputOptions>({
    mask: '###.###.###,##',
    reversed: true,
    onMaska: (detail: MaskaDetail) => {
        action(detail.unmasked);
    },
})

const rules = [(v: string) => !!v || 'Campo obrigatório'];
</script>