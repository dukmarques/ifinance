type ExpenseAssignee = {
    id: string|number;
    name: string;
    description?: string;
    expense_count: number;
    card_expense_count: number;
}

export type { ExpenseAssignee };