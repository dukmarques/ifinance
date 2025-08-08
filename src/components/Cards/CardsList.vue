<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useCardsStore } from '@/stores/cards';
import CardsListItem from '@/components/Cards/CardsListItem.vue';

const { cards, loading } = storeToRefs(useCardsStore());
const { fetchCards } = useCardsStore();

fetchCards();
</script>

<template>
    <div class="grid grid-cols-12 gap-4">
        <div 
            v-for="(card, index) in cards"
            :key="`card-${index}`"
            class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3"
        >
            <CardsListItem :card="card" :loading="loading" />
        </div>
    </div>
</template>