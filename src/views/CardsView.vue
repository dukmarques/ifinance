<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import HeaderViews from '@/components/Header/HeaderViews.vue';
import { useCardsStore } from '@/stores/cards';
import ManageCardDialog from '@/components/Cards/ManageCardDialog.vue';
import type { Card } from '@/@types/Card';
import Container from '@/components/Common/Container.vue';
import CardsList from '@/components/Cards/CardsList.vue';
import { useToast } from '@/composables/useToast';

const { createCard } = useCardsStore();
const { showSuccess, showError } = useToast();

const createDialog = ref(false);
const loadingDialog = ref(false);
const createDialogRef = useTemplateRef('createDialog');

const toggleCreateDialog = () => {
    createDialogRef.value!.visible = true;
}

async function create(card: Card) {
    loadingDialog.value = true;
    try {
        await createCard(card);
        showSuccess({
            message: 'Sucesso!',
            description: 'Cartão criado com sucesso.',
        })
    } catch(err: any) {
        showError({
            message: 'Erro!',
            description: err.response?.data?.message || 'Ocorreu um erro ao criar o cartão.',
        });
    } finally {
        loadingDialog.value = false;
    }
}
</script>

<template>
    <Container fluid>
        <HeaderViews 
            title="Cartões" 
            subtitle="Gerencie seus cartões de crédito"
            hasFabButton
            fabButtonTitle="Adicionar cartão"
            :fabButtonClick="toggleCreateDialog"
        />

        <CardsList />
    </Container>

    <ManageCardDialog 
        ref="createDialog"
        :loading="loadingDialog"
        :provider="create"
    />
</template>
