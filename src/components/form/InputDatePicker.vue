<template>
    <v-date-input
        v-model="model"
        @update:model-value="$emit('update:modelValue', model)"
        clearable 
        :label="label" 
        variant="outlined"
        prepend-icon=""
        :display-format="format"
        density="comfortable"
    ></v-date-input>
</template>

<script lang="ts" setup>
import { shallowRef } from 'vue';

const props = defineProps({
    modelValue: {
        type: [
            Date, String
        ],
    },
    label: {
        type: String,
        default: 'Data',
    },
});

defineEmits(['update:modelValue']);

const model = shallowRef(props.modelValue);

function format(date: Date) {
    return date.toLocaleDateString('pt-BR');
}
</script>