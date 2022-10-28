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

import { Modal } from "../../components/Modal/Modal";
import { CreateTransaction, Transaction, UpdateTransaction } from "../../Types/Transaction";
import TransactionTable from "../../components/TransactionTable";
import ButtonAdd from "../../components/ButtonAdd/ButtonAdd";
import { Card } from "../../Types/Card";
import { Category } from "../../Types/Category";
import { notifyError, notifySuccess } from "../../util/notifyToast";
import { edit, getTransactionsByUser, register } from "../../services/transaction";

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

    const [nameTransaction, setNameTransaction] = useState<string>('');
    const [priceTransaction, setPriceTransaction] = useState<number>(0);
    const [typeTransaction, setTypeTransaction] = useState<string>('EXIT');
    const [paidOutTransaction, setPaidOutTransaction] = useState<boolean>(false);
    const [dateTransaction, setDateTransaction] = useState<string>('');
    const [cardTransaction, setCardTransaction] = useState<number>();
    const [categoryTransaction, setCategoryTransaction] = useState<number>();
    const [ownerTransaction, setOwnerTransaction] = useState<string>('MY');

    function closeModal() {
        setIsOpen(false);
    }

    function openEditModal(transaction: Transaction) {
        setTransactionEdit(transaction);
        setOpenModalEdit(true);

        setNameTransaction(transaction.title);
        setPriceTransaction(parseFloat(transaction.price.toString()));
        setTypeTransaction(transaction.type);
        setPaidOutTransaction(transaction.paidOut);
        setDateTransaction(transaction.date.toString());
        setCardTransaction(transaction.Card?.id);
        setCategoryTransaction(transaction.Category?.id);
        setOwnerTransaction(transaction.owner);
    }

    async function handlerCreateTransaction(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (nameTransaction === '' || priceTransaction === 0 || dateTransaction === '') {
            notifyError('Existem campos não preenchidos.');
        } else {
            let transaction: CreateTransaction = {
                title: nameTransaction,
                price: priceTransaction,
                type: typeTransaction,
                paidOut: paidOutTransaction,
                date: dateTransaction,
                owner: ownerTransaction,
                category: categoryTransaction!,
                card: cardTransaction!
            }

            const res: Transaction = await register(userData?.id!, transaction);

            if (res) {
                notifySuccess(`Transação ${res.title} cadastrada com sucesso!`);
                getTransactions();
                cleanInputsForm();
                closeModal();
            } else {
                notifyError('Erro ao cadastrar transação.');
            }
        }
    }

    async function handlerEditTransaction(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        let transaction: UpdateTransaction = {
            id: transactionEdit?.id!,
            title: nameTransaction,
            price: priceTransaction,
            type: typeTransaction,
            paidOut: paidOutTransaction,
            date: dateTransaction,
            owner: ownerTransaction,
            category: categoryTransaction,
            card: cardTransaction
        }

        const res: Transaction = await edit(transaction);

        if (res) {
            notifySuccess(`Transação ${res.title} editada com sucesso!`);
            getTransactions();
            cleanInputsForm();
            setOpenModalEdit(false);
        } else {
            notifyError('Erro ao editar transação.');
        }
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

    function cleanInputsForm() {
        setNameTransaction('');
        setPriceTransaction(0);
        setTypeTransaction('EXIT');
        setPaidOutTransaction(false);
        setDateTransaction('');
        setCardTransaction(0);
        setCategoryTransaction(0);
        setOwnerTransaction('MY');
    }

    return (
        <div className={Styles.container}>

            <Modal
                openModal={modalIsOpen}
                closeModal={closeModal}
                classOverlay={Styles.Overlay}
                classModal={Styles.modal}
            >
                <form onSubmit={handlerCreateTransaction}>
                    <h3>Cadastrar Transação</h3>
                    <input type="text" placeholder="Nome" value={nameTransaction} onChange={(e) => setNameTransaction(e.target.value)} />

                    <label htmlFor="price">Valor</label>
                    <input type="number" id="price" min="0" step="any" value={priceTransaction} onChange={(e) => setPriceTransaction(parseFloat(e.target.value))} />

                    <label htmlFor="type">É uma entrada ou saída?</label>
                    <select id="type" onChange={(e) => setTypeTransaction(e.target.value)}>
                        <option value="EXIT" selected>Saída</option>
                        <option value="ENTRY">Entrada</option>
                    </select>

                    {typeTransaction === 'EXIT'
                        ? (
                            <>
                                <label htmlFor="paidOut">Transação já paga?</label>
                                <select id="paidOut" onChange={(e) => setPaidOutTransaction(e.target.value === 'true' ? true : false)}>
                                    <option value="false" selected>Não</option>
                                    <option value="true">Sim</option>
                                </select>
                            </>
                        ) : null
                    }


                    <label htmlFor="">Data da Transação</label>
                    <input type="date" onChange={(e) => setDateTransaction(e.target.value)} />

                    {typeTransaction === 'EXIT'
                        ? <>
                            <label htmlFor="card">Cartão</label>
                            <select id="card" onChange={(e) => setCardTransaction(parseInt(e.target.value))}>
                                <option value="" selected>Selecione o Cartão</option>
                                {cards.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </>
                        : null
                    }

                    <label htmlFor="category">Categoria</label>
                    <select id="category" onChange={(e) => setCategoryTransaction(parseInt(e.target.value))}>
                        <option value="" selected>Selecione a Categoria</option>
                        {categories.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>

                    {typeTransaction === 'EXIT'
                        ? <>
                            <label htmlFor="owner">Pertence a você?</label>
                            <select id="owner" onChange={(e) => setOwnerTransaction(e.target.value)}>
                                <option value="MY" selected>Sim</option>
                                <option value="OTHER">Não</option>
                            </select>
                        </>
                        : null
                    }

                    <button type="submit">Cadastrar</button>
                </form>
            </Modal>

            <Modal
                openModal={modalEdit}
                closeModal={() => setOpenModalEdit(false)}
                classOverlay={Styles.Overlay}
                classModal={Styles.modal}
            >
                <form onSubmit={handlerEditTransaction}>
                    <h3>Editar Transação <strong>{nameTransaction}</strong></h3>
                    <input type="text" placeholder="Nome" value={nameTransaction} onChange={(e) => setNameTransaction(e.target.value)} />

                    <label htmlFor="price">Valor</label>
                    <input type="number" id="price" min="0" step="any" value={priceTransaction} onChange={(e) => setPriceTransaction(parseFloat(e.target.value))} />

                    <label htmlFor="type">É uma entrada ou saída?</label>
                    <select id="type" onChange={(e) => setTypeTransaction(e.target.value)}>
                        <option value="EXIT" selected={typeTransaction === 'EXIT'} >Saída</option>
                        <option value="ENTRY" selected={typeTransaction === 'ENTRY'}>Entrada</option>
                    </select>

                    {typeTransaction === 'EXIT'
                        ? (
                            <>
                                <label htmlFor="paidOut">Transação já paga?</label>
                                <select id="paidOut" onChange={(e) => setPaidOutTransaction(e.target.value === 'true' ? true : false)}>
                                    <option value="false" selected={paidOutTransaction === false}>Não</option>
                                    <option value="true" selected={paidOutTransaction === true}>Sim</option>
                                </select>
                            </>
                        ) : null
                    }

                    <label htmlFor="">Data da Transação</label>
                    <input
                        type="date"
                        onChange={(e) => setDateTransaction(e.target.value)}
                    />

                    {typeTransaction === 'EXIT'
                        ? <>
                            <label htmlFor="card">Cartão</label>
                            <select id="card" onChange={(e) => setCardTransaction(parseInt(e.target.value))}>
                                <option value="">Selecione o Cartão</option>
                                {cards.map((item) => (
                                    <option key={item.id} value={item.id} selected={cardTransaction === item.id} >{item.name}</option>
                                ))}
                            </select>
                        </>
                        : null
                    }

                    <label htmlFor="category">Categoria</label>
                    <select id="category" onChange={(e) => setCategoryTransaction(parseInt(e.target.value))}>
                        <option value="" selected>Selecione a Categoria</option>
                        {categories.map((item) => (
                            <option key={item.id} value={item.id} selected={categoryTransaction === item.id} >{item.name}</option>
                        ))}
                    </select>

                    {typeTransaction === 'EXIT'
                        ? <>
                            <label htmlFor="owner">Pertence a você?</label>
                            <select id="owner" onChange={(e) => setOwnerTransaction(e.target.value)}>
                                <option value="MY" selected={ownerTransaction === 'MY'} >Sim</option>
                                <option value="OTHER" selected={ownerTransaction === 'OTHER'} >Não</option>
                            </select>
                        </>
                        : null
                    }

                    <button type="submit">Editar</button>
                </form>
            </Modal>

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