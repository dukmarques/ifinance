<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { CountUp } from 'countup.js';

import { useSummaryStore } from '@/stores/summary';
import { storeToRefs } from 'pinia';

const summaryStore = useSummaryStore();
const { summary } = storeToRefs(summaryStore);

const countUp = ref<CountUp | null>(null);

onMounted(() => {
    summary.value.forEach((item, index) => {
        const elementId = `value-${index}`;

        countUp.value = new CountUp(
            elementId,
            parseInt(item.value),
            {
                decimalPlaces: 2,
                duration: 2,
                useEasing: true,
                separator: '.',
                decimal: ',',
                prefix: item.prefix,
            }
        );

        countUp.value.start();
    });
});
</script>

<template>
    <div class="content flex flex-col justify-center">
        <div class="grid grid-cols-3 gap-4 z-10 row-text">
            <div
                v-for="(item, index) in summary"
                :key="index"
                class="flex flex-col justify-center items-center column-text"
            >
                <span :id="`value-${index}`" class="text-2xl font-medium value">0</span>
                <span class="text-sm font-normal caption">{{ item.caption }}</span>
                <component :is="item.icon" class="icon" />
            </div>
        </div>
        <div class="flex justify-center items-center !mt-[-27px] row-icons">
            <div class="w-1/6"></div>
            <div class="w-1/3">
                <div class="h-2 rounded-full rectangle first"></div>
            </div>
            <div class="w-1/3">
                <div class="h-2 rounded-full rectangle last"></div>
            </div>
            <div class="w-1/6"></div>
        </div>
    </div>
</template>

<style scoped>
.row-text .column-text .value {
    animation: opacityAnimation 3s linear;
}

.row-text .column-text .caption {
    animation: opacityAnimation 3s linear;
}

.row-text .column-text:first-child .icon,
.row-text .column-text:last-child .icon {
    visibility: hidden;
    animation-name: iconAnimation;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    animation-delay: 0.8s;
}

.rectangle.first {
    background: linear-gradient(90deg, #359766 27%, #197BBD 100%);
    transform-origin: right;
    transform: scaleX(0);
    animation: grow-line 1s ease-out forwards;
}

.rectangle.last {
    background: linear-gradient(90deg, #197BBD 0%, #E52E4D 72.5%);
    transform-origin: left center;
    transform: scaleX(0);
    animation: grow-line 1s ease-out forwards;
}

@keyframes grow-line {
    to {
        transform: scaleX(1);
    }
}

@keyframes iconAnimation {
    0% {
        transform: scale(0.5);
        visibility: hidden;
    }
    100% {
        transform: scale(1);
        visibility: visible;
    }
}

@keyframes opacityAnimation {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>
