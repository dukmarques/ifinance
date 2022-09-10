import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import React from 'react';
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  const router = useRouter();
  const {data: session} = useSession();
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if(session){
      router.push('dashboard');
    } else {
      router.push('login');
    }
  }

  return (
    <main className={styles.containerFluid}>
      <div className={styles.container}>
        <div className={styles.content}>
          <img src="/assets/images/logo-horizontal.svg" alt="Logo iFinance" />
          <h1>A melhor forma de <br />
          <span>Organizar</span> suas financas</h1>
          <a href="" onClick={handleClick}>Acessar</a>
        </div>
        <img src="/assets/images/home-image.svg" alt="Mulher Organizando sua renda" />
      </div>
    </main>
  )
}

export default Home
