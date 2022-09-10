import Head from 'next/head';
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
                    <div className={styles.login}>
                        <img src="/assets/images/logo-horizontal.svg" alt="Logo horizontal iFinance" />
                        <LoginsProvider />
                        <span>ou crie uma conta</span>
                        <form>
                            <input type="email" name="email" placeholder="E-mail" />
                            <input type="password" name="" placeholder="Senha" />
                            <button type="submit">
                                <img src="/assets/icons/create-account.svg" alt="Ícone de criar conta" />
                                Criar conta
                            </button>
                            <a>
                                Fazer Login
                            </a>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}