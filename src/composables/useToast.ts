import { useToast as usePrimevueToast } from "primevue/usetoast";

type ToastParams = {
    message: string;
    description?: string;
    life?: number;
    closable?: boolean;
}

export function useToast() {
    const toast = usePrimevueToast();

    function showSuccess({ message, description, life = 3000, closable = true }: ToastParams) {
        toast.add({ 
            severity: 'success', 
            summary: message, 
            detail: description, 
            life, 
            closable, 
        });
    };

    function showInfo({ message, description, life = 3000, closable = true }: ToastParams) {
        toast.add({
            severity: 'info',
            summary: message,
            detail: description,
            life,
            closable,
        });
    };

    function showError({ message, description, life = 3000, closable = true }: ToastParams) {
        toast.add({
            severity: 'error',
            summary: message,
            detail: description,
            life,
            closable,
        });
    };

    function showWarning({ message, description, life = 3000, closable = true }: ToastParams) {
        toast.add({
            severity: 'warn',
            summary: message,
            detail: description,
            life,
            closable,
        });
    };

    return {
        showSuccess,
        showInfo,
        showError,
        showWarning
    };
};