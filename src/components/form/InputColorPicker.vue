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
                :swatches="swatches"
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
    >
        <v-icon 
            v-if="color" 
            icon="fa-solid fa-palette"
            class="mr-2"
        ></v-icon>
    </v-text-field>
</template>
  
<script setup lang="ts">
import { ref, toRef } from 'vue'

import colors from 'vuetify/util/colors'

const props = defineProps({
    modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);
  
const color = toRef(props.modelValue)
const menu = ref(false)
const activatorRef = ref(null)
  
const onColorUpdate = (newColor: string) => {
    color.value = newColor;
    emit('update:modelValue', newColor);
}

const swatches = Object.entries(colors).reduce<string[][]>((acc, [
    key,
    color
], index) => {
    if (key === 'shades') {
        const shades = Object.entries(color)
            .filter(([ shadeKey ]) => shadeKey !== 'transparent')
            .map(([
                ,
                shadeValue
            ]) => shadeValue);
        shades.forEach((shade, i) => {
            const columnIndex = (index + i) % 5;
            if (!acc[columnIndex]) {
                acc[columnIndex] = [];
            }
            acc[columnIndex].push(shade);
        });
    } else if ('base' in color) {
        const columnIndex = index % 5;
        if (!acc[columnIndex]) {
            acc[columnIndex] = [];
        }
        acc[columnIndex].push(color.base);
    }
    return acc;
}, []);
</script>
