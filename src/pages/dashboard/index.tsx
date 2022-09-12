import { GetServerSideProps } from "next";
import { getSession, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Navbar from "../../components/Navbar";

import styles from '../../styles/Dashboard.module.scss';

export default function Dashboard() {
    const {data: session} = useSession();
    
    return (
        <div className={styles.container}>
            <Head>
                <title>Dashboard | iFinances</title>
            </Head>
            <Navbar />
            <div className={styles.content}></div>
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