<template>
    <v-container
        fluid class="ml-5"
    >
        <v-row>
            <HeaderViews 
                title="Cartões" 
                subtitle="Aqui estão todos os seus cartões"
                hasFabButton
                fabButtonTitle="Adicionar cartão"
                :fabButtonClick="toggleCreateDialog"
            />
        </v-row>
        <v-row>
            <v-col
                v-for="card in cards"
                :key="card.id"
                cols="12"
                md="6"
                lg="4"
                xl="3"
                xxl="2"
                class="d-flex justify-start align-center"
            >
                <CreditCard 
                    :loading="loading" 
                    :card="card"
                />
            </v-col>
        </v-row>

        <ManageCardDialog
            v-model="createDialog"
            :loading="loadingDialog"
            :provider="create"
            @close="toggleCreateDialog()"
        ></ManageCardDialog>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import HeaderViews from '@/components/Header/HeaderViews.vue';
import CreditCard from '@/components/Cards/CreditCard.vue';
import { useCardsStore } from '@/stores/cards';
import ManageCardDialog from '@/components/Cards/ManageCardDialog.vue';
import type { Card } from '@/types/Card';

const { cards, loading } = storeToRefs(useCardsStore());
const { fetchCards, createCard } = useCardsStore();

const createDialog = ref(false);
const loadingDialog = ref(false);

const toggleCreateDialog = () => {
    createDialog.value = !createDialog.value;
}

fetchCards();

async function create(card: Card) {
    loadingDialog.value = true;
    try {
        await createCard(card);
        toggleCreateDialog();
    } finally{
        loadingDialog.value = false;
    };
}
</script>
