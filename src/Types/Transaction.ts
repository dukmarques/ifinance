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
    date: Date | string;
    paidOut: boolean;
    Category?: Category | null;
    Card?: Card | null;
    User?: User | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}