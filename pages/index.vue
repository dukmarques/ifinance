<template>
    <div>
        <h1>{{userStore.count}}</h1>
    </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>

<style lang="scss" scoped>

</style>