import React, { MouseEventHandler, useState } from "react";

import { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession } from "next-auth/react";

import Styles from '../../../styles/Dashboard.module.scss';

import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header/Header";
import ButtonAdd from "../../../components/ButtonAdd/ButtonAdd";
import CardTable from "../../../components/CardTable/CardTable";
import { Modal } from "../../../components/Modal/Modal";

import { api } from "../../../services/api";
import { Card } from "../../../Types/Card";
import { User } from "../../../Types/User";

import { notifySuccess, notifyError } from '../../../util/notifyToast';
import { async } from "@firebase/util";

type CardsProps = {
    userData: User;
    cardsData: Card[];
}

export default function Cards({ userData, cardsData }: CardsProps) {
    const [cards, setCards] = useState<Card[]>(cardsData);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [nameCard, setNameCard] = useState<string>('');

    function closeModal() {
        setOpenModal(false);
    }

    async function handleSubmitRegisterCard(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            let res = await api.post('cards', {
                data: {
                    name: nameCard,
                    users_ifinance: userData?.id,
                }
            })

            if (res.data.data) {
                getCards();
                closeModal();
                notifySuccess(`Cartão ${res.data.data.attributes.name} cadastrado com sucesso!`);
                setNameCard('');
            }
        } catch (error) {
            notifyError('Erro ao cadastrar cartão!');
        }
    }

    const getCards = async () => {
        try {
            let res = await api.get(`cards?filters[users_ifinance][email][$eq]=${userData?.attributes.email}`)
            let cardsData: Card[] = res.data.data;
            setCards(cardsData);
        } catch (error) { }
    }

    return (
        <div className={Styles.container}>
            <Modal
                classModal={Styles.modal}
                classOverlay={Styles.Overlay}
                openModal={openModal}
                closeModal={closeModal}
            >
                <form onSubmit={handleSubmitRegisterCard}>
                    <h3>Cadastrar Cartão</h3>
                    <input
                        type="text"
                        value={nameCard}
                        onChange={(e) => setNameCard(e.target.value)}
                        placeholder="Nome do Cartão"
                        required
                    />
                    <button type="submit">Cadastrar Cartão</button>
                </form>
            </Modal>

            <Head>
                <title>Cartões | iFinances</title>
            </Head>
            <Navbar />
            <div className={Styles.content}>
                <Header title="Cartões" subtitle="Veja todos os seus cartões e os gastos realizados neles" />

                <CardTable items={cards} attTable={getCards} />
            </div>

            <ButtonAdd onClick={() => { setOpenModal(true) }} alt="Cadastrar novo cartão" />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    let userData: User;

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    let res = await api.get(`users-ifinances?filters[email][$eq]=${session?.user?.email}`);
    userData = res.data.data[0];

    res = await api.get(`cards?filters[users_ifinance][email][$eq]=${session?.user?.email}`)
    let cardsData: Card[] = res.data.data;

    return {
        props: {
            userData,
            cardsData
        }
    }
}
