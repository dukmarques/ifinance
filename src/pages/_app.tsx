import '../styles/globals.scss'
import type { AppProps } from 'next/app'

import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';


function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <Head>
          <title>iFinances</title>
        </Head>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}

export default MyApp
