import { defineStore } from 'pinia';

export const useNavigationStore = defineStore('navigationStore', {
    state: () => ({
        rail: false,
    }),
    persist: true,
    getters: {
        getRail(): boolean {
            return this.rail;
        },
    },
    actions: {
        toggleRail() {
            this.rail = !this.rail;
        },
    },
});
