import { Card } from "@prisma/client";

export type User = {
    id: number;
    name: string;
    email: string;
    public: boolean;
    createdAt: Date;
    updatedAt: Date;
    cards: Card | Card[] | null;
}| null;