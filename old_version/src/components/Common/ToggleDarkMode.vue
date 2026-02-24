<script lang="ts" setup>
import { useNavigationStore } from '@/stores/navigation';

const navigation = useNavigationStore();
</script>

<template>
    <i 
        v-tooltip.bottom="'Alterar tema'"
        class="pi pi-sun cursor-pointer" 
        :class="[
            'pi cursor-pointer',
            navigation.isDarkMode ? 'pi-moon' : 'pi-sun',
        ]"
        @click="navigation.toggleDarkMode"
    ></i>
</template>