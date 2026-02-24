<script lang="ts" setup>
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import DatePicker from 'primevue/datepicker';
import Message from 'primevue/message';

export interface BaseInputTextProps {
    label?: string;
    name: string;
    size?: 'small' | 'large';
    dateFormat?: string;
    view?: 'date' | 'month' | 'year';
    showIcon?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    errorMessage?: string;
}

withDefaults(defineProps<BaseInputTextProps>(), {
    dateFormat: 'dd/mm/yy',
    size: 'large',
    view: 'date',
    showIcon: false,
    disabled: false,
    invalid: false,
});
</script>

<template>
    <InputGroup>
        <InputGroupAddon>
            <i class="pi pi-calendar"></i>
        </InputGroupAddon>
        <FloatLabel variant="on">
            <DatePicker 
                :name="name" 
                :size="size"
                :dateFormat="dateFormat"
                :view="view"
                :showIcon="showIcon"
                :disabled="disabled"
                :invalid="invalid"
                :errorMessage="errorMessage"
                fluid 
            />
    
            <label v-if="label" :for="name">{{ label }}</label>
    
        </FloatLabel>
    </InputGroup>
    <Message severity="error" size="small" variant="simple">{{ errorMessage }}</Message>
</template>