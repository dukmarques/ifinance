<template>
    <VNavigationDrawer
        v-model="drawer"
        :rail="rail"
        rail-width="80"
        permanent
        @click="rail = false"
        border="sm"
        rounded="xl"
        width="224"
        class="ma-2 mt-5"
        style="height: 95vh"
    >
        <v-list>
            <VListItem
                prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                subtitle="sandra_a88@gmailcom"
                title="Sandra Adams"
            ></VListItem>
        </v-list>

        <VDivider></VDivider>

        <v-list density="compact" nav>
            <v-list-item link to="/" prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
            <v-list-item link to="/about" prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
            <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
        </v-list>

        <VDivider></VDivider>

        <template v-slot:append>
            <v-list>
                <v-list-item>
                    <v-btn
                        :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
                        variant="text"
                        @click.stop="rail = !rail"
                    ></v-btn>
                </v-list-item>
            </v-list>
        </template>
    </VNavigationDrawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(true)
const rail = ref(false)
</script>

<style></style>