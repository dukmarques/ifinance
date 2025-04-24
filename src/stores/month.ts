import { defineStore } from "pinia";

export const useMonthStore = defineStore("monthStore", {
    state: () => ({
        selectedDate: new Date().toISOString().slice(0, 7),
    }),
    getters: {
        getMonth(): string {
            return this.selectedDate;
        },
    },
    actions: {
        setMonth(month: string) {
            this.selectedDate = month;
        },
        previousMonth() {
            const [
                year, month
            ] = this.selectedDate.split('-').map(Number);
            const date = new Date(year, month - 1, 1);
            date.setMonth(date.getMonth() - 1);
            this.selectedDate = date.toISOString().slice(0, 7);
        },
        nextMonth() {
            const [
                year, month
            ] = this.selectedDate.split('-').map(Number);
            const date = new Date(year, month - 1, 1);
            date.setMonth(date.getMonth() + 1);
            this.selectedDate = date.toISOString().slice(0, 7);
        },
    },
});