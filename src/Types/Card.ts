export type Card = {
    id: number;
    name: string;
    closingDate?: Date | null;
    dueDate?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}