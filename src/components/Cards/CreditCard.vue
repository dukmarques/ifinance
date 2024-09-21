<template>
    <v-card
        width="95%"
        height="230"
        elevation="10"
        id="credit-card"
        v-if="!loading"
    >
        <template #image>
            <v-img
                :src="CreditCardBg"
                class="bg-image"
                cover
            ></v-img>
        </template>

        <v-card-item class="px-7 py-3">
            <div class="header d-flex justify-space-between align-center">
                <p class="title">{{ card?.name }}</p>
                <Icon v-if="Math.random() > 0.5" icon="simple-icons:visa" width="60" />
                <Icon v-else icon="simple-icons:mastercard" width="60" />
            </div>

            <div class="limit">
                <p class="text">Limite disponível</p>
                <p :id="`available-${card?.id}`" class="value">0</p>
                <div class="progress d-flex justify-space-between">
                    <p>R$0</p>
                    <p>R$ 40.000,00</p>
                </div>
                <v-progress-linear
                    color="gray-darken-2"
                    model-value="70"
                    rounded
                    height="4"
                ></v-progress-linear>
            </div>

            <div class="footer mt-7 d-flex justify-space-between">
                <p class="font-weight-bold">Fecha dia: {{ closingDate }}</p>
                <p class="font-weight-bold">Vence dia: {{ dueDate }}</p>
            </div>
        </v-card-item>
    </v-card>
    <v-skeleton-loader
        v-else
        type="heading,list-item-three-line, text@2"
        width="95%"
        height="230"
        elevation="10"
        id="card-skeleton"
        class="rounded"
        color="#10393B"
    ></v-skeleton-loader>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { Icon } from '@iconify/vue';
import { CountUp } from 'countup.js';
import CreditCardBg from '@/assets/credit-card-bg.png';
import type { Card } from '@/types/Card';
import { formatDateToMMYY } from '@/helpers/dateFormat';

const props = defineProps({
    loading: {
        type: Boolean,
        default: false,
    },
    card: {
        type: Object as () => Card,
        defaut: [],
    },
});

const countUp = ref<CountUp | null>(null);

onMounted(() => {
    const elementId = `available-${props.card?.id}`;

    countUp.value = new CountUp(
        elementId,
        11800,
        {
            decimalPlaces: 2,
            duration: 2,
            useEasing: true,
            separator: '.',
            decimal: ',',
            prefix: 'R$',
        },
    );

    countUp.value?.start();
});

const closingDate = computed(() => formatDateToMMYY(props.card!.closing_date));
const dueDate = computed(() => formatDateToMMYY(props.card!.due_date));
</script>

<style lang="scss" scoped>
#credit-card {
    border-radius: 20px;
    background: linear-gradient(106.15deg, #359766 -30.54%, #10393B 113.37%);

    .bg-image {
        opacity: 0.7 !important;
    }

    .header {
        .title {
            font-size: 24px;
            font-weight: bold;
        }
    }

    .limit {
        .text {
            font-size: 18px;
        }

        .value {
            font-size: 22px;
            font-weight: bold;
        }

        .progress {
            font-weight: bold;
        }
    }
}

#card-skeleton {
    border-radius: 20px;
    background: linear-gradient(106.15deg, #359766 -30.54%, #10393B 113.37%);
}
</style>
