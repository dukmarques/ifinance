import { defineStore } from 'pinia';
import { type Card } from '@/types/Card';
import { axios } from '../services/axios';

export const useCardsStore = defineStore('cardsStore', {
    state: () => ({
        cards: [] as Card[],
        loading: false as boolean,
    }),
    getters: {},
    actions: {
        async fetchCards() {
            this.fillCardsForLoading();
            // eslint-disable-next-line no-useless-catch
            try {
                this.loading = true;
                const { data } = await axios.get('/cards');
                this.cards = data.data;
            } catch (err: any) {
                throw err;
            } finally {
                this.loading = false;
            }
        },

        fillCardsForLoading() {
            this.cards = Array(12).fill({
                id: '1',
                name: 'Cartão de Crédito',
                closing_date: '',
                due_date: '',
                user_id: '123',
            });
        },

        toggleLoading() {
            this.loading = !this.loading;
        },
    },
});
