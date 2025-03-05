<template>
    <v-fab
        v-bind="$attrs"
        class="mr-8"
        icon="mdi-plus"
        location="top end"
        absolute
        offset
        color="primary"
        title="Adicionar"
    >
        <slot>
            <v-icon icon="fa-solid fa-plus" color="white" size="small"/>
        </slot>
    </v-fab>
</template>

<script setup lang="ts">

</script>
