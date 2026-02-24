import { useToast as usePrimevueToast } from "primevue/usetoast";

type ToastParams = {
    severity: 'success' | 'info' | 'error' | 'warn';
    message: string;
    description?: string;
    life?: number;
    closable?: boolean;
}

type ToastFunctionsParam = Omit<ToastParams, 'severity'>;

export function useToast() {
    const toast = usePrimevueToast();

    function show({ severity, message, description, life = 3000, closable = true }: ToastParams) {
        toast.add({
            severity,
            summary: message,
            detail: description,
            life,
            closable,
        });
    };

    function showSuccess(toastParam: ToastFunctionsParam) {
        show({ ...toastParam, severity: 'success' });
    };

    function showInfo(toastParam: ToastFunctionsParam) {
        show({ ...toastParam, severity: 'info' });
    };

    function showError(toastParam: ToastFunctionsParam) {
        show({ ...toastParam, severity: 'error' });
    };

    function showWarning(toastParam: ToastFunctionsParam) {
        show({ ...toastParam, severity: 'warn' });
    };

    return {
        showSuccess,
        showInfo,
        showError,
        showWarning
    };
};