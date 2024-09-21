<template>
    <v-fab
        v-bind="$attrs"
        class="mr-8"
        icon="mdi-plus"
        location="top end"
        absolute
        offset
        color="primary"
        title="Adicionar"
    >
        <slot>
            <Icon icon="fluent:add-24-filled" width="24" />
        </slot>
    </v-fab>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>
