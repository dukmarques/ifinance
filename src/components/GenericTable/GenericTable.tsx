import { Card } from '../../Types/Card';
import { Category } from '../../Types/Category';
import styles from './GenericTable.module.scss';

type GenericTableProps = {
    tableHeads: string[];
    items: Card[] | Category[];
}

export default function GenericTable({ tableHeads, items }: GenericTableProps) {
    return (
        <div className={styles.container}>
            <table>
                <thead>
                    <tr>
                        {tableHeads.map((item, index) => (
                            <th key={index}>
                                {item}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.attributes.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}