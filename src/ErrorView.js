import React from 'react'
import styles from './App.module.css'
import mobile from './icons/plug.svg'
import MakerTag from './MakerTag'

function ErrorView() {
  return (
    <div className={styles.mobilePage}>
        <div className={styles.mobileContainer}>
            <img src={mobile} alt='mobile phone'/>
            <h6>Oops, an error occured</h6>
            <p>Kindly find your way back to the <a href='/app' >Home</a> page.</p>
        </div>
        <MakerTag/>
    </div>
  )
}

export default ErrorView
