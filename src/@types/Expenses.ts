import type { Category } from "./Category";
import type { ExpenseAssignee } from "./ExpensesAssignee";

type Expense = {
    id: string;
    title: string;
    type: ExpenseType;
    amount: number|string;
    is_owner: boolean;
    assignee?: ExpenseAssignee;
    paid: boolean;
    payment_month: string|Date;
    deprecated_date: string|Date;
    description?: string;
    user_id: string;
    category_id?: string;
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

type ExpenseType = 'simple' | 'recurrent';

export type { 
    Expense, 
    ExpenseOverride, 
    ExpenseType,
};