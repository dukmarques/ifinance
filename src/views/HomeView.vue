<template>
    <div class="flex justify-center items-center h-screen">
        <div class="flex flex-col justify-center items-center gap-10">
            <Image 
                :src="logoImg" 
                alt="Logo" 
                width="600"
            />

            <BaseButton 
                title="Acessar"
                type="button"
                icon="pi pi-sign-in"
                iconPos="right"
                size="large"
                class="bg-primary text-white w-[245px] h-[50px] py-3 rounded-lg shadow-md "
                @click="router.push('/login')"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import logoImg from '@/assets/logo-name-primary.png';
import BaseButton from '@/components/BaseForm/BaseButton.vue';
import Image from 'primevue/image';


const router = useRouter();
</script>
