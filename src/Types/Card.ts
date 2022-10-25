export type Card = {
    id: number;
    name: string;
    closingDate?: Date | string | null;
    dueDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}