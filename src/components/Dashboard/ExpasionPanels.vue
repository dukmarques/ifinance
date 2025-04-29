<template>
    <v-container fluid id="expansion-panels" class="mb-2">
        <v-expansion-panels 
            variant="accordion"
            focusable
        >
            <v-expansion-panel>
                <v-expansion-panel-title>
                    <slot name="title">
                        <v-icon v-if="icon" class="mr-3" :icon="icon"></v-icon>
                        <div class="text-h6">{{ title }}</div>
                    </slot>
                </v-expansion-panel-title>

                <v-expansion-panel-text>
                    <DataTable 
                        :headers="headers"
                        :items="items"
                        :loading="loading"
                    />
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-container>
</template>

<script setup lang="ts">
import { shallowRef, defineProps, defineComponent } from 'vue';
import DataTable, { type DataTableHeader, type DataTableItem } from '@/components/Dashboard/DataTable.vue';

defineProps({
    title: {
        type: String,
        required: true,
    },
    icon: {
        type: String, defineComponent,
        required: false,
    },
    headers: {
        type: Array as () => DataTableHeader[],
        required: true,
    },
    items: {
        type: Array as () => DataTableItem[],
        required: true,
    },
});

const loading = shallowRef(false);

</script>

<style scoped lang="scss">
#expansion-panels {
    padding: 0 5px;
}
</style>