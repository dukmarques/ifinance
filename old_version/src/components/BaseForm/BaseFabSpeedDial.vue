<script lang="ts" setup>
import type { MenuItem } from 'primevue/menuitem';
import SpeedDial from 'primevue/speeddial';

export interface BaseFabSpeedDialProps {
    items: MenuItem[];
    direction?: 'up' | 'down' | 'left' | 'right' | 'up-left' | 'up-right' | 'down-left' | 'down-right';
    type?: 'linear' | 'circle' | 'semi-circle' | 'quarter-circle';
    radius?: number;
    tooltipOptions?: {
        event?: 'hover' | 'focus';
        position?: 'bottom' | 'top' | 'left' | 'right';
    };
}

withDefaults(defineProps<BaseFabSpeedDialProps>(), {
    direction: 'up',
    type: 'linear',
    radius: 80,
    tooltipOptions: () => ({
        event: 'hover',
        position: 'bottom'
    }),
});
</script>

<template>
    <SpeedDial 
        :model="items" 
        :direction="direction" 
        :type="type"
        :radius="radius"
        :tooltipOptions="{ 
            event: tooltipOptions.event, 
            position: tooltipOptions.position 
        }"
    />
</template>