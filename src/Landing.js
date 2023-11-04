import React, { useEffect, useRef } from 'react'
import HeroCardGroup from './HeroCardGroup';
import styles from './Landing.module.css';
import { useNavigate } from 'react-router-dom';


function Landing() {
  const navigate = useNavigate();
  const inputRef = useRef()

  
  function handleClick() {
    if (inputRef.current != null && inputRef.current.value.trim() !== '') {
      const user = inputRef.current.value
      localStorage.setItem('user', user)
      navigate('/dashboard')
    }
  }

  useEffect(() => {
 
  })

  return (
    <div className={styles.page}>
        <div className={styles.hero}>
            <img src={process.env.PUBLIC_URL + "/images/fuud.svg"} alt="app-icon"/>
            <div className={styles.herotext}>
                <h1>Welcome to Fuud</h1>
                <p>Find fun recipes for meals from around the world. Whether you're a seasoned chef or just starting your cooking journey, these recipes are your key to creating mouthwatering masterpieces in your very own kitchen.</p>
            </div>
            <div className={styles['input-group']}>
              <input ref={inputRef} type='text' placeholder='What is your name?' />
              <button type='submit' onClick={handleClick}>Start exploring</button>
            </div>
        </div>
        <div className={styles['card-group']}>
            <HeroCardGroup/>
        </div>
    </div>
  )
}

export default Landing
