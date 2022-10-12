import { useState } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";

import Navbar from "../../components/Navbar";
import Styles from '../../styles/Dashboard.module.scss';
import Header from "../../components/Header/Header";
import Summary from "../../components/Summary/Summary";

import plusImage from "../../../public/assets/icons/plus-small.svg";
import CloseButton from '../../../public/assets/icons/close-button.svg';
import { Modal } from "../../components/Modal/Modal";
import { Transaction } from "../../Types/Transaction";
import TransactionTable from "../../components/TransactionTable";

export default function Dashboard() {
    const date = new Date();

    const [modalIsOpen, setIsOpen] = useState<boolean>(false);

    const [transactions, setTransactions] = useState<Transaction[]>([
        {
            title: 'Salario',
            price: 3099.00,
            type: 'entry',
            owner: 'Minha',
            card: 'Nubank',
            category: 'Eletrônicos',
            date: '01/10/2022'
        },
        {
            title: 'Monitor Ultrawide 32"',
            price: 1099.00,
            type: 'exit',
            owner: 'Minha',
            card: 'Ourocard',
            category: 'Eletrônicos',
            date: '02/10/2022'
        },
        {
            title: 'Suporte Duplo para Monitor',
            price: 299.00,
            type: 'exit',
            owner: 'Minha',
            card: 'Ourocard',
            category: 'Eletrônicos',
            date: '03/10/2022'
        },
    ]);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div className={Styles.container}>

            <Modal
                openModal={modalIsOpen}
                closeModal={closeModal}
                classOverlay={Styles.Overlay}
                classModal={Styles.modal}
            >
                <form>
                    <h3>Cadastrar Transação</h3>
                    <input type="text" placeholder="Nome" />
                    <input type="number" placeholder="Preço" />
                    <select>
                        <option value="">Entrada</option>
                        <option value="">Saída</option>
                    </select>
                    <input type="date" />
                    <select>
                        <option value="">Nubank</option>
                        <option value="">Ourocard</option>
                        <option value="">Caixa</option>
                    </select>
                    <input type="text" placeholder="Categoria" />
                    <select>
                        <option value="">Minha Transação</option>
                        <option value="">Transação de Fulano 1</option>
                        <option value="">Transação de Fulano 2</option>
                    </select>
                    <button type="submit">Cadastrar</button>
                </form>
                <button className={Styles.closeModal} onClick={closeModal}>
                    <Image src={CloseButton} width='40' height='40' />
                </button>
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
                <Summary />
                <div className={Styles.spending}>
                    <h2>Gastos de <span>{new Intl.DateTimeFormat('pt-BR', { month: "long" }).format(new Date())}</span></h2>

                    <TransactionTable transactions={transactions} />
                </div>
            </div>

            <button className={Styles.buttonAdd} onClick={openModal}>
                <Image src={plusImage} width='12' height='12' />
            </button>
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