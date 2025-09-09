import { axios } from "@/services/axios";
import type { AxiosError } from "axios";
import { defineStore } from "pinia";
import type { Expense } from "@/@types/Expenses";
import type { ActionDeleteType, ActionEditType } from "@/@types/ActionsTypes";

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
            } finally {
                this.loading = false;
            }
        },

        filteredRevenues(data: Expense[]) {
            return data.filter(expense => !expense.recurrent || !expense.override?.is_deleted);
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

        async update(expense: Expense, update_type: ActionEditType) {
            try {
                await axios.put(`/expenses/${expense.id}`, {
                    ...expense,
                    update_type,
                    date: this.currentSelectedMonth,
                });
                await this.fetchExpenses(this.currentSelectedMonth);
            } catch (err: unknown) {
                const error = err as AxiosError;
                const errorMessage = (error.response?.data as { message?: string })?.message || "Erro ao atualizar despesa.";
                throw new Error(errorMessage);
            }
        },

        async delete(expenseId: string, delete_type: ActionDeleteType) {
            try {
                await axios.delete(`/expenses/${expenseId}`, { 
                    data: { date: this.currentSelectedMonth, delete_type } 
                });
                await this.fetchExpenses(this.currentSelectedMonth);
            } catch (err: unknown) {
                const error = err as AxiosError;
                const errorMessage = (error.response?.data as { message?: string })?.message || "Erro ao deletar despesa";
                throw new Error(errorMessage);
            }
        },
    }
});