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
                        <tr key={index}>
                            <td>{transaction.title}</td>
                            <td className={transaction.type === 'entry' ? Styles.entry : Styles.exit}>
                                {transaction.type === 'entry' ? '+ ' : '- '}
                                {new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                }).format(transaction.price)}
                            </td>
                            <td>{transaction.owner}</td>
                            <td>{transaction.card.title}</td>
                            <td>{transaction.category.title}</td>
                            <td>{transaction.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}