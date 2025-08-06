<template>
    <v-sheet border rounded>
        <v-data-table
            hide-default-footer
            :headers="props.headers"
            :items="props.items"
            :loading="loading"
            loading-text="Buscando itens ..."
        >
            <template v-slot:loading>
                <v-skeleton-loader type="table-row@3"></v-skeleton-loader>
            </template>

            <template v-slot:item.actions="{ item }">
                <div class="d-flex ga-3 justify-end">
                    <v-icon color="medium-emphasis" icon="fa fa-circle-info" size="small" @click="info()" />
                    <v-icon color="medium-emphasis" icon="fa fa-pencil" size="small" @click="onEdit(item.id)" />
                    <v-icon color="medium-emphasis" icon="fa fa-trash" size="small" @click="onRemove(item.id)" />
                </div>
            </template>
        </v-data-table>
    </v-sheet>
</template>

<script lang="ts" setup>
export interface DataTableHeader {
    title: string;
    align?: 'start' | 'end' | 'center';
    sortable?: boolean;
    filterable?: boolean;
    width?: string | number;
    [key: string]: any;
}

export interface DataTableItem {
    id: string | number;
    [key: string]: any;
}

const props = defineProps({
    headers: {
        type: Array as () => DataTableHeader[],
        required: true,
    },
    items: {
        type: Array as () => DataTableItem[],
        required: true,
    },
});

const emit = defineEmits([
    'info',
    'edit',
    'remove',
]);

const loading = false; // Adicionando a propriedade loading

function info() {
    emit('info');
}

function onEdit(id: string | number) {
    emit('edit', id);
}

function onRemove(id: string | number) {
    emit('remove', id);
}
</script>