<script lang="ts" setup>
import Divider from 'primevue/divider';
import FabButton from '@/components/Common/FabButton.vue';

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

<template>
    <div
        id="header"
        class="w-full flex justify-between items-center mt-5 mb-3 ml-2"
    >
        <div>
            <h1 class="text-3xl font-bold">
                {{ title }}
            </h1>
            <p v-if="subtitle" class="text-lg font-medium text-gray-300">
                {{ subtitle }}
            </p>
        </div>

        <FabButton
            v-if="hasFabButton"
            :title="fabButtonTitle"
            @click="fabButtonClick"
            location="top end"
        />
    </div>

    <Divider class="mt-3 mb-3"></Divider>
</template>
