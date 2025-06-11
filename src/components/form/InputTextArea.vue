<template>
    <v-textarea
        v-model="text"
        @update:model-value="$emit('update:modelValue', text)"
        :label="label"
        variant="outlined"
        auto-grow
        color="primary"
        :placeholder="placeholder"
        :required="required"
        density="comfortable"
        :rules="withRules ? rules : []"
    ></v-textarea>
</template>

<script setup lang="ts">
import { toRef } from 'vue';

const props = defineProps({
    modelValue: String,
    label: {
        type: String,
        default: 'Textarea',
    },
    placeholder: {
        type: String,
        default: '',
    },
    required: {
        type: Boolean,
        default: false,
    },
    withRules: {
        type: Boolean,
        default: false,
    },
    rules: {
        type: Array as () => string[],
        default: () => [(v: string) => !!v || 'Campo obrigatório'],
    },
});

defineEmits(['update:modelValue']);
const text = toRef(props.modelValue);
</script>