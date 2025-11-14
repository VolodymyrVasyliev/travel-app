"use client";

import React from "react";
import styles from './Join.module.css';
import { useRouter } from "next/navigation";



interface JoinProps {
    isAuthenticated: boolean;
}

export default function Join({ isAuthenticated }: JoinProps) {
    
    const router = useRouter();

    const handleClick = () => {
        if(isAuthenticated) {
            router.push('/auth/profile');
        }else{
            router.push('./auth/register')
        }
    }
    return (
        <section className={styles.joinSection}>
    <div className={styles.imageContainer}>
    <picture>
      <source
        srcSet="/images/join-mobile.jpg"
        media="(max-width: 767px)"
      />
      <source
        srcSet="/images/join-tab.jpg"
        media="(max-width: 1439px)"
      />
      <source
        srcSet="/images/join-desk.jpg"
        media="(min-width: 1440px)"
      />
      <img
        src="/images/join-mobile.jpg"
        alt="Join section background"       
        className={styles.backgroundImage}
      />
        </picture>
            <div className={styles.content}>
            <h2 className={styles.title}>Приєднуйтесь до нашої спільноти</h2>
            <p className={styles.description}>Долучайтеся до мандрівників, які діляться своїми історіями та надихають на нові пригоди.</p>
            <button className={styles.button } onClick={handleClick}>{isAuthenticated ? "Збереженні" : "Зареєструватися" }</button>
            </div>
     </div>
        </section>
       
    );
}