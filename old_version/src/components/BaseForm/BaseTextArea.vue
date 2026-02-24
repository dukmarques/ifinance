<script lang="ts" setup>
import Textarea from 'primevue/textarea';
import Message from 'primevue/message';

export type BaseTextAreaProps = {
    label?: string;
    name: string;
    size?: 'small' | 'large';
    rows?: string | number;
    cols?: string | number;
    maxlength?: string | number;
    autoresize?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    errorMessage?: string;
}

withDefaults(defineProps<BaseTextAreaProps>(), {
    size: 'large',
    maxlength: 300,
    autoresize: false,
    disabled: false,
    invalid: false,
});
</script>

<template>
    <FloatLabel variant="on" class="w-full">
        <Textarea 
            :name="name" 
            :rows="rows" 
            :cols="cols"
            :maxlength="maxlength"
            :auto-resize="autoresize"
            class="w-full"
            fluid
        />
        <label v-if="label" :for="name">{{ label }}</label>
        <Message severity="error" size="small" variant="simple">{{ errorMessage }}</Message>
    </FloatLabel>
</template>