import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import LoginsProvider from '../components/LoginsProvider';

import styles from '../styles/Register.module.scss';

import RegisterImage from '../../public/assets/images/register-image.svg';
import HorizontalLogo from '../../public/assets/images/logo-horizontal.svg';
import CreateAccountImg from '../../public/assets/icons/create-account.svg';

export default function Login() {
    return (
        <>
            <Head>
                <title>Cadastre-se | iFinances</title>
            </Head>

            <div className={styles.containerFluid}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <Image src={RegisterImage} alt="Pessoas segurando gráficos" />
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
                        <Image src={HorizontalLogo} alt="Logo horizontal iFinance" />
                        <LoginsProvider />
                        <span className={styles.divider}>ou crie uma conta</span>
                        <form>
                            <input type="text" name="name" placeholder="Nome" />
                            <input type="email" name="email" placeholder="E-mail" />
                            <input type="password" name="password" placeholder="Senha" />
                            <button type="submit">
                                <Image src={CreateAccountImg} alt="Ícone de criar conta" />
                                Criar conta
                            </button>
                            <Link href='/login'>
                                Fazer Login
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