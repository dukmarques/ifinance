import { axios } from "@/services/axios";
import type { AxiosError } from "axios";
import { defineStore } from "pinia";
import type { Expense } from "@/@types/Expenses";

export const useExpensesStore = defineStore("expenses", {
    state: () => ({
        expenses: [] as Expense[],
        loading: false,
        currentSelectedMonth: '' as string | Date,
    }),
    getters: {
        getTotalExpensesAmount: (state) => {
            return state.expenses.reduce((acc, item) => {
                const amount = item.amount ? parseFloat(String(item.amount)) : 0;
                return acc + amount;
            }, 0);
        }
    },
    actions: {
        async fetchExpenses(date: string | Date) {
            this.loading = true;
            this.currentSelectedMonth = date;

            try {
                const { data } = await axios.get(`/expenses?date=${this.currentSelectedMonth}&paginate=false`);
                this.expenses = this.filteredRevenues(data.data);
            } catch (err: unknown) {
                const error = err as AxiosError;
                const errorMessage = (error.response?.data as { message?: string })?.message || "Erro ao buscar as despesas";
                throw new Error(errorMessage);
            }
        },

        filteredRevenues(data: Expense[]) {
            // TODO: verificar se regra está correta
            return data.filter(expense => expense.type === 'simple' || !expense.override?.is_deleted);
        },

        async create(expense: Expense) {
            try {
                await axios.post("/expenses", expense);
                await this.fetchExpenses(this.currentSelectedMonth);
            } catch (err: unknown) {
                const error = err as AxiosError;
                const errorMessage = (error.response?.data as { message?: string })?.message || "Erro ao criar despesa.";
                throw new Error(errorMessage);
            }
        },

        async update(expense: Expense) {
            try {
                await axios.put(`/expenses/${expense.id}`, expense);
                await this.fetchExpenses(this.currentSelectedMonth);
            } catch (err: unknown) {
                const error = err as AxiosError;
                const errorMessage = (error.response?.data as { message?: string })?.message || "Erro ao atualizar despesa.";
                throw new Error(errorMessage);
            }
        }
    }
});