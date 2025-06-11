<template>
    <v-switch
        v-model="model"
        @update:model-value="$emit('update:modelValue', model)"
        :label="label"
        hide-details
        inset
        density="comfortable"
        color="primary"
    ></v-switch>
</template>

<script lang="ts" setup>
import { shallowRef } from 'vue';

defineOptions({ name: 'FormSwitch' });

const props = defineProps({
    modelValue: Boolean,
    label: {
        type: String,
        required: true,
    },
});

defineEmits(['update:modelValue']);

const model = shallowRef(props.modelValue);
</script>