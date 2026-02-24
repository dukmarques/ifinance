<script lang="ts" setup>
import { useRouter } from 'vue-router';
import logoImage from '@/assets/logo-primary.png';
import BaseImage from '@/components/Common/BaseImage.vue';
import Container from '@/components/Common/Container.vue';
import BaseButton from '@/components/BaseForm/BaseButton.vue';

const router = useRouter();
</script>

<template>
    <Container fluid>
        <div class="flex flex-col items-center justify-center gap-2 min-h-screen p-4 text-center">
            <BaseImage :src="logoImage" alt="Logo Prosperify" width="350" height="auto" />
            <h1 class="text-4xl font-bold text-surface-600 dark:text-surface-200">Ops, 404!</h1>
            <h2 class="text-2xl text-surface-300">Página não encontrada</h2>
            <p class="text-surface-300 mb-3">A página que você está tentando acessar não existe.</p>
            <BaseButton 
                title="Voltar para a página inicial"
                @click="router.push('/dashboard')"
                type="button"
                variant="text"
                size="small"
            />
        </div>
    </Container>
</template>
