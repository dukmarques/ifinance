import { defineStore } from 'pinia';
import { type Card } from '@/types/Card';
import { axios } from '../services/axios';
import { useToast } from './toast';

export const useCardsStore = defineStore('cardsStore', {
    state: () => ({
        cards: [] as Card[],
        loading: false as boolean,
    }),
    getters: {},
    actions: {
        async fetchCards() {
            this.fillCardsForLoading();
            try {
                this.toggleLoading();
                const { data } = await axios.get('/cards');
                this.cards = data.data;
            } catch (err: any) {
                useToast().showError(err.response.data.message);
            } finally {
                this.toggleLoading();
            }
        },

        async createCard(card: Card) {
            this.toggleLoading();
            try {
                await axios.post('/cards', card);
                this.fetchCards();
            } catch (err: any) {
                useToast().showError(err.response.data.message);
            } finally {
                this.toggleLoading();
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
