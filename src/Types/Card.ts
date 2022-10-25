export type Card = {
    id: number;
    name: string;
    userId?: number | null;
    closingDate?: Date | string | null;
    dueDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}