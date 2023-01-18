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
    const [closingDay, setClosingDay] = useState<number>(0);
    const [dueDay, setDueDay] = useState<number>(0);

    function closeModal() {
        setOpenModal(false);
    }

    function closeModalEdit() {
        setOpenModalEdit(false);
    }

    function openEditModal(item: Card) {
        setNameCard(item.name);
        setClosingDay(item.closingDay || 0);
        setDueDay(item.dueDay || 0);
        setCardEdit(item);
        setOpenModalEdit(true);
    }

    async function handleSubmitRegisterCard(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if(closingDay > 31 || dueDay >31) {
            notifyError('A dia de fechamento ou vencimento não pode ser maior que 31')
        } else if(closingDay < 1 || dueDay < 1) {
            notifyError('A dia de fechamento ou vencimento não pode ser menor que 1')
        } else {
            const card: Card = await registerCard(userData?.id!, nameCard, closingDay, dueDay);
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
    }

    async function handleSubmitEditCard(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const updated: Card = await editCard(
            cardEdit?.id!, 
            nameCard, 
            closingDay != 0 ? closingDay : undefined, 
            dueDay != 0 ? dueDay : undefined
        );

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
            setCards(res.data.cards);
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

                    <label htmlFor="">Dia de Fechamento</label>
                    <input 
                        type="number"
                        value={closingDay}
                        onChange={(e) => setClosingDay(parseInt(e.target.value))}
                        placeholder="Dia de Fechamento"
                        min="1"
                        max="31"
                    />

                    <label htmlFor="">Dia de Vencimento</label>
                    <input 
                        type="number" 
                        value={dueDay}
                        onChange={(e) => setDueDay((parseInt(e.target.value)))}
                        placeholder="Dia de Vencimento"
                        min="1"
                        max="31"
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

                    <label htmlFor="">Dia de Fechamento</label>
                    <input 
                        type="number"
                        value={closingDay}
                        onChange={(e) => setClosingDay(parseInt(e.target.value))}
                        placeholder="Dia de Fechamento"
                        min="0"
                        max="31"
                    />

                    <label htmlFor="">Dia de Vencimento</label>
                    <input 
                        type="number" 
                        value={dueDay}
                        onChange={(e) => setDueDay((parseInt(e.target.value)))}
                        placeholder="Dia de Vencimento"
                        min="0"
                        max="31"
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

    const cardsData: Card[] = await prisma.card.findMany({
        where: {
            userId: userData?.id
        },
        select: {
            id: true,
            name: true,
            closingDay: true,
            dueDay: true
        }
    });

    return {
        props: {
            userData: userData,
            cardsData
        }
    }
}
