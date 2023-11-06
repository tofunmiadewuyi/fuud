import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import styles from './AboutModal.module.css'
import logo from './icons/fuudicon.svg'
import close from './icons/close.svg'

function AboutModal(props) {

    // const [windowWidth] = useState(window.innerWidth)

    // const modalWidth = {
    //     width:  windowWidth
    // }

  return ReactDOM.createPortal(
    <div className={styles.modal} >
       <div className={styles['modal-container']}>
            <div className={styles.header}>
                <img src={logo} alt='fuud-icon'/>
                <div className={styles['close-icon']} onClick={props.handleModal}><img src={close} alt='close-icon'/></div>
            </div>
            <div className={styles.body}>
                <p>Fuud is a practice app created by Tofunmi Adewuyi in Nov, 2023.</p>
                <p>This app was built around the API from <a href='https://www.themealdb.com/' target='_blank'>TheMealDB.com</a></p>
            </div>
       </div>
    </div>,
    document.getElementById('modal')
  )
}

export default AboutModal
