<template>
    <v-number-input
        v-bind="$attrs"
        v-model="number"
        @update:model-value="$emit('update:modelValue', number)"
        :controlVariant="controlVariant"
        :label="label"
        density="comfortable"
        variant="outlined"
        base-color="#A8A8B3"
        color="primary"
        inset
        :rules="withRules ? rules : []"
        :max="max"
        :min="min"
    ></v-number-input>
</template>

<script setup lang="ts">
import { toRef, type PropType } from 'vue';


const props = defineProps({
    modelValue: Number,
    label: {
        type: String,
        default: 'Informe o número',
    },
    controlVariant: {
        type: String as PropType<string>,
        default: 'split',
    },
    withRules: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
    rules: {
        type: Array as PropType<string[]>,
        default: () => [(v: string) => !!v || 'Campo obrigatório'],
    },
    max: {
        type: Number as PropType<number>,
        default: 100,
    },
    min: {
        type: Number as PropType<number>,
        default: 100,
    },
});

defineEmits(['update:modelValue']);

const number = toRef(props.modelValue);
</script>