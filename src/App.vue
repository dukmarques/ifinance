<template>
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
</script>

<style scoped>
</style>
