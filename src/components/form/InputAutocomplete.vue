<template>
    <v-autocomplete
        v-model="text"
        @update:model-value="$emit('update:modelValue', text)"
        :label="label"
        :items="items"
        variant="outlined"
        density="comfortable"
        color="primary"
        :required="required"
        clearable
    ></v-autocomplete>
</template>

<script setup lang="ts">
import { toRef } from 'vue'

const props = defineProps({
    modelValue: String,
    label: {
        type: String,
        default: 'Autocomplete',
    },
    required: {
        type: Boolean,
        default: false,
    },
    items: {
        type: Array as () => string[],
        default: () => [],
    },
});

defineEmits(['update:modelValue']);

const text = toRef(props.modelValue);
</script>