<template>
    <v-text-field
        v-bind="$attrs"
        v-model="text"
        @update:model-value="$emit('update:modelValue', text)"
        :label="label"
        :placeholder="placeholder"
        :required="required"
        density="comfortable"
        variant="outlined"
        base-color="#A8A8B3"
        color="primary"
    ></v-text-field>
</template>

<script setup lang="ts">
import { type PropType, toRef } from 'vue';

const props = defineProps({
    modelValue: String,
    label: {
        type: String as PropType<string>,
        default: '',
    },
    placeholder: {
        type: String as PropType<string>,
        default: '',
    },
    required: {
        type: Boolean as PropType<boolean>,
        default: false,
    },
});

defineEmits(['update:modelValue']);

const text = toRef(props.modelValue);
</script>

<style lang="scss" scoped></style>
