/* eslint-disable import/no-extraneous-dependencies */
import 'vuetify/styles';

import 'material-design-icons-iconfont/dist/material-design-icons.css';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, md } from 'vuetify/iconsets/md';

const vuetify = createVuetify({
    components,
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
        defaultSet: 'md',
        aliases,
        sets: {
            md,
        },
    },
});

export default vuetify;
