import React from 'react'
import styles from './OTD.module.css'

function OTD(props) {

    const imageDivStyle = {
        backgroundImage: props.image,
        backgroundSize: "cover"
    }
    const containerDivStyle = {
        backgroundColor: props.bgcolor
    }


  return (
    <div className={styles.container} style={containerDivStyle}>
      <h3 className={styles.h3}>{props.type} of the Day</h3>
      <div className={styles.imageContainer} style={imageDivStyle}>
        <div className={styles.tint}>
            <h5 className={styles.h5}>{props.item}</h5>
        </div>
      </div>
    </div>
  )
}

export default OTD
