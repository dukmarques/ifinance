<script lang="ts" setup>
import BaseInputText from '@/components/BaseForm/BaseInputText.vue';

import { type BaseInputTextProps } from '@/components/BaseForm/BaseInputText.vue';

withDefaults(defineProps<Omit<BaseInputTextProps, 'type'>>(), {
    size: 'large',
    disabled: false,
});
</script>

<template>
    <BaseInputText
        :label="label"
        :name="name"
        type="email"
        :placeholder="placeholder"
        :size="size"
        :disabled="disabled"
        :invalid="invalid"
        :errorMessage="errorMessage"
        :showPrefixIcon="showPrefixIcon"
        prefix="@"
    />
</template>