<template>
    <VContainer
        fluid height="100vh"
        class="bg-primary d-flex justify-center align-center"
    >
        <VRow class="d-flex flex-column justify-center align-center ga-10">
            <VImg
                :src="logoImg"
                width="915"
                cover
                transition="scroll-y-transition"

            />

            <VBtn
                size="large"
                rounded="lg"
                width="285"
                height="60"
                @click="router.push('/login')"
                color="secondary"
            >
                Acessar
                <template v-slot:append>
                    <VIcon icon="mdi-arrow-right" color="primary"/>
                </template>
            </VBtn>
        </VRow>
    </VContainer>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import logoImg from '@/assets/logo.png';

const router = useRouter();
</script>
