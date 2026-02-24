<script lang="ts" setup>
import Skeleton from 'primevue/skeleton';
import CreditCardBg from '@/assets/credit-card-bg.png';
import { useNavigationStore } from '@/stores/navigation';

const { isDarkMode } = useNavigationStore();
</script>

<template>
    <div 
        :class="[
            'w-full h-[230px] flex flex-col justify-center rounded-2xl bg-cover bg-position-[-8px] !p-5 relative',
            !isDarkMode ? '!bg-green-900/80' : 'bg-gray-900/20'
        ]" 
        :style="`background-image: url(${CreditCardBg});`"
    >
        <div class="flex justify-between items-center">
            <Skeleton width="7rem" height="2rem" />
            <Skeleton shape="circle" size="2rem" />
        </div>

        <div class="flex flex-col gap-1 mt-2">
            <Skeleton width="9rem" />
            <Skeleton width="5rem" />

            <div class="flex justify-between mt-2">
                <Skeleton width="1rem" />
                <Skeleton width="1rem" />
            </div>

            <Skeleton height="0.5rem"/>
        </div>

        <div class="mt-7 flex justify-between">
            <Skeleton width="4rem" />
            <Skeleton width="4rem" />
        </div>

        <div class="absolute top-2 right-2 cursor-pointer">
            <Skeleton width="1rem" height="1rem" />
        </div>
    </div>
</template>