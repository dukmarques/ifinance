import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import LoginsProvider from '../components/LoginsProvider';

import styles from '../styles/Login.module.scss';

export default function Login() {
    return (
        <>
            <Head>
                <title>Login | iFinances</title>
            </Head>

            <div className={styles.containerFluid}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <img src="/assets/images/login-image.svg" alt="Pessoas segurando gráficos" />
                        <h2>Organize suas finanças</h2>
                        <span>
                            Fácil e intuítivo, com o iFinance você se <br /> 
                            organiza e mantém o controle financeiro!
                        </span>
                    </div>
                    <div className={styles.login}>
                        <img src="/assets/images/logo-horizontal.svg" alt="Logo horizontal iFinance" />
                        <LoginsProvider />
                        <span>convencional</span>
                        <form>
                            <input type="email" name="email" placeholder="E-mail" />
                            <input type="password" name="" placeholder="Senha" />
                            <button type="submit">
                                <img src="/assets/icons/login-icon.svg" alt="Ícone de criar conta" />
                                Entrar
                            </button>
                            <Link href='/register'>
                                <a>
                                    Registre-se
                                </a>
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

    if(session) {
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