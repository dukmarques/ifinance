import { CreateTransaction, Transaction } from "../Types/Transaction";
import { api } from "./api";

export async function getTransactionsByUser(userId: number) {
    try {
        const res = await api.get(`/transactions/${userId}`);

        if(res.data.transactions) {
            const transactions: Transaction[] = res.data.transactions.map(function (item: Transaction, index: number) {
                let transaction: Transaction = { ...item };
                transaction.price = parseFloat(transaction.price.toString());
                transaction.date = transaction.date.toString();
                transaction.createdAt = transaction.createdAt!.toString();
                transaction.updatedAt = transaction.updatedAt!.toString();
                return transaction;
            });

            return transactions;
        }
    } catch (error) {
        return null;
    }
}

export async function register(userId: number, transaction: CreateTransaction) {
    try {
        const res = await api.post(`/transactions/${userId}`, transaction);

        if(res.data.transaction) {
            return res.data.transaction;
        }
    } catch (error) {
        return null;
    }
}

export async function edit(transaction: Transaction) {

}

export async function deleteTransaction(id: number) {

}