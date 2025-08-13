<script lang="ts" setup>
import { ref } from "vue";
import Select from 'primevue/select';
import FloatLabel from 'primevue/floatlabel';
import Message from 'primevue/message';
import { items } from '@/utils/creditIcons';

export interface SelectCardsTagsProps {
    name: string;
    label?: string;
    disabled?: boolean;
    invalid?: boolean;
    errorMessage?: string;
    size?: "small" | "large";
}

withDefaults(defineProps<SelectCardsTagsProps>(), {
    disabled: false,
    size: "large",
});

const cardItems = ref(items);

function getItemByName(name: string) {
    return cardItems.value.find(item => item.name === name);
}
</script>

<template>
    <FloatLabel class="w-full !h-12" variant="on">
        <Select 
            :name="name"
            :options="cardItems" 
            filter 
            class="!h-full"
            optionLabel="flag"
            optionValue="name"
            :disabled="disabled"
            fluid
        >
            <template #value="slotProps">
                <div 
                    v-if="slotProps.value" 
                    class="flex items-center"
                >
                    <img 
                        :alt="getItemByName(slotProps.value)?.flag || 'Cartão'" 
                        :src="getItemByName(slotProps.value)?.icon" 
                        class="mr-2" 
                        style="width: 24px" 
                    />
                    <div>{{ getItemByName(slotProps.value)?.flag || slotProps.value }}</div>
                </div>
                <span v-else>
                    {{ slotProps.placeholder }}
                </span>
            </template>
            <template #option="slotProps">
                <div class="flex items-center">
                    <img 
                        :alt="slotProps.option.flag" 
                        :src="slotProps.option.icon" 
                        class="mr-2" 
                        style="width: 24px" 
                    />
                    <div>{{ slotProps.option.flag }}</div>
                </div>
            </template>
        </Select>

        <label v-if="label" :for="name">{{ label }}</label>

        <Message v-if="invalid && errorMessage" severity="error" size="small" variant="simple">{{ errorMessage }}</Message>
    </FloatLabel>
</template>
