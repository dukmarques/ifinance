import 'vuetify/styles';
import '@fortawesome/fontawesome-free/css/all.css'

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, fa } from 'vuetify/iconsets/fa';
import { VDateInput } from 'vuetify/labs/VDateInput';

const vuetify = createVuetify({
    components: {
        ...components,
        VDateInput,
    },
    directives,
    theme: {
        defaultTheme: 'dark',
        themes: {
            dark: {
                colors: {
                    primary: '#359766',
                    'primary-darken-1': '#10393B',
                    secondary: '#202223',
                },
            },
        },
    },
    icons: {
        defaultSet: 'fa',
        aliases,
        sets: {
            fa,
        },
    },
});

export default vuetify;
