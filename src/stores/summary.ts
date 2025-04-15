import { defineStore } from "pinia";
import { type Summary } from "@/@types/Summary";

export const useSummaryStore = defineStore("summaryStore", {
    state: () => ({
        summary: {} as Summary, 
    }),
    getters: {},
    actions: {},
});