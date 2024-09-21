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
                :fabButtonClick="() => console.log('Adicionar cartão')"
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
    </v-container>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import HeaderViews from '@/components/Header/HeaderViews.vue';
import CreditCard from '@/components/Cards/CreditCard.vue';
import { useCardsStore } from '@/stores/cards';

const { cards, loading } = storeToRefs(useCardsStore());
const { fetchCards } = useCardsStore();

fetchCards();
</script>
