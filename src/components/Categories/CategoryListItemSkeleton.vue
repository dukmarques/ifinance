<script lang="ts" setup>
import Skeleton from 'primevue/skeleton';

</script>

<template>
    <div class="!p-3 relative flex flex-col justify-between items-start gap-2 border rounded">
        <div class="flex justify-center items-center gap-2">
            <Skeleton shape="circle" size="2rem" />
            <Skeleton width="5rem" height="1rem" />
        </div>

        <div class="w-full flex justify-between gap-1">
            <Skeleton width="5rem" height="1rem" />
            <Skeleton width="5rem" height="1rem" />
            <Skeleton width="5rem" height="1rem" />
        </div>

        <div class="flex justify-center items-center gap-2 absolute top-2 right-3">
            <Skeleton size="1rem" />
            <Skeleton size="1rem" />
        </div>
    </div>
</template>