import { GetServerSideProps } from "next";
import { getSession, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Navbar from "../../components/Navbar";

import Styles from '../../styles/Dashboard.module.scss';
import Header from "../../components/Header/Header";
import Summary from "../../components/Summary/Summary";

export default function Dashboard() {
    const date = new Date();

    return (
        <div className={Styles.container}>
            <Head>
                <title>Dashboard | iFinances</title>
            </Head>
            <Navbar />
            <div className={Styles.content}>
                <Header
                    title={'Overview'}
                    subtitle={`${new Intl.DateTimeFormat('pt-BR', { month: "long" }).format(new Date())} - ${date.getFullYear()}`}
                    description="Tenha uma visão geral de todos os seus gastos no mês de Janeiro."
                />
                <Summary />
                <div className={Styles.spending}>
                    <h2>Gastos de <span>{new Intl.DateTimeFormat('pt-BR', { month: "long" }).format(new Date())}</span></h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Preço</th>
                                <th>Categoria</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Salário</td>
                                <td className={true ? Styles.entry : Styles.exit}>+ R$3.099,00</td>
                                <td>Eletrônicos</td>
                                <td>01/10/2022</td>
                            </tr>

                            <tr>
                                <td>Monitor Ultrawide 32"</td>
                                <td className={false ? Styles.entry : Styles.exit}>- R$1.099,00</td>
                                <td>Eletrônicos</td>
                                <td>02/10/2022</td>
                            </tr>

                            <tr>
                                <td>Alimentação Casa"</td>
                                <td className={false ? Styles.entry : Styles.exit}>- R$500,00</td>
                                <td>Alimentação</td>
                                <td>03/10/2022</td>
                            </tr>

                            <tr>
                                <td>Suporte Duplo para Monitor</td>
                                <td className={false ? Styles.entry : Styles.exit}>- R$299,00</td>
                                <td>Eletrônicos</td>
                                <td>03/10/2022</td>
                            </tr>

                            <tr>
                                <td>Bolsa de P&D</td>
                                <td className={true ? Styles.entry : Styles.exit}>+ R$1500,00</td>
                                <td>Eletrônicos</td>
                                <td>05/10/2022</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}