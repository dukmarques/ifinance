<script lang="ts" setup>
import { RouterView } from 'vue-router';
import SidebarMenu from '@/components/Navigation/SidebarMenu.vue';
import ToastNotification from './components/Common/ToastNotification.vue';
import ConfirmDialog from '@/components/Common/ConfirmDialog.vue';
import { useNavigationStore } from './stores/navigation';
import { onMounted } from 'vue';

const { initializeDarkMode } = useNavigationStore();

onMounted(() => {
    initializeDarkMode();
});
</script>

<template>
    <main class="!flex justify-start items-start">
        <ToastNotification />
        <ConfirmDialog />
        <SidebarMenu />
        <RouterView />
    </main>
</template>

<style lang="scss">
html {
    overflow-y: auto !important;
}
</style>
