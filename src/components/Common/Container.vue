<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
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
            padding ? 'px-1 sm:px-2 md:px-3' : '',
            maxWidth
        ]"
    >
        <slot></slot>
    </component>
</template>