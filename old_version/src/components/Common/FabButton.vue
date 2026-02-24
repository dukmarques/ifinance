<script lang="ts" setup>
import Button from 'primevue/button';

type FabButtonProps = {
    title?: string;
    location?: 'top end' | 'top start' | 'bottom end' | 'bottom start';
};

withDefaults(defineProps<FabButtonProps>(), {
    title: 'Adicionar',
    location: 'top end',
});
</script>

<template>
    <Button  
        icon="pi pi-plus"
        icon-class="text-gray-200"
        rounded 
        :aria-label="title"
        v-tooltip.top="{
            value: title || 'Adicionar',
            showDelay: 1000,
        }" 
        size="large"
        :class="[
            '!absolute z-10 !bg-primary hover:brightness-[1.3] transition-all duration-300 border-0',
            location === 'top end' ? 'top-8 right-8' : '',
            location === 'top start' ? 'top-8 left-8' : '',
            location === 'bottom end' ? 'bottom-8 right-8' : '',
            location === 'bottom start' ? 'bottom-8 left-8' : '',
        ]"
    />
</template>
