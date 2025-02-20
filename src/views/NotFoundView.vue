<template>
    <v-empty-state
        headline="Ops, 404!"
        title="Página não encontrada"
        text="A página que você está tentando acessar não existe."
        :image="logoSoloImg"
        size="400"
    >
    </v-empty-state>
    <v-container>
        <h1>Página não encontrada</h1>
    </v-container>
</template>

<script setup lang="ts">
import logoSoloImg from '@/assets/logo-solo.png';
</script>
