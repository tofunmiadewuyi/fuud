import React from 'react'
import styles from './DiscoverPageItem.module.css'

function DiscoverPageItem(props) {
    const background = {
        backgroundImage: `url(${props.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
    }

  return (
    <div className={styles.container}>
      <div className={styles.itemImage} style={background}>
        <div className={styles.tint}></div>
      </div>
      <p className={styles.itemName}>{props.name}</p>
    </div>
  )
}

export default DiscoverPageItem
