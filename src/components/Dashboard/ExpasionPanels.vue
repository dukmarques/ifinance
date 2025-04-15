<template>
    <v-container fluid id="expansion-panels" class="mb-2">
        <v-expansion-panels 
            variant="accordion"
            focusable
        >
            <v-expansion-panel>
                <v-expansion-panel-title>
                    <div class="text-h6">Fixos</div>
                </v-expansion-panel-title>

                <v-expansion-panel-text>
                    <v-data-table
                        hide-default-footer
                        :headers="headers"
                        :items="items"
                        :loading="loading"
                    >
                        <template v-slot:loading>
                            <v-skeleton-loader type="table-row@3"></v-skeleton-loader>
                        </template>

                        <template v-slot:item.title="{ value }">
                            <v-chip :text="value" border="thin opacity-25" prepend-icon="fa fa-book" label>
                                <template v-slot:prepend>
                                    <v-icon color="medium-emphasis"></v-icon>
                                </template>
                            </v-chip>
                        </template>

                        <template v-slot:item.actions="{ item }">
                            <div class="d-flex ga-2 justify-end">
                                <v-icon color="medium-emphasis" icon="fa fa-pencil" size="small" @click="edit(item.id)"></v-icon>

                                <v-icon color="medium-emphasis" icon="fa fa-trash" size="small" @click="remove(item.id)"></v-icon>
                            </div>
                        </template>

                        <template v-slot:no-data>
                            <v-btn
                                prepend-icon="mdi-backup-restore"
                                rounded="lg"
                                text="Reset data"
                                variant="text"
                                border
                                @click="reset"
                            ></v-btn>
                        </template>
                    </v-data-table>

                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-container>
</template>

<script setup lang="ts">
import ExpansionItem from '@/components/Dashboard/ExpansionItem.vue';
import { shallowRef } from 'vue';

const loading = shallowRef(false);

const headers = [
    { title: 'Title', key: 'title', align: 'start' },
    { title: 'Genre', key: 'genre' },
    { title: 'Year', key: 'year', align: 'end' },
    { title: 'Pages', key: 'pages', align: 'end' },
    { title: 'Actions', key: 'actions', align: 'end', sortable: false },
]
  
const items = [
    { id: 1, title: 'Avengers', genre: 'Fiction', year: 2000, pages: 281 },
    { id: 2, title: 'Iron Man', genre: 'Dystopian', year: 2005, pages: 328 },
    { id: 3, title: 'Interestellar', genre: 'Fiction', year: 2010, pages: 180 },
    { id: 4, title: 'Dune', genre: 'Non-Fiction', year: 2015, pages: 443 },
    { id: 5, title: 'Dune II', genre: 'Sci-Fi', year: 2020, pages: 412 },
]

</script>

<style scoped lang="scss">
#expansion-panels {
    padding: 0 5px;
}
</style>