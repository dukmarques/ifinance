/* eslint-disable no-useless-catch */
import { defineStore } from "pinia";
import { axios } from "../services/axios";
import type { ExpenseAssignee } from "@/@types/ExpensesAssignee";
import type { AxiosError } from "axios";

const ASSIGNEE_API_URL = "/expense-assignees";

export const useExpenseAssigneeStore = defineStore("expenseAssignee", {
    state: () => ({
        assignees: [] as ExpenseAssignee[],
        loading: false,
    }),
    getters: {
        getAssignees(): ExpenseAssignee[] {
            return this.assignees;
        },
        getFormattedAssignees(state) {
            return state.assignees.map(assignee => ({
                name: assignee.name,
                value: assignee.id
            }));
        }
    },
    actions: {
        async fetchAssignees() {
            try {
                this.loading = true;
                const { data } = await axios.get(`${ASSIGNEE_API_URL}?paginate=false`);
                this.assignees = data.data;
            } catch (err) {
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async createAssignee(assignee: { name: string; description?: string }) {
            try {
                await axios.post(ASSIGNEE_API_URL, assignee);
                this.fetchAssignees();
            } catch (err: unknown) {
                const error = err as AxiosError;
                const errorMessage = (error.response?.data as { message?: string })?.message || "Erro ao criar responsável.";
                throw new Error(errorMessage);
            }
        },
    }
});
