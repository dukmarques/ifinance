<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import SidebarMenu from '@/components/Navigation/SidebarMenu.vue';
import ToastNotification from './components/Common/ToastNotification.vue';
import ConfirmDialog from '@/components/Common/ConfirmDialog.vue';
import { useNavigationStore } from './stores/navigation';
import { onMounted, ref, watch } from 'vue';

const { initializeDarkMode } = useNavigationStore();

onMounted(() => {
    initializeDarkMode();
});

// Remove soon
import NavigationDrawer from './components/Navigation/NavigationDrawer.vue';

const route = useRoute();
const isOld = ref(false);

watch(() => route.query, (newQuery) => {
    isOld.value = newQuery.old === 'true';
}, { immediate: true, deep: true });

onMounted(() => {
    isOld.value = route.query.old === 'true';
});
// Remove soon
</script>

<template>
    <main v-if="!isOld" class="!flex justify-start items-start">
        <ToastNotification />
        <ConfirmDialog />
        <SidebarMenu />
        <RouterView />
    </main>

    <VApp v-else>
        <NavigationDrawer/>

        <VMain>
            <RouterView />
        </VMain>
    </VApp>
</template>

<style lang="scss">
html {
    overflow-y: auto !important;
}
</style>
