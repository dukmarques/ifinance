import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import ButtonAdd from "../../../components/ButtonAdd/ButtonAdd";
import CategoryTable from "../../../components/CategoryTable/CategoryTable";
import Header from "../../../components/Header/Header";
import { Modal } from "../../../components/Modal/Modal";
import Navbar from "../../../components/Navbar";
import { api } from "../../../services/api";
import { editCategory, registerCategory } from "../../../services/category";
import styles from '../../../styles/Dashboard.module.scss';
import { Category } from "../../../Types/Category";
import { User } from "../../../Types/User";
import { notifyError, notifySuccess } from "../../../util/notifyToast";

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
        setNameCategory(item.attributes.name);
        setCategoryEdit(item);
        setOpenModalEdit(true);
    }

    async function handleSubmitRegisterCategory(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const res = await registerCategory(userData?.id!, nameCategory);
        if (res) {
            await getCategories();
            closeModal();
            notifySuccess(`Categoria ${res.attributes.name} cadastrado com sucesso!`);
            setNameCategory('');
        } else {
            notifyError('Erro ao cadastrar categoria!');
        }
    }

    async function handleSubmitEditCategory(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const res = await editCategory(categoryEdit?.id!, nameCategory);

        if (res) {
            await getCategories();
            closeModalEdit();
            setNameCategory('');
            notifySuccess(`Categoria ${res.attributes.name} editada com sucesso!`);
        } else {
            notifyError('Erro ao editar categoria!');
        }
    }

    const getCategories = async () => {
        try {
            let res = await api.get(`categories?filters[users_ifinance][email][$eq]=${userData?.attributes.email}`)
            let categoriesData: Category[] = res.data.data;
            setCategories(categoriesData);
        } catch (error) { }
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
                    <h3>Editar cartão <strong>{categoryEdit?.attributes.name}</strong></h3>
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

    res = await api.get(`categories?filters[users_ifinance][email][$eq]=${session?.user?.email}`)
    let categoriesData: Category[] = res.data.data;

    return {
        props: {
            userData,
            categoriesData
        }
    }
}