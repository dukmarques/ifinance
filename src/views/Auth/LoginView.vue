<template>
    <VContainer fluid id="register" tag="section">
        <v-row>
            <v-col
                class="illustration bg-primary d-flex flex-column justify-center align-center"
                cols="6"
            >
                <v-img
                    :src="loginImg"
                    width="500"
                    max-height="500"
                    transition="scroll-y-transition"
                    aspect-ratio="16/9"
                />

                <div class="info d-flex flex-column ga-5">
                    <h3 class="text-h3 font-weight-bold">
                        Organize suas finanças
                    </h3>

                    <p class="text-h5">
                        Fácil e intuítivo, com o Prosperify você se <br>
                        organiza e mantém o controle financeiro!
                    </p>
                </div>
            </v-col>

            <v-col class="form-content" cols="6">
                <v-form
                    ref="form"
                    class="form ma-2 pa-8"
                    :disabled="loading"
                    @submit.prevent="login"
                >
                    <v-row>
                        <v-col cols="12">
                            <v-img
                                :src="prosperifyLogo"
                                class="mb-5 mx-auto"
                                width="226"
                                cover
                            >
                            </v-img>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12">
                            <InputEmail
                                v-model="email"
                                label="E-mail"
                                placeholder="Digite seu e-mail"
                                required
                            />
                        </v-col>

                        <v-col cols="12">
                            <InputPassword
                                v-model="password"
                                label="Senha"
                                placeholder="********"
                                required
                                :rules="passwordRules"
                            />
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12">
                            <ButtonForm
                                :loading="loading"
                                block
                                class="text-none text-subtitle-1"
                            >
                                <div class="d-flex justify-center ga-2">
                                    <LoginIcon />
                                    Acessar
                                </div>
                            </ButtonForm>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12">
                            <div class="d-flex justify-center">
                                <v-btn
                                    variant="plain"
                                    class="text-none text-subtitle-1"
                                    color="#A8A8B3"
                                    @click="router.push('/register')"
                                >
                                    Registre-se
                                </v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
        </v-row>
    </VContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import loginImg from '@/assets/Auth/login-illustration.png';
import InputEmail from '@/components/form/InputEmail.vue';
import InputPassword from '@/components/form/InputPassword.vue';
import ButtonForm from '@/components/form/ButtonForm.vue';

import prosperifyLogo from '@/assets/logo-primary.png';
import LoginIcon from '@/components/icons/IconLogin.vue';
import { useToast } from '@/stores/toast';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const toast = useToast();

const form = ref();
const loading = ref(false);
const email = ref('');
const password = ref('');

const userStore = useUserStore();

const passwordRules = [
    (v: string) => !!v || 'Senha é obrigatório',
    (v: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v)
    || 'A senha deve conter: 8 caracteres, uma letra maiuscula, uma minuscula, um numero e caracter especial',
];

async function login() {
    const { valid } = await form.value.validate();

    if (valid) {
        try {
            loading.value = true;

            await userStore.login({
                email: email.value,
                password: password.value,
                device_name: 'web',
            });

            router.push('/dashboard');
        } catch (error: any) {
            toast.show(error.response.data.message, 'error');
        } finally {
            loading.value = false;
        }
    } else {
        toast.show('Preencha os campos corretamente', 'error');
    }
}
</script>

<style lang="scss" scoped>
#register {
    padding: 0px;

    .illustration {
        height: 100vh;
    }

    .form-content {
        display: flex;
        justify-content: center;
        align-items: center;

        .form {
            max-width: 320px;
            width: 100%;

            .v-col {
                padding: 0px;
            }
        }
    }
}
</style>
