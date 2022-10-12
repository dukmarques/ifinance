export type Transaction = {
    title: string;
    price: number;
    type: 'entry' | 'exit';
    owner: string;
    card: string;
    category: string;
    date: string;
}