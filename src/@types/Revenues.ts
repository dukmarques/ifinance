import type { RevenuesOverrides } from "./RevenuesOverrides";

type Revenues = {
    id: string;
    title: string;
    amount: number;
    receiving_date: string;
    deprecated_date?: string;
    recurrent: boolean;
    description: string;
    user_id: string;
    category_id?: string;
    revenues_overrides?: RevenuesOverrides[];
};

export type { Revenues };