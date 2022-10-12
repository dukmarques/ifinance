import '../styles/globals.scss'
import type { AppProps } from 'next/app'

import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <Head>
          <title>iFinance</title>
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
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}

export default MyApp
