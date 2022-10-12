import { ReactElement } from "react"
import Navbar from "../Navbar";

type LayoutProps = {
    children: ReactElement;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
        </>
    )
}