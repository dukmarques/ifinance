<template>
    <InputText
        v-bind="$attrs"
        v-model="email"
        @update:model-value="$emit('update:modelValue', email)"
        :label="label"
        :placeholder="placeholder"
        :rules="rules"
    />
</template>

<script setup lang="ts">
import { ref, toRef } from 'vue';
import InputText from '@/components/form/InputText.vue';

const props = defineProps({
    modelValue: String,
    label: {
        type: String,
        defaut: 'Senha',
    },
    placeholder: {
        type: String,
        default: '********',
    },
});

defineEmits(['update:modelValue']);

const email = toRef(props.modelValue);

const rules = ref([
    (v: string) => !!v || 'E-mail é obrigatório',
    (v: string) => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
]);
</script>

<style lang="scss" scoped></style>
