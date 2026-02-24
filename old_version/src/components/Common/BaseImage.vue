<script lang="ts" setup>
import Image from 'primevue/image';

interface BaseImageProps {
    src: string;
    alt?: string;
    width?: string | number;
    height?: string | number;
}

const props = withDefaults(defineProps<BaseImageProps>(), {
    alt: '',
    width: '100%',
    height: 'auto',
});

</script>

<template>
    <Image 
        :src="props.src" 
        :width="props.width" 
        :alt="props.alt"
    />
</template>
