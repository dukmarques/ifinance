import { defineStore } from 'pinia';
import { type Card } from '@/types/Card';
import { axios } from '../services/axios';

export const useCardsStore = defineStore('cardsStore', {
    state: () => ({
        cards: [] as Card[],
    }),
    getters: {
        getCards(): Card[] {
            return this.cards;
        },
    },
    actions: {
        async fetchCards() {
            // eslint-disable-next-line no-useless-catch
            try {
                const { data } = await axios.get('/cards');
                this.cards = data;
            } catch (err: any) {
                throw err;
            }
        },
    },
});
