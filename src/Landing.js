import React, { useEffect, useRef, useState } from 'react'
import HeroCardGroup from './HeroCardGroup';
import styles from './Landing.module.css';
import { useNavigate } from 'react-router-dom';
import MobileView from './MobileView';
import ErrorBoundary from './ErrorBoundary';


function Landing() {
  const navigate = useNavigate();
  const inputRef = useRef()
  const [deviceAllowed, setDeviceAllowed] = useState(true)

  
  function handleClick() {
    if (inputRef.current != null && inputRef.current.value.trim() !== '') {
      const user = inputRef.current.value
      localStorage.setItem('user', user)
      navigate('/app')
    }
  }

  const handleEnterKeypress = (event) => {
    if (event.key === 'Enter' || event.key === "Return") {
      handleClick()
    }
  }

  const handleWindowResize = () => {
    if (window.innerWidth < 1024) {
      console.log('Too small:', window.innerWidth)
      setDeviceAllowed(false)
    } else {
      setDeviceAllowed(true)
    }
  }

  useEffect(() => {
    handleWindowResize()
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  })

  return (
    <>
      
      {
        deviceAllowed ? 
        <>
          <div className={styles.page}>
            <div className={styles.hero}>
                <img src={process.env.PUBLIC_URL + "/images/fuud.svg"} alt="app-icon"/>
                <div className={styles.herotext}>
                    <h1>Welcome to Fuud</h1>
                    <p>Find fun recipes for meals from around the world. Whether you're a seasoned chef or just starting your cooking journey, these recipes are your key to creating mouthwatering masterpieces in your very own kitchen.</p>
                </div>
                <div className={styles['input-group']}>
                  <input ref={inputRef} type='text' placeholder='What is your name?' onKeyDown={handleEnterKeypress} />
                  <button type='submit' onClick={handleClick}>Start exploring</button>
                </div>
            </div>
            <div className={styles['card-group']}>
                <HeroCardGroup/>
            </div>
          </div>
        </> : <><MobileView/></>
      }
      
    </>
  )
}

export default Landing
