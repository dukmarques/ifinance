<template>
    <VContainer fluid id="register" tag="section">
        <v-row>
            <v-col
                class="illustration bg-primary d-flex flex-column justify-center align-center"
                cols="6"
            >
                <v-img
                    :src="registerImg"
                    width="500"
                    max-height="500"
                    transition="scroll-y-transition"
                    aspect-ratio="16/9"
                />

                <div class="info d-flex flex-column ga-5">
                    <h3 class="text-h3 font-weight-bold">
                        Tenha o controle <br>
                        financeiro na palma <br>
                        das suas mãos
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
                    @submit.prevent="register"
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
                            <InputText
                                v-model="name"
                                label="Nome"
                                placeholder="Digite seu nome"
                                required
                                :rules="nameRules"
                            />
                        </v-col>

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

                        <v-col cols="12">
                            <InputPassword
                                v-model="confirmPassword"
                                label="Confirme a senha"
                                placeholder="********"
                                required
                                :rules="confirmPasswordRules"
                            />
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12">
                            <PasswordValidationInfo :password="password" />
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
                                    <RegisterIcon />
                                    Criar conta
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
                                    @click="router.push('/login')"
                                >
                                    Já possui conta? Faça login
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
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import registerImg from '@/assets/Auth/register-illustration.png';
import InputText from '@/components/form/InputText.vue';
import InputEmail from '@/components/form/InputEmail.vue';
import InputPassword from '@/components/form/InputPassword.vue';
import ButtonForm from '@/components/form/ButtonForm.vue';

import prosperifyLogo from '@/assets/logo-primary.png';
import RegisterIcon from '@/components/icons/IconRegister.vue';
import { useToast } from '@/stores/toast';
import PasswordValidationInfo from '@/components/Auth/PasswordValidationInfo.vue';

const router = useRouter();
const toast = useToast();
const axios: any = inject('axios');

const form = ref();
const loading = ref(false);
const name = ref('');
const email = ref('');
const confirmPassword = ref('');
const password = ref('');

const nameRules = [
    (v: string) => !!v || 'Nome é obrigatório',
    (v: string) => v.length >= 3 || 'Nome deve conter no mínimo 3 caracteres',
];

const passwordRules = [
    (v: string) => !!v || 'Senha é obrigatório',
    (v: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v)
    || 'A senha deve conter: 8 caracteres, uma letra maiuscula, uma minuscula, um numero e caracter especial',
];

const confirmPasswordRules = [
    (v: string) => !!v || 'Confirmação de senha é obrigatório',
    (v: string) => v === password.value || 'As senhas não coincidem',
];

async function register() {
    const { valid } = await form.value.validate();

    if (valid) {
        try {
            loading.value = true;
            const { data } = await axios.post('/users', {
                name: name.value,
                email: email.value,
                password: password.value,
            });

            toast.show('Conta criada com sucesso', 'success');
            router.push('/login');
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
    height: 100%;
    padding: 0px;

    .illustration {
        height: 101vh;
    }

    .form-content {
        display: flex;
        justify-content: center;
        align-items: center;

        .form {
            border: 1px solid rgb(var(--v-theme-primary), 0.3);
            border-radius: 12px;
            max-width: 355px;
            width: 100%;

            .v-col {
                padding: 0px;
            }
        }
    }
}
</style>
