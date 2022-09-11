import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Navbar from "../../components/Navbar";

export default function Settings() {
    return (
        <>
            <Head>
                <title>Configurações | iFinances</title>
            </Head>
            <Navbar />
        </>
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