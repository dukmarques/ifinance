import { defineStore } from "pinia";

export const useMonthStore = defineStore("monthStore", {
    state: () => ({
        selectedDate: new Date().toISOString().slice(0, 7),
    }),
    getters: {
        getMonth(): string {
            return this.selectedDate;
        },
        formattedMonthDisplay(): string {
            const dateParts = this.selectedDate.split('-');
            const year = parseInt(dateParts[0]);
            const month = parseInt(dateParts[1]) - 1;

            const monthNames = [
                'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
            ];

            const monthName = monthNames[month];

            if (year !== new Date().getFullYear()) {
                const shortYear = year.toString().slice(-2);
                return `${monthName}/${shortYear}`;
            }

            return monthName;
        }
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