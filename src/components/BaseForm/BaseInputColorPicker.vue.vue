<script lang="ts" setup>
import { ref, watch } from 'vue';
import ColorPicker from 'primevue/colorpicker';
import OverlayPanel from 'primevue/overlaypanel';
import InputText from 'primevue/inputtext';

export interface BaseInputColorPickerProps {
    modelValue: string;
    name: string;
    label?: string;
    disabled?: boolean;
    invalid?: boolean;
    errorMessage?: string;
    size?: "small" | "large";
}

const props = withDefaults(defineProps<BaseInputColorPickerProps>(), {
    disabled: false,
    size: "large",
});

const emit = defineEmits(["update:modelValue"]);

const inputValue = ref(props.modelValue || '');
const op = ref();
const inputRef = ref();

watch(() => props.modelValue, (newValue) => {
    if (newValue) {
        inputValue.value = newValue;
    }
}, { immediate: true });

const onColorUpdate = (event: { value: string }) => {
    const newColor = event.value;
    inputValue.value = newColor;
    emit('update:modelValue', newColor);
};

const swatchColors = [
    [
        "#f44336",
        "#2196f3",
        "#8bc34a",
        "#ff5722",
        "#ffffff"
    ],
    [
        "#e91e63",
        "#03a9f4",
        "#cddc39",
        "#795548"
    ],
    [
        "#9c27b0",
        "#00bcd4",
        "#ffeb3b",
        "#607d8b"
    ],
    [
        "#673ab7",
        "#009688",
        "#ffc107",
        "#9e9e9e"
    ],
    [
        "#3f51b5",
        "#4caf50",
        "#ff9800",
        "#000000"
    ]
]

const toggleColorPicker = (event: Event) => {
    op.value.toggle(event);
};

const closeColorPicker = () => {
    op.value.hide();
};

const selectSwatch = (colorValue: string) => {
    inputValue.value = colorValue;
    emit('update:modelValue', colorValue);
    closeColorPicker();
};
</script>

<template>
    <div class="w-full">
        <div class="relative">
            <FloatLabel class="w-full !h-12" variant="on">
                <InputText
                    ref="inputRef"
                    v-model="inputValue"
                    :style="{ color: inputValue }"
                    readonly
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    @click="toggleColorPicker"
                    :size="size"
                >
                </InputText>

                <label v-if="label">{{ label }}</label>

                <Message v-if="invalid && errorMessage" severity="error" size="small" variant="simple">{{ errorMessage }}</Message>
            </FloatLabel>
            <div 
                v-if="inputValue" 
                class="absolute inset-y-0 left-3 flex items-center pointer-events-none"
            >
                <i class="pi pi-palette mr-2"></i>
            </div>
            <!-- Mostra um pequeno indicador de cor -->
            <div 
                v-if="inputValue" 
                class="absolute inset-y-0 right-3 flex items-center"
            >
                <div 
                    class="w-6 h-6 rounded-full border border-gray-300" 
                    :style="{ backgroundColor: inputValue }"
                ></div>
            </div>
        </div>

        <OverlayPanel ref="op" class="color-picker-overlay">
            <div class="p-4">
                <ColorPicker 
                    v-model="inputValue"
                    @update:modelValue="onColorUpdate"
                    format="hex"
                    :pt="{
                        root: { class: 'mb-2 w-full !hidden' },
                        preview: { class: 'w-full h-3 rounded' }
                    }"
                />
                <div class="grid grid-cols-5">
                    <div 
                        v-for="column in swatchColors" 
                        :key="column[0]" 
                    >
                        <div 
                            v-for="swatch in column" 
                            :key="swatch" 
                            class="w-12 h-5 !m-1 rounded-sm cursor-pointer hover:ring-2 hover:ring-primary-500 transition-all"
                            :style="{ backgroundColor: swatch }"
                            @click="selectSwatch(swatch)"
                        ></div>
                    </div>
                </div>
            </div>
        </OverlayPanel>
    </div>
</template>

<style scoped>
.color-picker-overlay :deep(.p-overlaypanel-content) {
    padding: 0;
}

/* Adequando o visual para combinar com Tailwind */
:deep(.p-colorpicker-preview) {
    width: 100%;
    height: 2rem;
    border-radius: 0.25rem;
}
</style>
