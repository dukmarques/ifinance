import { defineStore } from 'pinia';
import { toast, type ToastOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import '../assets/toastify.scss';

export const useToast = defineStore('toast', {
    state: () => ({
        message: '',
        timeout: 10000,
        type: 'success',
    }),

    actions: {
        show(message: string, type: string, timeout = 3000) {
            toast(message, {
                theme: 'colored',
                type,
                autoClose: timeout,
                position: toast.POSITION.TOP_RIGHT,
                transition: 'zoom',
                dangerouslyHTMLString: true,
            } as ToastOptions);
        },

        showSuccess(message: string, timeout = 3000) {
            this.show(message, 'success', timeout);
        },

        showError(message: string, timeout = 3000) {
            this.show(message, 'error', timeout);
        }
    },
});
