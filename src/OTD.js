import React from 'react'
import styles from './OTD.module.css'

function OTD(props) {

    var imageURL;

    const getImage =() => {
      if (props.image != null) {
        imageURL =  `url("${props.image}")`
      } else {
        imageURL = `url(${process.env.PUBLIC_URL}/images/categories/${props.name}.png)`
      }
    }
    getImage()

    const imageDivStyle = {
        backgroundImage: imageURL,
        backgroundSize: "cover",
        backgroundPosition: "center center",
    }
    const containerDivStyle = {
        backgroundColor: props.bgcolor
    }


  return (
    <div className={styles.container} style={containerDivStyle}>
      <h3 className={styles.h3}>{props.type} of the Day</h3>
      <div className={styles.imageContainer} style={imageDivStyle}>
        <div className={styles.tint}>
            <h5 className={styles.h5}>{props.name}</h5>
        </div>
      </div>
    </div>
  )
}

export default OTD
