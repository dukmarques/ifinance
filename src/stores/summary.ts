import { defineStore } from "pinia";
import { type Summary } from "@/@types/Summary";

import ArrowTopCircle from "@/components/icons/ArrowTopCircle.vue";
import ArrowBottomCircle from '@/components/icons/ArrowBottomCircle.vue';
import CheckmarkCircle from '@/components/icons/CheckmarkCircle.vue';

export const useSummaryStore = defineStore("summaryStore", {
    state: () => ({
        summary: [
            {
                caption: 'Entradas',
                value: '17400',
                icon: ArrowTopCircle,
                prefix: '+ R$ ',
            },
            {
                caption: 'Saldo',
                value: '16400',
                icon: CheckmarkCircle,
                prefix: 'R$ ',
            },
            {
                caption: 'Saídas',
                value: '1000',
                icon: ArrowBottomCircle,
                prefix: '- R$ ',
            },
        ] as Summary[],
    }),
    getters: {},
    actions: {},
});