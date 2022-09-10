import { signIn, useSession } from 'next-auth/react';
import React from 'react';
import styles from './Styles.module.scss';

export default function LoginsProvider() {
    return (
        <div className={styles.container}>
            <button className={styles.box} onClick={(e) => { e.preventDefault(), signIn('google') }}>
                <img src="/assets/icons/google.svg" alt="Logo do Google" />
            </button>

            <button className={styles.box} onClick={(e) => { e.preventDefault(), signIn('facebook') }}>
                <img src="/assets/icons/facebook.svg" alt="Logo do Facebook" />
            </button>

            <button className={styles.box} onClick={(e) => { e.preventDefault(), signIn('github') }}>
                <img src="/assets/icons/github.svg" alt="Logo do Github" />
            </button>
        </div>
    )
}