import type { Card } from "./Card";
import type { Category } from "./Category";

type Expense = {
    id: string;
    title: string;
    type: 'simple' | 'recurrent';
    amount: number|string;
    is_owner: boolean;
    paid: boolean;
    payment_month: string|Date;
    deprecated_date: string|Date;
    description?: string;
    user_id: string;
    card_id: string;
    card: Card;
    category_id: string;
    category: Category;
    override?: ExpenseOverride;
};

type ExpenseOverride = {
    id: string;
    title?: string;
    total_amount?: number|string;
    is_deleted?: boolean;
    payment_month?: string|Date;
    description?: string;
};

export type { Expense, ExpenseOverride };