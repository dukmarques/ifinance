export type Card = {
    id: number;
    name: string;
    userId?: number | null;
    closingDay?: number | null;
    dueDay?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}