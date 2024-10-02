<template>
    <v-card
        width="95%"
        height="230"
        elevation="10"
        id="credit-card"
        v-if="!loading"
        :color="card.background_color"
    >
        <template #image>
            <v-img
                :src="CreditCardBg"
                class="bg-image"
                cover
            ></v-img>
        </template>

        <v-menu>
            <template v-slot:activator="{ props }">
                <v-btn
                    class="position-absolute top-0 right-0 mt-2"
                    style="margin-right: -14px;"
                    variant="plain" 
                    v-bind="props"
                >
                    <Icon 
                        icon="fluent:more-vertical-32-regular" 
                        width="32"
                    />
                </v-btn>
            </template>

            <v-list>
                <v-list-item 
                    @click="toggleUpdateDialog"
                    title="Editar"
                >
                </v-list-item>
                <v-list-item 
                    @click="toggleShowConfirmDialog"
                    title="Excluir"    
                >
                </v-list-item>
            </v-list>
        </v-menu>

        <v-card-item class="px-7 py-5">
            <div class="header d-flex justify-space-between align-center">
                <p class="title">{{ card.name }}</p>
                <v-img
                    :src="icons[card.card_flag]"
                    class="flag-icon mr-3"
                ></v-img>
            </div>

            <div class="limit">
                <p class="text">Limite disponível</p>
                <p :id="`available-${card.id}`" class="value">0</p>
                <div class="progress d-flex justify-space-between">
                    <p>R$0</p>
                    <p>{{ formatCurrency(card.limit) }}</p>
                </div>
                <v-progress-linear
                    color="gray-darken-2"
                    model-value="70"
                    rounded
                    height="4"
                ></v-progress-linear>
            </div>

            <div class="footer mt-7 d-flex justify-space-between">
                <p class="font-weight-bold">Fecha dia: {{ card.closing_day }}</p>
                <p class="font-weight-bold">Vence dia: {{ card.due_date }}</p>
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

    <ManageCardDialog
        v-model="updateDialog"
        title="Editar cartão"
        :card="card"
        :loading="updateLoadingDialog"
        :provider="update"
        @close="toggleUpdateDialog()"
    />

    <ConfirmDialog 
        v-model="showConfirmDialog"
        title="Excluir cartão"
        text="Tem certeza que deseja excluir este cartão?"
        @confirm="remove"
        :loading="loadingConfirmDialog"
    />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { CountUp } from 'countup.js';
import { Icon } from '@iconify/vue';
import CreditCardBg from '@/assets/credit-card-bg.png';
import type { Card } from '@/types/Card';
import { useCardsStore } from '@/stores/cards';
import { formatCurrency } from '@/helpers/currencyFormat';
import { icons } from '@/utils/creditIcons';
import ConfirmDialog from '@/components/form/ConfirmDialog.vue';
import ManageCardDialog from '@/components/Cards/ManageCardDialog.vue';
import { tr } from 'vuetify/locale';

const { updateCard, deleteCard } = useCardsStore();

const props = defineProps({
    loading: {
        type: Boolean,
        default: false,
    },
    card: {
        type: Object as () => Card,
        required: true,
    },
});


const countUp = ref<CountUp | null>(null);

onMounted(() => {
    const elementId = `available-${props.card.id}`;

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

const updateDialog = ref(false);
const updateLoadingDialog = ref(false);
function toggleUpdateDialog() {
    updateDialog.value = !updateDialog.value;
}

async function update(card: Card) {
    updateLoadingDialog.value = true;
    try {
        await updateCard(card);
    } finally {
        updateLoadingDialog.value = false;
        toggleUpdateDialog();
    }

}

const showConfirmDialog = ref(false);
const loadingConfirmDialog = ref(false);

function toggleShowConfirmDialog() {
    showConfirmDialog.value = !showConfirmDialog.value;
}

async function remove() {
    loadingConfirmDialog.value = true;
    try {
        await deleteCard(props.card.id);
    } finally {
        loadingConfirmDialog.value = false;
        toggleShowConfirmDialog();
    }
}
</script>

<style lang="scss" scoped>
#credit-card {
    border-radius: 20px;
    // background: linear-gradient(106.15deg, #359766 -30.54%, #10393B 113.37%);

    .bg-image {
        opacity: 0.7 !important;
    }

    .header {
        .title {
            font-size: 24px;
            font-weight: bold;
        }

        .flag-icon {
            max-width: 40px;
            height: 40px;
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
