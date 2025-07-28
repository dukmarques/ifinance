<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Form, type FormSubmitEvent } from '@primevue/forms';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import * as z from 'zod';

import registerImg from '@/assets/Auth/register-illustration.png';
import prosperifyLogo from '@/assets/logo-name-primary.png';
import BaseImage from '@/components/Base/BaseImage.vue';
import BaseButton from '@/components/BaseForm/BaseButton.vue';
import BaseInputText from '@/components/BaseForm/BaseInputText.vue';
import BaseInputEmail from '@/components/BaseForm/BaseInputEmail.vue';
import BaseInputPassword from '@/components/BaseForm/BaseInputPassword.vue';
import PasswordValidationInfo from '@/components/Auth/PasswordValidationInfo.vue';

import { useUserStore } from '@/stores/user';
import { useToast } from '@/composables/useToast';

const router = useRouter();
const { showSuccess, showError } = useToast();

const loading = ref(false);
const { register } = useUserStore();

const resolver = ref(zodResolver(
    z.object({
        name: z.string('Nome é obrigatório.')
            .min(3, 'Nome deve ter pelo menos 3 caracteres.'),
        email: z.email('Email inválido.'),
        password: z.string()
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
                ''
            ),
        confirmPassword: z.string(),
    }).refine((data) => data.password === data.confirmPassword, {
        message: 'As senhas não coincidem.',
        path: ['confirmPassword'],
    })
));

const initialValues = ref({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
});

async function handleSubmit(event: FormSubmitEvent) {
    const { valid, values } = event as FormSubmitEvent<typeof initialValues.value>;

    if (valid) {
        try {
            loading.value = true;

            await register(values);

            showSuccess({
                message: 'Conta criada!', 
                description: 'Você já pode fazer login.'
            });
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

<template>
    <section id="register" class="flex flex-col md:flex-row h-screen">
        <div class="illustration bg-primary flex flex-col justify-center items-center w-full md:w-1/2">
            <BaseImage
                :src="registerImg"
                alt="Register Illustration"
            />

            <div class="info flex flex-col gap-5 text-center">
                <h3 class="font-poppins text-3xl text-left font-bold text-white">
                    Tenha o controle financeiro <br>
                    na palma das suas mãos
                </h3>

                <p class="font-quick text-lg text-left text-white">
                    Fácil e intuítivo, com o Prosperify você se organiza <br>
                    e mantém o controle financeiro!
                </p>
            </div>
        </div>

        <div class="form-content flex justify-center items-center w-full md:w-1/2">
            <Form 
                v-slot="$form" 
                :initialValues="initialValues"
                :resolver="resolver"
                @submit="handleSubmit" 
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
                    <BaseInputText
                        name="name"
                        label="Nome"
                        size="large"
                        :invalid="$form.name?.invalid"
                        :errorMessage="$form.name?.error?.message"
                        :disabled="loading"
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
                        :disabled="loading"
                    />
                </div>

                <div class="w-full">
                    <BaseInputPassword
                        name="confirmPassword"
                        label="Confirmar Senha"
                        size="large"
                        :invalid="$form.confirmPassword?.invalid"
                        :errorMessage="$form.confirmPassword?.error?.message"
                        :disabled="loading"
                    />
                </div>

                <div class="w-full">
                    <PasswordValidationInfo :password="$form.password?.value" newDesign/>
                </div>

                <BaseButton 
                    title="Criar conta"
                    type="submit"
                    icon="pi pi-user-plus"
                    iconPos="left"
                    size="large"
                    class="bg-primary font-poppins text-white w-full"
                    :loading="loading"
                    fluid
                />

                <RouterLink
                    to="/login"
                    class="text-gray-400 font-poppins hover:text-gray-300 transition-all duration-200"
                >
                    Já possui conta? Faça login
                </RouterLink>
            </Form>
        </div>
    </section>
</template>

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