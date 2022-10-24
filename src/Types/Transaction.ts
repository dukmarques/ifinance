import { Decimal } from "@prisma/client/runtime";
import { Card } from "./Card";
import { Category } from "./Category";
import { User } from "./User";

export type Transaction = {
    id: number;
    title: string;
    price: number | Decimal;
    type: 'ENTRY' | 'EXIT';
    owner: 'MY' | 'OTHER';
    date: Date;
    paidOut: boolean;
    category?: Category | null;
    card?: Card | null;
    user?: User | null;
    createdAt: Date;
    updatedAt: Date;
}