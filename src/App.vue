<template>
    <Navbar />
    <Header />
    <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Header from './components/Header.vue';
</script>
