import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LoginsProvider from '../components/LoginsProvider';

import styles from '../styles/Login.module.scss';

import LoginImage from '../../public/assets/images/login-image.svg';
import HorizontalLogo from '../../public/assets/images/logo-horizontal.svg';
import LoginIcon from '../../public/assets/icons/login-icon.svg';

export default function Login() {
    return (
        <>
            <Head>
                <title>Login | iFinances</title>
            </Head>

            <div className={styles.containerFluid}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <Image src={LoginImage} alt="Pessoas segurando gráficos" />
                        <h2>Organize suas finanças</h2>
                        <span>
                            Fácil e intuítivo, com o iFinance você se <br />
                            organiza e mantém o controle financeiro!
                        </span>
                    </div>
                    <div className={styles.login}>
                        <Image src={HorizontalLogo} alt="Logo horizontal iFinance" />
                        <LoginsProvider />
                        <span className={styles.divider}>convencional</span>
                        <form>
                            <input type="email" name="email" placeholder="E-mail" />
                            <input type="password" name="" placeholder="Senha" />
                            <button type="submit">
                                <Image src={LoginIcon} alt="Ícone de criar conta" />
                                Entrar
                            </button>
                            <Link href='/register'>
                                Registre-se
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

    if (session) {
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}