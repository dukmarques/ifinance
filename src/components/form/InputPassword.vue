<template>
    <InputText
        v-bind="$attrs"
        v-model="password"
        @update:model-value="$emit('update:modelValue', password)"
        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :type="showPassword ? 'text' : 'password'"
        @click:append-inner="showPassword = !showPassword"
    />
</template>

<script setup lang="ts">
import { ref, toRef } from 'vue';
import InputText from './InputText.vue';

const props = defineProps({
    modelValue: String,
});

const password = toRef(props.modelValue);
const showPassword = ref(false);

</script>
