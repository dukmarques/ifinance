import type { Revenues } from "@/@types/Revenues";
import { axios } from "@/services/axios";
import { defineStore } from "pinia";
import type { AxiosError } from "axios";

export const useRevenuesStore = defineStore("revenuesStore", {
    state: () => ({
        revenues: [] as Revenues[],
        loading: false,
    }),
    getters: {
        getTotalRevenuesAmount: (state) => {
            return state.revenues.reduce((acc, item) => {
                const amount = item.amount ? parseFloat(String(item.amount)) : 0;
                return acc + amount;
            }, 0);
        },
    },
    actions: {
        async fetchRevenues(date: string | Date) {
            this.loading = true;

            try {
                const { data } = await axios.get(`/revenues?date=${date}`);
                this.revenues = data.data;
            } catch (err: unknown) {
                const error = err as AxiosError;
                const errorMessage = (error.response?.data as { message?: string })?.message || "Erro ao buscar receitas";
                throw new Error(errorMessage);
            } finally {
                this.loading = false;
            }
        },

        async create(revenue: Revenues) {
            try {
                await axios.post("/revenues", revenue);
            } catch (err: unknown) {
                const error = err as AxiosError;
                const errorMessage = (error.response?.data as { message?: string })?.message || "Erro ao criar receita";
                throw new Error(errorMessage);
            }
        },

        async update(revenue: Revenues) {
            try {
                await axios.put(`/revenues/${revenue.id}`, revenue);
            } catch (err: unknown) {
                const error = err as AxiosError;
                const errorMessage = (error.response?.data as { message?: string })?.message || "Erro ao atualizar receita";
                throw new Error(errorMessage);
            }
        },

        async delete(revenueId: string) {
            try {
                await axios.delete(`/revenues/${revenueId}`);
            } catch (err: unknown) {
                const error = err as AxiosError;
                const errorMessage = (error.response?.data as { message?: string })?.message || "Erro ao deletar receita";
                throw new Error(errorMessage);
            }
        },
    },
});