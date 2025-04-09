<template>
    <v-container fluid>
        <div class="content d-flex flex-column justify-center mt-5">
            <v-row class="row-text">
                <v-col
                    cols="4"
                    v-for="(item, index) in summaryItems"
                    :key="index"
                    class="column-text d-flex flex-column justify-center align-center"
                >
                    <span :id="`value-${index}`" class="value">0</span>
                    <span class="caption">{{ item.caption }}</span>
                </v-col>
            </v-row>
            <v-row class="row-icons">
                <ArrowTopCircle class="icon" />
                <div class="rectangle"></div>
                <CheckmarkCircle />
                <div class="rectangle"></div>
                <ArrowBottomCircle class="icon" />
            </v-row>
        </div>
    </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { CountUp } from 'countup.js';

import ArrowTopCircle from '@/components/icons/ArrowTopCircle.vue';
import ArrowBottomCircle from '@/components/icons/ArrowBottomCircle.vue';
import CheckmarkCircle from '@/components/icons/CheckmarkCircle.vue';

const summaryItems = ref([
    {
        caption: 'Entradas',
        value: '17400',
        icon: ArrowTopCircle,
        prefix: '+ R$',
    },
    {
        caption: 'Saldo',
        value: '16400',
        icon: CheckmarkCircle,
        prefix: 'R$',
    },
    {
        caption: 'Saídas',
        value: '1000',
        icon: ArrowBottomCircle,
        prefix: '- R$',
    },
]);

const countUp = ref<CountUp | null>(null);

onMounted(() => {
    summaryItems.value.forEach((item, index) => {
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
        )
        
        countUp.value.start();
    });
})

</script>

<style scoped lang="scss">
.content {
    margin: 0 auto;

    .row-text {
        margin-bottom: unset;
        animation: opacityAnimation 3s linear;

        .column-text {
            .value {
                font-size: 32px;
                font-weight: 500;
            }

            .caption {
                font-size: 16px;
                font-weight: 400;
            }
        }
    }

    .row-icons {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: unset;

        .icon {
            animation: iconRotationAnimation 1s linear;
        }

        .rectangle {
            width: 350px;
            height: 8px;
            background: linear-gradient(90deg, #359766 27%, #197BBD 100%);
            margin-left: -5px;
            margin-right: -5px;

            animation-name: rectangleAnimation;
            animation-duration: 2s;

            &:nth-of-type(2) {
            background: linear-gradient(90deg, #197BBD 0%, #E52E4D 72.5%);
            }
        }
    }

    @keyframes iconRotationAnimation {
        0% {
            transform: scale(0.8);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes rectangleAnimation {
        0% {
            width: 0px;
        }
        100% {
            width: 350px;
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
