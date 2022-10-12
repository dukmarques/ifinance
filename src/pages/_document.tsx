import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />

                    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800;900&display=swap" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;600;700&display=swap" rel="stylesheet" />

                    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />

                    <meta name="title" content="iFinance" />
                    <meta name="description" content="O iFinance  é um projeto de controle financeiro com a finalidade de ser de fácil utilização. Nele você consegue registrar suas entradas (salário e extras) e saídas (gastos realizados no mês), tendo um controle sobre o quanto ainda pode gastar." />

                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://ifinance-dukmarques.vercel.app/" />
                    <meta property="og:title" content="iFinance" />
                    <meta property="og:description" content="O iFinance  é um projeto de controle financeiro com a finalidade de ser de fácil utilização. Nele você consegue registrar suas entradas (salário e extras) e saídas (gastos realizados no mês), tendo um controle sobre o quanto ainda pode gastar." />
                    <meta property="og:image" content="" />

                    <meta property="twitter:card" content="summary_large_image" />
                    <meta property="twitter:url" content="https://ifinance-dukmarques.vercel.app/" />
                    <meta property="twitter:title" content="iFinance" />
                    <meta property="twitter:description" content="O iFinance  é um projeto de controle financeiro com a finalidade de ser de fácil utilização. Nele você consegue registrar suas entradas (salário e extras) e saídas (gastos realizados no mês), tendo um controle sobre o quanto ainda pode gastar." />
                    <meta property="twitter:image" content="" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}