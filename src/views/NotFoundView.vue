<template>
    <v-empty-state
        headline="Ops, 404!"
        title="Página não encontrada"
        text="A página que você está tentando acessar não existe."
        :image="logoSoloImg"
        size="400"
    >
        <v-btn to="/dashboard" color="primary">
            Voltar para a página inicial
        </v-btn>
    </v-empty-state>
</template>

<script setup lang="ts">
import logoSoloImg from '@/assets/logo-solo.png';
</script>
