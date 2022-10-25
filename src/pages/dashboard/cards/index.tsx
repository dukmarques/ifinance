import React, { MouseEventHandler, useState } from "react";

import { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession } from "next-auth/react";

import prisma from '../../../../lib/prisma';

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
import { editCard, registerCard } from "../../../services/card";

type CardsProps = {
    userData: User;
    cardsData: Card[];
}

export default function Cards({ userData, cardsData }: CardsProps) {
    const [cards, setCards] = useState<Card[]>(cardsData);
    const [cardEdit, setCardEdit] = useState<Card>();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [nameCard, setNameCard] = useState<string>('');

    function closeModal() {
        setOpenModal(false);
    }

    function closeModalEdit() {
        setOpenModalEdit(false);
    }

    function openEditModal(item: Card) {
        setNameCard(item.name);
        setCardEdit(item);
        setOpenModalEdit(true);
    }

    async function handleSubmitRegisterCard(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const card: Card = await registerCard(userData?.id!, nameCard);
        console.log(card);
        if (card) {
            await getCards();
            closeModal();
            notifySuccess(`Cartão ${card.name} cadastrado com sucesso!`);
            setNameCard('');
        } else {
            notifyError('Erro ao cadastrar cartão!');
        }
    }

    async function handleSubmitEditCard(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const updated: Card = await editCard(cardEdit?.id!, nameCard);

        if (updated) {
            await getCards();
            closeModalEdit();
            setNameCard('');
            notifySuccess(`Cartão ${updated.name} editado com sucesso!`);
        } else {
            notifyError('Erro ao editar cartão!');
        }
    }

    const getCards = async () => {
        try {
            let res = await api.get(`cards/${userData?.id}`);
            let cardsData: Card[] = res.data.cards.map((item: Card) => {
                let card: Card = item;
                card.closingDate = card.closingDate?.toString() || null;
                card.dueDate = card.dueDate?.toString() || null;
                return card;
            });

            setCards(cardsData);
        } catch (error) {
            console.log(error);
        }
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

            <Modal
                classModal={Styles.modal}
                classOverlay={Styles.Overlay}
                openModal={openModalEdit}
                closeModal={closeModalEdit}
            >
                <form onSubmit={handleSubmitEditCard}>
                    <h3>Editar cartão <strong>{cardEdit?.name}</strong></h3>
                    <input
                        type="text"
                        value={nameCard}
                        onChange={(e) => setNameCard(e.target.value)}
                        placeholder="Nome do Cartão"
                        required
                    />
                    <button type="submit">Editar Cartão</button>
                </form>
            </Modal>

            <Head>
                <title>Cartões | iFinances</title>
            </Head>
            <Navbar />
            <div className={Styles.content}>
                <Header title="Cartões" subtitle="Veja todos os seus cartões e os gastos realizados neles" />

                <CardTable items={cards} attTable={getCards} openModalEdit={openEditModal} />
            </div>

            <ButtonAdd onClick={() => { setOpenModal(true) }} alt="Cadastrar novo cartão" />
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

    let userData: User = await prisma.user.findUnique({
        where: { email: session.user?.email! },
        select: { id: true, name: true, email: true, public: true }
    });

    const cards: Card[] = await prisma.card.findMany({
        where: {
            userId: userData?.id
        },
        select: {
            id: true,
            name: true,
            closingDate: true,
            dueDate: true
        }
    });

    const cardsData: Card[] = cards.map((item: Card) => {
        let card: Card = item;
        card.closingDate = card.closingDate?.toString() || null;
        card.dueDate = card.dueDate?.toString() || null;

        return card;
    });

    return {
        props: {
            userData: userData,
            cardsData
        }
    }
}
