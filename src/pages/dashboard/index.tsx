import { useContext, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";

import Navbar from "../../components/Navbar";
import Styles from '../../styles/Dashboard.module.scss';
import Header from "../../components/Header/Header";
import Summary from "../../components/Summary/Summary";

import { api } from "../../services/api";
import { User } from "../../Types/User";
import { UserContext } from "../../contexts/UserContext";

import plusImage from "../../../public/assets/icons/plus-small.svg";
import CloseButton from '../../../public/assets/icons/close-button.svg';
import { Modal } from "../../components/Modal/Modal";
import { Transaction } from "../../Types/Transaction";
import TransactionTable from "../../components/TransactionTable";

type DashboardProps = {
    userData: User;
    transactionsData: Transaction[];
}

export default function Dashboard({ userData, transactionsData }: DashboardProps) {
    const { userIfinance, setUserIfinance } = useContext(UserContext);

    const date = new Date();

    const [modalIsOpen, setIsOpen] = useState<boolean>(false);

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        setUserIfinance(userData);
        setTransactions(transactionsData)
    }, []);

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
                    <Image src={CloseButton} width='40' height='40' alt="Fechar modal" />
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
                <Image src={plusImage} width='12' height='12' alt="Adicionar nova transação" />
            </button>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    let userData: User;
    let transactionsData: Transaction[];

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

    res = await api.get(`transactions?filters[users_ifinance][email][$eq]=${session.user?.email}&populate=*`);
    transactionsData = res.data.data;

    return {
        props: {
            userData,
            transactionsData
        }
    }
}