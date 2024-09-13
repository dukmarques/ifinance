import type { User } from './User';

type Card = {
    id: string;
    name: string;
    closing_date: string;
    due_date: string;
    user_id: string;
    user?: User;
    card_expenses?: any[];
    card_expenses_count?: number;
    expenses?: any[];
    expenses_count?: number;
    created_at?: string;
    updated_at?: string;
};

export type { Card };
