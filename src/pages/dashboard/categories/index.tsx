import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import ButtonAdd from "../../../components/ButtonAdd/ButtonAdd";
import CategoryTable from "../../../components/CategoryTable/CategoryTable";
import Header from "../../../components/Header/Header";
import Navbar from "../../../components/Navbar";
import { api } from "../../../services/api";
import styles from '../../../styles/Dashboard.module.scss';
import { Category } from "../../../Types/Category";

type CategoriesProps = {
    categoriesData: Category[];
}

export default function Categories({ categoriesData }: CategoriesProps) {
    const [categories, setCategories] = useState<Category[]>(categoriesData);

    return (
        <div className={styles.container}>
            <Head>
                <title>Categorias | iFinances</title>
            </Head>

            <Navbar />

            <div className={styles.content}>
                <Header title="Categorias" subtitle="Veja todas as suas cartegorias de entradas" />
                <CategoryTable items={categories} />
            </div>

            <ButtonAdd onClick={() => { console.log('open modal') }} alt="Cadastrar nova categoria" />
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

    const res = await api.get(`categories?filters[users_ifinance][email][$eq]=${session?.user?.email}`)
    let categoriesData: Category[] = res.data.data;

    return {
        props: {
            categoriesData
        }
    }
}