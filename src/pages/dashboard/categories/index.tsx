import { useState } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";

import prisma from '../../../../lib/prisma';
import { api } from "../../../services/api";
import { editCategory, registerCategory } from "../../../services/category";
import { notifyError, notifySuccess } from "../../../util/notifyToast";

import ButtonAdd from "../../../components/ButtonAdd/ButtonAdd";
import CategoryTable from "../../../components/CategoryTable/CategoryTable";
import Header from "../../../components/Header/Header";
import { Modal } from "../../../components/Modal/Modal";
import Navbar from "../../../components/Navbar";

import styles from '../../../styles/Dashboard.module.scss';
import { Category } from "../../../Types/Category";
import { User } from "../../../Types/User";

type CategoriesProps = {
    userData: User;
    categoriesData: Category[];
}

export default function Categories({ userData, categoriesData }: CategoriesProps) {
    const [categories, setCategories] = useState<Category[]>(categoriesData);
    const [categoryEdit, setCategoryEdit] = useState<Category>();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [nameCategory, setNameCategory] = useState<string>('');

    function closeModal() {
        setOpenModal(false);
    }

    function closeModalEdit() {
        setOpenModalEdit(false);
    }

    function openEditModal(item: Category) {
        setNameCategory(item.name);
        setCategoryEdit(item);
        setOpenModalEdit(true);
    }

    async function handleSubmitRegisterCategory(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const res: Category = await registerCategory(userData?.id!, nameCategory);
        if (res) {
            await getCategories();
            closeModal();
            notifySuccess(`Categoria ${res.name} cadastrado com sucesso!`);
            setNameCategory('');
        } else {
            notifyError('Erro ao cadastrar categoria!');
        }
    }

    async function handleSubmitEditCategory(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const res: Category = await editCategory(categoryEdit?.id!, nameCategory);

        if (res) {
            await getCategories();
            closeModalEdit();
            setNameCategory('');
            notifySuccess(`Categoria ${res.name} editada com sucesso!`);
        } else {
            notifyError('Erro ao editar categoria!');
        }
    }

    const getCategories = async () => {
        try {
            let res = await api.get(`categories/${userData?.id}`)
            let categoriesData: Category[] = res.data.categories;
            setCategories(categoriesData);
        } catch (error) {
            notifyError('Erro ao obter as categorias');
        }
    }

    return (
        <div className={styles.container}>
            <Modal
                classModal={styles.modal}
                classOverlay={styles.Overlay}
                openModal={openModal}
                closeModal={closeModal}
            >
                <form onSubmit={handleSubmitRegisterCategory}>
                    <h3>Cadastrar Categoria</h3>
                    <input
                        type="text"
                        value={nameCategory}
                        onChange={(e) => setNameCategory(e.target.value)}
                        placeholder="Nome da Categoria"
                        required
                    />
                    <button type="submit">Cadastrar Categoria</button>
                </form>
            </Modal>

            <Modal
                classModal={styles.modal}
                classOverlay={styles.Overlay}
                openModal={openModalEdit}
                closeModal={closeModalEdit}
            >
                <form onSubmit={handleSubmitEditCategory}>
                    <h3>Editar cartão <strong>{categoryEdit?.name}</strong></h3>
                    <input
                        type="text"
                        value={nameCategory}
                        onChange={(e) => setNameCategory(e.target.value)}
                        placeholder="Nome do Cartão"
                        required
                    />
                    <button type="submit">Editar Cartão</button>
                </form>
            </Modal>

            <Head>
                <title>Categorias | iFinances</title>
            </Head>

            <Navbar />

            <div className={styles.content}>
                <Header title="Categorias" subtitle="Veja todas as suas cartegorias de entradas" />

                <CategoryTable items={categories} attTable={getCategories} openModalEdit={openEditModal} />
            </div>

            <ButtonAdd onClick={() => { setOpenModal(true) }} alt="Cadastrar nova categoria" />
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

    const categoriesData: Category[] = await prisma.category.findMany({
        where: { userId: userData?.id },
        select: {
            id: true,
            name: true
        }
    });

    return {
        props: {
            userData,
            categoriesData
        }
    }
}