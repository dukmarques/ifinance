import { Card } from "./Card";
import { Category } from "./Category";
import { User } from "./User";

export type Transaction = {
    id: number;
    attributes: {
        title: string;
        price: number;
        type: 'entry' | 'exit';
        owner: string;
        date: string;
        paidOut: boolean;
        category: { data: Category } | null;
        card: { data: Card; } | null;
        user: { data: User } | null;
        createdAt: string;
        updatedAt: string;
    }
}