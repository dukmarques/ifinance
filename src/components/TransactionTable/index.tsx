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
                            <td>{transaction.attributes.title}</td>
                            <td className={transaction.attributes.type === 'entry' ? Styles.entry : Styles.exit}>
                                {transaction.attributes.type === 'entry' ? '+ ' : '- '}
                                {new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                }).format(transaction.attributes.price)}
                            </td>
                            <td>{transaction.attributes.owner}</td>
                            <td>{transaction.attributes.card?.data.attributes.name}</td>
                            <td>{transaction.attributes.category?.data.attributes.name}</td>
                            <td>{transaction.attributes.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}