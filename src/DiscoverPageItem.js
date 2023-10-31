import React from 'react'
import styles from './DiscoverPageItem.module.css'

function DiscoverPageItem(props) {
    const background = {
        // backgroundImage:`url(${process.env.PUBLIC_URL}/images/dessertimage.png)`,
        backgroundImage: `url(${props.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
    }

  return (
    <div className={styles.container}>
      <div className={styles.itemImage} style={background}></div>
      <p className={styles.itemName}>{props.name}</p>
    </div>
  )
}

export default DiscoverPageItem
