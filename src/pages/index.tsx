import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <main className={styles.containerFluid}>
      <div className={styles.container}>
        <div className={styles.content}>
          <img src="/assets/images/logo-vertical.svg" alt="Logo iFinance" />
          <h1>A melhor forma de <br />
          <span>Organizar</span> suas financas</h1>
          <a href="">Acessar</a>
        </div>
        <img src="/assets/images/home-image.svg" alt="Mulher Organizando sua renda" />
      </div>
    </main>
  )
}

export default Home
