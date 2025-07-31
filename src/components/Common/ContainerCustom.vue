<script lang="ts" setup>
import { defineProps } from 'vue';

defineProps({
    fluid: {
        type: Boolean,
        default: false,
    },
    tag: {
        type: String,
        default: 'div'
    },
    padding: {
        type: Boolean,
        default: true
    },
    maxWidth: {
        type: String,
        default: ''
    }
});
</script>

<template>
    <component 
        :is="tag" 
        :class="[
            fluid ? 'w-full' : 'container',
            'mx-auto',
            padding ? 'px-4 sm:px-6 md:px-8' : '',
            maxWidth
        ]"
    >
        <slot></slot>
    </component>
</template>