import React from 'react'
import styles from './App.module.css'
import mobile from './icons/mobile.svg'
import MakerTag from './MakerTag'

function MobileView() {
  return (
    <div className={styles.mobilePage}>
        <div className={styles.mobileContainer}>
            <img src={mobile} alt='mobile phone'/>
            <h6>Ah, seems you’re on mobile.</h6>
            <p>This app is only available on desktop for now. Please try again with your computer.</p>
        </div>
        <MakerTag/>
    </div>
  )
}

export default MobileView
