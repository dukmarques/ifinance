import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Navbar from "../../../components/Navbar";
import Image from "next/image";

import Header from "../../../components/Header/Header";

import styles from '../../../styles/Dashboard.module.scss';
import underConstruction from '../../../../public/assets/images/under-construction.svg';
import GenericTable from "../../../components/GenericTable/GenericTable";
import { api } from "../../../services/api";
import { Card } from "../../../Types/Card";
import { useState } from "react";
import ButtonAdd from "../../../components/ButtonAdd/ButtonAdd";

type CardsProps = {
    cardsData: Card[];
}

export default function Cards({ cardsData }: CardsProps) {
    const tableHeads = ['Nome do Cartão'];

    const [cards, setCards] = useState<Card[]>(cardsData);

    return (
        <div className={styles.container}>
            <Head>
                <title>Cartões | iFinances</title>
            </Head>
            <Navbar />
            <div className={styles.content}>
                <Header title="Cartões" subtitle="Veja todos os seus cartões e os gastos realizados neles" />

                <GenericTable tableHeads={tableHeads} items={cards} />

            </div>

            <ButtonAdd onClick={() => { console.log() }} alt="Cadastrar novo cartão" />
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

    const res = await api.get(`cards?filters[users_ifinance][email][$eq]=${session?.user?.email}`)
    let cardsData: Card[] = res.data.data;

    return {
        props: {
            cardsData
        }
    }
}