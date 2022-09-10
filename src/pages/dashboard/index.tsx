import { GetServerSideProps } from "next";
import { getSession, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Dashboard() {
    return (
        <>
        <h1>Dashboard</h1>
        <button onClick={() => signOut()}>Deslogar</button>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

    console.log(session)

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