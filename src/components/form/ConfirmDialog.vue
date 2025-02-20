<template>
    <v-dialog
        :model-value="modelValue"
        width="auto"
    >
        <v-card
            max-width="400"
            :title="title"
            :text="text"
        >
            <v-card-actions class="px-5">
                <ButtonForm
                    color="primary"
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
                    color="error"
                    @click="confirm"
                >
                    Confirmar
                </ButtonForm>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import ButtonForm from '@/components/form/ButtonForm.vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: ''
    },
    text: {
        type: String,
        default: ''
    },
    loading: {
        type: Boolean,
        default: false
    },
})

const emit = defineEmits([
    "update:modelValue", "confirm"
]);

function confirm() {
    emit('confirm');
}

function close() {
    emit('update:modelValue', false);
}
</script>