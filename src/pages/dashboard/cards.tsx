import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Navbar from "../../components/Navbar";

export default function Cards() {
    return (
        <>
            <Navbar />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

    if(!session) {
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