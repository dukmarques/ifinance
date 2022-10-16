import Image from 'next/image';
import { Card } from '../../Types/Card';
import { Category } from '../../Types/Category';
import styles from './CategoryTable.module.scss';

import editIcon from '../../../public/assets/icons/edit.svg';
import deleteIcon from '../../../public/assets/icons/delete.svg';

type CategoryProps = {
    items: Category[];
}

export default function CategoryTable({ items }: CategoryProps) {
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
                            <td>{item.attributes.name}</td>
                            <td>
                                <button>
                                    <Image src={editIcon} alt="Editar Cartão" />
                                </button>
                            </td>
                            <td>
                                <button onClick={() => { }}>
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