<template>
    <v-menu
        v-model="menu"
        :close-on-content-click="true"
        :close-on-click-outside="true"
        :activator="activatorRef"
    >
        <template #default="{ props }">
            <v-color-picker
                v-model="color"
                @update:model-value="onColorUpdate"
                mode="hexa"
                show-swatches
                hide-canvas
                hide-inputs
                hide-sliders
                v-bind="props"
            />
            <v-btn @click="menu = false">Fechar</v-btn>
        </template>
    </v-menu>

    <v-text-field
        ref="activatorRef"
        label="Selecione uma cor"
        v-model="color"
        :style="{ color }"
        readonly
        density="comfortable"
        variant="outlined"
        base-color="#A8A8B3"
        color="primary"
    />
</template>
  
<script setup>
import { ref, toRef } from 'vue'

const props = defineProps({
    modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);
  
// Variáveis reativas
const color = toRef(props.modelValue) // Valor inicial da cor
const menu = ref(false) // Controla o menu do color picker
const activatorRef = ref(null) // Ref do ativador
  
// Atualiza a cor ao selecionar
const onColorUpdate = newColor => {
    color.value = newColor;
    emit('update:modelValue', newColor);
}
</script>
  