<template>
    <v-fab
        app
        :color="open ? '' : 'primary'"
        location="right bottom"
        size="large"
        icon
    >
        <v-icon>{{ open ? 'fa-solid fa-xmark' : 'fa-solid fa-plus' }}</v-icon>
        <v-speed-dial 
            v-model="open" 
            location="top center" 
            transition="slide-y-reverse-transition" 
            activator="parent"
        >
            <v-btn key="1" color="success" icon @click="openRevenueDialog = true">
                <v-icon size="18" icon="fa-solid fa-arrow-trend-up"></v-icon>
                <v-tooltip activator="parent" location="end">
                    Adicionar entrada
                </v-tooltip>
            </v-btn>

            <v-btn key="2" color="error" icon>
                <v-icon size="18" icon="fa-solid fa-arrow-trend-down"></v-icon>
                <v-tooltip activator="parent" location="end">
                    Adicionar saída
                </v-tooltip>
            </v-btn>

            <v-btn key="3" color="warning" icon>
                <v-icon size="24">$warning</v-icon>
                <v-tooltip activator="parent" location="end">
                    Adicionar saída de cartão
                </v-tooltip>
            </v-btn>

            
        </v-speed-dial>

        <ManageRevenuesDialog 
            v-model="openRevenueDialog"
            :loading="loadingRevenue"
            title="Gerenciar Receitas"
            @close="openRevenueDialog = false"
            :provider="createRevenue"
        />
    </v-fab>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import ManageRevenuesDialog from '@/components/Revenues/ManageRevenuesDialog.vue';
import type { Revenues } from '@/@types/Revenues';
import { useRevenuesStore } from '@/stores/revenues';

const open = shallowRef(false)

const useRevenues = useRevenuesStore();
const openRevenueDialog = ref(false);
const loadingRevenue = ref(false);

async function createRevenue(revenue: Revenues) {
    console.log(revenue);
    console.log(revenue.receiving_date.toLocaleDateString('pt-BR'));
    loadingRevenue.value = true;
    try {
        const data = useRevenues.create(revenue);
        openRevenueDialog.value = false;
    } finally {
        loadingRevenue.value = false;
    }
}

</script>
