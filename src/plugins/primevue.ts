import PrimeVue, { type PrimeVueConfiguration } from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            first: '#359766',
            secondary: '#10393b',
            thertiary: '#202223',
        },
    },
    components: {
        inputtext: {
            colorScheme: {
                light: {
                    root: {
                        background: '{secondary}',
                        borderColor: '{gray.600}',
                        hoverBorderColor: '{gray.400}',
                        focusBorderColor: '{primary.first}',
                        color: '{gray.50}',
                        disabledBackground: '{gray.700}',
                    }
                }
            }
        },
    }
});

const config: PrimeVueConfiguration = {
    theme: {
        preset: MyPreset,
        ripple: true,
    }
};

export { PrimeVue, config, ToastService, Tooltip };
