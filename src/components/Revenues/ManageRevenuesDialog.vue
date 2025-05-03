<template>
    <v-dialog
        :model-value="modelValue"
        persistent
        max-width="700"
    >
        <v-form
            ref="form"
            @submit.prevent="submit"
            :loading="loading"
            :disabled="loading"
        >
            <v-card>
                <v-card-title class="d-flex ga-3 align-center pt-5 pl-5">
                    <v-icon icon="fa-solid fa-credit-card"></v-icon>
                    {{ title }}
                </v-card-title>

                <v-divider></v-divider>

                <v-card-text>
                    <v-row dense>
                        <v-col>
                            <InputText
                                v-model="revenues.title"
                                label="Título"
                                with-rules
                            ></InputText>
                        </v-col>

                        <v-col>
                            <InputMoney
                                v-model="revenues.amount"
                                label="Valor"
                            />
                        </v-col>
                    </v-row>

                    <v-row dense>
                        <v-col>
                            <InputDatePicker 
                                v-model="revenues.receiving_date"
                                label="Data de recebimento"
                            />
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions class="px-5">
                    <ButtonForm type="button" color="error" variant="flat" @click="close">
                        Cancelar
                    </ButtonForm>

                    <v-spacer></v-spacer>

                    <ButtonForm title="Salvar" variant="flat" type="submit" />
                </v-card-actions>
            </v-card>

        </v-form>
    </v-dialog>
</template>

<script lang="ts" setup>
import { ref, toRef, type PropType } from 'vue';
import type { Revenues } from '@/@types/Revenues';
import { useToast } from '@/stores/toast';
import ButtonForm from '../form/ButtonForm.vue';
import InputText from '../form/InputText.vue';
import InputMoney from '../form/InputMoney.vue';
import InputDatePicker from '../form/InputDatePicker.vue';

const emit = defineEmits(['update:modelValue']);
const toast = useToast();

const props = defineProps({
    modelValue: Boolean,
    loading: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        default: 'Gerenciar entrada',
    },
    provider: {
        type: Function,
        required: true,
    },
    revenueItem: {
        type: Object as PropType<Revenues>,
        default: () => ({
            id: '',
            title: '',
            amount: 0,
            receiving_date: new Date(),
            recurrent: false,
            description: '',
        })
    },
})

const form = ref();
const revenues = toRef(props, 'revenueItem');

async function submit() {
    const { valid } = await form.value.validate();

    if (!valid) {
        return toast.show('Verifique se todos os campos estão preenchidos corretamente', 'error');
    }

    await props.provider(revenues.value);
    sanitizeRevenues();
}

function close() {
    emit('update:modelValue', false);
    sanitizeRevenues();
}

function sanitizeRevenues() {
    if (!revenues.value.id) {
        revenues.value = {
            id: '',
            title: '',
            amount: 0,
            receiving_date: new Date(),
            recurrent: false,
            description: '',
            user_id: '',
        }
    }
}
</script>

<style lang="scss" scoped></style>