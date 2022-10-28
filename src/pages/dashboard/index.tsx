import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";

import prisma from '../../../lib/prisma';

import Navbar from "../../components/Navbar";
import Styles from '../../styles/Dashboard.module.scss';
import Header from "../../components/Header/Header";
import Summary from "../../components/Summary/Summary";

import { User } from "../../Types/User";
import { CreateTransaction, Transaction, UpdateTransaction } from "../../Types/Transaction";
import { Card } from "../../Types/Card";
import { Category } from "../../Types/Category";

import { Modal } from "../../components/Modal/Modal";
import TransactionTable from "../../components/TransactionTable";
import ButtonAdd from "../../components/ButtonAdd/ButtonAdd";
import CreateTransactionModal from "../../components/TransactionModals/CreateTransaction/CreateTransactionModal";

import { edit, getTransactionsByUser, register } from "../../services/transaction";
import { notifyError, notifySuccess } from "../../util/notifyToast";
import { EditTransactionModal } from "../../components/TransactionModals/EditTransaction/EditTransactionModa";

type DashboardProps = {
    userData: User;
    transactionsData: Transaction[];
    cards: Card[];
    categories: Category[];
}

export default function Dashboard({ userData, transactionsData, cards, categories }: DashboardProps) {
    const date = new Date();

    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    const [modalEdit, setOpenModalEdit] = useState<boolean>(false);

    const [transactions, setTransactions] = useState<Transaction[]>(transactionsData);
    const [transactionEdit, setTransactionEdit] = useState<Transaction>();

    function closeModal() {
        setIsOpen(false);
    }

    function closeModalEdit() {
        setOpenModalEdit(false);
    }

    function openEditModal(transaction: Transaction) {
        setTransactionEdit(transaction);
        setOpenModalEdit(true);
    }

    const getTransactions = async () => {
        const transactions = await getTransactionsByUser(userData?.id!);
        console.log(transactions);
        if (transactions) {
            let transacations: Transaction[] = transactions;
            setTransactions(transacations);
            closeModal();
        } else {
            notifyError('Erro ao obter suas transações.');
        }
    }

    return (
        <div className={Styles.container}>
            <Head>
                <title>Dashboard | iFinances</title>
            </Head>

            <CreateTransactionModal
                userData={userData}
                cards={cards}
                categories={categories}
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
                getTransactions={getTransactions}
            />

            <EditTransactionModal
                cards={cards}
                categories={categories}
                getTransactions={getTransactions}
                closeModal={closeModalEdit}
                modalEdit={modalEdit}
                transactionEdit={transactionEdit}
            />

            <Navbar />

            <div className={Styles.content}>
                <Header
                    title={'Overview'}
                    description="Tenha uma visão geral de todos os seus gastos no mês."
                />
                <Summary transactions={transactions} />
                <div className={Styles.spending}>
                    <h2>Gastos de <span>{new Intl.DateTimeFormat('pt-BR', { month: "long" }).format(new Date())}</span></h2>

                    <TransactionTable transactions={transactions} attTable={getTransactions} openModalEdit={openEditModal} />
                </div>
            </div>

            <ButtonAdd onClick={() => { setIsOpen(true) }} alt="Adicionar nova transação" />
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
        select: { id: true, name: true, email: true, public: true },
    });

    const transactions: Transaction[] = await prisma.transaction.findMany({
        where: {
            userId: userData?.id
        },
        include: {
            Card: {
                select: {
                    id: true,
                    name: true,
                    userId: true
                }
            },
            Category: {
                select: {
                    id: true,
                    name: true
                }
            }
        },
    });

    const transactionsData: Transaction[] = transactions.map(function (item: Transaction, index: number) {
        let transaction: Transaction = { ...item };
        transaction.price = parseFloat(transaction.price.toString());
        transaction.date = transaction.date.toString();
        transaction.createdAt = transaction.createdAt!.toString();
        transaction.updatedAt = transaction.updatedAt!.toString();
        return transaction;
    });

    const cards: Card[] = await prisma.card.findMany({
        where: {
            userId: userData?.id
        },
        select: {
            id: true,
            name: true,
            userId: true
        }
    });

    const categories: Category[] = await prisma.category.findMany({
        where: {
            userId: userData?.id
        },
        select: {
            id: true,
            name: true
        }
    });

    return {
        props: {
            userData: userData,
            transactionsData,
            cards,
            categories
        }
    }
}