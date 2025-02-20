<template>
    <v-dialog
        :model-value="modelValue"
        persistent
        max-width="400"
    >
        <v-form
            ref="form"
            @submit.prevent="submit"
            :disabled="loading"
        >
            <v-card>
                <v-card-title class="d-flex ga-3 align-center pt-5 pl-5">
                    {{ title }}
                </v-card-title>

                <v-divider></v-divider>

                <v-card-text>
                    <v-row dense>
                        <v-col cols="12">
                            <InputText
                                v-model="localCategory.name"
                                label="Nome da categoria"
                                with-rules
                            ></InputText>
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
import type { Category } from '@/types/Category';
import { useToast } from '@/stores/toast';

import InputText from '@/components/form/InputText.vue';
import ButtonForm from '@/components/form/ButtonForm.vue';

const emit = defineEmits(["update:modelValue"]);
const toast = useToast();

const props = defineProps({
    modelValue: Boolean,
    title: {
        type: String,
        default: 'Adicionar categoria',
    },
    category: {
        type: Object as PropType<Category>,
        default: () => ({ 
            name: ''
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
const localCategory = ref(props.category);

async function submit() {
    const { valid } = await form.value.validate();

    if (!valid) {
        toast.show('Verifique se todos os campos estão preenchidos corretamente', 'error');
        return;
    }

    await props.provider(localCategory.value);
}

function close() {
    emit('update:modelValue', false);
}
</script>