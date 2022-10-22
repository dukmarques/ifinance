import { Card } from "./Card";
import { Category } from "./Category";
import { User } from "./User";

export type Transaction = {
    id: number;
    title: string;
    price: number;
    type: 'ENTRY' | 'EXIT';
    owner: string;
    date: string;
    paidOut: boolean;
    category: Category | null;
    card: Card | null;
    user: User | null;
    createdAt: string;
    updatedAt: string;
}