<script lang="ts" setup>
import ColorPicker from 'primevue/colorpicker';

export interface BaseInputColorPickerProps {
    name: string;
    label?: string;
    disabled?: boolean;
    invalid?: boolean;
    errorMessage?: string;
    size?: "small" | "large";
    format?: 'hex' | 'rgb' | 'hsb';
}

withDefaults(defineProps<BaseInputColorPickerProps>(), {
    disabled: false,
    size: "large",
    format: "hex"
});
</script>

<template>
    <div class="flex flex-col">
        <label v-if="label" :for="name">{{ label }}</label>
    
        <ColorPicker 
            :inputId="`input-color-picker-${name}`" 
            :name="name"
            :format="format"
            :pt="{
                preview: {
                    style: {
                        width: '100%',
                        height: '30px',
                    },
                }
            }"
        />
    </div>

    <!-- <FloatLabel variant="on">

        <Message severity="error" size="small" variant="simple">{{ errorMessage }}</Message>
    </FloatLabel> -->
    
</template>