import { Card } from "./Card";
import { Category } from "./Category";
import { User } from "./User";

export type Transaction = {
    title: string;
    price: number;
    type: 'entry' | 'exit';
    owner: string;
    date: string;
    category: Category;
    card: Card;
    paidOut: boolean;
    user: User;
}