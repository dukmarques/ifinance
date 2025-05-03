import type { Revenues } from "@/@types/Revenues";
import { axios } from "@/services/axios";
import { defineStore } from "pinia";
import { useToast } from "./toast";
import type { AxiosError } from "axios";

export const useRevenuesStore = defineStore("revenuesStore", {
    state: () => ({
        revenues: [] as Revenues[],
        loading: false,
    }),
    getters: {},
    actions: {
        async fetchRevenues(date: string | Date) {
            this.toggleLoading();

            try {
                const { data } = await axios.get(`/revenues?date=${date}`);
                this.revenues = data.data;
            } catch (err: unknown) {
                const error = err as AxiosError;
                const errorMessage = (error.response?.data as { message?: string })?.message || "Erro ao buscar receitas";
                useToast().showError(errorMessage);
                throw error;
            } finally {
                this.toggleLoading();
            }
        },

        async create(revenue: Revenues) {
            try {
                await axios.post("/revenues", revenue);
            } catch (err: unknown) {
                const error = err as AxiosError;
                const errorMessage = (error.response?.data as { message?: string })?.message || "Erro ao criar receita";
                useToast().showError(errorMessage);
                throw error;
            }
        },

        async update(revenue: Revenues) {
            try {
                await axios.put(`/revenues/${revenue.id}`, revenue);
                useToast().showSuccess("Receita atualizada com sucesso");
            } catch (err: unknown) {
                const error = err as AxiosError;
                const errorMessage = (error.response?.data as { message?: string })?.message || "Erro ao atualizar receita";
                useToast().showError(errorMessage);
                throw error;
            }
        },

        async delete(revenueId: string) {
            try {
                await axios.delete(`/revenues/${revenueId}`);
                useToast().showSuccess("Receita deletada com sucesso");
            } catch (err: unknown) {
                const error = err as AxiosError;
                const errorMessage = (error.response?.data as { message?: string })?.message || "Erro ao deletar receita";
                useToast().showError(errorMessage);
                throw error;
            }
        },

        toggleLoading() {
            this.loading = !this.loading;
        },
    },
});