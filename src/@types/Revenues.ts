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
    revenues_overrides?: RevenuesOverrides[];
};

export type { Revenues };