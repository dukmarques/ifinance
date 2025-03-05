<template>
    <v-dialog
        :model-value="modelValue"
        persistent
        max-width="700"
    >
        <v-form
            ref="form"
            @submit.prevent="submit"
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
                        <v-col cols="12">
                            <InputText
                                v-model="localCard.name"
                                label="Nome do cartão"
                                with-rules
                            ></InputText>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <InputNumber
                                v-model="localCard.closing_day"
                                label="Data de fechamento"
                                :max="31"
                                :min="1"
                                with-rules
                            ></InputNumber>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <InputNumber
                                v-model="localCard.due_day"
                                label="Data de vencimento"
                                :max="31"
                                :min="1"
                                with-rules
                            ></InputNumber>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <InputColorPicker 
                                v-model="localCard.background_color"
                            />
                        </v-col>
                        
                        <v-col cols="12" sm="6">
                            <InputMoney
                                v-model="localCard.limit"
                                label="Limite do cartão"
                            />
                        </v-col>

                        <v-col cols="12" sm="6">
                            <AutocompleteCard
                                v-model="localCard.card_flag"
                            />
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions class="px-5">
                    <ButtonForm
                        color="error"
                        @click="close"
                        :disabled="loading"
                        type="button"
                    >
                        Cancelar
                    </ButtonForm>

                    <v-spacer></v-spacer>

                    <ButtonForm
                        :loading="loading"
                        variant="tonal"
                        type="submit"
                    >
                        Salvar
                    </ButtonForm>
                </v-card-actions>
            </v-card>
        </v-form>


    </v-dialog>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue';
import type { Card } from '@/types/Card';
import { useToast } from '@/stores/toast';

import InputText from '@/components/form/InputText.vue';
import InputNumber from '../form/InputNumber.vue';
import InputMoney from '@/components/form/InputMoney.vue';
import ButtonForm from '@/components/form/ButtonForm.vue';
import InputColorPicker from '@/components/form/InputColorPicker.vue';
import AutocompleteCard from '@/components/form/AutocompleteCard.vue';

const emit = defineEmits(["update:modelValue"]);
const toast = useToast();

const props = defineProps({
    modelValue: Boolean,
    title: {
        type: String,
        default: 'Adicionar cartão',
    },
    card: {
        type: Object as PropType<Card>,
        default: () => ({
            id: '',
            name: '',
            closing_day: 1,
            due_day: 1,
            limit: 0,
            background_color: '',
            card_flag: 'defaultCard',
        }),
    },
    provider: {
        type: Function,
        required: true,
    },
    loading: {
        type: Boolean,
        default: false,
    },
});

const form = ref();
const localCard = ref({ ...props.card });

async function submit() {
    const { valid } = await form.value.validate();

    if (!valid) {
        toast.show('Verifique se todos os campos estão preenchidos corretamente', 'error');
        return;
    }
    
    await props.provider(localCard.value);
    sanitizeCard();
}

function close() {
    emit('update:modelValue', false);
    sanitizeCard();
}

function sanitizeCard() {
    if (!localCard.value.id) {
        localCard.value = { 
            id: '',
            name: '',
            closing_day: 1,
            due_day: 1,
            limit: 0,
            background_color: '',
            card_flag: 'defaultCard',
            user_id: '',
        };
    }
}
</script>