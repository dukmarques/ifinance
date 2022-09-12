import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import Image from "next/image";

import styles from '../../styles/Dashboard.module.scss';
import underConstruction from '../../../public/assets/images/under-construction.svg';

export default function Transactions() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Transações | iFinances</title>
            </Head>
            <Navbar />
            <div className={styles.content}>
                <Image src={underConstruction} alt="Em construção ..." />
                <h2>Em construção...</h2>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

    if(!session) {
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