import React from 'react'
import HeroCardGroup from './HeroCardGroup';
import styles from './Landing.module.css';

function Landing() {
  return (
    <div className={styles.page}>
        <div className={styles.hero}>
            <img src={process.env.PUBLIC_URL + "/images/fuud.svg"} alt="app-icon"/>
            <div className={styles.herotext}>
                <h1>Welcome to Fuud</h1>
                <p>Find fun recipes for meals from around the world. Whether you're a seasoned chef or just starting your cooking journey, these recipes are your key to creating mouthwatering masterpieces in your very own kitchen.</p>
            </div>
            <div className={styles['input-group']}>
              <input type='text' placeholder='What is your name?' />
              <button type='submit'>Start exploring</button>
            </div>
        </div>
        <div className={styles['card-group']}>
            <HeroCardGroup/>
        </div>
    </div>
  )
}

export default Landing
