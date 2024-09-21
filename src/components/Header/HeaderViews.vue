<template>
    <div
        id="header"
        class="d-flex justify-space-between align-center mt-5 mb-3 ml-2"
    >
        <div class="content">
            <h1 class="text-h3 font-weight-bold">
                {{ title }}
            </h1>
            <p v-if="subtitle" class="text-h6">
                {{ subtitle }}
            </p>
        </div>

        <FabButton
            v-if="hasFabButton"
            :title="fabButtonTitle"
            @click="fabButtonClick"
        />
    </div>
    <v-divider class="mt-3" color="primary"></v-divider>
</template>

<script setup lang="ts">
import FabButton from '../form/FabButton.vue';

defineProps({
    title: {
        type: String,
        defaut: '',
    },
    subtitle: {
        type: String,
        default: null,
    },

    hasFabButton: {
        type: Boolean,
        default: false,
    },

    fabButtonTitle: {
        type: String,
        default: 'Adicionar',
    },

    fabButtonClick: {
        type: Function,
        default: () => {},
    },
});
</script>

<style lang="scss" scoped>
#header {
    width: 100%;
}
</style>
