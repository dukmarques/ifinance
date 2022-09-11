import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import LoginsProvider from '../components/LoginsProvider';

import styles from '../styles/Register.module.scss';

export default function Login() {
    return (
        <>
            <Head>
                <title>Cadastre-se | iFinances</title>
            </Head>

            <div className={styles.containerFluid}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <img src="/assets/images/register-image.svg" alt="Pessoas segurando gráficos" />
                        <h2>
                            Tenha o controle <br />
                            financeiro na palma <br />
                            das suas mãos
                        </h2>
                        <span>
                            Fácil e intuítivo, com o iFinance você se <br /> 
                            organiza e mantém o controle financeiro!
                        </span>
                    </div>
                    <div className={styles.register}>
                        <img src="/assets/images/logo-horizontal.svg" alt="Logo horizontal iFinance" />
                        <LoginsProvider />
                        <span>ou crie uma conta</span>
                        <form>
                            <input type="text" name="name" placeholder="Nome" />
                            <input type="email" name="email" placeholder="E-mail" />
                            <input type="password" name="password" placeholder="Senha" />
                            <button type="submit">
                                <img src="/assets/icons/create-account.svg" alt="Ícone de criar conta" />
                                Criar conta
                            </button>
                            <Link href='/login'>
                                <a>
                                    Fazer Login
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