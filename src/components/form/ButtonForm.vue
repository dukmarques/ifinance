<template>
    <v-btn
        class="text-none text-subtitle-1"
        type="submit"
        color="primary"
        density="compact"
        size="large"
    >
        <slot>
            <span>{{ title }}</span>
        </slot>
    </v-btn>
</template>

<script lang="ts" setup>
defineProps({
    title: {
        type: String,
        default: 'Salvar',
    },
})
</script>
