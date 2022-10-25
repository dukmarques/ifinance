import Image from 'next/image';
import { Category } from '../../Types/Category';
import styles from './CategoryTable.module.scss';

import editIcon from '../../../public/assets/icons/edit.svg';
import deleteIcon from '../../../public/assets/icons/delete.svg';
import { deleteCategory } from '../../services/category';
import { notifyError, notifySuccess } from '../../util/notifyToast';

type CategoryProps = {
    items: Category[];
    attTable: () => void;
    openModalEdit: (card: Category) => void;
}

export default function CategoryTable({ items, attTable, openModalEdit }: CategoryProps) {

    async function handleDeleteCategory(id: number) {
        let res: Category = await deleteCategory(id);

        if (res) {
            attTable();
            notifySuccess(`Categoria ${res.name} excluído com sucesso!`);
        } else {
            notifyError('Erro ao deletar cartão!');
        }
    }

    return (
        <div className={styles.container}>
            <table>
                <thead>
                    <tr>
                        <th>Nome da Categoria</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>
                                <button onClick={() => openModalEdit(item)}>
                                    <Image src={editIcon} alt="Editar Cartão" />
                                </button>
                            </td>
                            <td>
                                <button onClick={() => handleDeleteCategory(item.id)}>
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