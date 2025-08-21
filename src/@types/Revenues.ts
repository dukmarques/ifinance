import type { RevenuesOverrides } from "./RevenuesOverrides";

type Revenues = {
    id: string;
    title: string;
    amount: number;
    receiving_date: string|Date;
    deprecated_date?: string|Date;
    recurrent: boolean;
    description: string;
    user_id: string;
    category_id?: string;
    category?: {
        id: string;
        name: string;
    };
    revenues_overrides?: RevenuesOverrides[];
};

enum RevenuesActionsTypes {
    ONLY_MONTH = 'only_month',
    CURRENT_MONTH_AND_FOLLOWERS = 'current_month_and_followers',
    ALL_MONTH = 'all_month',
};

export { type Revenues, RevenuesActionsTypes };