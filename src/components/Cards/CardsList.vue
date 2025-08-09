<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useCardsStore } from '@/stores/cards';
import CardsListItem from '@/components/Cards/CardsListItem.vue';
import { onMounted } from 'vue';
import CardsListItemSkeleton from '@/components/Cards/CardsListItemSkeleton.vue';

const { cards, loading } = storeToRefs(useCardsStore());
const { fetchCards } = useCardsStore();

onMounted(() => {
    fetchCards();
});
</script>

<template>
    <div class="grid grid-cols-12 gap-4">
        <div 
            v-for="(card, index) in cards"
            :key="`card-${index}`"
            class="col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-2"
        >
            <CardsListItemSkeleton v-if="loading" />

            <CardsListItem v-else :card="card" />
        </div>
    </div>
</template>