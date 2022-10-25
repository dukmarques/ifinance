import { Transaction } from '../../Types/Transaction';
import Styles from './TransactionTable.module.scss';

type TransactionTableProps = {
    transactions: Transaction[];
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
    return (
        <div className={Styles.container}>
            <table className='transactionTable'>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Preço</th>
                        <th>Pertence</th>
                        <th>Cartão</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index} className={transaction.paidOut ? Styles.paidOut : ''}>
                            <td>{transaction.title}</td>
                            <td className={transaction.type === 'ENTRY' ? Styles.entry : Styles.exit}>
                                {transaction.type === 'ENTRY' ? '+ ' : '- '}
                                {new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                }).format(parseFloat(transaction.price.toString()))}
                            </td>
                            <td>{transaction.owner}</td>
                            <td>{transaction.Card?.name}</td>
                            <td>{transaction.Category?.name}</td>
                            <td>
                                {new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.date))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}