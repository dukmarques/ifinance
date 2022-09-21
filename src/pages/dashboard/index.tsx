import { useState } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";

import Modal from 'react-modal';

import Navbar from "../../components/Navbar";
import Styles from '../../styles/Dashboard.module.scss';
import Header from "../../components/Header/Header";
import Summary from "../../components/Summary/Summary";

import plusImage from "../../../public/assets/icons/plus-small.svg";
import CloseButton from '../../../public/assets/icons/close-button.svg';

export default function Dashboard() {
    const date = new Date();

    const [modalIsOpen, setIsOpen] = useState<boolean>(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div className={Styles.container}>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className={Styles.modal}
                overlayClassName={Styles.Overlay}
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
                    <table>
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Preço</th>
                                <th>Pertence</th>
                                <th>Cartão</th>
                                <th>Categoria</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Salário</td>
                                <td className={true ? Styles.entry : Styles.exit}>+ R$3.099,00</td>
                                <td>Minha</td>
                                <td>Nubank</td>
                                <td>Eletrônicos</td>
                                <td>01/10/2022</td>
                            </tr>

                            <tr>
                                <td>Monitor Ultrawide 32&quot;</td>
                                <td className={false ? Styles.entry : Styles.exit}>- R$1.099,00</td>
                                <td>Minha</td>
                                <td>Ourocard</td>
                                <td>Eletrônicos</td>
                                <td>02/10/2022</td>
                            </tr>

                            <tr>
                                <td>Alimentação Casa</td>
                                <td className={false ? Styles.entry : Styles.exit}>- R$500,00</td>
                                <td>Minha</td>
                                <td>Nubank</td>
                                <td>Alimentação</td>
                                <td>03/10/2022</td>
                            </tr>

                            <tr>
                                <td>Suporte Duplo para Monitor</td>
                                <td className={false ? Styles.entry : Styles.exit}>- R$299,00</td>
                                <td>Minha</td>
                                <td>Ourocard</td>
                                <td>Eletrônicos</td>
                                <td>03/10/2022</td>
                            </tr>

                            <tr>
                                <td>Bolsa de P&#38;D</td>
                                <td className={true ? Styles.entry : Styles.exit}>+ R$1500,00</td>
                                <td>Minha</td>
                                <td>Caixa</td>
                                <td>Eletrônicos</td>
                                <td>05/10/2022</td>
                            </tr>

                            <tr>
                                <td>iFood</td>
                                <td className={false ? Styles.entry : Styles.exit}>- R$20,00</td>
                                <td>Fulano 1</td>
                                <td>Dinheiro</td>
                                <td>Alimentação</td>
                                <td>05/10/2022</td>
                            </tr>
                        </tbody>
                    </table>
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