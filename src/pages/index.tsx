import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import styles from '../styles/Home.module.scss'

import LogoHorizontal from '../../public/assets/images/logo-horizontal.svg';
import HomeImage from '../../public/assets/images/home-image.svg';

const Home: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleClick = () => {
    if (session) {
      router.push('dashboard');
    } else {
      router.push('login');
    }
  }

  return (
    <main className={styles.containerFluid}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Image src={LogoHorizontal} className="logo" alt='Logo iFinances' />
          <h1>A melhor forma de <br />
            <span>Organizar</span> suas financas</h1>
          <button onClick={handleClick}>Acessar</button>
        </div>
        <Image src={HomeImage} className="homeImage" alt="Mulher Organizando sua renda" />
      </div>
    </main>
  )
}

export default Home
