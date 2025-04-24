<template>
    <v-container fluid>
        <div class="content d-flex flex-column justify-center">
            <v-row class="row-text">
                <v-col
                    cols="4"
                    v-for="(item, index) in summary"
                    :key="index"
                    class="column-text d-flex flex-column justify-center align-center"
                >
                    <span :id="`value-${index}`" class="value">0</span>
                    <span class="caption">{{ item.caption }}</span>
                    <component :is="item.icon" class="icon" />
                </v-col>
            </v-row>
            <v-row class="row-icons">
                <v-col cols="2"></v-col>

                <v-col cols="4">
                    <div class="rectangle first"></div>
                </v-col>

                <v-col cols="4">
                    <div class="rectangle last"></div>
                </v-col>

                <v-col cols="2"></v-col>
            </v-row>
        </div>
    </v-container>
</template>

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

<style scoped lang="scss">
.content {
    margin: 0 auto;

    .row-text {
        z-index: 99;
        
        .column-text {
            .value {
                font-size: 24px;
                font-weight: 500;
                animation: opacityAnimation 3s linear;
            }
            
            .caption {
                font-size: 14px;
                font-weight: 400;
                animation: opacityAnimation 3s linear;
            }

            &:first-child .icon,
            &:last-child .icon {
                visibility: hidden;
                animation-name: iconAnimation;
                animation-duration: 1s;
                animation-timing-function: linear;
                animation-fill-mode: forwards;
                animation-delay: 0.8s;
            }
        }
    }

    .row-icons {
        display: flex;
        justify-content: center;
        align-items: center;

        margin-top: -41px;

        .rectangle {
            height: 8px;
            border-radius: 8px;
            
            &.first {
                background: linear-gradient(90deg, #359766 27%, #197BBD 100%);
                transform-origin: right;
                transform: scaleX(0);
                animation: grow-line 1s ease-out forwards;
            }
            
            &.last {
                background: linear-gradient(90deg, #197BBD 0%, #E52E4D 72.5%);
                
                transform-origin: left center;
                transform: scaleX(0);
                animation: grow-line 1s ease-out forwards;
            }
        }
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
}
</style>
