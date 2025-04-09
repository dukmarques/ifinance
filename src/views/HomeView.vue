<template>
    <VContainer
        fluid height="100vh"
        class="bg-secondary container d-flex justify-center align-center"
    >
        <VRow class="d-flex flex-column justify-center align-center ga-10">
            <VImg
                :src="logoImg"
                width="600"
                cover
                transition="scroll-y-transition"
            />

            <VBtn
                size="large"
                rounded="lg"
                width="245"
                height="50"
                @click="router.push('/login')"
                color="primary"
            >
                Acessar
                <template v-slot:append>
                    <v-icon icon="fa-solid fa-arrow-right-to-bracket" color="white"/>
                </template>
            </VBtn>
        </VRow>
    </VContainer>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import logoImg from '@/assets/logo-name-primary.png';

const router = useRouter();
</script>

<style lang="scss" scoped>
.container {
    background-color: #13423B;
}
</style>