import { defineStore } from 'pinia';

export const useNavigationStore = defineStore('navigationStore', {
    state: () => ({
        rail: false,
        darkMode: false,
    }),
    persist: true,
    getters: {
        getRail(): boolean {
            return this.rail;
        },
        isDarkMode(): boolean {
            return this.darkMode;
        }
    },
    actions: {
        toggleRail() {
            this.rail = !this.rail;
        },
        toggleDarkMode() {
            this.darkMode = !this.darkMode;
            document.documentElement.classList.toggle('active-dark-mode');
        },
        initializeDarkMode() {
            if (this.darkMode) {
                document.documentElement.classList.add('active-dark-mode');
            } else {
                document.documentElement.classList.remove('active-dark-mode');
            }
        }
    },
});
