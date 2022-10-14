import '../styles/globals.scss'
import type { AppProps } from 'next/app'

import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { useState } from 'react';
import { User } from '../Types/User';
import { UserContext } from '../contexts/UserContext';


function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [userIfinance, setUserIfinance] = useState<User>(null);

  return (
    <>
      <SessionProvider session={session}>
        <UserContext.Provider value={{ userIfinance, setUserIfinance }}>
          <Head>
            <title>iFinances</title>
          </Head>
          <Component {...pageProps} />
        </UserContext.Provider>
      </SessionProvider>
    </>
  )
}

export default MyApp
