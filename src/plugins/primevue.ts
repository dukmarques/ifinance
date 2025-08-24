import type { App } from 'vue';
import PrimeVue, { type PrimeVueConfiguration } from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';
import ConfirmationService from 'primevue/confirmationservice';

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            0: '#f3fbf7',
            50: '#e6f7ee',
            100: '#d0f0e0',
            200: '#a5e3c4',
            300: '#7ad6a8',
            400: '#4fc98c',
            500: '#359766',  // cor base para light
            600: '#2a7852',
            700: '#205c3f',
            800: '#15412c',
            900: '#0b2518',
            950: '#051209'
        },
        colorScheme: {
            light: {
                surface: {
                    0: '{primary.0}',
                    50: '{primary.50}',
                    100: '{primary.100}',
                    200: '{primary.200}',
                    300: '{primary.300}',
                    400: '{primary.400}',
                    500: '{primary.500}',
                    600: '{primary.600}',
                    700: '{primary.700}',
                    800: '{primary.800}',
                    900: '{primary.900}',
                    950: '{primary.950}'
                }
            },
            dark: {
                surface: {
                    0: '#f5f5f5',
                    50: '#e0e0e0',
                    100: '#c2c3c3',
                    200: '#a3a5a5',
                    300: '#848787',
                    400: '#656969',
                    500: '#4a4c4c',
                    600: '#363838',
                    700: '#303030',
                    800: '#202223',  // cor base para dark
                    900: '#121313',
                    950: '#080909'
                },
            }
        }
    }
});

const config: PrimeVueConfiguration = {
    theme: {
        preset: MyPreset,
        ripple: true,
        options: {
            darkModeSelector: '.active-dark-mode',
        }
    }
};

export const configPrimevue = (app: App<Element>) => {
    app.use(PrimeVue, config);
    app.use(ToastService);
    app.use(ConfirmationService);
    app.directive('tooltip', Tooltip);
};
