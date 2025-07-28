<template>
    <section id="register" class="flex flex-col md:flex-row h-screen">
        <div class="illustration bg-primary flex flex-col justify-center items-center w-full md:w-1/2">
            <BaseImage
                :src="loginImg"
                alt="Login Illustration"
            />

            <div class="info flex flex-col gap-5 text-center">
                <h3 class="font-poppins text-3xl font-bold text-white">Organize suas finanças</h3>

                <p class="font-quick text-lg text-white">
                    Fácil e intuitivo, com o Prosperify você se <br />
                    organiza e mantém o controle financeiro!
                </p>
            </div>
        </div>

        <div class="form-content flex justify-center items-center w-full md:w-1/2">
            <Form 
                v-slot="$form" 
                :initialValues="initialValues"
                :resolver="resolver"
                @submit="login" 
                class="form flex flex-col items-center rounded-[12px] w-full !p-[14px] !m-[8px] gap-4"
            >

                <div class="mb-4">
                    <Image 
                        :src="prosperifyLogo"
                        :width="226"
                        class="mb-5 mx-auto"
                        alt="Prosperify Logo"
                    />
                </div>

                <div class="w-full">
                    <BaseInputEmail
                        name="email"
                        label="E-mail"
                        size="large"
                        :invalid="$form.email?.invalid"
                        :errorMessage="$form.email?.error?.message"
                        :disabled="loading"
                    />
                </div>

                <div class="w-full">
                    <BaseInputPassword
                        name="password"
                        label="Senha"
                        size="large"
                        :invalid="$form.password?.invalid"
                        :errorMessage="$form.password?.error?.message"
                        :disabled="loading"
                    />
                </div>

                <BaseButton 
                    title="Acessar"
                    type="submit"
                    icon="pi pi-sign-in"
                    iconPos="right"
                    size="large"
                    class="bg-primary font-poppins text-white w-full"
                    :loading="loading"
                    fluid
                />

                <RouterLink
                    to="/register"
                    class="text-gray-400 font-poppins hover:text-gray-300 transition-all duration-200 "
                >
                    Não tem uma conta? Registre-se
                </RouterLink>
            </Form>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Form, type FormSubmitEvent } from '@primevue/forms';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import * as z from 'zod';

import loginImg from '@/assets/Auth/login-illustration.png';
import BaseImage from '@/components/Base/BaseImage.vue';
import BaseButton from '@/components/BaseForm/BaseButton.vue';
import BaseInputEmail from '@/components/BaseForm/BaseInputEmail.vue';
import BaseInputPassword from '@/components/BaseForm/BaseInputPassword.vue';

import prosperifyLogo from '@/assets/logo-name-primary.png';
import { useUserStore } from '@/stores/user';
import { useToast } from '@/composables/useToast';


const router = useRouter();
const { showError } = useToast();

const loading = ref(false);
const userStore = useUserStore();

const resolver = ref(zodResolver(
    z.object({
        email: z.email('Email inválido'),
        password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
    })
));

const initialValues = ref({
    email: '',
    password: ''
});

async function login({ valid, values }: FormSubmitEvent<typeof initialValues.value>) {
    if (valid) {
        try {
            loading.value = true;

            await userStore.login(values);

            router.push('/dashboard');
        } catch (error: any) {
            showError({
                message: 'Erro ao fazer login', 
                description: error.response.data.message
            });
        } finally {
            loading.value = false;
        }
    }
}
</script>

<style scoped>
#register {
    .form-content {
        .form {
            max-width: 355px;
            border: 1px solid rgba(53,151,102, 0.3);
        }
    }
}
</style>