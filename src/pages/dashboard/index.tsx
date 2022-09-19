import { GetServerSideProps } from "next";
import { getSession, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Navbar from "../../components/Navbar";

import styles from '../../styles/Dashboard.module.scss';
import Header from "../../components/Header/Header";
import Summary from "../../components/Summary/Summary";

export default function Dashboard() {
    const date = new Date();

    return (
        <div className={styles.container}>
            <Head>
                <title>Dashboard | iFinances</title>
            </Head>
            <Navbar />
            <div className={styles.content}>
                <Header
                    title={'Overview'}
                    subtitle={`${new Intl.DateTimeFormat('pt-BR', { month: "long" }).format(new Date())} - ${date.getFullYear()}`}
                    description="Tenha uma visão geral de todos os seus gastos no mês de Janeiro."
                />
                <Summary />
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