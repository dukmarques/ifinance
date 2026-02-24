type Revenues = {
    id: string;
    title: string;
    amount: number|string;
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
    override?: RevenuesOverrides;
};

type RevenuesOverrides = {
    id: string;
    title?: string;
    amount: number | string;
    description?: string;
    receiving_date: string;
    revenues_id: string;
    is_deleted: boolean;
};

type RevenueModificationTypes = 'only_month' | 'current_month_and_followers' | 'all_month';

export type { Revenues, RevenuesOverrides, RevenueModificationTypes };