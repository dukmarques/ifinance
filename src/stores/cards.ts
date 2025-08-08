import { defineStore } from 'pinia';
import { type Card } from '@/@types/Card';
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
                throw err;
            } finally {
                this.toggleLoading();
            }
        },

        async createCard(card: Card) {
            try {
                await axios.post('/cards', card);
                this.fetchCards();
            } catch (err: any) {
                useToast().showError(err.response.data.message);
                throw err;
            }
        },

        async updateCard(card: Card) {
            try {
                await axios.put(`/cards/${card.id}`, card);
                useToast().showSuccess('Cartão atualizado com sucesso');
                this.fetchCards();
            } catch (err: any) {
                useToast().showError(err.response.data.message);
                throw err;
            }
        },

        async deleteCard(cardId: string) {
            try {
                await axios.delete(`/cards/${cardId}`);
                useToast().showSuccess('Cartão deletado com sucesso');
                this.fetchCards();
            } catch (err: any) {
                useToast().showError(err.response.data.message);
                throw err;
            }
        },

        fillCardsForLoading() {
            this.cards = Array(12).fill(null).map((_, index) => ({
                id: `placeholder-${index}`,
                name: 'Cartão de Crédito',
                closing_day: 0,
                due_day: 0,
                limit: 0,
                user_id: '123',
                background_color: '#000000',
                card_flag: 'defaultCard',
            }));
        },

        toggleLoading() {
            this.loading = !this.loading;
        },
    },
});
