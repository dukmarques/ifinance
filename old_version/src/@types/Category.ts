import type { User } from './User';

type Category = {
    id: string;
    name: string;
    user_id: string;
    user?: User;
    created_at?: string;
    updated_at?: string;
    //revenues?: Revenues[];
    revenues_count: number;
    expenses?: [];
    expenses_count: number;
    card_expenses?: [];
    card_expenses_count: number;
};

export type { Category };