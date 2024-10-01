<template>
    <v-autocomplete
        v-model="item"
        @update:model-value="$emit('update:modelValue', item)"
        :items="items"
        item-title="name"
        item-value="name"
        label="Select"
        chips
        closable-chips
        density="comfortable"
        variant="outlined"
        base-color="#A8A8B3"
        color="primary"
    >
        <template v-slot:chip="{ props, item }">
            <v-chip
                v-bind="props"
                :prepend-avatar="item.raw.icon"
                :text="item.raw.flag"
            ></v-chip>
        </template>

        <template v-slot:item="{ props, item }">
            <v-list-item
                v-bind="props"
                :prepend-avatar="item.raw.icon"
                :title="item.raw.flag"
            ></v-list-item>
        </template>
    </v-autocomplete>
</template>

<script setup lang="ts">
import { items } from '@/utils/creditIcons';
import { toRef } from 'vue';

const props = defineProps({
    modelValue: String,
});

defineEmits(['update:modelValue']);

const item = toRef(props.modelValue);

</script>