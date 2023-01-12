import Image from 'next/image';
import { Transaction } from '../../Types/Transaction';
import Styles from './Styles.module.scss';

import balance from '../../../public/assets/icons/balance.svg';
import entrys from '../../../public/assets/icons/entrys.svg';
import exits from '../../../public/assets/icons/exits.svg';

type SummaryProps = {
    transactions: Transaction[];
}

type Summary = {
    entries: number;
    exits: number;
}

export default function Summary({ transactions }: SummaryProps) {

    const summary: Summary = transactions.reduce((accumulator, current) => {
        if (current.type === 'ENTRY' && current.owner === 'MY') {
            accumulator.entries += parseFloat(current.price.toString());
        } else if (current.type === 'EXIT' && current.owner === 'MY') {
            accumulator.exits += parseFloat(current.price.toString());
        }

        return accumulator;
    }, {
        entries: 0,
        exits: 0,
    });

    return (
        <div className={Styles.container}>
            <div className={Styles.content}>
                <div className={Styles.card}>
                    <header>
                        <span>Entradas</span>
                        <Image src={entrys} alt="Valor de entradas" />
                    </header>
                    <h3>
                        +{new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        }).format(summary.entries)}
                    </h3>
                </div>

                <div className={Styles.card}>
                    <header>
                        <span>Saídas</span>
                        <Image src={exits} alt="Valor de saídas" />
                    </header>
                    <h3>-{new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    }).format(summary.exits)}</h3>
                </div>

                <div className={`${Styles.card} ${(summary.entries - summary.exits) < 0 ? Styles.negative : (summary.entries - summary.exits) <= 100 ? Styles.alert : ''}`}>
                    <header>
                        <span>Saldo</span>
                        <Image src={balance} alt="Balanço das transações" />
                    </header>
                    <h3>
                        {(summary.entries - summary.exits) >= 0 && '+ '}
                        {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        }).format(summary.entries - summary.exits)}
                    </h3>
                </div>
            </div>
        </div>
    )
}