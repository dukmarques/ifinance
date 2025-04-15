<template>
    <v-fab
        app
        :color="open ? '' : 'primary'"
        location="right bottom"
        size="large"
        icon
    >
        <v-icon>{{ open ? 'fa-solid fa-xmark' : 'fa-solid fa-plus' }}</v-icon>
        <v-speed-dial 
            v-model="open" 
            location="top center" 
            transition="slide-y-reverse-transition" 
            activator="parent"
        >
            <v-btn key="1" color="success" icon>
                <v-icon size="24">$success</v-icon>
            </v-btn>

            <v-btn key="2" color="info" icon>
                <v-icon size="24">$info</v-icon>
            </v-btn>

            <v-btn key="3" color="warning" icon>
                <v-icon size="24">$warning</v-icon>
            </v-btn>

            <v-btn key="4" color="error" icon>
                <v-icon size="24">$error</v-icon>
            </v-btn>
        </v-speed-dial>
    </v-fab>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'

const open = shallowRef(false)

function reopen () {
    open.value = false
    setTimeout(() => open.value = true, 400)
}
</script>
