import Image from 'next/image';
import { Card } from '../../Types/Card';
import { Category } from '../../Types/Category';
import styles from './CardTable.module.scss';

import editIcon from '../../../public/assets/icons/edit.svg';
import deleteIcon from '../../../public/assets/icons/delete.svg';
import { deleteCard } from '../../services/card';
import { notifyError, notifySuccess } from '../../util/notifyToast';

type CardProps = {
    items: Card[];
    attTable: () => void;
    openModalEdit: (card: Card) => void;
}

export default function CardTable({ items, attTable, openModalEdit }: CardProps) {

    async function handleDeleteCard(id: number) {
        let res = await deleteCard(id);

        if (res) {
            attTable();
            notifySuccess(`Cartão ${res.attributes.name} excluído com sucesso!`);
        } else {
            notifyError('Erro ao deletar cartão!');
        }
    }

    return (
        <div className={styles.container}>
            <table>
                <thead>
                    <tr>
                        <th>Nome do Cartão</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item: Card) => (
                        <tr key={item.id}>
                            <td>{item.attributes.name}</td>
                            <td>
                                <button onClick={() => openModalEdit(item)}>
                                    <Image src={editIcon} alt="Editar Cartão" />
                                </button>
                            </td>
                            <td>
                                <button onClick={() => handleDeleteCard(item.id)}>
                                    <Image src={deleteIcon} alt="Remover Cartão" />
                                </button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}