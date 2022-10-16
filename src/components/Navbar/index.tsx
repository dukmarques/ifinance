import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from './Styles.module.scss';

import Image from 'next/image';
import arrowMenu from '../../../public/assets/icons/arrow-menu.svg';
import horizontalLogo from '../../../public/assets/images/logo-horizontal.svg';
import dollarSign from '../../../public/assets/images/dollar-sign.svg';
import overview from '../../../public/assets/icons/overview.svg';
import overviewWhite from '../../../public/assets/icons/overview-white.svg';
import cards from '../../../public/assets/icons/cards.svg';
import cardsWhite from '../../../public/assets/icons/cards-white.svg';
import categorie from '../../../public/assets/icons/category.svg';
import categorieWhite from '../../../public/assets/icons/category-white.svg';
import settings from '../../../public/assets/icons/settings.svg';
import settingsWhite from '../../../public/assets/icons/settings-white.svg';
import transactions from '../../../public/assets/icons/transactions.svg';
import transactionsWhite from '../../../public/assets/icons/transactions-white.svg';
import logout from '../../../public/assets/icons/logout.svg';
import navbarImage from '../../../public/assets/images/navbar-image.svg';
import Link from 'next/link';

export default function Navbar() {
    const { data: session } = useSession();
    const router = useRouter();

    const [collapseMenu, setCollapseMenu] = useState(false);

    function handleCollapseMenu(e: React.MouseEvent) {
        e.preventDefault();
        setCollapseMenu(!collapseMenu);
    }

    return (
        <div className={`${styles.container} ${collapseMenu ? styles.collapse : ''}`}>
            <a onClick={(e) => handleCollapseMenu(e)} className={styles.expandCollapse}>
                <Image src={arrowMenu} alt="Expand or collapse menu" />
            </a>

            <div className={styles.content}>
                <div className={styles.perfil}>
                    {
                        !collapseMenu
                            ? <Image className={styles.logo} src={horizontalLogo} alt="Logo da iFinances" />
                            : <Image className={styles.logo} src={dollarSign} alt="Logo da iFinances" />
                    }
                    <img className={styles.photo} src={session?.user?.image!} alt="Foto de Perfil" />
                    <h2>Hello, {session?.user?.name?.substring(0, session.user.name.indexOf(" "))} 👋🏽</h2>
                    <p>
                        Bem-vindo de volta ao <br />
                        iFinances.
                    </p>
                </div>

                <div className={styles.navigation}>
                    <a onClick={() => router.push('/dashboard')} className={router.pathname === '/dashboard' ? styles.selected : styles.menu}>
                        {router.pathname === '/dashboard'
                            ? <Image src={overviewWhite} width='30' height='30' alt='Overview icone' />
                            : <Image src={overview} width='30' height='30' alt='Overview icone' />
                        }
                        <span>Overview</span>
                    </a>

                    <a onClick={() => router.push('/dashboard/transactions')} className={router.pathname === '/dashboard/transactions' ? styles.selected : styles.menu}>
                        {router.pathname === '/dashboard/transactions'
                            ? <Image src={transactionsWhite} width='30' height='30' alt='Icone do menu de transações' />
                            : <Image src={transactions} width='30' height='30' alt='Icone do menu de transações' />
                        }
                        <span>Transações</span>
                    </a>

                    <div onClick={() => router.push('/dashboard/cards')} className={router.pathname === '/dashboard/cards' ? styles.selected : styles.menu}>
                        {router.pathname === '/dashboard/cards'
                            ? <Image src={cardsWhite} width='30' height='30' alt='Icone do menu de cartões' />
                            : <Image src={cards} width='30' height='30' alt='Icone do menu de cartões' />
                        }
                        <span>Cartões</span>
                    </div>

                    <div onClick={() => router.push('/dashboard/categories')} className={router.pathname === '/dashboard/categories' ? styles.selected : styles.menu}>
                        {router.pathname === '/dashboard/categories'
                            ? <Image src={categorieWhite} width='30' height='30' alt='Icone do menu de cartões' />
                            : <Image src={categorie} width='30' height='30' alt='Icone do menu de cartões' />
                        }
                        <span>Categorias</span>
                    </div>

                    <div onClick={() => router.push('/dashboard/settings')} className={router.pathname === '/dashboard/settings' ? styles.selected : styles.menu}>
                        {router.pathname === '/dashboard/settings'
                            ? <Image src={settingsWhite} width='30' height='30' alt='Icone do menu de configurações' />
                            : <Image src={settings} width='30' height='30' alt='Icone do menu de configurações' />
                        }
                        <span>Configurações</span>
                    </div>

                    <div onClick={() => signOut()} className={styles.menu}>
                        <Image src={logout} width='25' height='25' alt='Icone do botão de deslogar' />
                        <span>Deslogar</span>
                    </div>
                </div>

                <div className={styles.footer}>
                    <Image src={navbarImage} alt="Imagem do rodapé" />
                    <Link href='https://github.com/dukmarques' target="_blank" rel="noreferrer noopener">Develop with 🫶🏽 by Eduardo</Link>
                </div>
            </div>
        </div>
    )
}