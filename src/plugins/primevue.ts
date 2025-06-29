import PrimeVue, { type PrimeVueConfiguration } from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: '#359766',
        'primary-darken': '#10393B',
        secondary: '#202223',
        focusRing: {
            width: '1px',
            style: 'dashed',
            color: '#359766',
            offset: '1px'
        }
    }
});

const config: PrimeVueConfiguration = {
    theme: {
        preset: MyPreset,
        ripple: true,
    }
};

export { PrimeVue, config };
