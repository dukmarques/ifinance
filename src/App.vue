<template>
    <ToastNotification />
    
    <VApp class="bg-secondary">
        <NavigationDrawer/>

        <VMain>
            <RouterView />
        </VMain>
    </VApp>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavigationDrawer from './components/Navigation/NavigationDrawer.vue';
import ToastNotification from './components/Common/ToastNotification.vue';
</script>

<style lang="scss">
html {
    overflow-y: auto !important;
}

.Toastify__toast-container {
    width: 600px !important;
}
</style>
