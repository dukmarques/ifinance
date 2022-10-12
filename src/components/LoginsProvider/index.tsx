import { signIn } from 'next-auth/react';
import React from 'react';
import styles from './Styles.module.scss';
import Image from 'next/image';

import GoogleImg from '../../../public/assets/icons/google.svg';
import FacebookImg from '../../../public/assets/icons/facebook.svg';
import GithubImg from '../../../public/assets/icons/github.svg';

export default function LoginsProvider() {
    return (
        <div className={styles.container}>
            <button className={styles.box} onClick={(e) => { e.preventDefault(), signIn('google') }}>
                <Image src={GoogleImg} alt="Logo do Google" />
            </button>

            <button className={styles.box} onClick={(e) => { e.preventDefault(), signIn('facebook') }}>
                <Image src={FacebookImg} alt="Logo do Facebook" />
            </button>

            <button className={styles.box} onClick={(e) => { e.preventDefault(), signIn('github') }}>
                <Image src={GithubImg} alt="Logo do Github" />
            </button>
        </div>
    )
}