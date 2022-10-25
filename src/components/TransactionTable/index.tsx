import Image from 'next/image';
import { Transaction } from '../../Types/Transaction';
import Styles from './TransactionTable.module.scss';

import editIcon from '../../../public/assets/icons/edit.svg';
import deleteIcon from '../../../public/assets/icons/delete.svg';
import { deleteTransaction } from '../../services/transaction';
import { notifyError, notifySuccess } from '../../util/notifyToast';

type TransactionTableProps = {
    transactions: Transaction[];
    attTable: () => void;
    openModalEdit: (transaction: Transaction) => void;
}

export default function TransactionTable({ transactions, attTable, openModalEdit }: TransactionTableProps) {

    async function handleDeleteTransaction(id: number) {
        const transaction: Transaction = await deleteTransaction(id);

        if (transaction) {
            notifySuccess(`Transação "${transaction.title}" removida`);
            attTable();
        } else {
            notifyError('Erro ao deletar transação');
        }
    }

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
                            <td>
                                <button onClick={() => openModalEdit(transaction)}>
                                    <Image src={editIcon} alt="Editar Transação" />
                                </button>
                            </td>
                            <td>
                                <button onClick={() => handleDeleteTransaction(transaction.id)}>
                                    <Image src={deleteIcon} alt="Remover Transação" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}