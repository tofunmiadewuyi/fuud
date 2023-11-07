import React from 'react'
import styles from './MealPage.module.css'

function IngredientItem(props) {
  return (
    <div className={styles.ingredientItem}>
        <img className={styles.ingredientImage} src={`https://${props.image}`} alt=''/>
        <div>
          <p>{props.name}</p>
          <p style={{fontSize: '13px', opacity: '0.7'}}>{props.measurement}</p>
        </div>
    </div>
  )
}

export default IngredientItem
