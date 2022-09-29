import Image from 'next/image';
import Styles from './Styles.module.scss';

import entrys from '../../../public/assets/icons/entrys.svg';
import exits from '../../../public/assets/icons/exits.svg';
import balance from '../../../public/assets/icons/balance.svg';

export default function Summary() {
    return (
        <div className={Styles.container}>
            <h3>Resumo <span>🍃</span></h3>
            <div className={Styles.content}>
                <div className={Styles.card}>
                    <header>
                        <span>Entradas</span>
                        <span>
                            💰
                        </span>
                    </header>
                    <h3>+R$ 17.400,00</h3>
                </div>

                <div className={Styles.card}>
                    <header>
                        <span>Saídas</span>
                        <span>
                            💸
                        </span>
                    </header>
                    <h3>-R$ 1.259,00</h3>
                </div>

                <div className={Styles.card}>
                    <header>
                        <span>Saldo</span>
                        <span>
                            🏦
                        </span>
                    </header>
                    <h3>+R$ 17.400,00</h3>
                </div>
            </div>
        </div>
    )
}