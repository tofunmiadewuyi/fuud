import React, { useState } from 'react'
import styles from './DiscoverPageItem.module.css'

function DiscoverPageItem(props) {

  const [mealItem, setMealItem] = useState({name: props.name, image: props.image})

    const background = {
        backgroundImage: `url(${mealItem.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
    }

    function handleItemClick () {
      props.openMealDetails(mealItem)
    }

  return (
    <div className={styles.container} onClick={handleItemClick}>
      <div className={styles.itemImage} style={background}>
        <div className={styles.tint}></div>
      </div>
      <p className={styles.itemName}>{props.name}</p>
    </div>
  )
}

export default DiscoverPageItem
