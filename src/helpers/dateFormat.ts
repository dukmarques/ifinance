const formatDateToMMYY = (date: Date | string): string => {
    const dateRaw = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('pt-BR', {
        month: '2-digit',
        year: '2-digit',
    }).format(dateRaw);
};

export { formatDateToMMYY };
