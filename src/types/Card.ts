import type { User } from './User';

type Card = {
    id: string;
    name: string;
    closing_day: number;
    due_day: number;
    limit: number;
    user_id: string;
    background_color?: string;
    card_flag?: string;
    user?: User;
    card_expenses?: any[];
    card_expenses_count?: number;
    expenses?: any[];
    expenses_count?: number;
    created_at?: string;
    updated_at?: string;
};

export type { Card };
